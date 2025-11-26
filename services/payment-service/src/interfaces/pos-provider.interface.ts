export interface IPOSProvider {
    createPayment(data: PaymentRequest): Promise<PaymentResponse>;
    verifyPayment(data: any): Promise<PaymentVerification>;
    refund(transactionId: string, amount?: number): Promise<RefundResponse>;
    verifyCallback?(data: any): boolean;
}

export interface PaymentRequest {
    amount: number;
    currency: string;
    orderId: string;
    customerName: string;
    customerEmail: string;
    customerPhone?: string;
    successUrl: string;
    failUrl: string;
    callbackUrl?: string;
    installment?: number;
    metadata?: any;
}

export interface PaymentResponse {
    success: boolean;
    transactionId?: string;
    paymentUrl?: string;
    token?: string;
    htmlContent?: string;
    errorMessage?: string;
}

export interface PaymentVerification {
    success: boolean;
    status: 'success' | 'failed' | 'pending';
    transactionId: string;
    amount: number;
    currency: string;
    errorMessage?: string;
}

export interface RefundResponse {
    success: boolean;
    refundId?: string;
    errorMessage?: string;
}

export interface POSCredentials {
    merchantId?: string;
    terminalId?: string;
    apiKey?: string;
    secretKey?: string;
    storeKey?: string;
    userName?: string;
    password?: string;
    clientId?: string;
    [key: string]: any;
}
