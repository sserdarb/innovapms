import apiClient from './client'

export const roomsApi = {
    getAll: async (hotelId: string, status?: string) => {
        const params = new URLSearchParams({ hotelId })
        if (status) params.append('status', status)
        const response = await apiClient.get(`/rooms?${params}`)
        return response.data
    },

    getById: async (id: string) => {
        const response = await apiClient.get(`/rooms/${id}`)
        return response.data
    },

    updateStatus: async (id: string, status: string) => {
        const response = await apiClient.patch(`/rooms/${id}/status`, { status })
        return response.data
    },
}

export const roomTypesApi = {
    getAll: async (hotelId: string) => {
        const response = await apiClient.get(`/room-types?hotelId=${hotelId}`)
        return response.data
    },
}
