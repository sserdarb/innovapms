import { Controller, Post, Get, Body, Param, Req, Res, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { PaymentService } from './payment.service';
import { PaymentProvider, PaymentStatus } from '../entities/payment-transaction.entity';
import { StripeProvider } from '../providers/stripe.provider';
import { PayTRProvider } from '../providers/paytr.provider';

@ApiTags('Payments')
@Controller('payments')
export class PaymentController {
    constructor(
        private readonly paymentService: PaymentService,
        private readonly stripeProvider: StripeProvider,
        private readonly paytrProvider: PayTRProvider,
    ) { }

    @Post('create')
    @ApiOperation({ summary: 'Ödeme oluştur' })
    @ApiResponse({ status: 201, description: 'Payment created successfully' })
    async createPayment(@Body() data: any) {
        return await this.paymentService.createPayment(data);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Ödeme detayı' })
    async getPayment(@Param('id') id: string) {
        return await this.paymentService.getTransaction(id);
    }

    @Post(':id/refund')
    @ApiOperation({ summary: 'Ödeme iadesi' })
    async refundPayment(@Param('id') id: string, @Body() data: { amount?: number }) {
        return await this.paymentService.refund(id, data.amount);
    }

    // Stripe Webhook
    @Post('webhooks/stripe')
    async stripeWebhook(@Req() req: Request, @Res() res: Response) {
        const signature = req.headers['stripe-signature'] as string;
        const payload = req.body;

        try {
            const event = await this.stripeProvider.verifyWebhook(
                JSON.stringify(payload),
                signature
            );

            if (event.type === 'payment_intent.succeeded') {
                const paymentIntent = event.data.object;
                const transactionId = paymentIntent.metadata.transactionId;

                await this.paymentService.updateTransactionStatus(
                    transactionId,
                    PaymentStatus.SUCCESS,
                    { providerTransactionId: paymentIntent.id }
                );
            } else if (event.type === 'payment_intent.payment_failed') {
                const paymentIntent = event.data.object;
                const transactionId = paymentIntent.metadata.transactionId;

                await this.paymentService.updateTransactionStatus(
                    transactionId,
                    PaymentStatus.FAILED
                );
            }

            res.status(HttpStatus.OK).json({ received: true });
        } catch (error: any) {
            res.status(HttpStatus.BAD_REQUEST).json({ error: error.message });
        }
    }

    // PayTR Callback
    @Post('callbacks/paytr')
    async paytrCallback(@Body() data: any, @Res() res: Response) {
        try {
            const isValid = this.paytrProvider.verifyCallback(data);

            if (!isValid) {
                return res.status(HttpStatus.BAD_REQUEST).send('PAYTR notification failed: bad hash');
            }

            const transaction = await this.paymentService.getTransaction(data.merchant_oid);

            if (data.status === 'success') {
                await this.paymentService.updateTransactionStatus(
                    transaction!.id,
                    PaymentStatus.SUCCESS,
                    { providerTransactionId: data.merchant_oid }
                );
                res.send('OK');
            } else {
                await this.paymentService.updateTransactionStatus(
                    transaction!.id,
                    PaymentStatus.FAILED
                );
                res.send('OK');
            }
        } catch (error: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Error processing callback');
        }
    }

    // iyzico Callback
    @Post('callbacks/iyzico')
    async iyzicoCallback(@Body() data: { token: string }, @Res() res: Response) {
        // iyzico callback handling
        res.status(HttpStatus.OK).json({ received: true });
    }
}
