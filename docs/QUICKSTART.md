# ElektraWEB PMS - Hızlı Başlangıç Kılavuzu

## 🚀 Hızlı Kurulum

### Otomatik Kurulum (Önerilir)

**Windows:**
```cmd
cd elektraweb-pms
setup.bat
```

**Linux/Mac:**
```bash
cd elektraweb-pms
chmod +x setup.sh
./setup.sh
```

Bu script otomatik olarak:
- ✅ Docker konteynerlerini başlatır
- ✅ Veritabanını oluşturur
- ✅ Seed verilerini yükler
- ✅ Demo otel ve admin kullanıcısı oluşturur
- ✅ Tüm servisleri başlatır

---

## 📋 Varsayılan Giriş Bilgileri

```
Kullanıcı Adı: admin
Şifre: admin123
```

---

## 🌐 Servis URL'leri

| Servis | URL | Swagger Docs |
|--------|-----|--------------|
| **Auth Service** | http://localhost:3001 | http://localhost:3001/api/docs |
| **Hotel Service** | http://localhost:3002 | http://localhost:3002/api/docs |
| **Reservation Service** | http://localhost:3003 | http://localhost:3003/api/docs |
| **Folio Service** | http://localhost:3004 | http://localhost:3004/api/docs |

---

## 🧪 Hızlı Test

### 1. Login
```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"username\": \"admin\", \"password\": \"admin123\"}"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc...",
    "user": {...}
  }
}
```

### 2. Otel Listesi
```bash
curl -X GET http://localhost:3002/hotels \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### 3. Rezervasyon Oluştur
```bash
curl -X POST http://localhost:3003/reservations \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d @reservation.json
```

---

## 🛠️ Faydalı Komutlar

### Docker Yönetimi
```bash
# Tüm servisleri başlat
docker-compose up -d

# Logları görüntüle
docker-compose logs -f

# Belirli bir servisin logları
docker-compose logs -f auth-service

# Servisleri durdur
docker-compose down

# Servisleri yeniden başlat
docker-compose restart

# Veritabanını sıfırla
docker-compose down -v
docker-compose up -d postgres redis
```

### Geliştirme Modu
```bash
# Bir servisi development modunda çalıştır
cd services/auth-service
npm install
npm run start:dev
```

---

## 📚 Dokümantasyon

- **Plesk Kurulum:** [docs/deployment/INSTALLATION.md](file:///C:/Users/Serdar%20Bayraktaroğlu/.gemini/antigravity/scratch/elektraweb-pms/docs/deployment/INSTALLATION.md)
- **Geliştirici Kılavuzu:** [docs/DEVELOPMENT.md](file:///C:/Users/Serdar%20Bayraktaroğlu/.gemini/antigravity/scratch/elektraweb-pms/docs/DEVELOPMENT.md)
- **API Dokümantasyonu:** [docs/api/README.md](file:///C:/Users/Serdar%20Bayraktaroğlu/.gemini/antigravity/scratch/elektraweb-pms/docs/api/README.md)
- **Proje Yapısı:** [docs/PROJECT_STRUCTURE.md](file:///C:/Users/Serdar%20Bayraktaroğlu/.gemini/antigravity/scratch/elektraweb-pms/docs/PROJECT_STRUCTURE.md)

---

## ⚠️ Sorun Giderme

### Port Çakışması
```bash
# .env dosyasında portları değiştir
POSTGRES_PORT=5433
REDIS_PORT=6380
```

### Veritabanı Bağlantı Hatası
```bash
# PostgreSQL'in çalıştığını kontrol et
docker-compose ps postgres

# Logları kontrol et
docker-compose logs postgres
```

### Servis Başlamıyor
```bash
# Container'ı yeniden oluştur
docker-compose up -d --build auth-service
```

---

## 🎯 Sonraki Adımlar

1. ✅ Sistemi başlat
2. ✅ Login yap
3. ✅ Swagger UI'dan API'leri keşfet
4. ⏳ Otel, oda tipi ve oda oluştur
5. ⏳ Rezervasyon yap
6. ⏳ Folyo işlemleri test et

---

**Başarılar! 🚀**
