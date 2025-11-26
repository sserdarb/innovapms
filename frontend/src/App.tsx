import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LoginPage } from './features/auth/LoginPage'
import { DashboardPage } from './features/dashboard/DashboardPage'
import { RoomrackPage } from './features/roomrack/RoomrackPage'
import { ReservationsPage } from './features/reservations/ReservationsPage'
import { FoliosPage } from './features/folios/FoliosPage'
import { POSManagementPage } from './features/pos-management/POSManagementPage'
import { AppLayout } from './components/layout/AppLayout'
import { ProtectedRoute } from './features/auth/ProtectedRoute'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <AppLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<Navigate to="/dashboard" replace />} />
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="roomrack" element={<RoomrackPage />} />
                    <Route path="reservations" element={<ReservationsPage />} />
                    <Route path="folios" element={<FoliosPage />} />
                    <Route path="pos-management" element={<POSManagementPage />} />
                </Route>

                <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
