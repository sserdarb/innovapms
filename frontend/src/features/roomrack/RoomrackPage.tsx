import { useState, useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '@/store/auth'
import { roomsApi, roomTypesApi } from '@/api/rooms'
import { useWebSocket, WS_EVENTS } from '@/hooks/useWebSocket'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Bed, Users, Sparkles, Wifi } from 'lucide-react'

const statusColors = {
    clean: 'success',
    dirty: 'destructive',
    inspected: 'default',
    out_of_service: 'warning',
    out_of_order: 'destructive',
} as const

const statusLabels = {
    clean: 'Temiz',
    dirty: 'Kirli',
    inspected: 'Kontrol Edildi',
    out_of_service: 'Hizmet Dışı',
    out_of_order: 'Arızalı',
}

export function RoomrackPage() {
    const user = useAuthStore((state) => state.user)
    const [selectedStatus, setSelectedStatus] = useState<string>('all')
    const queryClient = useQueryClient()
    const { isConnected, subscribe } = useWebSocket()

    const { data: roomsData, isLoading: roomsLoading } = useQuery({
        queryKey: ['rooms', user?.hotelId, selectedStatus === 'all' ? undefined : selectedStatus],
        queryFn: () => roomsApi.getAll(user!.hotelId, selectedStatus === 'all' ? undefined : selectedStatus),
        enabled: !!user?.hotelId,
    })

    const { data: roomTypesData } = useQuery({
        queryKey: ['roomTypes', user?.hotelId],
        queryFn: () => roomTypesApi.getAll(user!.hotelId),
        enabled: !!user?.hotelId,
    })

    // WebSocket real-time updates
    useEffect(() => {
        if (!isConnected) return

        const unsubscribe = subscribe(WS_EVENTS.ROOM_STATUS_CHANGED, (data: any) => {
            console.log('Room status changed:', data)
            // Invalidate and refetch rooms
            queryClient.invalidateQueries({ queryKey: ['rooms'] })
        })

        return unsubscribe
    }, [isConnected, subscribe, queryClient])

    const rooms = roomsData?.data || []
    const roomTypes = roomTypesData?.data || []

    const getRoomType = (roomTypeId: string) => {
        return roomTypes.find((rt: any) => rt.id === roomTypeId)
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Roomrack</h1>
                    <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        Oda durumu ve müsaitlik takibi
                        {isConnected && (
                            <span className="flex items-center gap-1 text-green-600">
                                <Wifi className="h-3 w-3" />
                                <span className="text-xs">Canlı</span>
                            </span>
                        )}
                    </p>
                </div>
            </div>

            {/* Status Filter */}
            <div className="flex gap-2 flex-wrap">
                <button
                    onClick={() => setSelectedStatus('all')}
                    className={cn(
                        'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                        selectedStatus === 'all'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border dark:border-gray-700'
                    )}
                >
                    Tümü ({rooms.length})
                </button>
                {Object.entries(statusLabels).map(([status, label]) => (
                    <button
                        key={status}
                        onClick={() => setSelectedStatus(status)}
                        className={cn(
                            'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                            selectedStatus === status
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border dark:border-gray-700'
                        )}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* Room Grid */}
            {roomsLoading ? (
                <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Odalar yükleniyor...</p>
                </div>
            ) : rooms.length === 0 ? (
                <Card className="p-12 text-center">
                    <Bed className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-100">Oda bulunamadı</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Bu filtreye uygun oda bulunmamaktadır.</p>
                </Card>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {rooms.map((room: any) => {
                        const roomType = getRoomType(room.roomTypeId)
                        return (
                            <Card
                                key={room.id}
                                className="p-4 hover:shadow-lg transition-shadow cursor-pointer"
                            >
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-bold text-gray-900 dark:text-gray-100">{room.roomNumber}</span>
                                        <Badge variant={statusColors[room.status as keyof typeof statusColors]}>
                                            {statusLabels[room.status as keyof typeof statusLabels]}
                                        </Badge>
                                    </div>

                                    {roomType && (
                                        <>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">{roomType.name}</div>

                                            <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                                                <div className="flex items-center gap-1">
                                                    <Users className="h-3 w-3" />
                                                    <span>{roomType.maxOccupancy}</span>
                                                </div>
                                                {room.status === 'clean' && (
                                                    <div className="flex items-center gap-1 text-green-600">
                                                        <Sparkles className="h-3 w-3" />
                                                        <span>Hazır</span>
                                                    </div>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </Card>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
