import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const occupancyData = [
    { date: '01', occupancy: 65 },
    { date: '02', occupancy: 72 },
    { date: '03', occupancy: 68 },
    { date: '04', occupancy: 75 },
    { date: '05', occupancy: 82 },
    { date: '06', occupancy: 88 },
    { date: '07', occupancy: 92 },
]

const revenueData = [
    { month: 'Oca', revenue: 45000 },
    { month: 'Şub', revenue: 52000 },
    { month: 'Mar', revenue: 48000 },
    { month: 'Nis', revenue: 61000 },
    { month: 'May', revenue: 55000 },
    { month: 'Haz', revenue: 67000 },
]

export function OccupancyChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Doluluk Oranı (Son 7 Gün)</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={occupancyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="occupancy" stroke="#3b82f6" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}

export function RevenueChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Aylık Gelir Trendi</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="revenue" fill="#10b981" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
