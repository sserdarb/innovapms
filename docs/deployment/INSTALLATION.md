# ElektraWEB PMS - Plesk Sunucu Kurulum Kılavuzu

Bu kılavuz, ElektraWEB PMS sisteminin Plesk panelli Linux sunucuya kurulumu için adım adım talimatları içerir.

## 📋 Gereksinimler

### Sunucu Gereksinimleri
- **İşletim Sistemi**: Ubuntu 20.04+ veya CentOS 8+
- **Plesk**: Plesk Obsidian 18.0.40+
- **RAM**: Minimum 4GB (8GB önerilir)
- **Disk**: Minimum 20GB boş alan
- **CPU**: 2+ çekirdek

### Yazılım Gereksinimleri
- **Docker**: 20.10+
- **Docker Compose**: 2.0+
- **PostgreSQL**: 15+ (Docker ile gelecek)
- **Redis**: 7+ (Docker ile gelecek)
- **Node.js**: 20+ (geliştirme için, production'da Docker kullanılacak)

---

## 🚀 Kurulum Adımları

### Adım 1: Plesk'te Docker Extension Kurulumu

1. Plesk Admin Panel'e giriş yapın
2. **Extensions** > **My Extensions** bölümüne gidin
3. **Docker** extension'ını arayın ve yükleyin
4. Extension yüklendikten sonra **Docker** sekmesi görünecektir

> **Not**: Eğer Docker extension'ı yoksa, sunucunuza SSH ile bağlanıp manuel Docker kurulumu yapabilirsiniz.

---

### Adım 2: SSH ile Sunucuya Bağlanma

```bash
ssh root@your-server-ip
```

veya Plesk'ten **Tools & Settings** > **SSH Terminal** kullanabilirsiniz.

---

### Adım 3: Docker ve Docker Compose Kurulumu (Eğer yoksa)

#### Ubuntu için:

```bash
# Docker kurulumu
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Docker Compose kurulumu
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Docker'ı başlat
sudo systemctl start docker
sudo systemctl enable docker

# Kurulumu doğrula
docker --version
docker-compose --version
```

#### CentOS için:

```bash
# Docker kurulumu
sudo yum install -y yum-utils
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo yum install docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Docker'ı başlat
sudo systemctl start docker
sudo systemctl enable docker

# Kurulumu doğrula
docker --version
docker compose version
```

---

### Adım 4: Proje Dosyalarını Sunucuya Yükleme

#### Yöntem 1: Git ile (Önerilir)

```bash
# Proje klasörü oluştur
cd /var/www/vhosts/
mkdir elektraweb-pms
cd elektraweb-pms

# Git repository'den çek (kendi repository URL'inizi kullanın)
git clone https://github.com/your-username/elektraweb-pms.git .
```

#### Yöntem 2: FTP/SFTP ile

1. FileZilla veya benzeri bir FTP istemcisi kullanın
2. Sunucu: `your-server-ip`
3. Kullanıcı: `root` veya Plesk kullanıcınız
4. Port: `22` (SFTP)
5. Tüm proje dosyalarını `/var/www/vhosts/elektraweb-pms/` klasörüne yükleyin

---

### Adım 5: Environment Dosyasını Yapılandırma

```bash
cd /var/www/vhosts/elektraweb-pms

# .env dosyasını oluştur
cp .env.example .env

# .env dosyasını düzenle
nano .env
```

#### Önemli Ayarlar:

```bash
# Database - GÜVENLİ ŞİFRELER KULLANIN!
POSTGRES_USER=elektraweb
POSTGRES_PASSWORD=BURAYA_GÜÇLÜ_ŞİFRE_YAZIN
POSTGRES_DB=elektraweb_pms

# Redis - GÜVENLİ ŞİFRE KULLANIN!
REDIS_PASSWORD=BURAYA_GÜÇLÜ_ŞİFRE_YAZIN

# JWT - GÜVENLİ SECRET KEY KULLANIN!
JWT_SECRET=BURAYA_RASTGELE_64_KARAKTERLIK_STRING_YAZIN
JWT_REFRESH_SECRET=BURAYA_BAŞKA_RASTGELE_64_KARAKTERLIK_STRING_YAZIN

# Environment
NODE_ENV=production

# CORS - Kendi domain'inizi yazın
CORS_ORIGIN=https://yourdomain.com
```

> **Güvenlik Notu**: Production ortamında mutlaka güçlü şifreler ve secret key'ler kullanın!

**Rastgele secret key üretmek için:**

```bash
# Linux/Mac
openssl rand -base64 64

# veya
cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 64 | head -n 1
```

---

### Adım 6: Veritabanını Başlatma

```bash
cd /var/www/vhosts/elektraweb-pms

# Sadece veritabanı ve Redis'i başlat
docker-compose up -d postgres redis

# Veritabanının hazır olmasını bekle (yaklaşık 10 saniye)
sleep 10

# Veritabanı şemasını oluştur
docker exec -i elektraweb-postgres psql -U elektraweb -d elektraweb_pms < database/schema.sql

# Seed verilerini yükle (roller, yetkiler vb.)
docker exec -i elektraweb-postgres psql -U elektraweb -d elektraweb_pms < database/seeds.sql
```

#### Veritabanı Bağlantısını Test Etme:

```bash
docker exec -it elektraweb-postgres psql -U elektraweb -d elektraweb_pms

# PostgreSQL içinde:
\dt  # Tabloları listele
\q   # Çıkış
```

---

### Adım 7: Tüm Servisleri Başlatma

```bash
cd /var/www/vhosts/elektraweb-pms

# Tüm servisleri build et ve başlat
docker-compose up -d --build

# Logları kontrol et
docker-compose logs -f

# Ctrl+C ile log takibinden çık
```

#### Servislerin Durumunu Kontrol Etme:

```bash
docker-compose ps
```

Tüm servisler **Up** durumunda olmalı:

```
NAME                          STATUS
elektraweb-api-gateway        Up
elektraweb-auth-service       Up
elektraweb-hotel-service      Up
elektraweb-reservation-service Up
elektraweb-folio-service      Up
elektraweb-integration-service Up
elektraweb-postgres           Up (healthy)
elektraweb-redis              Up (healthy)
```

---

### Adım 8: İlk Otel ve Kullanıcı Oluşturma

Sistem başarıyla çalıştıktan sonra, ilk otel ve admin kullanıcısını oluşturmanız gerekir.

```bash
# PostgreSQL'e bağlan
docker exec -it elektraweb-postgres psql -U elektraweb -d elektraweb_pms
```

#### İlk Oteli Oluştur:

```sql
INSERT INTO hotels (code, name, legal_name, city, country, currency_code, timezone, is_active)
VALUES (
    'HOTEL001',
    'Demo Otel',
    'Demo Otel Turizm A.Ş.',
    'Istanbul',
    'Turkey',
    'TRY',
    'Europe/Istanbul',
    true
);
```

#### İlk Admin Kullanıcısını Oluştur:

```sql
-- Önce hotel_id'yi al
SELECT id FROM hotels WHERE code = 'HOTEL001';

-- Şifreyi hash'le (bcrypt ile 'admin123' şifresi)
-- Gerçek üretimde güçlü şifre kullanın!
INSERT INTO users (hotel_id, username, email, password_hash, first_name, last_name, is_active)
VALUES (
    '(yukarıdaki hotel_id)',
    'admin',
    'admin@demo-otel.com',
    '$2b$10$YourHashedPasswordHere',
    'Admin',
    'User',
    true
);

-- Admin rolünü kullanıcıya ata
INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id
FROM users u, roles r
WHERE u.username = 'admin' AND r.name = 'system_admin';

\q
```

> **Not**: Şifre hash'i oluşturmak için API'yi kullanabilir veya bcrypt online tool kullanabilirsiniz.

---

### Adım 9: Plesk'te Domain ve Nginx Yapılandırması

#### 9.1. Plesk'te Domain Ekleme

1. Plesk Panel > **Websites & Domains** > **Add Domain**
2. Domain adınızı girin (örn: `pms.yourdomain.com`)
3. Document root: `/var/www/vhosts/elektraweb-pms/public`

#### 9.2. Nginx Reverse Proxy Yapılandırması

**Websites & Domains** > Domain seçin > **Apache & nginx Settings**

**Additional nginx directives** bölümüne ekleyin:

```nginx
location /api/ {
    proxy_pass http://localhost:3000/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
    proxy_read_timeout 300s;
    proxy_connect_timeout 75s;
}

location / {
    proxy_pass http://localhost:5173/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

**OK** butonuna tıklayın.

---

### Adım 10: SSL Sertifikası Kurulumu

1. Plesk Panel > Domain > **SSL/TLS Certificates**
2. **Install a free basic certificate provided by Let's Encrypt** seçin
3. Email adresinizi girin
4. **Get it free** butonuna tıklayın
5. Sertifika yüklendikten sonra **Redirect from HTTP to HTTPS** seçeneğini aktifleştirin

---

### Adım 11: Firewall Ayarları

Plesk'te **Tools & Settings** > **Firewall**:

Aşağıdaki portların açık olduğundan emin olun:
- **80** (HTTP)
- **443** (HTTPS)
- **22** (SSH)

Docker servisleri için dahili portlar (3000-3005, 5432, 6379) dışarıya kapalı olmalı (localhost'ta çalışıyorlar).

---

### Adım 12: Sistem Testleri

#### API Sağlık Kontrolü:

```bash
curl http://localhost:3000/health
```

Yanıt:
```json
{
  "status": "ok",
  "timestamp": "2024-01-20T10:00:00.000Z"
}
```

#### Login Testi:

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123"
  }'
```

Başarılı yanıt:
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc...",
    "user": {...},
    "expiresIn": 86400
  }
}
```

#### Swagger API Dokümantasyonu:

Tarayıcıda açın:
```
https://yourdomain.com/api/docs
```

---

## 🔧 Bakım ve Yönetim

### Logları Görüntüleme

```bash
# Tüm servislerin logları
docker-compose logs -f

