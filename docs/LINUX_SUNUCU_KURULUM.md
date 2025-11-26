# 🚀 InnovaPMS - Linux Sunucu Kurulumu (Plesk + Docker)

## 📋 Gereksinimler

- ✅ Linux sunucu (Ubuntu/CentOS)
- ✅ Plesk yüklü
- ✅ Docker yüklü
- ✅ Docker Compose yüklü
- ✅ Domain adı (opsiyonel)

---

## ⚡ Hızlı Kurulum (5 Adım)

### 1️⃣ Sunucuya Bağlanın

```bash
ssh root@sunucu_ip_adresi
```

### 2️⃣ Projeyi Yükleyin

```bash
cd /var/www/vhosts
git clone https://github.com/yourusername/innovapms.git
cd innovapms
```

**Ya da dosyaları FTP ile yükleyin:**
- Plesk → File Manager
- `/var/www/vhosts/innovapms/` klasörüne yükleyin

### 3️⃣ .env Dosyasını Oluşturun

```bash
cp .env.example .env
nano .env
```

**Düzenleyin:**

```env
# Database
POSTGRES_USER=innovapms
POSTGRES_PASSWORD=GucluSifre123!
POSTGRES_DB=innovapms_db

# Redis
REDIS_PASSWORD=RedisSifre123!

# JWT
JWT_SECRET=super_secret_key_change_this
JWT_REFRESH_SECRET=refresh_secret_key_change_this

# Domain (opsiyonel)
CORS_ORIGIN=https://yourdomain.com
```

Kaydet: `Ctrl + X` → `Y` → `Enter`

### 4️⃣ Docker ile Başlatın

```bash
docker-compose up -d
```

Bu komut:
- ✅ PostgreSQL başlatır
- ✅ Redis başlatır
- ✅ 10 mikroservisi başlatır
- ✅ Tüm bağımlılıkları kurar

### 5️⃣ Veritabanını Hazırlayın

```bash
# Veritabanı şemasını oluştur
docker exec -i innovapms-postgres psql -U innovapms -d innovapms_db < database/schema.sql

# Başlangıç verilerini yükle
docker exec -i innovapms-postgres psql -U innovapms -d innovapms_db < database/seeds.sql
```

---

## ✅ Kurulum Tamamlandı!

Sistem çalışıyor! Kontrol edin:

```bash
docker-compose ps
```

Tüm servisler **Up** durumunda olmalı.

---

## 🌐 Plesk'te Domain Ayarları

### Yöntem 1: Subdomain (Önerilen)

1. Plesk → **Domains** → **Add Subdomain**
2. **Subdomain:** `pms.yourdomain.com`
3. **Document root:** `/var/www/vhosts/innovapms/frontend/dist`

### Yöntem 2: Reverse Proxy

1. Plesk → **Apache & nginx Settings**
2. **Additional nginx directives:**

```nginx
location / {
    proxy_pass http://localhost:5173;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}

location /api {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
```

3. **Apply** tıklayın

---

## 🔒 SSL Sertifikası (Let's Encrypt)

1. Plesk → **SSL/TLS Certificates**
2. **Let's Encrypt** seçin
3. **Install** tıklayın

✅ Otomatik SSL kuruldu!

---

## 🔧 Faydalı Komutlar

### Servisleri Kontrol Et
```bash
docker-compose ps
```

### Logları Görüntüle
```bash
docker-compose logs -f
```

### Servisleri Yeniden Başlat
```bash
docker-compose restart
```

### Servisleri Durdur
```bash
docker-compose down
```

### Servisleri Güncelle
```bash
git pull
docker-compose up -d --build
```

---

## 📊 Servis Portları

| Servis | Port | Erişim |
|--------|------|--------|
| Frontend | 5173 | http://sunucu-ip:5173 |
| API Gateway | 3000 | http://sunucu-ip:3000 |
| Auth | 3001 | http://sunucu-ip:3001/api/docs |
| Hotel | 3002 | http://sunucu-ip:3002/api/docs |
| Reservation | 3003 | http://sunucu-ip:3003/api/docs |
| Folio | 3004 | http://sunucu-ip:3004/api/docs |
| Payment | 3009 | http://sunucu-ip:3009/api/docs |

---

## 🔥 Firewall Ayarları

Portları açın:

```bash
# Plesk Firewall
plesk bin firewall --add-rule -direction in -port 3000-3009 -proto tcp

# Ya da ufw
ufw allow 3000:3009/tcp
ufw allow 5173/tcp
```

---

## 🎯 İlk Giriş

**URL:** `http://sunucu-ip:5173`

**Giriş Bilgileri:**
- Kullanıcı: `admin`
- Şifre: `admin123`

⚠️ **Güvenlik:** İlk girişten sonra şifreyi değiştirin!

---

## 🔄 Otomatik Yedekleme (Opsiyonel)

Cron job oluşturun:

```bash
crontab -e
```

Ekleyin:

```bash
# Her gün saat 02:00'de yedek al
0 2 * * * cd /var/www/vhosts/innovapms && docker exec innovapms-postgres pg_dump -U innovapms innovapms_db > /backup/innovapms_$(date +\%Y\%m\%d).sql
```

---

## 🆘 Sorun Giderme

### Servis Başlamıyor

```bash
docker-compose logs service-name
```

### Port Çakışması

```bash
netstat -tulpn | grep :3000
kill -9 PID
```

### Veritabanı Bağlantı Hatası

`.env` dosyasını kontrol edin:
```bash
cat .env | grep POSTGRES
```

---

## 📚 Detaylı Dokümantasyon

- **Kullanım:** `docs/KULLANIM_KILAVUZU.md`
- **API:** `docs/api/README.md`
- **Payment:** `docs/PAYMENT_SERVICE.md`

---

**InnovaPMS - Linux Sunucu Kurulumu Tamamlandı! 🎉**

**Destek:** support@innovapms.com
