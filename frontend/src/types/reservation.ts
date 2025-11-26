export interface Reservation {
    id: string
    hotelId: string
    reservationNumber: string
    checkInDate: string
    checkOutDate: string
    adults: number
    children: number
    status: ReservationStatus
    source: ReservationSource
    totalAmount: number
    paidAmount: number
    balance: number
    currencyCode: string
    notes?: string
    createdAt: string
    updatedAt: string
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
    PHONE = 'phone',
    EMAIL = 'email',
    WEBSITE = 'website',
    OTA = 'ota',
    WALK_IN = 'walk_in',
}

export interface Guest {
    id: string
    hotelId: string
    firstName: string
    lastName: string
    email?: string
    phone?: string
    nationality?: string
    idNumber?: string
    passportNumber?: string
    dateOfBirth?: string
    address?: string
    city?: string
    country?: string
    vipStatus: boolean
}
