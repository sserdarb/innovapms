import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { useAuthStore } from '@/store/auth'

let socket: Socket | null = null

export function useWebSocket() {
    const user = useAuthStore((state) => state.user)
    const [isConnected, setIsConnected] = useState(false)

    useEffect(() => {
        if (!user?.hotelId) return

        // Connect to WebSocket
        socket = io('http://localhost:3007', {
            transports: ['websocket'],
        })

        socket.on('connect', () => {
            console.log('✅ WebSocket connected')
            setIsConnected(true)
            socket?.emit('join-hotel', user.hotelId)
        })

        socket.on('disconnect', () => {
            console.log('❌ WebSocket disconnected')
            setIsConnected(false)
        })

        return () => {
            socket?.disconnect()
            socket = null
        }
    }, [user?.hotelId])

    const subscribe = (event: string, callback: (data: any) => void) => {
        socket?.on(event, callback)
        return () => {
            socket?.off(event, callback)
        }
    }

    return { isConnected, subscribe }
}

// Event types
export const WS_EVENTS = {
    ROOM_STATUS_CHANGED: 'room-status-changed',
    NEW_RESERVATION: 'new-reservation',
    RESERVATION_UPDATED: 'reservation-updated',
    CHECK_IN: 'check-in',
    CHECK_OUT: 'check-out',
    FOLIO_UPDATED: 'folio-updated',
}
