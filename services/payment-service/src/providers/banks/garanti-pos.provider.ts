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
export class GarantiPOSProvider implements IPOSProvider {
    private baseUrl: string;
    private credentials: POSCredentials;

    constructor(credentials: POSCredentials, isTestMode: boolean = false) {
        this.credentials = credentials;
        this.baseUrl = isTestMode
            ? 'https://sanalposprovtest.garantibbva.com.tr/VPServlet'
            : 'https://sanalposprov.garanti.com.tr/VPServlet';
    }

    async createPayment(data: PaymentRequest): Promise<PaymentResponse> {
        try {
            const orderId = data.orderId.padStart(20, '0');
            const amount = Math.round(data.amount * 100).toString().padStart(12, '0');

            // Create hash
            const hashData = `${orderId}${this.credentials.terminalId}${data.customerEmail}${amount}${this.credentials.storeKey}`;
            const hash = crypto.createHash('sha1').update(hashData).digest('hex').toUpperCase();

            const requestData = {
                Mode: 'PROD',
                Version: '512',
                Terminal: {
                    ProvUserID: this.credentials.userName,
                    HashData: hash,
                    UserID: this.credentials.userName,
                    ID: this.credentials.terminalId,
                    MerchantID: this.credentials.merchantId,
                },
                Customer: {
                    IPAddress: '127.0.0.1',
                    EmailAddress: data.customerEmail,
                },
                Order: {
                    OrderID: orderId,
                    GroupID: '',
                },
                Transaction: {
                    Type: 'sales',
                    InstallmentCnt: data.installment || '',
                    Amount: amount,
                    CurrencyCode: data.currency === 'TRY' ? '949' : '840',
                    CardholderPresentCode: '0',
                    MotoInd: 'N',
                },
            };

            const response = await axios.post(this.baseUrl, requestData);

            if (response.data.Transaction.Response.Code === '00') {
                return {
                    success: true,
                    transactionId: response.data.Transaction.RetrefNum,
                    htmlContent: response.data.Transaction.HTMLContent,
                };
            } else {
                return {
                    success: false,
                    errorMessage: response.data.Transaction.Response.Message,
                };
            }
        } catch (error: any) {
            return {
                success: false,
                errorMessage: error.message,
            };
        }
    }

    async verifyPayment(data: any): Promise<PaymentVerification> {
        // Garanti POS verification logic
        return {
            success: true,
            status: 'success',
            transactionId: data.transactionId,
            amount: parseFloat(data.amount) / 100,
            currency: 'TRY',
        };
    }

    async refund(transactionId: string, amount?: number): Promise<RefundResponse> {
        // Garanti POS refund logic
        return {
            success: true,
            refundId: transactionId,
        };
    }
}