# Belirli bir servisin logları
docker-compose logs -f auth-service

# Son 100 satır
docker-compose logs --tail=100
```

### Servisleri Yeniden Başlatma

```bash
# Tüm servisleri yeniden başlat
docker-compose restart

# Belirli bir servisi yeniden başlat
docker-compose restart auth-service
```

### Servisleri Durdurma

```bash
# Tüm servisleri durdur
docker-compose down

# Veritabanı verilerini de sil (DİKKAT!)
docker-compose down -v
```

### Kod Güncellemeleri

```bash
cd /var/www/vhosts/elektraweb-pms

# Git'ten son değişiklikleri çek
git pull origin main

# Servisleri yeniden build et ve başlat
docker-compose up -d --build

# Veritabanı migration'ları varsa çalıştır
docker exec -i elektraweb-postgres psql -U elektraweb -d elektraweb_pms < database/migrations/001_update.sql
```

### Veritabanı Yedekleme

```bash
# Yedek al
docker exec elektraweb-postgres pg_dump -U elektraweb elektraweb_pms > backup_$(date +%Y%m%d_%H%M%S).sql

# Yedekten geri yükle
docker exec -i elektraweb-postgres psql -U elektraweb -d elektraweb_pms < backup_20240120_100000.sql
```

### Otomatik Yedekleme (Cron)

```bash
# Crontab düzenle
crontab -e

