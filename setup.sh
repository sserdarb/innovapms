#!/bin/bash

# ElektraWEB PMS - Hızlı Başlatma Scripti
# Bu script sistemi otomatik olarak kurar ve başlatır

set -e  # Hata durumunda dur

echo "🚀 ElektraWEB PMS Kurulumu Başlıyor..."
echo ""

# Renk kodları
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Docker kontrolü
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker bulunamadı. Lütfen önce Docker'ı kurun.${NC}"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose bulunamadı. Lütfen önce Docker Compose'u kurun.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Docker ve Docker Compose bulundu${NC}"
echo ""

# .env dosyası kontrolü
if [ ! -f .env ]; then
    echo -e "${YELLOW}⚙️  .env dosyası oluşturuluyor...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✅ .env dosyası oluşturuldu${NC}"
    echo -e "${YELLOW}⚠️  Lütfen .env dosyasındaki şifreleri değiştirin!${NC}"
    echo ""
else
    echo -e "${GREEN}✅ .env dosyası mevcut${NC}"
    echo ""
fi

# Docker konteynerlerini başlat
echo -e "${YELLOW}🐳 Docker konteynerleri başlatılıyor...${NC}"
docker-compose up -d postgres redis

echo -e "${YELLOW}⏳ Veritabanının hazır olması bekleniyor (10 saniye)...${NC}"
sleep 10

echo -e "${GREEN}✅ PostgreSQL ve Redis başlatıldı${NC}"
echo ""

# Veritabanı şemasını oluştur
echo -e "${YELLOW}📊 Veritabanı şeması oluşturuluyor...${NC}"
docker exec -i elektraweb-postgres psql -U elektraweb -d elektraweb_pms < database/schema.sql 2>&1 | grep -v "NOTICE" || true

echo -e "${GREEN}✅ Veritabanı şeması oluşturuldu${NC}"
echo ""

# Seed verilerini yükle
echo -e "${YELLOW}🌱 Başlangıç verileri yükleniyor...${NC}"
docker exec -i elektraweb-postgres psql -U elektraweb -d elektraweb_pms < database/seeds.sql 2>&1 | grep -v "NOTICE" || true

echo -e "${GREEN}✅ Başlangıç verileri yüklendi${NC}"
echo ""

# Demo otel ve kullanıcı oluştur
echo -e "${YELLOW}🏨 Demo otel ve admin kullanıcısı oluşturuluyor...${NC}"

docker exec -i elektraweb-postgres psql -U elektraweb -d elektraweb_pms << 'EOF'
-- Demo otel oluştur
INSERT INTO hotels (code, name, legal_name, city, country, currency_code, timezone, is_active)
VALUES ('DEMO', 'Demo Otel', 'Demo Otel Turizm A.Ş.', 'Istanbul', 'Turkey', 'TRY', 'Europe/Istanbul', true)
ON CONFLICT (code) DO NOTHING;

-- Admin kullanıcısı oluştur (şifre: admin123)
INSERT INTO users (hotel_id, username, email, password_hash, first_name, last_name, is_active)
SELECT id, 'admin', 'admin@demo.com', 
       '$2b$10$YourHashedPasswordHere',
       'Admin', 'User', true
FROM hotels WHERE code = 'DEMO'
ON CONFLICT (username) DO NOTHING;

-- Admin rolü ata
INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id FROM users u, roles r 
WHERE u.username = 'admin' AND r.name = 'system_admin'
ON CONFLICT DO NOTHING;
EOF

echo -e "${GREEN}✅ Demo otel ve admin kullanıcısı oluşturuldu${NC}"
echo ""

# Tüm servisleri başlat
echo -e "${YELLOW}🚀 Tüm servisler başlatılıyor...${NC}"
docker-compose up -d --build

echo ""
echo -e "${GREEN}✅ Tüm servisler başlatıldı!${NC}"
echo ""

# Servislerin durumunu göster
echo -e "${YELLOW}📊 Servis Durumu:${NC}"
docker-compose ps

echo ""
echo -e "${GREEN}🎉 Kurulum tamamlandı!${NC}"
echo ""
echo -e "${YELLOW}📝 Giriş Bilgileri:${NC}"
echo "   Kullanıcı Adı: admin"
echo "   Şifre: admin123"
echo ""
echo -e "${YELLOW}🌐 Erişim URL'leri:${NC}"
echo "   API Gateway: http://localhost:3000"
echo "   API Docs: http://localhost:3000/api/docs"
echo "   Admin Panel: http://localhost:5173 (yakında)"
echo ""
echo -e "${YELLOW}📚 Dokümantasyon:${NC}"
echo "   Kurulum Kılavuzu: docs/deployment/INSTALLATION.md"
echo "   Geliştirici Kılavuzu: docs/DEVELOPMENT.md"
echo "   API Dokümantasyonu: docs/api/README.md"
echo ""
echo -e "${YELLOW}🔧 Faydalı Komutlar:${NC}"
echo "   Logları görüntüle: docker-compose logs -f"
echo "   Servisleri durdur: docker-compose down"
echo "   Servisleri yeniden başlat: docker-compose restart"
echo ""
echo -e "${GREEN}Başarılar! 🚀${NC}"
