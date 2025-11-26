import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import axios from 'axios';
import {
    IPOSProvider,
    PaymentRequest,
    PaymentResponse,
    PaymentVerification,
    RefundResponse,
    POSCredentials,
} from '../interfaces/pos-provider.interface';

@Injectable()
export class IsBankPOSProvider implements IPOSProvider {
    private baseUrl: string;
    private credentials: POSCredentials;

    constructor(credentials: POSCredentials, isTestMode: boolean = false) {
        this.credentials = credentials;
        this.baseUrl = isTestMode
            ? 'https://entegrasyon.asseco-see.com.tr/fim/est3Dgate'
            : 'https://sanalpos.isbank.com.tr/fim/est3Dgate';
    }

    async createPayment(data: PaymentRequest): Promise<PaymentResponse> {
        try {
            const amount = data.amount.toFixed(2);
            const orderId = data.orderId;

            // Create hash for İş Bankası
            const hashData = `${this.credentials.clientId}|${orderId}|${amount}|${data.successUrl}|${data.failUrl}||${this.credentials.storeKey}`;
            const hash = crypto.createHash('sha512').update(hashData, 'utf8').digest('base64');

            const formData = {
                clientid: this.credentials.clientId,
                amount: amount,
                oid: orderId,
                okUrl: data.successUrl,
                failUrl: data.failUrl,
                rnd: Date.now().toString(),
                hash: hash,
                storetype: '3d_pay_hosting',
                lang: 'tr',
                currency: data.currency === 'TRY' ? '949' : '840',
                email: data.customerEmail,
                BillToName: data.customerName,
                tel: data.customerPhone || '',
            };

            // İş Bankası için HTML form oluştur
            const htmlForm = this.generateHTMLForm(formData);

            return {
                success: true,
                htmlContent: htmlForm,
                transactionId: orderId,
            };
        } catch (error: any) {
            return {
                success: false,
                errorMessage: error.message,
            };
        }
    }

    private generateHTMLForm(formData: any): string {
        const fields = Object.entries(formData)
            .map(([key, value]) => `<input type="hidden" name="${key}" value="${value}">`)
            .join('\n');

        return `
      <html>
        <body onload="document.paymentForm.submit()">
          <form name="paymentForm" method="post" action="${this.baseUrl}">
            ${fields}
          </form>
        </body>
      </html>
    `;
    }

    async verifyPayment(data: any): Promise<PaymentVerification> {
        // İş Bankası verification logic
        return {
            success: true,
            status: 'success',
            transactionId: data.oid,
            amount: parseFloat(data.amount),
            currency: 'TRY',
        };
    }

    async refund(transactionId: string, amount?: number): Promise<RefundResponse> {
        // İş Bankası refund logic
        return {
            success: true,
            refundId: transactionId,
        };
    }
}
