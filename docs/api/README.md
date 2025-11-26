# ElektraWEB PMS - API Dokümantasyonu

Bu döküman, ElektraWEB PMS sisteminin tüm API endpoint'lerini açıklar.

## 🔐 Kimlik Doğrulama

Tüm API istekleri (login hariç) aşağıdaki header'ları içermelidir:

```
Authorization: Bearer {access_token}
X-Hotel-ID: {hotel_id}
Content-Type: application/json
```

---

## 📍 Base URL

- **Development**: `http://localhost:3000`
- **Production**: `https://yourdomain.com/api`

---

## 🔑 Auth Service (Port: 3001)

### POST /auth/login
Kullanıcı girişi yapar ve JWT token döner.

**Request:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "uuid",
      "hotelId": "uuid",
      "username": "admin",
      "email": "admin@hotel.com",
      "firstName": "Admin",
      "lastName": "User"
    },
    "expiresIn": 86400
  }
}
```

### POST /auth/refresh
Refresh token ile yeni access token alır.

**Request:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### POST /auth/logout
Kullanıcı çıkışı yapar.

### GET /auth/me
Mevcut kullanıcı bilgilerini döner.

---

## 🏨 Hotel Service (Port: 3002)

### GET /hotels
Tüm otelleri listeler (sadece system_admin).

### GET /hotels/:id
Belirli bir otelin detaylarını getirir.

### POST /hotels
Yeni otel oluşturur.

**Request:**
```json
{
  "code": "HOTEL001",
  "name": "Grand Hotel",
  "legalName": "Grand Hotel Turizm A.Ş.",
  "city": "Istanbul",
  "country": "Turkey",
  "currencyCode": "TRY",
  "timezone": "Europe/Istanbul"
}
```

### PUT /hotels/:id
Otel bilgilerini günceller.

### DELETE /hotels/:id
Oteli siler.

---

### Room Types

#### GET /hotels/:hotelId/room-types
Otel oda tiplerini listeler.

#### POST /hotels/:hotelId/room-types
Yeni oda tipi oluşturur.

**Request:**
```json
{
  "code": "STD",
  "name": "Standard Room",
  "description": "Standart oda",
  "maxAdults": 2,
  "maxChildren": 1,
  "maxOccupancy": 3,
  "basePrice": 1000,
  "amenities": ["wifi", "tv", "minibar"]
}
```

#### GET /hotels/:hotelId/room-types/:id
Oda tipi detaylarını getirir.

#### PUT /hotels/:hotelId/room-types/:id
Oda tipini günceller.

#### DELETE /hotels/:hotelId/room-types/:id
Oda tipini siler.

---

### Rooms

#### GET /hotels/:hotelId/rooms
Otel odalarını listeler.

**Query Parameters:**
- `status`: clean, dirty, maintenance, out_of_order
- `roomTypeId`: Oda tipi filtresi
- `floor`: Kat filtresi

#### POST /hotels/:hotelId/rooms
Yeni oda oluşturur.

**Request:**
```json
{
  "roomTypeId": "uuid",
  "roomNumber": "101",
  "floor": 1,
  "status": "clean"
}
```

#### GET /hotels/:hotelId/rooms/:id
Oda detaylarını getirir.

#### PUT /hotels/:hotelId/rooms/:id
Oda bilgilerini günceller.

#### PATCH /hotels/:hotelId/rooms/:id/status
Oda durumunu günceller.

**Request:**
```json
{
  "status": "dirty",
  "notes": "Temizlik gerekli"
}
```

---

### Rate Codes

#### GET /hotels/:hotelId/rate-codes
Fiyat kodlarını listeler.

#### POST /hotels/:hotelId/rate-codes
Yeni fiyat kodu oluşturur.

**Request:**
```json
{
  "code": "RACK",
  "name": "Rack Rate",
  "description": "Standart fiyat"
}
```

---

### Rate Plans

#### GET /hotels/:hotelId/rate-plans
Fiyat planlarını listeler.

**Query Parameters:**
- `roomTypeId`: Oda tipi filtresi
- `rateCodeId`: Fiyat kodu filtresi
- `startDate`: Başlangıç tarihi (YYYY-MM-DD)
- `endDate`: Bitiş tarihi (YYYY-MM-DD)

#### POST /hotels/:hotelId/rate-plans
Yeni fiyat planı oluşturur.

**Request:**
```json
{
  "roomTypeId": "uuid",
  "rateCodeId": "uuid",
  "startDate": "2024-01-01",
  "endDate": "2024-12-31",
  "price": 1500,
  "minStay": 1
}
```

---

## 📅 Reservation Service (Port: 3003)

### GET /reservations
Rezervasyonları listeler.

**Query Parameters:**
- `status`: confirmed, cancelled, checked_in, checked_out, no_show
- `arrivalDate`: Giriş tarihi (YYYY-MM-DD)
- `departureDate`: Çıkış tarihi (YYYY-MM-DD)
- `guestName`: Misafir adı (arama)
- `page`: Sayfa numarası (default: 1)
- `limit`: Sayfa başına kayıt (default: 20)

**Response:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

### POST /reservations
Yeni rezervasyon oluşturur.

**Request:**
```json
{
  "arrivalDate": "2024-02-01",
  "departureDate": "2024-02-05",
  "adults": 2,
  "children": 0,
  "source": "direct",
  "rateCodeId": "uuid",
  "rooms": [
    {
      "roomTypeId": "uuid",
      "adults": 2,
      "children": 0
    }
  ],
  "guests": [
    {
      "firstName": "Ahmet",
      "lastName": "Yılmaz",
      "email": "ahmet@example.com",
      "phone": "+905551234567",
      "isPrimary": true
    }
  ],
  "specialRequests": "Geç check-in"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "reservationNumber": "RES-2024-00001",
    "status": "confirmed",
    "arrivalDate": "2024-02-01",
    "departureDate": "2024-02-05",
    "totalAmount": 6000,
    "balance": 6000
  }
}
```

### GET /reservations/:id
Rezervasyon detaylarını getirir.

### PUT /reservations/:id
Rezervasyon bilgilerini günceller.

### PATCH /reservations/:id/cancel
Rezervasyonu iptal eder.

**Request:**
```json
{
  "reason": "Misafir isteği",
  "refundAmount": 0
}
```

### POST /reservations/:id/check-in
Check-in işlemi yapar.

**Request:**
```json
{
  "roomAssignments": [
    {
      "reservationRoomId": "uuid",
      "roomId": "uuid"
    }
  ]
}
```

### POST /reservations/:id/check-out
Check-out işlemi yapar.

---

### Roomrack (Oda Durumu)

#### GET /reservations/roomrack
Gerçek zamanlı oda durumunu getirir.

**Query Parameters:**
- `startDate`: Başlangıç tarihi (YYYY-MM-DD)
- `endDate`: Bitiş tarihi (YYYY-MM-DD)
- `roomTypeId`: Oda tipi filtresi (optional)

**Response:**
```json
{
  "success": true,
  "data": {
    "dates": ["2024-02-01", "2024-02-02", "2024-02-03"],
    "rooms": [
      {
        "roomId": "uuid",
        "roomNumber": "101",
        "roomType": "Standard",
        "status": "clean",
        "occupancy": {
          "2024-02-01": {
            "status": "occupied",
            "reservationId": "uuid",
            "guestName": "Ahmet Yılmaz"
          },
          "2024-02-02": {
            "status": "occupied",
            "reservationId": "uuid",
            "guestName": "Ahmet Yılmaz"
          },
          "2024-02-03": {
            "status": "available"
          }
        }
      }
    ]
  }
}
```

---

### Guests

#### GET /guests
Misafirleri listeler.

#### POST /guests
Yeni misafir oluşturur.

#### GET /guests/:id
Misafir detaylarını getirir.

#### PUT /guests/:id
Misafir bilgilerini günceller.

---

### Room Blocks

#### GET /room-blocks
Oda bloklajlarını listeler.

#### POST /room-blocks
Oda bloklama oluşturur.

**Request:**
```json
{
  "roomId": "uuid",
  "startDate": "2024-02-01",
  "endDate": "2024-02-05",
  "reason": "Bakım",
  "notes": "Klima arızası"
}
```

#### DELETE /room-blocks/:id
Bloklajı kaldırır.

---

## 💰 Folio Service (Port: 3004)

### GET /folios
Folyoları listeler.

**Query Parameters:**
- `status`: open, closed, transferred
- `reservationId`: Rezervasyon filtresi
- `guestId`: Misafir filtresi

### POST /folios
Yeni folyo oluşturur.

**Request:**
```json
{
  "reservationId": "uuid",
  "guestId": "uuid"
}
```

### GET /folios/:id
Folyo detaylarını getirir.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "folioNumber": "F-2024-00001",
    "status": "open",
    "totalCharges": 6500,
    "totalPayments": 2000,
    "balance": 4500,
    "transactions": [...]
  }
}
```

