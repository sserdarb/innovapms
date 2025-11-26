import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '@/store/auth'
import { foliosApi } from '@/api/folios'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { formatDate, formatCurrency } from '@/lib/utils'
import { Receipt, Plus, DollarSign } from 'lucide-react'

const statusColors = {
    open: 'success',
    closed: 'secondary',
    transferred: 'default',
} as const

const statusLabels = {
    open: 'Açık',
    closed: 'Kapalı',
    transferred: 'Transfer Edildi',
}

export function FoliosPage() {
    const user = useAuthStore((state) => state.user)
    const [selectedStatus, setSelectedStatus] = useState<string>('open')

    const { data: foliosData, isLoading } = useQuery({
        queryKey: ['folios', user?.hotelId, selectedStatus],
        queryFn: () => foliosApi.getAll(user!.hotelId, selectedStatus),
        enabled: !!user?.hotelId,
    })

    const folios = foliosData?.data || []

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Folyolar</h1>
                    <p className="mt-2 text-sm text-gray-700">Folyo ve tahsilat yönetimi</p>
                </div>
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Yeni Folyo
                </Button>
            </div>

            {/* Status Filter */}
            <div className="flex gap-2">
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

            {/* Folios List */}
            {isLoading ? (
                <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <p className="mt-2 text-sm text-gray-500">Folyolar yükleniyor...</p>
                </div>
            ) : folios.length === 0 ? (
                <Card className="p-12 text-center">
                    <Receipt className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-semibold text-gray-900">Folyo bulunamadı</h3>
                    <p className="mt-1 text-sm text-gray-500">Bu durumda folyo bulunmamaktadır.</p>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {folios.map((folio: any) => (
                        <Card key={folio.id} className="p-6 hover:shadow-lg transition-shadow">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-gray-900">{folio.folioNumber}</h3>
                                    <Badge variant={statusColors[folio.status as keyof typeof statusColors]}>
                                        {statusLabels[folio.status as keyof typeof statusLabels]}
                                    </Badge>
                                </div>

                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Toplam İşlem:</span>
                                        <span className="font-semibold text-gray-900">
                                            {formatCurrency(folio.totalCharges, folio.currencyCode)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Ödenen:</span>
                                        <span className="font-semibold text-green-600">
                                            {formatCurrency(folio.totalPayments, folio.currencyCode)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between pt-2 border-t">
                                        <span className="text-gray-900 font-semibold">Bakiye:</span>
                                        <span className={`font-bold ${folio.balance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                                            {formatCurrency(folio.balance, folio.currencyCode)}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex gap-2 pt-2">
                                    <Button variant="outline" size="sm" className="flex-1">
                                        Detay
                                    </Button>
                                    {folio.status === 'open' && (
                                        <Button size="sm" className="flex-1">
                                            <DollarSign className="h-4 w-4 mr-1" />
                                            Ödeme
                                        </Button>
                                    )}
                                </div>

                                <div className="text-xs text-gray-500">
                                    Oluşturulma: {formatDate(folio.createdAt)}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
