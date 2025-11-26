// User and Authentication Types
export interface User {
    id: string;
    hotelId: string;
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    isActive: boolean;
    lastLoginAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface Role {
    id: string;
    name: string;
    displayName: string;
    description?: string;
    isSystem: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Permission {
    id: string;
    name: string;
    displayName: string;
    description?: string;
    module: string;
    createdAt: Date;
}

export interface JwtPayload {
    sub: string; // user id
    hotelId: string;
    username: string;
    email: string;
    roles: string[];
    permissions: string[];
    iat?: number;
    exp?: number;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    user: Omit<User, 'passwordHash'>;
    expiresIn: number;
}

export interface RefreshTokenRequest {
    refreshToken: string;
}

// Hotel Types
export interface Hotel {
    id: string;
    code: string;
    name: string;
    legalName?: string;
    taxNumber?: string;
    address?: string;
    city?: string;
    country?: string;
    phone?: string;
    email?: string;
    website?: string;
    currencyCode: string;
    timezone: string;
    isActive: boolean;
    settings: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}

export interface RoomType {
    id: string;
    hotelId: string;
    code: string;
    name: string;
    description?: string;
    maxAdults: number;
    maxChildren: number;
    maxOccupancy: number;
    basePrice?: number;
    extraBedPrice?: number;
    amenities: string[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Room {
    id: string;
    hotelId: string;
    roomTypeId: string;
    roomNumber: string;
    floor?: number;
    status: RoomStatus;
    isActive: boolean;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

export enum RoomStatus {
    CLEAN = 'clean',
    DIRTY = 'dirty',
    MAINTENANCE = 'maintenance',
    OUT_OF_ORDER = 'out_of_order',
}

export interface RateCode {
    id: string;
    hotelId: string;
    code: string;
    name: string;
    description?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface RatePlan {
    id: string;
    hotelId: string;
    roomTypeId: string;
    rateCodeId: string;
    startDate: Date;
    endDate: Date;
    price: number;
    minStay: number;
    maxStay?: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// Reservation Types
export interface Guest {
    id: string;
    hotelId: string;
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    nationality?: string;
    idNumber?: string;
    idType?: string;
    dateOfBirth?: Date;
    address?: string;
    city?: string;
    country?: string;
    postalCode?: string;
    vipStatus?: string;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Reservation {
    id: string;
    hotelId: string;
    reservationNumber: string;
    status: ReservationStatus;
    source?: ReservationSource;
    arrivalDate: Date;
    departureDate: Date;
    adults: number;
    children: number;
    rateCodeId?: string;
    totalAmount?: number;
    depositAmount: number;
    balance?: number;
    specialRequests?: string;
    notes?: string;
    createdBy?: string;
    checkedInAt?: Date;
    checkedOutAt?: Date;
    cancelledAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export enum ReservationStatus {
    CONFIRMED = 'confirmed',
    CANCELLED = 'cancelled',
    CHECKED_IN = 'checked_in',
    CHECKED_OUT = 'checked_out',
    NO_SHOW = 'no_show',
}

export enum ReservationSource {
    DIRECT = 'direct',
    OTA = 'ota',
    PHONE = 'phone',
    WALK_IN = 'walk_in',
}

export interface ReservationRoom {
    id: string;
    reservationId: string;
    roomId?: string;
    roomTypeId: string;
    arrivalDate: Date;
    departureDate: Date;
    adults: number;
    children: number;
    rate?: number;
    status: ReservationRoomStatus;
    createdAt: Date;
    updatedAt: Date;
}

export enum ReservationRoomStatus {
    RESERVED = 'reserved',
    ASSIGNED = 'assigned',
    CHECKED_IN = 'checked_in',
    CHECKED_OUT = 'checked_out',
}

export interface RoomBlock {
    id: string;
    hotelId: string;
    roomId: string;
    startDate: Date;
    endDate: Date;
    reason?: string;
    notes?: string;
    createdBy?: string;
    createdAt: Date;
    updatedAt: Date;
}

// Folio Types
export interface Folio {
    id: string;
    hotelId: string;
    reservationId?: string;
    folioNumber: string;
    guestId?: string;
    status: FolioStatus;
    openingBalance: number;
    totalCharges: number;
    totalPayments: number;
    balance: number;
    openedAt: Date;
    closedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export enum FolioStatus {
    OPEN = 'open',
    CLOSED = 'closed',
    TRANSFERRED = 'transferred',
}

export interface FolioTransaction {
    id: string;
    folioId: string;
    transactionType: TransactionType;
    department?: string;
    description: string;
    amount: number;
    quantity: number;
    unitPrice?: number;
    taxAmount: number;
    taxRate: number;
    currencyCode: string;
    exchangeRate: number;
    referenceNumber?: string;
    postedBy?: string;
    postedAt: Date;
    createdAt: Date;
}

export enum TransactionType {
    CHARGE = 'charge',
    PAYMENT = 'payment',
    ADJUSTMENT = 'adjustment',
    TRANSFER = 'transfer',
}

export interface PaymentMethod {
    id: string;
    hotelId: string;
    code: string;
    name: string;
    type: PaymentMethodType;
    isActive: boolean;
    createdAt: Date;
}

export enum PaymentMethodType {
    CASH = 'cash',
    CREDIT_CARD = 'credit_card',
    DEBIT_CARD = 'debit_card',
    BANK_TRANSFER = 'bank_transfer',
    VOUCHER = 'voucher',
}

export interface Payment {
    id: string;
    folioId: string;
    paymentMethodId: string;
    amount: number;
    currencyCode: string;
    exchangeRate: number;
    referenceNumber?: string;
    cardNumberMasked?: string;
    approvalCode?: string;
    notes?: string;
    processedBy?: string;
    processedAt: Date;
    createdAt: Date;
}

export interface Currency {
    code: string;
    name: string;
    symbol?: string;
    isActive: boolean;
}

export interface ExchangeRate {
    id: string;
    hotelId: string;
    fromCurrency: string;
    toCurrency: string;
    rate: number;
    effectiveDate: Date;
    createdAt: Date;
}

// Integration Types
export interface ExternalApiKey {
    id: string;
    hotelId: string;
    keyHash: string;
    name: string;
    description?: string;
    permissions: string[];
    isActive: boolean;
    lastUsedAt?: Date;
    expiresAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface Webhook {
    id: string;
    hotelId: string;
    name: string;
    url: string;
    events: string[];
    secret?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface IntegrationLog {
    id: string;
    hotelId: string;
    integrationType: string;
    direction: 'inbound' | 'outbound';
    endpoint?: string;
    requestData?: Record<string, any>;
    responseData?: Record<string, any>;
    statusCode?: number;
    errorMessage?: string;
    createdAt: Date;
}

// Common API Response Types
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    errors?: ValidationError[];
}

export interface ValidationError {
    field: string;
    message: string;
    code?: string;
}

export interface PaginatedResponse<T = any> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export interface PaginationParams {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
}

// Common Filter Types
export interface DateRangeFilter {
    startDate: Date;
    endDate: Date;
}

export interface HotelFilter {
    hotelId: string;
}
