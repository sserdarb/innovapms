# Türk Bankaları Sanal POS API Referans Dökümanı

## 📚 İçindekiler

1. [Garanti BBVA](#garanti-bbva)
2. [İş Bankası](#iş-bankası)
3. [Akbank](#akbank)
4. [Yapı Kredi](#yapı-kredi)
5. [Ziraat Bankası](#ziraat-bankası)
6. [Halkbank](#halkbank)
7. [VakıfBank](#vakıfbank)
8. [Diğer Bankalar](#diğer-bankalar)

---

## Garanti BBVA

### 🔗 Bağlantılar
- **Ana Portal:** https://garantibbvapos.com.tr
- **Geliştirici Portalı:** https://www.garantibbva.com.tr/tr/kurumsal/e-ticaret
- **API Store:** https://apistore.garantibbva.com.tr
- **Yönetim Paneli (Test):** https://sanalposprovtest.garantibbva.com.tr
- **Yönetim Paneli (Prod):** https://sanalposprov.garanti.com.tr
- **Destek:** eticaretdestek@garantibbva.com.tr | 444 0 339/1

### 📋 Gerekli Bilgiler
```typescript
{
  merchantId: string;      // Üye işyeri numarası
  terminalId: string;      // Terminal numarası
  userName: string;        // Kullanıcı adı
  password: string;        // Şifre
  storeKey: string;        // Mağaza anahtarı
}
```

### 🔧 API Endpoint'leri
- **Test:** `https://sanalposprovtest.garantibbva.com.tr/VPServlet`
- **Production:** `https://sanalposprov.garanti.com.tr/VPServlet`

### 📖 Dokümantasyon
- API Katalog: Peşin, Taksitli Satış, Ön Otorizasyon, İptal, İade, Sorgulama
- 3D Secure entegrasyonu
- Güvenli Ortak Ödeme Sayfası
- OpenCart, WordPress, PrestaShop eklentileri

### 💡 Özellikler
- ✅ 3D Secure
- ✅ Taksit desteği
- ✅ İptal/İade
- ✅ Ön otorizasyon
- ✅ Güvenli ödeme sayfası
- ✅ API Store (Sandbox test)

---

## İş Bankası

### 🔗 Bağlantılar
- **Yönetim Paneli:** https://spos.isbank.com.tr/isbank/report/user.login
- **API Portal:** https://www.isbank.com.tr/api
- **Test Ortamı:** https://entegrasyon.asseco-see.com.tr/fim/est3Dgate
- **Production:** https://sanalpos.isbank.com.tr/fim/est3Dgate
- **Destek:** 0212 319 06 07

### 📋 Gerekli Bilgiler
```typescript
{
  clientId: string;        // Mağaza numarası
  storeKey: string;        // Güvenlik anahtarı
  userName: string;        // API kullanıcı adı
  password: string;        // API şifresi
}
```

### 🔧 API Endpoint'leri
- **Test:** `https://entegrasyon.asseco-see.com.tr/fim/est3Dgate`
- **Production:** `https://sanalpos.isbank.com.tr/fim/est3Dgate`

### 📖 Dokümantasyon
- EST 3D Gateway entegrasyonu
- 3D Secure (3D Pay) modeli
- Hash oluşturma (SHA-512)
- Callback handling

### 💡 Özellikler
- ✅ 3D Secure (3D Pay)
- ✅ Taksit desteği
- ✅ Dövizli işlemler
- ✅ API kullanıcısı sistemi
- ✅ SSL zorunlu

### ⚙️ Kurulum Adımları
1. Sanal POS yönetim paneline giriş
2. "Kullanıcı Ekle" → "Api kullanıcısı" rolü
3. 3D Ayarları → "3D Pay" modeli seçimi
4. Güvenlik anahtarı oluşturma
5. API bilgilerini sisteme girme

---

## Akbank

### 🔗 Bağlantılar
- **Yönetim Paneli:** https://sanalpos.akbank.com
- **GitHub:** https://github.com/akbank (Örnek kodlar)
- **Destek:** 444 28 28 | 0850 222 28 28

### 📋 Gerekli Bilgiler
```typescript
{
  merchantId: string;      // Üye işyeri numarası
  terminalId: string;      // Terminal Safe ID
  userName: string;        // Güvenli işyeri numarası
  password: string;        // Aktif anahtar (Güvenlik anahtarı)
}
```

### 🔧 API Endpoint'leri
- Akbank EST altyapısı kullanır
- 3D Pay modeli

### 📖 Dokümantasyon
- Yönetim panelinde "Yardım" menüsü
- GitHub'da örnek implementasyonlar
- 3D Secure entegrasyonu

### 💡 Özellikler
- ✅ 3D Secure (3D Pay)
- ✅ Taksit desteği
- ✅ API kullanıcısı sistemi
- ✅ Terminal Safe ID

### ⚙️ Kurulum Adımları
1. https://sanalpos.akbank.com giriş
2. Yönetim → Kullanıcılar → "Api Kullanıcısı" ekle
3. Yönetim → 3D Secure → "3D Pay" seçimi
4. Yönetim → Güvenlik Anahtarları → Aktif anahtar
5. Terminal İşlemleri → Terminal Safe ID

---

## Yapı Kredi

### 🔗 Bağlantılar
- **Ana Portal:** https://yapikredipos.com.tr
- **API Portal:** https://www.yapikredi.com.tr/api
- **Dokümantasyon:** https://yapikredipos.com.tr/tr/entegrasyon-dokumanlari
- **Destek:** posnet.support@yapikredi.com.tr

### 📋 Gerekli Bilgiler
```typescript
{
  merchantId: string;      // YKB üye işyeri numarası (MERCHANT_ID)
  terminalId: string;      // Terminal numarası (TERMINAL_ID)
  posnetId: string;        // POSNET numarası (POSNET_ID)
  encKey: string;          // Şifreleme anahtarı
}
```

### 🔧 API Endpoint'leri
- **POSNET XML Servisi:** XML POST
- **POSNET 3D Secure:** TDS entegrasyonu
- UTF-8 URL Encode

### 📖 Dokümantasyon
- **POSNET XML Servisi (TR):** Kredi kartı, puan, karma işlemler
- **POSNET 3D Secure (TR):** TDS entegrasyonu
- Hata kodları listesi
- Test ortamı servis URL'leri

### 💡 Özellikler
- ✅ POSNET XML Servisi
- ✅ 3D Secure (TDS)
- ✅ Kredi kartı işlemleri
- ✅ Puan işlemleri
- ✅ Karma işlemler
- ✅ Vade farklı işlemler
- ✅ Joker Vadaa

### ⚙️ Kurulum Adımları
1. Statik IP adreslerini bankaya bildirme
2. Test ortamında entegrasyon
3. Canlı ortama geçiş talebi (posnet.support@yapikredi.com.tr)

---

## Ziraat Bankası

### 🔗 Bağlantılar
- **Yönetim Paneli:** https://sanalpos2.ziraatbank.com.tr/ziraat/report/user.login
- **ZiraatPay:** https://ziraatpay.com.tr
- **Destek:** 0 212 319 06 19

### 📋 Gerekli Bilgiler
```typescript
{
  merchantId: string;      // Üye işyeri numarası
  terminalId: string;      // Terminal ID
  userName: string;        // API kullanıcı adı
  password: string;        // API şifresi / Güvenlik anahtarı
}
```

### 🔧 API Endpoint'leri
- BankkartPOS altyapısı
- EST benzeri entegrasyon

### 📖 Dokümantasyon
- Yönetim paneli → Yardım menüsü
- "ZiraatPay - API v2 Kullanım ve Entegrasyon Bilgi Dokümanı"

### 💡 Özellikler
- ✅ 3D Secure (3D Pay)
- ✅ Taksit desteği
- ✅ SSL sertifikası zorunlu
- ✅ Güvenlik politikası

### ⚙️ Kurulum Adımları
1. Sanal POS başvurusu (şube veya online)
2. https://sanalpos2.ziraatbank.com.tr/ziraat/report/user.login giriş
3. Yönetim → Yeni Kullanıcı Ekle → "Api Kullanıcısı"
4. Yönetim → 3D Secure → "3D Pay" seçimi
5. Yönetim → Güvenlik Anahtarı Değiştirme
6. Üye İşyeri Terminal Bilgisi → Terminal ID

---

## Halkbank

### 🔗 Bağlantılar
- **Ana Portal:** https://www.halkbank.com.tr
- **Sanal POS:** Halkbank Sanal POS sistemi
- **Destek:** Halkbank müşteri hizmetleri

### 📋 Gerekli Bilgiler
```typescript
{
  merchantId: string;
  terminalId: string;
  userName: string;
  password: string;
  storeKey: string;
}
```

### 💡 Özellikler
- ✅ 3D Secure
- ✅ Taksit desteği
- ✅ SSL zorunlu

### 📝 Not
Detaylı API dokümantasyonu için Halkbank ile iletişime geçilmeli.

---

## VakıfBank

### 🔗 Bağlantılar
- **Ana Portal:** https://www.vakifbank.com.tr
- **Sanal POS:** VakıfBank Sanal POS
- **Destek:** VakıfBank müşteri hizmetleri

### 📋 Gerekli Bilgiler
```typescript
{
  merchantId: string;
  terminalId: string;
  userName: string;
  password: string;
}
```

### 💡 Özellikler
- ✅ 3D Secure
- ✅ Taksit desteği
- ✅ Dövizli işlemler

### 📝 Not
Detaylı API dokümantasyonu için VakıfBank ile iletişime geçilmeli.

---

## Diğer Bankalar

### DenizBank
- **Portal:** https://www.denizbank.com
- **Altyapı:** EST benzeri
- **3D Secure:** Destekleniyor

### QNB Finansbank
- **Portal:** https://www.qnbfinansbank.com
- **Altyapı:** EST benzeri
- **3D Secure:** Destekleniyor

### TEB
- **Portal:** https://www.teb.com.tr
- **Altyapı:** EST benzeri
- **3D Secure:** Destekleniyor

### ING Bank
- **Portal:** https://www.ing.com.tr
- **Altyapı:** Özel API
- **3D Secure:** Destekleniyor

### Kuveyt Türk
- **Portal:** https://www.kuveytturk.com.tr
- **Altyapı:** İslami bankacılık uyumlu
- **3D Secure:** Destekleniyor

### Albaraka Türk
- **Portal:** https://www.albaraka.com.tr
- **Altyapı:** İslami bankacılık uyumlu
- **3D Secure:** Destekleniyor

---

## 🔐 Genel Güvenlik Gereksinimleri

### Tüm Bankalar İçin Ortak
- ✅ **SSL Sertifikası:** Minimum 128-bit şifreleme
- ✅ **3D Secure:** Zorunlu (PSD2 uyumu)
- ✅ **HTTPS:** Production ortamda zorunlu
- ✅ **Statik IP:** Bazı bankalar için gerekli
- ✅ **Callback URL:** Güvenli ve erişilebilir olmalı
- ✅ **Hash Verification:** Tüm işlemlerde zorunlu

### PCI-DSS Uyumu
- Kart bilgileri saklanmamalı
- Hassas veriler şifrelenmeli
- Düzenli güvenlik testleri
- Log kayıtları tutulmalı

---

## 📊 Karşılaştırma Tablosu

| Banka | Altyapı | 3D Model | Taksit | Döviz | API Docs |
|-------|---------|----------|--------|-------|----------|
| Garanti BBVA | Özel | 3D/3D Pay | ✅ | ✅ | ⭐⭐⭐⭐⭐ |
| İş Bankası | EST | 3D Pay | ✅ | ✅ | ⭐⭐⭐⭐ |
| Akbank | EST | 3D Pay | ✅ | ✅ | ⭐⭐⭐⭐ |
| Yapı Kredi | POSNET | TDS | ✅ | ✅ | ⭐⭐⭐⭐⭐ |
| Ziraat | BankkartPOS | 3D Pay | ✅ | ✅ | ⭐⭐⭐ |
| Halkbank | Özel | 3D | ✅ | ✅ | ⭐⭐⭐ |
| VakıfBank | Özel | 3D | ✅ | ✅ | ⭐⭐⭐ |

---

## 🛠️ Implementasyon Önerileri

### 1. Başlangıç İçin
- **Garanti BBVA:** En iyi dokümantasyon, API Store
- **İş Bankası:** Yaygın kullanım, kolay entegrasyon
- **Yapı Kredi:** POSNET XML, detaylı docs

### 2. Test Ortamı
- Tüm bankalar test ortamı sağlıyor
- Sandbox hesapları ücretsiz
- Test kartları dokümantasyonda

### 3. Production Geçiş
1. Test ortamında tam test
2. Statik IP bildirimi (gerekirse)
3. SSL sertifikası kurulumu
4. Canlı credentials alma
5. Banka onayı
6. Production deployment

---

## 📞 Destek İletişim

| Banka | Telefon | Email |
|-------|---------|-------|
| Garanti BBVA | 444 0 339/1 | eticaretdestek@garantibbva.com.tr |
| İş Bankası | 0212 319 06 07 | - |
| Akbank | 444 28 28 | - |
| Yapı Kredi | - | posnet.support@yapikredi.com.tr |
| Ziraat | 0 212 319 06 19 | - |

---

## 📚 Ek Kaynaklar

- [PCI-DSS Compliance](https://www.pcisecuritystandards.org/)
- [3D Secure 2.0](https://www.emvco.com/emv-technologies/3d-secure/)
- [PSD2 Directive](https://ec.europa.eu/info/law/payment-services-psd-2-directive-eu-2015-2366_en)

---

**Son Güncelleme:** 2024-01-20  
**Versiyon:** 1.0

**Not:** API endpoint'leri ve dokümantasyon linkleri değişebilir. Güncel bilgi için ilgili bankanın resmi web sitesini kontrol edin.
