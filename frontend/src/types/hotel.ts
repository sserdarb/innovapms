export interface Hotel {
    id: string
    code: string
    name: string
    legalName: string
    address?: string
    city: string
    country: string
    phone?: string
    email?: string
    website?: string
    currencyCode: string
    timezone: string
    isActive: boolean
    createdAt: string
    updatedAt: string
}

export interface RoomType {
    id: string
    hotelId: string
    code: string
    name: string
    description?: string
    maxOccupancy: number
    maxAdults: number
    maxChildren: number
    basePrice: number
    amenities?: string[]
    isActive: boolean
}

export interface Room {
    id: string
    hotelId: string
    roomTypeId: string
    roomNumber: string
    floor?: number
    status: RoomStatus
    isActive: boolean
}

export enum RoomStatus {
    CLEAN = 'clean',
    DIRTY = 'dirty',
    INSPECTED = 'inspected',
    OUT_OF_SERVICE = 'out_of_service',
    OUT_OF_ORDER = 'out_of_order',
}
