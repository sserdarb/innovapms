# ElektraWEB PMS - Banka Sanal POS Entegrasyonları

## 🏦 Desteklenen Bankalar

### Payment Gateway'ler
- ✅ **Stripe** - Global
- ✅ **iyzico** - Türkiye
- ✅ **PayTR** - Türkiye
- ✅ **PayU** - International

### Türk Bankaları Sanal POS
- ✅ **Garanti BBVA** - GarantiPay
- ✅ **İş Bankası** - İş Bankası POS
- 🔄 **Akbank** - Akbank POS (geliştiriliyor)
- 🔄 **Yapı Kredi** - POSNET (geliştiriliyor)
- 🔄 **Ziraat Bankası** - Ziraat POS (geliştiriliyor)
- 🔄 **Halkbank** - Halkbank POS (geliştiriliyor)
- 🔄 **VakıfBank** - VakıfBank POS (geliştiriliyor)
- 🔄 **DenizBank** - DenizBank POS (geliştiriliyor)
- 🔄 **QNB Finansbank** - Finansbank POS (geliştiriliyor)
- 🔄 **TEB** - TEB POS (geliştiriliyor)
- 🔄 **ING Bank** - ING POS (geliştiriliyor)
- 🔄 **Kuveyt Türk** - Kuveyt Türk POS (geliştiriliyor)
- 🔄 **Albaraka Türk** - Albaraka POS (geliştiriliyor)

---

## 🎯 Özellikler

### Plugin Mimarisi
- ✅ Dinamik POS provider yükleme
- ✅ Standardize edilmiş interface
- ✅ Kolay yeni banka ekleme
- ✅ Test/Production mode

### Admin Panel Yönetimi
- ✅ POS listesi görüntüleme
- ✅ Yeni POS ekleme
- ✅ POS düzenleme/silme
- ✅ Aktif/Pasif yapma
- ✅ Varsayılan POS seçimi
- ✅ Öncelik sıralaması

### Güvenlik
- ✅ Şifrelenmiş credentials
- ✅ 3D Secure desteği
- ✅ Webhook verification
- ✅ Test mode

---

## 🚀 Kullanım

### 1. Admin Panelden POS Ekleme

**API:**
```bash
POST http://localhost:3009/api/pos-config
{
  "hotelId": "hotel-123",
  "provider": "garanti_pay",
  "name": "Garanti BBVA POS",
  "isActive": true,
  "isDefault": true,
  "isTestMode": false,
  "credentials": {
    "merchantId": "your_merchant_id",
    "terminalId": "your_terminal_id",
    "userName": "your_username",
    "password": "your_password",
    "storeKey": "your_store_key"
  },
  "settings": {
    "currency": "TRY",
    "enable3D": true,
    "enableInstallment": true,
    "maxInstallment": 12
  }
}
```

### 2. Ödeme Oluşturma

**Otomatik POS Seçimi (Varsayılan):**
```bash
POST http://localhost:3009/api/payments/create
{
  "hotelId": "hotel-123",
  "amount": 1000,
  "currency": "TRY",
  "customerName": "Ahmet Yılmaz",
  "customerEmail": "ahmet@example.com",
  "reservationId": "res-123"
}
```

**Manuel POS Seçimi:**
```bash
POST http://localhost:3009/api/payments/create
{
  "hotelId": "hotel-123",
  "provider": "garanti_pay",
  "amount": 1000,
  ...
}
```

### 3. POS Yönetimi

**Tüm POS'ları Listele:**
```bash
GET http://localhost:3009/api/pos-config?hotelId=hotel-123
```

**Aktif POS'ları Listele:**
```bash
GET http://localhost:3009/api/pos-config/active?hotelId=hotel-123
```

**POS'u Aktif Et:**
```bash
POST http://localhost:3009/api/pos-config/{id}/activate
```

**Varsayılan POS Yap:**
```bash
POST http://localhost:3009/api/pos-config/{id}/set-default?hotelId=hotel-123
```

---

## 🔧 Yeni Banka Ekleme

### 1. Provider Oluştur

```typescript
// src/providers/banks/akbank-pos.provider.ts
import { Injectable } from '@nestjs/common';
import { IPOSProvider } from '../interfaces/pos-provider.interface';

@Injectable()
export class AkbankPOSProvider implements IPOSProvider {
  constructor(credentials: POSCredentials, isTestMode: boolean) {
    // Initialize
  }

  async createPayment(data: PaymentRequest): Promise<PaymentResponse> {
    // Akbank specific implementation
  }

  async verifyPayment(data: any): Promise<PaymentVerification> {
    // Verification logic
  }

  async refund(transactionId: string, amount?: number): Promise<RefundResponse> {
    // Refund logic
  }
}
```

### 2. Factory'ye Ekle

```typescript
// src/pos/pos.factory.ts
case BankPOSProvider.AKBANK_POS:
  return new AkbankPOSProvider(config.credentials, config.isTestMode);
```

### 3. Enum'a Ekle

```typescript
// src/entities/pos-configuration.entity.ts
export enum BankPOSProvider {
  ...
  AKBANK_POS = 'akbank_pos',
}
```

---

## 📋 Banka Gereksinimleri

### Garanti BBVA
- Merchant ID
- Terminal ID
- Username
- Password
- Store Key

### İş Bankası
- Client ID
- Store Key
- Username
- Password

### Akbank (Örnek)
- Merchant ID
- Terminal ID
- Store Key
- 3D Secure Key

---

## 🎨 Admin Panel

**POS Yönetim Sayfası:**
- Aktif POS'lar grid görünümü
- Yeni POS ekleme modal
- Banka logoları
- Durum badge'leri
- Hızlı aktif/pasif yapma
- Varsayılan POS seçimi

**Özellikler:**
- Drag & drop öncelik sıralaması
- Test/Production toggle
- Credential güvenli saklama
- Webhook URL'leri

---

## 🔐 Güvenlik Notları

1. **Credentials:** Veritabanında şifrelenmiş saklanmalı
2. **HTTPS:** Production'da zorunlu
3. **Webhook:** Signature verification yapılmalı
4. **Test Mode:** Production'da kapatılmalı
5. **API Keys:** Environment variables'da saklanmalı

---

## 📊 Öncelik Sistemi

POS'lar öncelik sırasına göre denenir:
1. Varsayılan POS (isDefault=true)
2. En yüksek priority değeri
3. En son eklenen

Hata durumunda fallback:
- Primary POS başarısız → Secondary POS
- Tüm POS'lar başarısız → Error

---

**Banka POS mimarisi hazır! Kolayca yeni bankalar eklenebilir! 🏦**
