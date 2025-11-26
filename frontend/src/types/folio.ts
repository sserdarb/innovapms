export interface Folio {
    id: string
    hotelId: string
    folioNumber: string
    reservationId?: string
    guestId?: string
    status: FolioStatus
    totalCharges: number
    totalPayments: number
    balance: number
    currencyCode: string
    closedAt?: string
    notes?: string
    createdAt: string
    updatedAt: string
}

export enum FolioStatus {
    OPEN = 'open',
    CLOSED = 'closed',
    TRANSFERRED = 'transferred',
}

export interface FolioTransaction {
    id: string
    folioId: string
    type: TransactionType
    department: string
    description: string
    amount: number
    quantity: number
    unitPrice?: number
    taxRate: number
    taxAmount: number
    referenceNumber?: string
    postedBy?: string
    createdAt: string
}

export enum TransactionType {
    CHARGE = 'charge',
    PAYMENT = 'payment',
    REFUND = 'refund',
    ADJUSTMENT = 'adjustment',
}
