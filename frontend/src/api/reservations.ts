import apiClient from './client'
import type { Reservation } from '@/types/reservation'

export const reservationsApi = {
    getAll: async (hotelId: string, status?: string) => {
        const params = new URLSearchParams({ hotelId })
        if (status) params.append('status', status)
        const response = await apiClient.get(`/reservations?${params}`)
        return response.data
    },

    getById: async (id: string) => {
        const response = await apiClient.get(`/reservations/${id}`)
        return response.data
    },

    create: async (data: any) => {
        const response = await apiClient.post('/reservations', data)
        return response.data
    },

    update: async (id: string, data: any) => {
        const response = await apiClient.patch(`/reservations/${id}`, data)
        return response.data
    },

    cancel: async (id: string, reason?: string) => {
        const response = await apiClient.post(`/reservations/${id}/cancel`, { reason })
        return response.data
    },

    checkIn: async (id: string, data: any) => {
        const response = await apiClient.post(`/reservations/${id}/check-in`, data)
        return response.data
    },

    checkOut: async (id: string) => {
        const response = await apiClient.post(`/reservations/${id}/check-out`)
        return response.data
    },
}
