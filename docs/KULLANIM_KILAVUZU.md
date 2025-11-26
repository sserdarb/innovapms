# InnovaPMS - Kullanım Kılavuzu

## 📖 İçindekiler

1. [Hızlı Başlangıç](#hızlı-başlangıç)
2. [Giriş Yapma](#giriş-yapma)
3. [Dashboard](#dashboard)
4. [Oda Yönetimi (Roomrack)](#oda-yönetimi)
5. [Rezervasyon Yönetimi](#rezervasyon-yönetimi)
6. [Folyo Yönetimi](#folyo-yönetimi)
7. [POS Yönetimi](#pos-yönetimi)
8. [Sık Sorulan Sorular](#sık-sorulan-sorular)

---

## Hızlı Başlangıç

### 1. Sistemi Başlatma

**Windows:**
```cmd
cd elektraweb-pms
setup.bat
```

**Linux/Mac:**
```bash
cd elektraweb-pms
chmod +x setup.sh
./setup.sh
```

### 2. Frontend Başlatma

```cmd
cd frontend
npm install
npm run dev
```

### 3. Tarayıcıda Açma

http://localhost:5173

---

## Giriş Yapma

### İlk Giriş

1. Tarayıcınızda `http://localhost:5173` adresine gidin
2. Giriş bilgilerini girin:
   - **Kullanıcı Adı:** `admin`
   - **Şifre:** `admin123`
3. "Giriş Yap" butonuna tıklayın

### Şifre Değiştirme

1. Sağ üst köşedeki profil simgesine tıklayın
2. "Ayarlar" seçeneğini seçin
3. "Şifre Değiştir" bölümünden yeni şifrenizi belirleyin

---

## Dashboard

### Genel Bakış

Dashboard sayfası otel işletmenizin genel durumunu gösterir.

**Gösterilen Bilgiler:**
- 📊 Bugünkü doluluk oranı
- 💰 Günlük gelir
- 📅 Aktif rezervasyon sayısı
- 🏨 Toplam oda sayısı

**Grafikler:**
- **Doluluk Grafiği:** Son 7 günün doluluk oranı
- **Gelir Grafiği:** Günlük gelir trendi

### Kullanım

1. Sol menüden "Dashboard" seçeneğine tıklayın
2. Kartlarda özet bilgileri görüntüleyin
3. Grafikleri inceleyerek trend analizi yapın

---

## Oda Yönetimi

### Roomrack (Oda Tablosu)

Tüm odaların anlık durumunu görüntüleyin.

**Oda Durumları:**
- 🟢 **Müsait:** Oda boş ve temiz
- 🔴 **Dolu:** Oda misafir tarafından kullanılıyor
- 🟡 **Kirli:** Oda temizlenmesi gerekiyor
- 🔵 **Bakımda:** Oda bakımda

### Oda Durumu Değiştirme

1. "Roomrack" sayfasına gidin
2. Değiştirmek istediğiniz odaya tıklayın
3. Açılan menüden yeni durumu seçin
4. Değişiklik otomatik kaydedilir

### Oda Detayları

1. Oda kartına tıklayın
2. Oda bilgilerini görüntüleyin:
   - Oda numarası
   - Oda tipi
   - Fiyat
   - Maksimum kapasite
   - Mevcut misafir (varsa)

---

## Rezervasyon Yönetimi

### Yeni Rezervasyon Oluşturma

1. "Rezervasyonlar" sayfasına gidin
2. "Yeni Rezervasyon" butonuna tıklayın
3. Formu doldurun:
   - **Misafir Bilgileri:**
     - Ad Soyad
     - Email
     - Telefon
   - **Rezervasyon Bilgileri:**
     - Giriş tarihi
     - Çıkış tarihi
     - Oda tipi
     - Yetişkin sayısı
     - Çocuk sayısı
4. "Kaydet" butonuna tıklayın

### Rezervasyon Arama

1. Arama kutusuna misafir adı veya rezervasyon numarası yazın
2. Tarih filtresini kullanarak belirli tarihleri seçin
3. Durum filtresinden rezervasyon durumunu seçin:
   - Beklemede
   - Onaylandı
   - Check-in yapıldı
   - Check-out yapıldı
   - İptal edildi

### Rezervasyon Düzenleme

1. Düzenlemek istediğiniz rezervasyona tıklayın
2. "Düzenle" butonuna tıklayın
3. Gerekli değişiklikleri yapın
4. "Güncelle" butonuna tıklayın

### Check-in İşlemi

1. Rezervasyon listesinde ilgili rezervasyonu bulun
2. "Check-in" butonuna tıklayın
3. Oda numarasını onaylayın
4. İşlemi tamamlayın

### Check-out İşlemi

1. Aktif rezervasyonu bulun
2. "Check-out" butonuna tıklayın
3. Folyo özetini kontrol edin
4. Ödeme durumunu onaylayın
5. İşlemi tamamlayın

---

## Folyo Yönetimi

### Folyo Nedir?

Folyo, misafirin konaklama süresince yaptığı tüm harcamaların kaydedildiği belgedir.

### Folyo Görüntüleme

1. "Folyolar" sayfasına gidin
2. Görüntülemek istediğiniz folyoya tıklayın
3. Detayları inceleyin:
   - Misafir bilgileri
   - Oda ücreti
   - Ekstra hizmetler
   - Toplam tutar
   - Ödeme durumu

### Folyo'ya Ücret Ekleme

1. Folyoyu açın
2. "Ücret Ekle" butonuna tıklayın
3. Bilgileri girin:
   - Hizmet adı (örn: Minibar, Spa, Restoran)
   - Tutar
   - Açıklama
4. "Ekle" butonuna tıklayın

### Ödeme Alma

1. Folyoyu açın
2. "Ödeme Al" butonuna tıklayın
3. Ödeme yöntemini seçin:
   - Nakit
   - Kredi Kartı
   - Banka Transferi
4. Tutarı girin
5. "Onayla" butonuna tıklayın

### Folyo Yazdırma

1. Folyoyu açın
2. "Yazdır" butonuna tıklayın
3. PDF olarak indirilir veya doğrudan yazdırılır

---

## POS Yönetimi

### POS Nedir?

POS (Point of Sale - Satış Noktası), kredi kartı ödemelerini almak için kullanılan sanal pos sistemleridir.

### Aktif POS'ları Görüntüleme

1. "POS Yönetimi" sayfasına gidin
2. Aktif POS'ların listesini görün
3. Her POS için:
   - Banka/Sağlayıcı adı
   - Durum (Aktif/Pasif)
   - Varsayılan olup olmadığı

### Yeni POS Ekleme

1. "Yeni POS Ekle" butonuna tıklayın
2. POS sağlayıcısını seçin:
   - **Payment Gateway'ler:** Stripe, iyzico, PayTR
   - **Türk Bankaları:** Garanti BBVA, İş Bankası, Akbank, vb.
3. Gerekli bilgileri girin:
   - Merchant ID
   - Terminal ID
   - API Key/Secret
   - Güvenlik anahtarları
4. Test modunu seçin (geliştirme için)
5. "Kaydet" butonuna tıklayın

### POS'u Aktif/Pasif Yapma

1. POS listesinde ilgili POS'u bulun
2. "Aktif Et" veya "Pasif Et" butonuna tıklayın
3. Değişiklik anında uygulanır

### Varsayılan POS Belirleme

1. Varsayılan yapmak istediğiniz POS'u seçin
2. "Varsayılan Yap" butonuna tıklayın
3. Bu POS artık otomatik olarak kullanılacaktır

### POS Test Etme

1. Test modunda bir POS ekleyin
2. Küçük bir test ödemesi yapın (örn: 1 TL)
3. Ödeme başarılı olursa POS çalışıyordur
4. Production'a geçmeden önce mutlaka test edin

---

## Sık Sorulan Sorular

### Sistem Hakkında

**S: Sistem kaç kullanıcıyı destekler?**  
C: Sınırsız kullanıcı destekler. Her kullanıcı için farklı roller atanabilir.

**S: Çoklu otel yönetimi yapılabilir mi?**  
C: Evet, multi-tenancy desteği vardır. Her otel için ayrı veri tutulur.

**S: Offline çalışır mı?**  
C: Hayır, internet bağlantısı gereklidir.

### Rezervasyonlar

**S: Rezervasyon iptal edilebilir mi?**  
C: Evet, rezervasyon detaylarından "İptal Et" butonuna tıklayarak iptal edebilirsiniz.

**S: Toplu rezervasyon yapılabilir mi?**  
C: Şu anda tek tek rezervasyon yapılabilir. Toplu rezervasyon özelliği gelecek versiyonda eklenecek.

**S: Rezervasyon onay maili gönderilir mi?**  
C: Evet, SMTP ayarları yapıldıysa otomatik email gönderilir.

### Ödemeler

**S: Hangi ödeme yöntemleri desteklenir?**  
C: Nakit, kredi kartı (16 farklı POS), banka transferi desteklenir.

**S: Taksitli ödeme yapılabilir mi?**  
C: Evet, destekleyen POS'lar için taksit seçeneği mevcuttur.

**S: Ödeme iade edilebilir mi?**  
C: Evet, folyo üzerinden kısmi veya tam iade yapılabilir.

### Teknik

**S: Veritabanı yedeği nasıl alınır?**  
C: `scripts/backup.sh` (Linux) veya `scripts/backup.bat` (Windows) scriptini çalıştırın.

**S: Sistem güncellemesi nasıl yapılır?**  
C: Git repository'den son versiyonu çekin ve servisleri yeniden başlatın.

**S: Log dosyaları nerede?**  
C: Her servisin kendi klasöründe `logs/` dizininde bulunur.

---

## Klavye Kısayolları

| Kısayol | Açıklama |
|---------|----------|
| `Ctrl + K` | Hızlı arama |
| `Ctrl + N` | Yeni rezervasyon |
| `Ctrl + P` | Yazdır |
| `Ctrl + S` | Kaydet |
| `Esc` | Modal kapat |

---

## Destek

### Teknik Destek

- **Email:** support@elektraweb.com
- **Telefon:** +90 XXX XXX XX XX
- **Dokümantasyon:** `/docs` klasörü

### Güncellemeler

Sistem güncellemeleri için GitHub repository'yi takip edin:
```
git pull origin main
```

---

## Önemli Notlar

⚠️ **Güvenlik:**
- Varsayılan şifreyi mutlaka değiştirin
- SSL sertifikası kullanın (production)
- Düzenli yedek alın

⚠️ **Performans:**
- Veritabanını düzenli optimize edin
- Log dosyalarını temizleyin
- Redis cache'i kullanın

⚠️ **Yedekleme:**
- Günlük otomatik yedek alın
- Yedekleri farklı lokasyonda saklayın
- Restore işlemini test edin

---

**ElektraWEB PMS - Otel Yönetim Sistemi**  
**Versiyon:** 1.0.0  
**Son Güncelleme:** 2024-01-20
