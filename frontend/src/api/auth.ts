import apiClient from './client'
import type { LoginRequest, LoginResponse } from '@/types/auth'

export const authApi = {
    login: async (credentials: LoginRequest) => {
        const response = await apiClient.post<LoginResponse>('/auth/login', credentials)
        return response.data
    },

    logout: async () => {
        await apiClient.post('/auth/logout')
    },

    getMe: async () => {
        const response = await apiClient.get('/auth/me')
        return response.data
    },

    refreshToken: async (refreshToken: string) => {
        const response = await apiClient.post('/auth/refresh', { refreshToken })
        return response.data
    },
}
