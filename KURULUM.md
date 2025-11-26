# 🚀 InnovaPMS - Hızlı Kurulum Talimatı

## 📍 Sistem Konumu

```
C:\Users\Serdar Bayraktaroğlu\.gemini\antigravity\scratch\elektraweb-pms
```

---

## ⚡ 3 Adımda Kurulum

### 1️⃣ Gerekli Yazılımları Kurun

- **Node.js** (v18+) → https://nodejs.org/
- **PostgreSQL** (v15+) → https://www.postgresql.org/download/

### 2️⃣ Backend'i Başlatın

Proje klasörüne gidin ve çalıştırın:

```cmd
cd C:\Users\Serdar Bayraktaroğlu\.gemini\antigravity\scratch\elektraweb-pms
setup.bat
```

Bu komut:
- ✅ Tüm servisleri kurar
- ✅ Veritabanını oluşturur  
- ✅ 10 mikroservisi başlatır

### 3️⃣ Frontend'i Başlatın

Yeni bir terminal açın:

```cmd
cd C:\Users\Serdar Bayraktaroğlu\.gemini\antigravity\scratch\elektraweb-pms\frontend
npm install
npm run dev
```

---

## 🌐 Sisteme Giriş

Tarayıcınızda açın:
```
http://localhost:5173
```

**Giriş Bilgileri:**
- Kullanıcı: `admin`
- Şifre: `admin123`

---

## ✅ Kurulum Kontrolü

Şu URL'ler açılıyorsa kurulum başarılı:

- ✅ Frontend: http://localhost:5173
- ✅ API Gateway: http://localhost:3000/api/docs
- ✅ Auth Service: http://localhost:3001/api/docs

---

## 🔧 Sorun Giderme

### PostgreSQL Hatası

1. PostgreSQL'in çalıştığını kontrol edin
2. `.env` dosyası oluşturun:

```cmd
copy .env.example .env
```

3. `.env` dosyasında şifrenizi düzenleyin:

```env
POSTGRES_PASSWORD=sizin_sifreniz
```

### Port Çakışması

Çakışan portu kapatın:

```cmd
netstat -ano | findstr :3001
taskkill /PID <PID_NUMARASI> /F
```

---

## 📊 Servis Portları

| Servis | Port |
|--------|------|
| Frontend | 5173 |
| API Gateway | 3000 |
| Auth | 3001 |
| Hotel | 3002 |
| Reservation | 3003 |
| Folio | 3004 |
| Integration | 3005 |
| Notification | 3006 |
| Reports | 3007 |
| WebSocket | 3008 |
| Payment | 3009 |

---

## 🎯 İlk Adımlar

1. ✅ Giriş yapın
2. ✅ Dashboard'u inceleyin
3. ✅ İlk rezervasyonu oluşturun

---

## 📚 Detaylı Bilgi

- **Kurulum:** `docs/KURULUM_KILAVUZU.md`
- **Kullanım:** `docs/KULLANIM_KILAVUZU.md`
- **API:** `docs/api/README.md`

---

**InnovaPMS - Hotel Management System**  
**Versiyon:** 1.0.0  
**Hazır! 🎉**