---

### Folio Transactions

#### POST /folios/:id/charges
Folyoya işlem ekler.

**Request:**
```json
{
  "department": "room",
  "description": "Oda ücreti - 101",
  "amount": 1500,
  "quantity": 1,
  "taxRate": 18
}
```

#### POST /folios/:id/payments
Ödeme alır.

**Request:**
```json
{
  "paymentMethodId": "uuid",
  "amount": 2000,
  "currencyCode": "TRY",
  "referenceNumber": "123456"
}
```

#### POST /folios/:id/transfer
Folyo transfer işlemi.

**Request:**
```json
{
  "targetFolioId": "uuid",
  "amount": 1000,
  "description": "Transfer"
}
```

#### POST /folios/:id/close
Folyoyu kapatır.

---

### Payment Methods

#### GET /payment-methods
Ödeme yöntemlerini listeler.

#### POST /payment-methods
Yeni ödeme yöntemi oluşturur.

---

### Currencies & Exchange Rates

#### GET /currencies
Para birimlerini listeler.

#### GET /exchange-rates
Döviz kurlarını getirir.

#### POST /exchange-rates
Döviz kuru ekler.

---

## 🔌 Integration Service (Port: 3005)

### API Keys

#### GET /api-keys
API anahtarlarını listeler.

#### POST /api-keys
Yeni API anahtarı oluşturur.

