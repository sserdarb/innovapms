import { Injectable } from '@nestjs/common';
import * as Iyzipay from 'iyzipay';

@Injectable()
export class IyzicoProvider {
    private iyzipay: any;

    constructor() {
        this.iyzipay = new Iyzipay({
            apiKey: process.env.IYZICO_API_KEY || '',
            secretKey: process.env.IYZICO_SECRET_KEY || '',
            uri: process.env.IYZICO_BASE_URL || 'https://sandbox-api.iyzipay.com',
        });
    }

    async createPayment(data: {
        amount: number;
        currency: string;
        customerName: string;
        customerEmail: string;
        customerPhone: string;
        callbackUrl: string;
        metadata?: any;
    }) {
        const request = {
            locale: Iyzipay.LOCALE.TR,
            conversationId: data.metadata?.conversationId || Date.now().toString(),
            price: data.amount.toFixed(2),
            paidPrice: data.amount.toFixed(2),
            currency: data.currency,
            basketId: data.metadata?.basketId || 'B' + Date.now(),
            paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
            callbackUrl: data.callbackUrl,
            enabledInstallments: [1, 2, 3, 6, 9],
            buyer: {
                id: data.metadata?.buyerId || 'BY' + Date.now(),
                name: data.customerName.split(' ')[0],
                surname: data.customerName.split(' ').slice(1).join(' '),
                gsmNumber: data.customerPhone,
                email: data.customerEmail,
                identityNumber: '11111111111',
                registrationAddress: 'Address',
                ip: '85.34.78.112',
                city: 'Istanbul',
                country: 'Turkey',
            },
            shippingAddress: {
                contactName: data.customerName,
                city: 'Istanbul',
                country: 'Turkey',
                address: 'Address',
            },
            billingAddress: {
                contactName: data.customerName,
                city: 'Istanbul',
                country: 'Turkey',
                address: 'Address',
            },
            basketItems: [
                {
                    id: 'BI' + Date.now(),
                    name: 'Hotel Reservation',
                    category1: 'Accommodation',
                    itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
                    price: data.amount.toFixed(2),
                },
            ],
        };

        return new Promise((resolve, reject) => {
            this.iyzipay.checkoutFormInitialize.create(request, (err: any, result: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({
                        token: result.token,
                        paymentPageUrl: result.paymentPageUrl,
                        conversationId: result.conversationId,
                    });
                }
            });
        });
    }

    async verifyPayment(token: string) {
        return new Promise((resolve, reject) => {
            this.iyzipay.checkoutForm.retrieve({ token }, (err: any, result: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({
                        status: result.status,
                        paymentId: result.paymentId,
                        amount: parseFloat(result.paidPrice),
                        currency: result.currency,
                    });
                }
            });
        });
    }

    async refund(paymentTransactionId: string, amount: number, currency: string) {
        const request = {
            locale: Iyzipay.LOCALE.TR,
            conversationId: Date.now().toString(),
            paymentTransactionId,
            price: amount.toFixed(2),
            currency,
            ip: '85.34.78.112',
        };

        return new Promise((resolve, reject) => {
            this.iyzipay.refund.create(request, (err: any, result: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({
                        status: result.status,
                        paymentId: result.paymentId,
                    });
                }
            });
        });
    }
}
