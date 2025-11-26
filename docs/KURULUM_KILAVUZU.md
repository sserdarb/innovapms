# InnovaPMS - Kurulum Kılavuzu

## 📋 Gereksinimler

Sistemi kurmadan önce aşağıdaki yazılımların bilgisayarınızda kurulu olması gerekir:

### Zorunlu
- ✅ **Node.js** (v18 veya üzeri) - [İndir](https://nodejs.org/)
- ✅ **PostgreSQL** (v15 veya üzeri) - [İndir](https://www.postgresql.org/download/)
- ✅ **Git** - [İndir](https://git-scm.com/)

### Opsiyonel (Önerilen)
- 🔧 **Docker Desktop** - [İndir](https://www.docker.com/products/docker-desktop/)
- 🔧 **Redis** - [İndir](https://redis.io/download/)

---

## 🚀 Hızlı Kurulum (Önerilen)

### Windows

1. **Projeyi İndirin**
```cmd
git clone https://github.com/yourusername/elektraweb-pms.git
cd elektraweb-pms
```

2. **Otomatik Kurulum**
```cmd
setup.bat
```

3. **Frontend Başlatma**
```cmd
cd frontend
npm install
npm run dev
```

4. **Tarayıcıda Açın**
```
http://localhost:5173
```

**Giriş Bilgileri:**
- Kullanıcı: `admin`
- Şifre: `admin123`

✅ **Kurulum Tamamlandı!**

---

## 🐧 Linux/Mac Kurulumu

### 1. Projeyi İndirin
```bash
git clone https://github.com/yourusername/elektraweb-pms.git
cd elektraweb-pms
```

### 2. Otomatik Kurulum
```bash
chmod +x setup.sh
./setup.sh
```

### 3. Frontend Başlatma
```bash
cd frontend
npm install
npm run dev
```

### 4. Tarayıcıda Açın
```
http://localhost:5173
```

---

## 🐳 Docker ile Kurulum

### 1. Docker Compose ile Başlatma

```bash
# Tüm servisleri başlat
docker-compose up -d

# Logları görüntüle
docker-compose logs -f

# Servisleri durdur
docker-compose down
```

### 2. Servis Durumunu Kontrol Etme

```bash
docker-compose ps
```

**Tüm servisler "Up" durumunda olmalı.**

---

## ⚙️ Manuel Kurulum

### 1. PostgreSQL Kurulumu

**Windows:**
1. PostgreSQL installer'ı indirin
2. Kurulumu tamamlayın
3. pgAdmin'i açın
4. Yeni veritabanı oluşturun: `elektraweb_pms`

**Linux:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo -u postgres createdb elektraweb_pms
```

### 2. Environment Variables

`.env` dosyası oluşturun:

```bash
# Kök dizinde
cp .env.example .env
```

`.env` dosyasını düzenleyin:

```env
# Database
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
POSTGRES_DB=elektraweb_pms

# JWT
JWT_SECRET=your_secret_key_change_this
JWT_EXPIRATION=24h

# Redis (opsiyonel)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password
```

### 3. Backend Servisleri Kurma

Her servis için ayrı ayrı:

```bash
# Auth Service
cd services/auth-service
npm install
npm run start:dev

# Hotel Service
cd services/hotel-service
npm install
npm run start:dev

# Diğer servisler için tekrarlayın...
```

### 4. Frontend Kurma

```bash
cd frontend
npm install
npm run dev
```

---

## 🔧 Servis Portları

Tüm servisler başarıyla başladığında şu portlarda çalışacaktır:

| Servis | Port | URL |
|--------|------|-----|
| Frontend | 5173 | http://localhost:5173 |
| API Gateway | 3000 | http://localhost:3000 |
| Auth Service | 3001 | http://localhost:3001/api/docs |
| Hotel Service | 3002 | http://localhost:3002/api/docs |
| Reservation Service | 3003 | http://localhost:3003/api/docs |
| Folio Service | 3004 | http://localhost:3004/api/docs |
| Integration Service | 3005 | http://localhost:3005/api/docs |
| Notification Service | 3006 | http://localhost:3006/api/docs |
| Reports Service | 3007 | http://localhost:3007/api/docs |
| WebSocket Gateway | 3008 | http://localhost:3008 |
| Payment Service | 3009 | http://localhost:3009/api/docs |

---

## ✅ Kurulum Kontrolü

### 1. Backend Kontrolü

Her servisin Swagger dokümantasyonunu açın:
```
http://localhost:3001/api/docs
http://localhost:3002/api/docs
...
```

### 2. Frontend Kontrolü

```
http://localhost:5173
```

Giriş sayfası görünüyorsa ✅

### 3. Veritabanı Kontrolü

PostgreSQL'e bağlanın ve tabloları kontrol edin:

```sql
\c elektraweb_pms
\dt
```

Tablolar oluşturulmuşsa ✅

---

## 🔐 İlk Kullanıcı Oluşturma

Sistem otomatik olarak admin kullanıcısı oluşturur:

- **Kullanıcı Adı:** `admin`
- **Şifre:** `admin123`
- **Rol:** `Super Admin`

⚠️ **Güvenlik:** İlk girişten sonra şifreyi mutlaka değiştirin!

---

## 📧 Email Ayarları (Opsiyonel)

Email bildirimleri için SMTP ayarlarını yapın:

`.env` dosyasında:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@elektraweb.com
```

**Gmail için:**
1. Google hesabınızda 2FA'yı aktif edin
2. Uygulama şifresi oluşturun
3. Şifreyi `SMTP_PASS` olarak kullanın

---

## 💳 Payment Gateway Ayarları (Opsiyonel)

### Stripe

1. [Stripe Dashboard](https://dashboard.stripe.com/) hesabı oluşturun
2. API anahtarlarını alın
3. `.env` dosyasına ekleyin:

```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### iyzico

1. [iyzico](https://www.iyzico.com/) hesabı oluşturun
2. API anahtarlarını alın
3. `.env` dosyasına ekleyin:

```env
IYZICO_API_KEY=your_api_key
IYZICO_SECRET_KEY=your_secret_key
```

### PayTR

1. [PayTR](https://www.paytr.com/) hesabı oluşturun
2. Merchant bilgilerinizi alın
3. `.env` dosyasına ekleyin:

```env
PAYTR_MERCHANT_ID=your_merchant_id
PAYTR_MERCHANT_KEY=your_merchant_key
PAYTR_MERCHANT_SALT=your_merchant_salt
```

---

## 🔄 Güncelleme

Sistemi güncellemek için:

```bash
# Yeni versiyonu çek
git pull origin main

# Backend güncelle
cd services/auth-service
npm install
npm run build

# Frontend güncelle
cd frontend
npm install
npm run build

# Servisleri yeniden başlat
```

---

## 🗄️ Yedekleme

### Otomatik Yedekleme

**Windows:**
```cmd
scripts\backup.bat
```

**Linux/Mac:**
```bash
chmod +x scripts/backup.sh
./scripts/backup.sh
```

Yedekler `backups/` klasörüne kaydedilir.

### Manuel Yedekleme

```bash
pg_dump -U postgres elektraweb_pms > backup.sql
```

### Geri Yükleme

```bash
psql -U postgres elektraweb_pms < backup.sql
```

---

## ❌ Sorun Giderme

### Port Zaten Kullanımda

**Hata:** `Port 3001 is already in use`

**Çözüm:**
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :3001
kill -9 <PID>
```

### Veritabanı Bağlantı Hatası

**Hata:** `Connection refused`

**Çözüm:**
1. PostgreSQL servisinin çalıştığını kontrol edin
2. `.env` dosyasındaki bilgileri kontrol edin
3. Firewall ayarlarını kontrol edin

### Node Modules Hatası

**Hata:** `Cannot find module`

**Çözüm:**
```bash
# node_modules'u sil ve yeniden kur
rm -rf node_modules
npm install
```

### Port Değiştirme

`.env` dosyasında istediğiniz portu değiştirin:

```env
AUTH_SERVICE_PORT=3011  # 3001 yerine
```

---

## 📞 Destek

### Dokümantasyon
- **Kullanım Kılavuzu:** `docs/KULLANIM_KILAVUZU.md`
- **API Docs:** `docs/api/README.md`
- **Payment Service:** `docs/PAYMENT_SERVICE.md`
- **Bank POS:** `docs/TURKISH_BANKS_POS_API_REFERENCE.md`

### İletişim
- **Email:** support@elektraweb.com
- **GitHub Issues:** [Sorun Bildir](https://github.com/yourusername/elektraweb-pms/issues)

---

## 📝 Kontrol Listesi

Kurulum tamamlandıktan sonra kontrol edin:

- [ ] PostgreSQL çalışıyor
- [ ] Tüm backend servisleri başladı
- [ ] Frontend çalışıyor
- [ ] Giriş yapabiliyorum
- [ ] Dashboard görünüyor
- [ ] Oda listesi yükleniyor
- [ ] Yeni rezervasyon oluşturabiliyorum
- [ ] Email ayarları yapıldı (opsiyonel)
- [ ] Payment gateway ayarları yapıldı (opsiyonel)
- [ ] Yedekleme scripti test edildi

---

## 🎉 Kurulum Tamamlandı!

Artık ElektraWEB PMS'i kullanmaya başlayabilirsiniz!

**İlk Adımlar:**
1. Giriş yapın (`admin` / `admin123`)
2. Şifrenizi değiştirin
3. Otel bilgilerinizi girin
4. Oda tiplerini tanımlayın
5. İlk rezervasyonunuzu oluşturun

**İyi Kullanımlar! 🚀**

---

**ElektraWEB PMS**  
**Versiyon:** 1.0.0  
**Son Güncelleme:** 2024-01-20
