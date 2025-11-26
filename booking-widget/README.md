# ElektraWEB Booking Widget

## 🎯 Özellikler

- ✅ Website'e kolay entegrasyon
- ✅ Responsive tasarım
- ✅ Tarih seçimi (check-in/check-out)
- ✅ Misafir sayısı seçimi
- ✅ Oda tipi seçimi
- ✅ Fiyat hesaplama
- ✅ Özelleştirilebilir renkler
- ✅ Çoklu dil desteği (TR/EN)

---

## 🚀 Kurulum

### 1. Build

```bash
cd booking-widget
npm install
npm run build:widget
```

Build edilen dosyalar `dist/` klasöründe olacak.

### 2. Website'e Ekleme

**HTML'e ekleyin:**

```html
<!-- Widget Script -->
<script src="https://yourdomain.com/booking-widget.js"></script>

<!-- Widget Container -->
<div 
  id="elektra-booking-widget" 
  data-elektra-booking
  data-hotel-id="YOUR_HOTEL_ID"
  data-api-url="https://api.yourdomain.com/api"
  data-primary-color="#3B82F6"
  data-language="tr"
></div>
```

### 3. Manuel Başlatma (Opsiyonel)

```html
<div id="my-booking-widget"></div>

<script>
  ElektraBooking.init({
    elementId: 'my-booking-widget',
    hotelId: 'hotel-123',
    apiUrl: 'https://api.yourdomain.com/api',
    primaryColor: '#FF6B6B',
    language: 'en'
  });
</script>
```

---

## ⚙️ Konfigürasyon

| Parametre | Tip | Varsayılan | Açıklama |
|-----------|-----|------------|----------|
| `hotelId` | string | - | Otel ID (zorunlu) |
| `apiUrl` | string | `http://localhost:3000/api` | API URL |
| `primaryColor` | string | `#3B82F6` | Ana renk |
| `language` | `'tr' \| 'en'` | `'tr'` | Dil |

---

## 🎨 Özelleştirme

### Renk Değiştirme

```html
<div 
  data-elektra-booking
  data-primary-color="#FF6B6B"
></div>
```

### Dil Değiştirme

```html
<div 
  data-elektra-booking
  data-language="en"
></div>
```

---

## 📱 Responsive

Widget otomatik olarak responsive'dir:
- Desktop: Tam genişlik
- Tablet: Optimize edilmiş layout
- Mobile: Tek sütun görünüm

---

## 🔗 API Gereksinimleri

Widget şu endpoint'leri kullanır:

### 1. Oda Tipleri
```
GET /room-types?hotelId={id}&checkIn={date}&checkOut={date}&adults={n}&children={n}
```

### 2. Rezervasyon Oluşturma
```
POST /reservations
{
  "hotelId": "...",
  "roomTypeId": "...",
  "checkInDate": "...",
  "checkOutDate": "...",
  "adults": 2,
  "children": 0,
  "guestInfo": {...}
}
```

---

## 🧪 Test

```bash
npm run dev
```

http://localhost:5173 adresinde demo sayfasını görüntüleyin.

---

## 📦 Production Build

```bash
npm run build:widget
```

Çıktı dosyaları:
- `dist/booking-widget.js` - Widget script
- `dist/booking-widget.css` - Widget styles

---

## 🌐 CDN Deployment

Build edilen dosyaları CDN'e yükleyin:

```html
<script src="https://cdn.yourdomain.com/booking-widget.js"></script>
```

---

## 🔐 Güvenlik

- ✅ CORS yapılandırması gerekli
- ✅ HTTPS zorunlu (production)
- ✅ API rate limiting önerilir

---

**Widget hazır! Website'inize ekleyebilirsiniz! 🚀**
