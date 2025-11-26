import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeProvider {
    private stripe: Stripe;

    constructor() {
        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
            apiVersion: '2023-10-16',
        });
    }

    async createPaymentIntent(data: {
        amount: number;
        currency: string;
        metadata?: any;
    }) {
        const paymentIntent = await this.stripe.paymentIntents.create({
            amount: Math.round(data.amount * 100), // Convert to cents
            currency: data.currency.toLowerCase(),
            metadata: data.metadata || {},
            automatic_payment_methods: {
                enabled: true,
            },
        });

        return {
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
        };
    }

    async confirmPayment(paymentIntentId: string) {
        const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId);
        return {
            status: paymentIntent.status,
            amount: paymentIntent.amount / 100,
            currency: paymentIntent.currency.toUpperCase(),
        };
    }

    async refund(paymentIntentId: string, amount?: number) {
        const refund = await this.stripe.refunds.create({
            payment_intent: paymentIntentId,
            amount: amount ? Math.round(amount * 100) : undefined,
        });

        return {
            refundId: refund.id,
            status: refund.status,
            amount: refund.amount / 100,
        };
    }

    async verifyWebhook(payload: string, signature: string): Promise<any> {
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
        return this.stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    }
}
