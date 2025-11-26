# 🚀 InnovaPMS - Lokal Kurulum (Docker'siz)

## ⚡ Hızlı Başlangıç

### 1️⃣ Gerekli Yazılımlar

- **Node.js** (v18+) → https://nodejs.org/
- **PostgreSQL** (v15+) → https://www.postgresql.org/download/

### 2️⃣ Kurulum

```cmd
cd C:\Users\Serdar Bayraktaroğlu\.gemini\antigravity\scratch\elektraweb-pms
setup-local.bat
```

Bu script:
- ✅ Tüm servisleri kurar (`npm install`)
- ✅ `.env` dosyası oluşturur
- ✅ Frontend'i kurar

### 3️⃣ PostgreSQL Veritabanı

PostgreSQL'de veritabanı oluşturun:

```sql
CREATE DATABASE innovapms_db;
```

### 4️⃣ .env Dosyasını Düzenleyin

`.env` dosyasını açın ve PostgreSQL şifrenizi girin:

```env
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=sizin_sifreniz
POSTGRES_DB=innovapms_db
```

### 5️⃣ Backend Servisleri Başlatın

**Her servis için ayrı terminal açın:**

```cmd
# Terminal 1 - Auth Service
cd services\auth-service
npm run start:dev

# Terminal 2 - Hotel Service  
cd services\hotel-service
npm run start:dev

# Terminal 3 - Reservation Service
cd services\reservation-service
npm run start:dev

# Terminal 4 - Folio Service
cd services\folio-service
npm run start:dev

# Terminal 5 - Payment Service
cd services\payment-service
npm run start:dev
```

**Diğer servisler (opsiyonel):**
- Integration Service (Port 3005)
- Notification Service (Port 3006)
- Reports Service (Port 3007)
- WebSocket Gateway (Port 3008)
- API Gateway (Port 3000)

### 6️⃣ Frontend Başlatın

**Yeni terminal:**

```cmd
cd frontend
npm run dev
```

---

## 🌐 Sisteme Giriş

```
http://localhost:5173
```

**Giriş:**
- Kullanıcı: `admin`
- Şifre: `admin123`

---

## ✅ Kontrol

Şu URL'ler açılmalı:

- ✅ Frontend: http://localhost:5173
- ✅ Auth: http://localhost:3001/api/docs
- ✅ Hotel: http://localhost:3002/api/docs
- ✅ Reservation: http://localhost:3003/api/docs

---

## 🔧 Sorun Giderme

### Port Çakışması

```cmd
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

### PostgreSQL Bağlantı Hatası

1. PostgreSQL servisinin çalıştığını kontrol edin
2. `.env` dosyasındaki bilgileri kontrol edin
3. Veritabanının oluşturulduğunu kontrol edin

---

**InnovaPMS - Lokal Kurulum Tamamlandı! 🎉**
