# ElektraWEB PMS - Proje Yapısı ve Dosya Açıklamaları

## 📁 Ana Dizin Yapısı

```
elektraweb-pms/
├── services/              # Mikroservisler
├── frontend/              # Frontend uygulamaları
├── shared/                # Ortak kod ve tipler
├── database/              # Veritabanı dosyaları
├── docs/                  # Dokümantasyon
├── docker-compose.yml     # Docker Compose yapılandırması
├── .env.example           # Environment değişkenleri örneği
├── setup.sh               # Linux/Mac kurulum scripti
├── setup.bat              # Windows kurulum scripti
└── README.md              # Ana README
```

---

## 🎯 Önemli Dosyalar

### Kurulum ve Yapılandırma

| Dosya | Açıklama |
|-------|----------|
| `docker-compose.yml` | Tüm servislerin Docker yapılandırması |
| `.env.example` | Environment değişkenleri şablonu |
| `.env` | Gerçek environment değişkenleri (oluşturulacak) |
| `setup.sh` | Linux/Mac otomatik kurulum scripti |
| `setup.bat` | Windows otomatik kurulum scripti |

### Veritabanı

| Dosya | Açıklama |
|-------|----------|
| `database/schema.sql` | Veritabanı şeması (tüm tablolar) |
| `database/seeds.sql` | Başlangıç verileri (roller, yetkiler) |
| `database/migrations/` | Veritabanı migration dosyaları |

### Dokümantasyon

| Dosya | Açıklama |
|-------|----------|
| `docs/deployment/INSTALLATION.md` | Plesk sunucu kurulum kılavuzu |
| `docs/DEVELOPMENT.md` | Geliştirici kılavuzu |
| `docs/QUICKSTART.md` | Hızlı başlangıç kılavuzu |
| `docs/api/README.md` | API dokümantasyonu |

---

## 🔧 Servis Yapıları

Her servis aşağıdaki yapıya sahiptir:

```
services/[service-name]/
├── src/
│   ├── main.ts              # Giriş noktası
│   ├── app.module.ts        # Ana modül
│   ├── [feature]/           # Özellik modülleri
│   │   ├── [feature].module.ts
│   │   ├── [feature].controller.ts
│   │   ├── [feature].service.ts
│   │   ├── [feature].entity.ts
│   │   └── dto/             # Data Transfer Objects
│   └── common/              # Ortak kod
│       ├── guards/          # Auth guard'ları
│       ├── decorators/      # Custom decorator'lar
│       └── filters/         # Exception filter'ları
├── Dockerfile               # Docker image yapılandırması
├── package.json             # NPM bağımlılıkları
├── tsconfig.json            # TypeScript yapılandırması
└── nest-cli.json            # NestJS CLI yapılandırması
```

---

## 📝 Dosya İçerikleri

### docker-compose.yml
Tüm mikroservislerin, PostgreSQL ve Redis'in yapılandırmasını içerir. Development ve production ortamları için kullanılır.

### .env.example
Tüm environment değişkenlerinin şablonudur. Kopyalanıp `.env` olarak kaydedilmeli ve değerler doldurulmalıdır.

**Önemli değişkenler:**
- `POSTGRES_*`: Veritabanı bağlantı bilgileri
- `REDIS_*`: Redis bağlantı bilgileri
- `JWT_SECRET`: JWT token secret key
- `*_SERVICE_PORT`: Her servisin port numarası

### database/schema.sql
Tüm veritabanı tablolarını, index'leri ve trigger'ları içerir:
- Otel yönetimi tabloları (hotels, rooms, room_types)
- Kullanıcı ve yetkilendirme (users, roles, permissions)
- Rezervasyon (reservations, guests, room_blocks)
- Folyo ve tahsilat (folios, folio_transactions, payments)
- Entegrasyon (external_api_keys, webhooks, integration_logs)

### database/seeds.sql
Sistemin çalışması için gerekli başlangıç verilerini içerir:
- Para birimleri (TRY, USD, EUR, GBP)
- Roller (system_admin, hotel_admin, receptionist, vb.)
- Yetkiler (reservation.view, folio.create, vb.)
- Rol-yetki eşleştirmeleri

---

## 🚀 Kullanım Senaryoları

### Senaryo 1: İlk Kurulum (Yerel)

1. `setup.sh` (Linux/Mac) veya `setup.bat` (Windows) çalıştır
2. Sistem otomatik olarak kurulur ve başlar
3. `http://localhost:3000/api/docs` adresinden API'yi test et

### Senaryo 2: Geliştirme Ortamı

1. Her servisi ayrı terminal penceresinde `npm run start:dev` ile başlat
2. Hot-reload aktif olur, kod değişiklikleri otomatik yansır
3. Debug için VS Code debug yapılandırmasını kullan

### Senaryo 3: Production Deployment (Plesk)

1. `docs/deployment/INSTALLATION.md` kılavuzunu takip et
2. Sunucuya SSH ile bağlan
3. Proje dosyalarını yükle
4. `.env` dosyasını yapılandır
5. `docker-compose up -d --build` ile başlat
6. Nginx reverse proxy ayarla
7. SSL sertifikası kur

---

## 🔐 Güvenlik Notları

### Hassas Dosyalar (Git'e eklenmemeli)

- `.env` - Environment değişkenleri
- `*.log` - Log dosyaları
- `node_modules/` - NPM paketleri
- `dist/` - Build çıktıları

### Güvenlik Kontrol Listesi

- [ ] `.env` dosyasında güçlü şifreler kullanıldı
- [ ] `JWT_SECRET` rastgele 64+ karakter
- [ ] Production'da `NODE_ENV=production`
- [ ] CORS sadece gerekli domain'lere açık
- [ ] Firewall sadece 80, 443, 22 portlarına izin veriyor
- [ ] SSL sertifikası kuruldu
- [ ] Düzenli yedekleme yapılıyor

---

## 📊 Performans İpuçları

### Veritabanı
- Index'ler doğru kullanılmış (schema.sql'de tanımlı)
- Connection pooling aktif (TypeORM default)
- Ağır sorgular için Redis cache kullan

### Redis
- Session yönetimi için kullan
- Sık erişilen veriler için cache
- Roomrack gibi gerçek zamanlı veriler için

### Docker
- Production'da `--build` ile optimize et
- Multi-stage build kullan (Dockerfile'da)
- Gereksiz dosyaları `.dockerignore` ile hariç tut

---

## 🐛 Sorun Giderme

### Problem: Servisler başlamıyor
```bash
docker-compose logs [service-name]
```

### Problem: Veritabanına bağlanılamıyor
```bash
docker exec -it elektraweb-postgres psql -U elektraweb -d elektraweb_pms
```

### Problem: Port çakışması
`.env` dosyasında port numaralarını değiştir

---

## 📚 Ek Kaynaklar

- [NestJS Dokümantasyonu](https://docs.nestjs.com/)
- [TypeORM Dokümantasyonu](https://typeorm.io/)
- [Docker Dokümantasyonu](https://docs.docker.com/)
- [PostgreSQL Dokümantasyonu](https://www.postgresql.org/docs/)
- [Redis Dokümantasyonu](https://redis.io/documentation)
