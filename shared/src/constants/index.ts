// HTTP Status Codes
export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500,
} as const;

// Reservation Status
export const RESERVATION_STATUS = {
    CONFIRMED: 'confirmed',
    CANCELLED: 'cancelled',
    CHECKED_IN: 'checked_in',
    CHECKED_OUT: 'checked_out',
    NO_SHOW: 'no_show',
} as const;

// Room Status
export const ROOM_STATUS = {
    CLEAN: 'clean',
    DIRTY: 'dirty',
    MAINTENANCE: 'maintenance',
    OUT_OF_ORDER: 'out_of_order',
} as const;

// Folio Status
export const FOLIO_STATUS = {
    OPEN: 'open',
    CLOSED: 'closed',
    TRANSFERRED: 'transferred',
} as const;

// Transaction Types
export const TRANSACTION_TYPE = {
    CHARGE: 'charge',
    PAYMENT: 'payment',
    ADJUSTMENT: 'adjustment',
    TRANSFER: 'transfer',
} as const;

// Payment Method Types
export const PAYMENT_METHOD_TYPE = {
    CASH: 'cash',
    CREDIT_CARD: 'credit_card',
    DEBIT_CARD: 'debit_card',
    BANK_TRANSFER: 'bank_transfer',
    VOUCHER: 'voucher',
} as const;

// Reservation Sources
export const RESERVATION_SOURCE = {
    DIRECT: 'direct',
    OTA: 'ota',
    PHONE: 'phone',
    WALK_IN: 'walk_in',
} as const;

// Default Pagination
export const DEFAULT_PAGINATION = {
    PAGE: 1,
    LIMIT: 20,
    MAX_LIMIT: 100,
} as const;

// Date Formats
export const DATE_FORMATS = {
    ISO: 'YYYY-MM-DD',
    DATETIME: 'YYYY-MM-DD HH:mm:ss',
    DISPLAY: 'DD/MM/YYYY',
    DISPLAY_DATETIME: 'DD/MM/YYYY HH:mm',
} as const;

// JWT
export const JWT = {
    ACCESS_TOKEN_EXPIRY: '24h',
    REFRESH_TOKEN_EXPIRY: '7d',
} as const;

// Redis Keys
export const REDIS_KEYS = {
    SESSION: (userId: string) => `session:${userId}`,
    HOTEL: (hotelId: string) => `hotel:${hotelId}`,
    ROOM_STATUS: (hotelId: string) => `room_status:${hotelId}`,
    RATE_CACHE: (hotelId: string, date: string) => `rates:${hotelId}:${date}`,
} as const;

// Event Names (for webhooks and internal events)
export const EVENTS = {
    RESERVATION_CREATED: 'reservation.created',
    RESERVATION_UPDATED: 'reservation.updated',
    RESERVATION_CANCELLED: 'reservation.cancelled',
    CHECK_IN: 'reservation.checked_in',
    CHECK_OUT: 'reservation.checked_out',
    FOLIO_CREATED: 'folio.created',
    FOLIO_CHARGED: 'folio.charged',
    FOLIO_PAYMENT: 'folio.payment',
    FOLIO_CLOSED: 'folio.closed',
    ROOM_STATUS_CHANGED: 'room.status_changed',
} as const;

// Error Codes
export const ERROR_CODES = {
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    UNAUTHORIZED: 'UNAUTHORIZED',
    FORBIDDEN: 'FORBIDDEN',
    NOT_FOUND: 'NOT_FOUND',
    CONFLICT: 'CONFLICT',
    INTERNAL_ERROR: 'INTERNAL_ERROR',
    ROOM_NOT_AVAILABLE: 'ROOM_NOT_AVAILABLE',
    INSUFFICIENT_PERMISSIONS: 'INSUFFICIENT_PERMISSIONS',
    INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
    TOKEN_EXPIRED: 'TOKEN_EXPIRED',
    HOTEL_NOT_FOUND: 'HOTEL_NOT_FOUND',
    RESERVATION_NOT_FOUND: 'RESERVATION_NOT_FOUND',
    FOLIO_NOT_FOUND: 'FOLIO_NOT_FOUND',
} as const;