# Her gün saat 02:00'de yedek al
0 2 * * * cd /var/www/vhosts/elektraweb-pms && docker exec elektraweb-postgres pg_dump -U elektraweb elektraweb_pms > /var/backups/elektraweb/backup_$(date +\%Y\%m\%d).sql
```

---

## 🐛 Sorun Giderme

### Problem: Servisler başlamıyor

```bash
# Logları kontrol et
docker-compose logs

# Servislerin durumunu kontrol et
docker-compose ps

# Tüm konteynerleri temizle ve yeniden başlat
docker-compose down
docker-compose up -d --build
```

### Problem: Veritabanına bağlanılamıyor

```bash
# PostgreSQL'in çalıştığını kontrol et
docker-compose ps postgres

# PostgreSQL loglarını kontrol et
docker-compose logs postgres

# Manuel bağlantı testi
docker exec -it elektraweb-postgres psql -U elektraweb -d elektraweb_pms
```

### Problem: Port çakışması

```bash
# Portları kontrol et
sudo netstat -tulpn | grep -E ':(3000|3001|3002|3003|3004|3005|5432|6379)'

# Çakışan servisi durdur veya .env dosyasında portları değiştir
```

### Problem: Disk doldu

```bash
# Docker disk kullanımını kontrol et
docker system df

# Kullanılmayan imajları temizle
docker system prune -a

# Eski logları temizle
docker-compose logs --tail=0 -f > /dev/null
```

---

## 📊 Performans İzleme

### Docker Stats

```bash
# Gerçek zamanlı kaynak kullanımı
docker stats
```

### Sistem Kaynakları

```bash
# CPU ve RAM kullanımı
top

# Disk kullanımı
df -h

# Ağ bağlantıları
netstat -an | grep ESTABLISHED
```

---

## 🔐 Güvenlik Önerileri

1. **Güçlü Şifreler**: Tüm veritabanı, Redis ve JWT secret'ları için güçlü şifreler kullanın
2. **Firewall**: Sadece gerekli portları açık tutun
3. **SSL**: Mutlaka HTTPS kullanın
4. **Güncellemeler**: Düzenli olarak sistem ve Docker imajlarını güncelleyin
5. **Yedekleme**: Günlük otomatik yedekleme yapın
6. **Loglar**: Düzenli olarak logları kontrol edin
7. **Fail2Ban**: SSH brute force saldırılarına karşı Fail2Ban kurun

---

## 📞 Destek

Sorun yaşarsanız:
1. Logları kontrol edin: `docker-compose logs`
2. Sistem kaynaklarını kontrol edin: `docker stats`
3. Dokümantasyonu inceleyin: `https://yourdomain.com/api/docs`

---

## ✅ Kurulum Kontrol Listesi

- [ ] Docker ve Docker Compose kuruldu
- [ ] Proje dosyaları sunucuya yüklendi
- [ ] .env dosyası yapılandırıldı
- [ ] Veritabanı şeması oluşturuldu
- [ ] Seed verileri yüklendi
- [ ] Tüm servisler başlatıldı
- [ ] İlk otel oluşturuldu
- [ ] İlk admin kullanıcısı oluşturuldu
- [ ] Nginx reverse proxy yapılandırıldı
- [ ] SSL sertifikası kuruldu
- [ ] API testleri başarılı
- [ ] Otomatik yedekleme ayarlandı

**Tebrikler! ElektraWEB PMS sisteminiz hazır! 🎉**