**Request:**
```json
{
  "name": "Channel Manager Integration",
  "description": "OTA entegrasyonu için",
  "permissions": ["reservation.view", "reservation.create"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Channel Manager Integration",
    "apiKey": "ek_live_1234567890abcdef",
    "permissions": ["reservation.view", "reservation.create"]
  }
}
```

#### DELETE /api-keys/:id
API anahtarını siler.

---

### Webhooks

#### GET /webhooks
Webhook'ları listeler.

#### POST /webhooks
Yeni webhook oluşturur.

**Request:**
```json
{
  "name": "Reservation Created Webhook",
  "url": "https://external-system.com/webhook",
  "events": ["reservation.created", "reservation.updated"],
  "secret": "webhook_secret_key"
}
```

#### PUT /webhooks/:id
Webhook'u günceller.

#### DELETE /webhooks/:id
Webhook'u siler.

---

### Integration Logs

#### GET /integration-logs
Entegrasyon loglarını listeler.

**Query Parameters:**
- `integrationType`: Entegrasyon tipi
- `direction`: inbound, outbound
- `startDate`: Başlangıç tarihi
- `endDate`: Bitiş tarihi

---

## 📊 Reports (Gelecek Sürümde)

### GET /reports/daily
Günlük yönetim raporu.

### GET /reports/occupancy
Doluluk raporu.

### GET /reports/revenue
Gelir raporu.

### GET /reports/folio-transactions
Folyo işlemleri raporu.

---

## ❌ Hata Kodları

| HTTP Status | Error Code | Açıklama |
|-------------|------------|----------|
| 400 | VALIDATION_ERROR | Geçersiz veri |
| 401 | UNAUTHORIZED | Kimlik doğrulama gerekli |
| 403 | FORBIDDEN | Yetkisiz erişim |
| 404 | NOT_FOUND | Kayıt bulunamadı |
| 409 | CONFLICT | Çakışma (örn: oda müsait değil) |
| 500 | INTERNAL_ERROR | Sunucu hatası |

**Hata Yanıt Formatı:**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format",
      "code": "INVALID_EMAIL"
    }
  ]
}
```

---

## 🔄 Pagination

Listeleme endpoint'leri pagination destekler:

**Query Parameters:**
- `page`: Sayfa numarası (default: 1)
- `limit`: Sayfa başına kayıt (default: 20, max: 100)
- `sortBy`: Sıralama alanı
- `sortOrder`: ASC veya DESC

**Response:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

---

## 🚀 Rate Limiting

- **Genel**: 100 istek / dakika
- **Login**: 5 istek / dakika
- **API Key**: 1000 istek / dakika

Rate limit aşıldığında:
```json
{
  "success": false,
  "message": "Too many requests",
  "retryAfter": 60
}
```

---

## 📝 Notlar

- Tüm tarihler ISO 8601 formatında (YYYY-MM-DD)
- Tüm zaman damgaları UTC
- Para birimleri decimal(10,2) formatında
- UUID'ler v4 formatında

---

## 🔗 Swagger UI

Canlı API dokümantasyonu için:
```
http://localhost:3000/api/docs
```
