import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentTransaction, PaymentProvider, PaymentStatus } from '../entities/payment-transaction.entity';
import { StripeProvider } from '../providers/stripe.provider';
import { IyzicoProvider } from '../providers/iyzico.provider';
import { PayTRProvider } from '../providers/paytr.provider';

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(PaymentTransaction)
        private paymentRepository: Repository<PaymentTransaction>,
        private stripeProvider: StripeProvider,
        private iyzicoProvider: IyzicoProvider,
        private paytrProvider: PayTRProvider,
    ) { }

    async createPayment(data: {
        hotelId: string;
        provider: PaymentProvider;
        amount: number;
        currency: string;
        customerName: string;
        customerEmail: string;
        customerPhone?: string;
        reservationId?: string;
        folioId?: string;
        callbackUrl?: string;
        successUrl?: string;
        failUrl?: string;
        metadata?: any;
    }) {
        // Create transaction record
        const transaction = this.paymentRepository.create({
            hotelId: data.hotelId,
            provider: data.provider,
            amount: data.amount,
            currency: data.currency,
            customerName: data.customerName,
            customerEmail: data.customerEmail,
            customerPhone: data.customerPhone,
            reservationId: data.reservationId,
            folioId: data.folioId,
            status: PaymentStatus.PENDING,
            metadata: data.metadata,
        });

        await this.paymentRepository.save(transaction);

        let result: any;

        try {
            switch (data.provider) {
                case PaymentProvider.STRIPE:
                    result = await this.stripeProvider.createPaymentIntent({
                        amount: data.amount,
                        currency: data.currency,
                        metadata: { transactionId: transaction.id, ...data.metadata },
                    });
                    transaction.providerPaymentId = result.paymentIntentId;
                    break;

                case PaymentProvider.IYZICO:
                    result = await this.iyzicoProvider.createPayment({
                        amount: data.amount,
                        currency: data.currency,
                        customerName: data.customerName,
                        customerEmail: data.customerEmail,
                        customerPhone: data.customerPhone || '',
                        callbackUrl: data.callbackUrl || '',
                        metadata: { transactionId: transaction.id, ...data.metadata },
                    });
                    transaction.providerPaymentId = result.token;
                    break;

                case PaymentProvider.PAYTR:
                    result = await this.paytrProvider.createPayment({
                        amount: data.amount,
                        currency: data.currency,
                        customerName: data.customerName,
                        customerEmail: data.customerEmail,
                        customerPhone: data.customerPhone || '',
                        callbackUrl: data.callbackUrl || '',
                        successUrl: data.successUrl || '',
                        failUrl: data.failUrl || '',
                        metadata: { transactionId: transaction.id, ...data.metadata },
                    });
                    transaction.providerPaymentId = result.token;
                    transaction.providerTransactionId = result.merchantOid;
                    break;
            }

            transaction.status = PaymentStatus.PROCESSING;
            await this.paymentRepository.save(transaction);

            return {
                transactionId: transaction.id,
                provider: data.provider,
                ...result,
            };
        } catch (error: any) {
            transaction.status = PaymentStatus.FAILED;
            transaction.errorMessage = error.message;
            await this.paymentRepository.save(transaction);
            throw error;
        }
    }

    async getTransaction(id: string) {
        return await this.paymentRepository.findOne({ where: { id } });
    }

    async updateTransactionStatus(id: string, status: PaymentStatus, metadata?: any) {
        await this.paymentRepository.update(id, {
            status,
            metadata: metadata || undefined,
        });
    }

    async refund(transactionId: string, amount?: number) {
        const transaction = await this.getTransaction(transactionId);
        if (!transaction) {
            throw new Error('Transaction not found');
        }

        if (transaction.status !== PaymentStatus.SUCCESS) {
            throw new Error('Can only refund successful transactions');
        }

        let result: any;

        try {
            switch (transaction.provider) {
                case PaymentProvider.STRIPE:
                    result = await this.stripeProvider.refund(
                        transaction.providerPaymentId!,
                        amount
                    );
                    break;

                case PaymentProvider.IYZICO:
                    result = await this.iyzicoProvider.refund(
                        transaction.providerTransactionId!,
                        amount || transaction.amount,
                        transaction.currency
                    );
                    break;

                case PaymentProvider.PAYTR:
                    throw new Error('PayTR refunds must be processed manually');
            }

            transaction.isRefunded = true;
            transaction.refundedAmount = amount || transaction.amount;
            transaction.status = PaymentStatus.REFUNDED;
            await this.paymentRepository.save(transaction);

            return result;
        } catch (error: any) {
            throw error;
        }
    }
}
