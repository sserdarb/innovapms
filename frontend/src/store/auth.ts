import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import apiClient from '@/api/client'
import type { AuthState, LoginResponse, User } from '@/types/auth'

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,

            login: async (username: string, password: string) => {
                try {
                    const response = await apiClient.post<LoginResponse>('/auth/login', {
                        username,
                        password,
                    })

                    const { accessToken, user } = response.data.data

                    set({
                        user,
                        token: accessToken,
                        isAuthenticated: true,
                    })
                } catch (error) {
                    throw error
                }
            },

            logout: () => {
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                })
            },

            setUser: (user: User) => set({ user }),

            setToken: (token: string) => set({ token }),
        }),
        {
            name: 'auth-storage',
        }
    )
)
