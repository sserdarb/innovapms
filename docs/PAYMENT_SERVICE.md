# ElektraWEB PMS - Payment Service Kurulum

## 🔧 Gerekli API Anahtarları

### Stripe
1. https://dashboard.stripe.com adresine gidin
2. API Keys bölümünden:
   - Secret Key
   - Webhook Secret

### iyzico
1. https://merchant.iyzipay.com adresine gidin
2. Ayarlar > API Anahtarları:
   - API Key
   - Secret Key

### PayTR
1. https://www.paytr.com adresine gidin
2. Üye İşyeri Paneli > Entegrasyon:
   - Merchant ID
   - Merchant Key
   - Merchant Salt

---

## 📝 Environment Variables

`.env` dosyasına ekleyin:

```env
# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# iyzico
IYZICO_API_KEY=your_api_key
IYZICO_SECRET_KEY=your_secret_key
IYZICO_BASE_URL=https://sandbox-api.iyzipay.com

# PayTR
PAYTR_MERCHANT_ID=your_merchant_id
PAYTR_MERCHANT_KEY=your_merchant_key
PAYTR_MERCHANT_SALT=your_merchant_salt
PAYTR_BASE_URL=https://www.paytr.com/odeme/api/get-token
PAYTR_TEST_MODE=true
```

---

## 🚀 Kullanım

### Ödeme Oluşturma

**Stripe:**
```bash
POST http://localhost:3009/api/payments/create
{
  "hotelId": "hotel-123",
  "provider": "stripe",
  "amount": 1000,
  "currency": "TRY",
  "customerName": "Ahmet Yılmaz",
  "customerEmail": "ahmet@example.com",
  "reservationId": "res-123"
}
```

**iyzico:**
```bash
POST http://localhost:3009/api/payments/create
{
  "hotelId": "hotel-123",
  "provider": "iyzico",
  "amount": 1000,
  "currency": "TRY",
  "customerName": "Ahmet Yılmaz",
  "customerEmail": "ahmet@example.com",
  "customerPhone": "+905551234567",
  "callbackUrl": "https://yourdomain.com/payment/callback",
  "reservationId": "res-123"
}
```

**PayTR:**
```bash
POST http://localhost:3009/api/payments/create
{
  "hotelId": "hotel-123",
  "provider": "paytr",
  "amount": 1000,
  "currency": "TRY",
  "customerName": "Ahmet Yılmaz",
  "customerEmail": "ahmet@example.com",
  "customerPhone": "5551234567",
  "successUrl": "https://yourdomain.com/success",
  "failUrl": "https://yourdomain.com/fail",
  "reservationId": "res-123"
}
```

### İade İşlemi

```bash
POST http://localhost:3009/api/payments/{transactionId}/refund
{
  "amount": 500  // Opsiyonel, belirtilmezse tam iade
}
```

---

## 🔔 Webhook Kurulumu

### Stripe Webhook
1. Stripe Dashboard > Developers > Webhooks
2. Add endpoint: `https://yourdomain.com/api/payments/webhooks/stripe`
3. Events: `payment_intent.succeeded`, `payment_intent.payment_failed`

### PayTR Callback
- Merchant panelinden callback URL'i ayarlayın:
- `https://yourdomain.com/api/payments/callbacks/paytr`

---

## 🔐 Güvenlik

- ✅ Tüm API anahtarları `.env` dosyasında
- ✅ Webhook signature verification
- ✅ HTTPS zorunlu (production)
- ✅ PCI-DSS compliance

---

## 📊 Test Kartları

### Stripe Test Cards
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`

### iyzico Test Cards
- Success: `5528 7900 0000 0001`
- 3D Secure: `5311 5703 6587 9506`

### PayTR Test Mode
- Test mode aktif olduğunda gerçek ödeme alınmaz

---

**Payment Service hazır! 💳**
