export interface User {
    id: string
    username: string
    email: string
    firstName: string
    lastName: string
    hotelId: string
    isActive: boolean
    roles: Role[]
}

export interface Role {
    id: string
    name: string
    permissions: Permission[]
}

export interface Permission {
    id: string
    name: string
    resource: string
    action: string
}

export interface LoginRequest {
    username: string
    password: string
}

export interface LoginResponse {
    success: boolean
    data: {
        accessToken: string
        refreshToken: string
        user: User
    }
}

export interface AuthState {
    user: User | null
    token: string | null
    isAuthenticated: boolean
    login: (username: string, password: string) => Promise<void>
    logout: () => void
    setUser: (user: User) => void
    setToken: (token: string) => void
}
