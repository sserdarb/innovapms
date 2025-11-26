import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import axios from 'axios';

@Injectable()
export class PayTRProvider {
    private merchantId: string;
    private merchantKey: string;
    private merchantSalt: string;
    private baseUrl: string;

    constructor() {
        this.merchantId = process.env.PAYTR_MERCHANT_ID || '';
        this.merchantKey = process.env.PAYTR_MERCHANT_KEY || '';
        this.merchantSalt = process.env.PAYTR_MERCHANT_SALT || '';
        this.baseUrl = process.env.PAYTR_BASE_URL || 'https://www.paytr.com/odeme/api/get-token';
    }

    async createPayment(data: {
        amount: number;
        currency: string;
        customerName: string;
        customerEmail: string;
        customerPhone: string;
        callbackUrl: string;
        successUrl: string;
        failUrl: string;
        metadata?: any;
    }) {
        const merchantOid = 'ORDER_' + Date.now();
        const userBasket = Buffer.from(
            JSON.stringify([['Hotel Reservation', data.amount.toFixed(2), 1]])
        ).toString('base64');

        const paymentAmount = Math.round(data.amount * 100); // Convert to kuruş
        const userIp = '85.34.78.112';

        // Create hash
        const hashStr = `${this.merchantId}${userIp}${merchantOid}${data.customerEmail}${paymentAmount}${userBasket}no_installment0${data.currency}1${this.merchantSalt}`;
        const paytrToken = crypto.createHmac('sha256', this.merchantKey).update(hashStr).digest('base64');

        const requestData = {
            merchant_id: this.merchantId,
            user_ip: userIp,
            merchant_oid: merchantOid,
            email: data.customerEmail,
            payment_amount: paymentAmount,
            paytr_token: paytrToken,
            user_basket: userBasket,
            debug_on: process.env.NODE_ENV === 'development' ? 1 : 0,
            no_installment: 0,
            max_installment: 0,
            user_name: data.customerName,
            user_address: 'Address',
            user_phone: data.customerPhone,
            merchant_ok_url: data.successUrl,
            merchant_fail_url: data.failUrl,
            timeout_limit: 30,
            currency: data.currency,
            test_mode: process.env.PAYTR_TEST_MODE === 'true' ? 1 : 0,
            lang: 'tr',
        };

        try {
            const response = await axios.post(this.baseUrl, new URLSearchParams(requestData));

            if (response.data.status === 'success') {
                return {
                    token: response.data.token,
                    paymentUrl: `https://www.paytr.com/odeme/guvenli/${response.data.token}`,
                    merchantOid,
                };
            } else {
                throw new Error(response.data.reason || 'Payment initialization failed');
            }
        } catch (error: any) {
            throw new Error(error.message || 'PayTR API error');
        }
    }

    verifyCallback(postData: any): boolean {
        const {
            merchant_oid,
            status,
            total_amount,
            hash,
        } = postData;

        const hashStr = `${merchant_oid}${this.merchantSalt}${status}${total_amount}`;
        const calculatedHash = crypto.createHmac('sha256', this.merchantKey).update(hashStr).digest('base64');

        return hash === calculatedHash;
    }

    async refund(merchantOid: string, amount: number) {
        // PayTR refund API implementation
        // Note: PayTR refund requires manual process or separate API
        throw new Error('PayTR refund must be processed through merchant panel');
    }
}
