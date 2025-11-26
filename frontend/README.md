# ElektraWEB PMS - Frontend Kurulum Kılavuzu

## 📋 Gereksinimler

### Node.js Kurulumu

Frontend'i çalıştırmak için Node.js gereklidir.

**İndirme:**
1. https://nodejs.org/en/download adresine gidin
2. "Windows Installer (.msi)" - **LTS versiyonunu** indirin (önerilir)
3. İndirilen dosyayı çalıştırın

**Kurulum Adımları:**
1. "Next" butonuna tıklayın
2. Lisans sözleşmesini kabul edin
3. Varsayılan kurulum dizinini kullanın
4. "Automatically install necessary tools" seçeneğini **işaretleyin**
5. "Install" butonuna tıklayın
6. Kurulum tamamlandığında bilgisayarı yeniden başlatın

**Doğrulama:**
```cmd
node --version
npm --version
```

Her iki komut da versiyon numarası göstermelidir (örn: v20.10.0, 10.2.3)

---

## 🚀 Frontend Kurulumu

### 1. Proje Klasörüne Git
```cmd
cd C:\Users\Serdar Bayraktaroğlu\.gemini\antigravity\scratch\elektraweb-pms\frontend
```

### 2. Bağımlılıkları Yükle
```cmd
npm install
```

Bu işlem 2-5 dakika sürebilir. İnternet bağlantınızın stabil olduğundan emin olun.

### 3. Geliştirme Sunucusunu Başlat
```cmd
npm run dev
```

**Başarılı Çıktı:**
```
  VITE v5.0.11  ready in 1234 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

### 4. Tarayıcıda Aç

http://localhost:5173 adresine gidin

---

## 🔐 Giriş Bilgileri

```
Kullanıcı Adı: admin
Şifre: admin123
```

---

## 📱 Kullanılabilir Sayfalar

- **Dashboard:** Ana sayfa, istatistikler
- **Roomrack:** Oda durumu grid görünümü
- **Rezervasyonlar:** Rezervasyon listesi ve yönetimi
- **Folyolar:** Folyo listesi ve tahsilat

---

## 🛠️ Faydalı Komutlar

### Geliştirme Modu
```cmd
npm run dev
```
Hot-reload ile geliştirme sunucusu başlatır.

### Production Build
```cmd
npm run build
```
Optimize edilmiş production build oluşturur.

### Build Önizleme
```cmd
npm run preview
```
Production build'i önizler.

### Lint Kontrolü
```cmd
npm run lint
```
Kod kalitesi kontrolü yapar.

---

## ⚠️ Sorun Giderme

### "npm: command not found"
- Node.js kurulu değil veya PATH'e eklenmemiş
- Bilgisayarı yeniden başlatın
- Node.js'i yeniden kurun

### Port 5173 Kullanımda
```cmd
# vite.config.ts dosyasında portu değiştirin
server: {
  port: 5174,  // Farklı bir port
}
```

### Bağımlılık Hataları
```cmd
# node_modules ve package-lock.json'u sil
rm -rf node_modules package-lock.json
# Yeniden yükle
npm install
```

### API Bağlantı Hatası
- Backend servislerinin çalıştığından emin olun
- API Gateway'in 3000 portunda çalıştığını kontrol edin

---

## 🎨 Özellikler

### Mevcut
- ✅ Modern, responsive UI
- ✅ Login/Logout
- ✅ Dashboard istatistikleri
- ✅ Roomrack grid görünümü
- ✅ Rezervasyon listesi
- ✅ Folyo yönetimi
- ✅ Type-safe TypeScript
- ✅ Real-time data fetching

### Gelecek (Opsiyonel)
- [ ] Rezervasyon formu
- [ ] Folyo detay sayfası
- [ ] Charts & graphs
- [ ] Dark mode
- [ ] Multi-language

---

## 📊 Teknoloji Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **TanStack Query** - Data fetching
- **Zustand** - State management
- **React Router** - Routing
- **Axios** - HTTP client

---

## 🔗 Linkler

- Frontend: http://localhost:5173
- API Gateway: http://localhost:3000/api/docs
- Auth Service: http://localhost:3001/api/docs
- Hotel Service: http://localhost:3002/api/docs

---

**Frontend hazır! Başarılar! 🚀**
