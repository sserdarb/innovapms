import { useState, useEffect } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { format, differenceInDays } from 'date-fns'
import { tr } from 'date-fns/locale'

interface BookingWidgetProps {
    hotelId: string
    apiUrl?: string
    primaryColor?: string
    language?: 'tr' | 'en'
}

export function BookingWidget({
    hotelId,
    apiUrl = 'http://localhost:3000/api',
    primaryColor = '#3B82F6',
    language = 'tr',
}: BookingWidgetProps) {
    const [checkIn, setCheckIn] = useState<Date | null>(null)
    const [checkOut, setCheckOut] = useState<Date | null>(null)
    const [adults, setAdults] = useState(2)
    const [children, setChildren] = useState(0)
    const [roomTypes, setRoomTypes] = useState<any[]>([])
    const [selectedRoom, setSelectedRoom] = useState<string>('')
    const [loading, setLoading] = useState(false)
    const [step, setStep] = useState<'search' | 'rooms' | 'guest' | 'payment'>('search')

    useEffect(() => {
        if (checkIn && checkOut) {
            fetchAvailableRooms()
        }
    }, [checkIn, checkOut, adults, children])

    const fetchAvailableRooms = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${apiUrl}/room-types`, {
                params: {
                    hotelId,
                    checkIn: format(checkIn!, 'yyyy-MM-dd'),
                    checkOut: format(checkOut!, 'yyyy-MM-dd'),
                    adults,
                    children,
                },
            })
            setRoomTypes(response.data.data || [])
            setStep('rooms')
        } catch (error) {
            console.error('Error fetching rooms:', error)
        } finally {
            setLoading(false)
        }
    }

    const calculateNights = () => {
        if (!checkIn || !checkOut) return 0
        return differenceInDays(checkOut, checkIn)
    }

    const calculateTotal = (basePrice: number) => {
        return basePrice * calculateNights()
    }

    const handleBooking = async () => {
        if (!selectedRoom) return

        setStep('guest')
    }

    const texts = {
        tr: {
            checkIn: 'Giriş',
            checkOut: 'Çıkış',
            adults: 'Yetişkin',
            children: 'Çocuk',
            search: 'Müsaitlik Sorgula',
            selectRoom: 'Oda Seç',
            night: 'Gece',
            total: 'Toplam',
            book: 'Rezervasyon Yap',
            noRooms: 'Uygun oda bulunamadı',
        },
        en: {
            checkIn: 'Check-in',
            checkOut: 'Check-out',
            adults: 'Adults',
            children: 'Children',
            search: 'Check Availability',
            selectRoom: 'Select Room',
            night: 'Night',
            total: 'Total',
            book: 'Book Now',
            noRooms: 'No rooms available',
        },
    }

    const t = texts[language]

    return (
        <div className="elektra-booking-widget" style={{ fontFamily: 'system-ui, sans-serif' }}>
            <style>{`
        .elektra-booking-widget {
          max-width: 100%;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          padding: 24px;
        }
        .elektra-btn-primary {
          background: ${primaryColor};
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          font-weight: 600;
          width: 100%;
          transition: opacity 0.2s;
        }
        .elektra-btn-primary:hover {
          opacity: 0.9;
        }
        .elektra-input {
          width: 100%;
          padding: 12px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 14px;
        }
        .elektra-room-card {
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 16px;
          cursor: pointer;
          transition: border-color 0.2s;
        }
        .elektra-room-card:hover {
          border-color: ${primaryColor};
        }
        .elektra-room-card.selected {
          border-color: ${primaryColor};
          background: ${primaryColor}10;
        }
      `}</style>

            {step === 'search' && (
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold mb-4">Online Rezervasyon</h2>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">{t.checkIn}</label>
                            <DatePicker
                                selected={checkIn}
                                onChange={(date) => setCheckIn(date)}
                                selectsStart
                                startDate={checkIn}
                                endDate={checkOut}
                                minDate={new Date()}
                                dateFormat="dd/MM/yyyy"
                                locale={tr}
                                className="elektra-input"
                                placeholderText="Tarih seçin"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">{t.checkOut}</label>
                            <DatePicker
                                selected={checkOut}
                                onChange={(date) => setCheckOut(date)}
                                selectsEnd
                                startDate={checkIn}
                                endDate={checkOut}
                                minDate={checkIn || new Date()}
                                dateFormat="dd/MM/yyyy"
                                locale={tr}
                                className="elektra-input"
                                placeholderText="Tarih seçin"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">{t.adults}</label>
                            <select
                                value={adults}
                                onChange={(e) => setAdults(Number(e.target.value))}
                                className="elektra-input"
                            >
                                {[1, 2, 3, 4, 5, 6].map((n) => (
                                    <option key={n} value={n}>{n}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">{t.children}</label>
                            <select
                                value={children}
                                onChange={(e) => setChildren(Number(e.target.value))}
                                className="elektra-input"
                            >
                                {[0, 1, 2, 3, 4].map((n) => (
                                    <option key={n} value={n}>{n}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button
                        onClick={fetchAvailableRooms}
                        disabled={!checkIn || !checkOut || loading}
                        className="elektra-btn-primary"
                    >
                        {loading ? 'Yükleniyor...' : t.search}
                    </button>
                </div>
            )}

            {step === 'rooms' && (
                <div>
                    <button
                        onClick={() => setStep('search')}
                        className="mb-4 text-sm text-gray-600"
                    >
                        ← Aramaya Dön
                    </button>

                    <h3 className="text-xl font-bold mb-4">
                        {calculateNights()} {t.night} - Uygun Odalar
                    </h3>

                    {roomTypes.length === 0 ? (
                        <p className="text-center text-gray-500 py-8">{t.noRooms}</p>
                    ) : (
                        <>
                            {roomTypes.map((room) => (
                                <div
                                    key={room.id}
                                    className={`elektra-room-card ${selectedRoom === room.id ? 'selected' : ''}`}
                                    onClick={() => setSelectedRoom(room.id)}
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-bold text-lg">{room.name}</h4>
                                            <p className="text-sm text-gray-600 mt-1">{room.description}</p>
                                            <p className="text-sm text-gray-500 mt-2">
                                                Maksimum {room.maxOccupancy} kişi
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold" style={{ color: primaryColor }}>
                                                ₺{calculateTotal(room.basePrice).toLocaleString('tr-TR')}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                ₺{room.basePrice.toLocaleString('tr-TR')} / {t.night}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <button
                                onClick={handleBooking}
                                disabled={!selectedRoom}
                                className="elektra-btn-primary mt-4"
                            >
                                {t.book}
                            </button>
                        </>
                    )}
                </div>
            )}

            {step === 'guest' && (
                <div>
                    <h3 className="text-xl font-bold mb-4">Misafir Bilgileri</h3>
                    <p className="text-gray-600">Misafir formu geliştirilecek...</p>
                </div>
            )}
        </div>
    )
}
