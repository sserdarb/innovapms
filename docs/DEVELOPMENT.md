# ElektraWEB PMS - Geliştirici Kılavuzu

Bu döküman, ElektraWEB PMS projesinde geliştirme yapmak isteyenler için hazırlanmıştır.

## 🏗️ Proje Yapısı

```
elektraweb-pms/
├── services/                    # Mikroservisler
│   ├── api-gateway/            # API Gateway servisi
│   ├── auth-service/           # Kimlik doğrulama servisi
│   ├── hotel-service/          # Otel yönetimi servisi
│   ├── reservation-service/    # Rezervasyon servisi
│   ├── folio-service/          # Folyo ve tahsilat servisi
│   └── integration-service/    # Entegrasyon hub servisi
├── frontend/                    # Frontend uygulamaları
│   └── admin-panel/            # React admin panel
├── shared/                      # Ortak tipler ve yardımcılar
│   ├── src/
│   │   ├── types/              # TypeScript tip tanımlamaları
│   │   └── constants/          # Sabitler
│   └── package.json
├── database/                    # Veritabanı dosyaları
│   ├── schema.sql              # Veritabanı şeması
│   ├── seeds.sql               # Başlangıç verileri
│   └── migrations/             # Migration dosyaları
├── docs/                        # Dokümantasyon
│   ├── api/                    # API dokümantasyonu
│   └── deployment/             # Deployment kılavuzları
├── docker-compose.yml           # Docker Compose yapılandırması
├── .env.example                # Environment değişkenleri örneği
└── README.md                   # Ana README
```

---

## 🛠️ Yerel Geliştirme Ortamı Kurulumu

### Gereksinimler

- Node.js 20+
- Docker ve Docker Compose
- Git
- VS Code (önerilir)

### Kurulum Adımları

1. **Repository'yi klonlayın:**

```bash
git clone https://github.com/your-username/elektraweb-pms.git
cd elektraweb-pms
```

2. **Environment dosyasını oluşturun:**

```bash
cp .env.example .env
```

3. **Veritabanı ve Redis'i başlatın:**

```bash
docker-compose up -d postgres redis
```

4. **Veritabanı şemasını oluşturun:**

```bash
docker exec -i elektraweb-postgres psql -U elektraweb -d elektraweb_pms < database/schema.sql
docker exec -i elektraweb-postgres psql -U elektraweb -d elektraweb_pms < database/seeds.sql
```

5. **Shared modülü build edin:**

```bash
cd shared
npm install
npm run build
cd ..
```

6. **Servisleri geliştirme modunda başlatın:**

Her servis için ayrı terminal penceresi açın:

```bash
# Terminal 1 - Auth Service
cd services/auth-service
npm install
npm run start:dev

# Terminal 2 - Hotel Service
cd services/hotel-service
npm install
npm run start:dev

# Terminal 3 - Reservation Service
cd services/reservation-service
npm install
npm run start:dev

# Terminal 4 - Folio Service
cd services/folio-service
npm install
npm run start:dev

# Terminal 5 - Integration Service
cd services/integration-service
npm install
npm run start:dev

# Terminal 6 - API Gateway
cd services/api-gateway
npm install
npm run start:dev
```

7. **Frontend'i başlatın:**

```bash
cd frontend/admin-panel
npm install
npm run dev
```

---

## 📝 Yeni Modül Ekleme

### 1. Servis Oluşturma

```bash
cd services
nest new my-new-service
cd my-new-service
```

### 2. Dockerfile Ekleme

`services/my-new-service/Dockerfile`:

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3006
CMD ["node", "dist/main.js"]
```

### 3. Docker Compose'a Ekleme

`docker-compose.yml` dosyasına yeni servisi ekleyin:

```yaml
  my-new-service:
    build:
      context: ./services/my-new-service
      dockerfile: Dockerfile
    container_name: elektraweb-my-new-service
    restart: unless-stopped
    ports:
      - "3006:3006"
    environment:
      - NODE_ENV=${NODE_ENV}
      - PORT=3006
      - POSTGRES_HOST=${POSTGRES_HOST}
      - POSTGRES_PORT=${POSTGRES_PORT}
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_DB=${POSTGRES_DB}
    depends_on:
      - postgres
      - redis
    networks:
      - elektraweb-network
```

### 4. API Gateway'e Route Ekleme

API Gateway'de yeni servis için route ekleyin.

---

## 🧪 Test Yazma

### Unit Test Örneği

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should validate user credentials', async () => {
    const result = await service.validateUser('admin', 'admin123');
    expect(result).toBeDefined();
    expect(result.username).toBe('admin');
  });
});
```

