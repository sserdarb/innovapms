import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit, Trash2, Power, PowerOff, Star } from 'lucide-react'

const API_URL = 'http://localhost:3009/api'

export function POSManagementPage() {
    const queryClient = useQueryClient()
    const [showAddDialog, setShowAddDialog] = useState(false)
    const [selectedProvider, setSelectedProvider] = useState<any>(null)

    const { data: providers } = useQuery({
        queryKey: ['pos-providers'],
        queryFn: async () => {
            const response = await axios.get(`${API_URL}/pos-config/providers`)
            return response.data
        },
    })

    const { data: configs } = useQuery({
        queryKey: ['pos-configs'],
        queryFn: async () => {
            const response = await axios.get(`${API_URL}/pos-config?hotelId=hotel-123`)
            return response.data
        },
    })

    const activateMutation = useMutation({
        mutationFn: (id: string) => axios.post(`${API_URL}/pos-config/${id}/activate`),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['pos-configs'] }),
    })

    const deactivateMutation = useMutation({
        mutationFn: (id: string) => axios.post(`${API_URL}/pos-config/${id}/deactivate`),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['pos-configs'] }),
    })

    const setDefaultMutation = useMutation({
        mutationFn: (id: string) =>
            axios.post(`${API_URL}/pos-config/${id}/set-default?hotelId=hotel-123`),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['pos-configs'] }),
    })

    const deleteMutation = useMutation({
        mutationFn: (id: string) => axios.delete(`${API_URL}/pos-config/${id}`),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['pos-configs'] }),
    })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">POS Yönetimi</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        Ödeme sistemlerinizi yönetin
                    </p>
                </div>
                <Button onClick={() => setShowAddDialog(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Yeni POS Ekle
                </Button>
            </div>

            {/* Active POS Configurations */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Aktif POS Sistemleri</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {configs?.filter((c: any) => c.isActive).map((config: any) => (
                        <Card key={config.id}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg">{config.name}</CardTitle>
                                    {config.isDefault && (
                                        <Badge variant="default">
                                            <Star className="h-3 w-3 mr-1" />
                                            Varsayılan
                                        </Badge>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div>
                                        <span className="text-sm text-gray-500">Sağlayıcı:</span>
                                        <p className="font-medium">{config.provider}</p>
                                    </div>

                                    <div className="flex gap-2">
                                        {!config.isDefault && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setDefaultMutation.mutate(config.id)}
                                            >
                                                <Star className="h-3 w-3 mr-1" />
                                                Varsayılan Yap
                                            </Button>
                                        )}

                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => deactivateMutation.mutate(config.id)}
                                        >
                                            <PowerOff className="h-3 w-3 mr-1" />
                                            Pasif Et
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Available Providers */}
            {showAddDialog && (
                <div>
                    <h2 className="text-xl font-semibold mb-4">Yeni POS Ekle</h2>

                    <div className="space-y-6">
                        <div>
                            <h3 className="font-medium mb-3">Ödeme Gateway'leri</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {providers?.paymentGateways.map((provider: any) => (
                                    <Card
                                        key={provider.value}
                                        className="cursor-pointer hover:border-primary"
                                        onClick={() => setSelectedProvider(provider)}
                                    >
                                        <CardContent className="p-4 text-center">
                                            <p className="font-medium">{provider.label}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="font-medium mb-3">Türk Bankaları</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {providers?.turkishBanks.map((provider: any) => (
                                    <Card
                                        key={provider.value}
                                        className="cursor-pointer hover:border-primary"
                                        onClick={() => setSelectedProvider(provider)}
                                    >
                                        <CardContent className="p-4 text-center">
                                            <p className="font-medium text-sm">{provider.label}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
