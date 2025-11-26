- **RBAC**: Rol tabanlı erişim kontrolü
- **Gerçek Zamanlı**: WebSocket ile anlık oda durumu takibi
- **Genişletilebilir**: Modüler yapı ile kolay entegrasyon

## 📦 Servisler

- **API Gateway**: Merkezi API yönlendirme ve güvenlik
- **Auth Service**: Kimlik doğrulama ve yetkilendirme
- **Hotel Service**: Otel ve oda yönetimi
- **Reservation Service**: Rezervasyon ve roomrack
- **Folio Service**: Folyo ve tahsilat yönetimi
- **Integration Service**: Harici sistem entegrasyonları

# Docker ile başlatın
docker-compose up -d

# Veritabanını hazırlayın
docker exec -i elektraweb-postgres psql -U elektraweb -d elektraweb_pms < database/schema.sql
docker exec -i elektraweb-postgres psql -U elektraweb -d elektraweb_pms < database/seeds.sql
```

Sistem `http://localhost:3000` adresinde çalışacaktır.

**Varsayılan Giriş:**
- Kullanıcı: `admin`
- Şifre: `admin123`

## 📝 Lisans

Proprietary - Tüm hakları saklıdır.
