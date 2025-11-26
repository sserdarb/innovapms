import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '@/store/auth'
import { reservationsApi } from '@/api/reservations'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { formatDate, formatCurrency } from '@/lib/utils'
import { Calendar, User, Plus } from 'lucide-react'

const statusColors = {
    confirmed: 'default',
    cancelled: 'destructive',
    checked_in: 'success',
    checked_out: 'secondary',
    no_show: 'warning',
} as const

const statusLabels = {
    confirmed: 'Onaylandı',
    cancelled: 'İptal',
    checked_in: 'Check-in',
    checked_out: 'Check-out',
    no_show: 'Gelmedi',
}

export function ReservationsPage() {
    const user = useAuthStore((state) => state.user)
    const [selectedStatus, setSelectedStatus] = useState<string>('all')

    const { data: reservationsData, isLoading } = useQuery({
        queryKey: ['reservations', user?.hotelId, selectedStatus === 'all' ? undefined : selectedStatus],
        queryFn: () => reservationsApi.getAll(user!.hotelId, selectedStatus === 'all' ? undefined : selectedStatus),
        enabled: !!user?.hotelId,
    })

    const reservations = reservationsData?.data || []

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Rezervasyonlar</h1>
                    <p className="mt-2 text-sm text-gray-700">Rezervasyon yönetimi ve takibi</p>
                </div>
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Yeni Rezervasyon
                </Button>
            </div>

            {/* Status Filter */}
            <div className="flex gap-2 flex-wrap">
                <button
                    onClick={() => setSelectedStatus('all')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedStatus === 'all'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-white text-gray-700 hover:bg-gray-50 border'
                        }`}
                >
                    Tümü
                </button>
                {Object.entries(statusLabels).map(([status, label]) => (
                    <button
                        key={status}
                        onClick={() => setSelectedStatus(status)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedStatus === status
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-white text-gray-700 hover:bg-gray-50 border'
                            }`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* Reservations List */}
            {isLoading ? (
                <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <p className="mt-2 text-sm text-gray-500">Rezervasyonlar yükleniyor...</p>
                </div>
            ) : reservations.length === 0 ? (
                <Card className="p-12 text-center">
                    <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-semibold text-gray-900">Rezervasyon bulunamadı</h3>
                    <p className="mt-1 text-sm text-gray-500">Henüz rezervasyon bulunmamaktadır.</p>
                </Card>
            ) : (
                <div className="space-y-4">
                    {reservations.map((reservation: any) => (
                        <Card key={reservation.id} className="p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {reservation.reservationNumber}
                                        </h3>
                                        <Badge variant={statusColors[reservation.status as keyof typeof statusColors]}>
                                            {statusLabels[reservation.status as keyof typeof statusLabels]}
                                        </Badge>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4" />
                                            <span>
                                                {formatDate(reservation.checkInDate)} - {formatDate(reservation.checkOutDate)}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <User className="h-4 w-4" />
                                            <span>
                                                {reservation.adults} Yetişkin
                                                {reservation.children > 0 && `, ${reservation.children} Çocuk`}
                                            </span>
                                        </div>
                                        <div className="font-semibold text-gray-900">
                                            {formatCurrency(reservation.totalAmount, reservation.currencyCode)}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm">Detay</Button>
                                    {reservation.status === 'confirmed' && (
                                        <Button size="sm">Check-in</Button>
                                    )}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