### Test Çalıştırma

```bash
# Unit testler
npm run test

# E2E testler
npm run test:e2e

# Test coverage
npm run test:cov
```

---

## 🔌 API Kullanımı

### Authentication

#### Login

```bash
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

Yanıt:
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc...",
    "user": {
      "id": "uuid",
      "username": "admin",
      "email": "admin@hotel.com",
      "hotelId": "uuid"
    },
    "expiresIn": 86400
  }
}
```

#### Korumalı Endpoint Kullanımı

```bash
GET /api/reservations
Authorization: Bearer eyJhbGc...
X-Hotel-ID: uuid
```

---

## 🗄️ Veritabanı Migration

### Yeni Migration Oluşturma

```bash
# Migration dosyası oluştur
touch database/migrations/002_add_new_feature.sql
```

`database/migrations/002_add_new_feature.sql`:

```sql
-- Add new column
ALTER TABLE reservations ADD COLUMN confirmation_code VARCHAR(20);

-- Create index
CREATE INDEX idx_reservations_confirmation_code ON reservations(confirmation_code);
```

### Migration Uygulama

```bash
docker exec -i elektraweb-postgres psql -U elektraweb -d elektraweb_pms < database/migrations/002_add_new_feature.sql
```

---

## 📊 Loglama

### Log Seviyeleri

- `error`: Hatalar
- `warn`: Uyarılar
- `info`: Bilgilendirme
- `debug`: Debug bilgileri

### Kullanım

```typescript
import { Logger } from '@nestjs/common';

export class MyService {
  private readonly logger = new Logger(MyService.name);

  async myMethod() {
    this.logger.log('Method started');
    this.logger.debug('Debug info');
    this.logger.warn('Warning message');
    this.logger.error('Error occurred', error.stack);
  }
}
```

---

## 🔐 Güvenlik

### RBAC (Rol Tabanlı Erişim Kontrolü)

```typescript
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { PermissionsGuard } from './guards/permissions.guard';
import { RequirePermissions } from './decorators/permissions.decorator';

@Controller('reservations')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class ReservationsController {
  @Get()
  @RequirePermissions('reservation.view')
  findAll() {
    // ...
  }

  @Post()
  @RequirePermissions('reservation.create')
  create() {
    // ...
  }
}
```

---

## 🚀 Deployment

### Production Build

```bash
# Tüm servisleri build et
docker-compose -f docker-compose.prod.yml build

# Production modda başlat
docker-compose -f docker-compose.prod.yml up -d
```

### Environment Değişkenleri

Production ortamında mutlaka ayarlayın:
- `NODE_ENV=production`
- Güçlü `JWT_SECRET`
- Güçlü veritabanı şifreleri
- CORS ayarları
- Rate limiting

---

## 📚 Faydalı Komutlar

```bash
# Tüm servislerin loglarını izle
docker-compose logs -f

# Belirli bir servisin loglarını izle
docker-compose logs -f auth-service

# Veritabanına bağlan
docker exec -it elektraweb-postgres psql -U elektraweb -d elektraweb_pms

# Redis'e bağlan
docker exec -it elektraweb-redis redis-cli -a your_redis_password

# Konteynerleri yeniden başlat
docker-compose restart

# Tüm konteynerleri durdur ve sil
docker-compose down

# Volumeleri de sil (DİKKAT: Veri kaybı!)
docker-compose down -v
```

---

## 🐛 Debug

### VS Code Debug Yapılandırması

`.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "name": "Debug Auth Service",
      "port": 9229,
      "restart": true,
      "sourceMaps": true,
      "outFiles": ["${workspaceFolder}/services/auth-service/dist/**/*.js"]
    }
  ]
}
```

Debug modda başlatma:

```bash
cd services/auth-service
npm run start:debug
```

---

## 📖 Ek Kaynaklar

- [NestJS Dokümantasyonu](https://docs.nestjs.com/)
- [TypeORM Dokümantasyonu](https://typeorm.io/)
- [Docker Dokümantasyonu](https://docs.docker.com/)
- [PostgreSQL Dokümantasyonu](https://www.postgresql.org/docs/)

---

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

---

## 📝 Kod Standartları

- TypeScript strict mode kullanın
- ESLint kurallarına uyun
- Prettier ile kod formatlayın
- Her fonksiyon için JSDoc yazın
- Unit testler yazın
- Anlamlı commit mesajları kullanın
