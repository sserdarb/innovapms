import apiClient from './client'

export const foliosApi = {
    getAll: async (hotelId: string, status?: string) => {
        const params = new URLSearchParams({ hotelId })
        if (status) params.append('status', status)
        const response = await apiClient.get(`/folios?${params}`)
        return response.data
    },

    getById: async (id: string) => {
        const response = await apiClient.get(`/folios/${id}`)
        return response.data
    },

    getTransactions: async (id: string) => {
        const response = await apiClient.get(`/folios/${id}/transactions`)
        return response.data
    },

    addCharge: async (id: string, data: any) => {
        const response = await apiClient.post(`/folios/${id}/charges`, data)
        return response.data
    },

    addPayment: async (id: string, data: any) => {
        const response = await apiClient.post(`/folios/${id}/payments`, data)
        return response.data
    },

    close: async (id: string) => {
        const response = await apiClient.post(`/folios/${id}/close`)
        return response.data
    },
}
