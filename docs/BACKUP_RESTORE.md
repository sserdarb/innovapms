# ElektraWEB PMS - Backup & Restore Kılavuzu

## 📦 Veritabanı Yedekleme

### Otomatik Yedekleme (Windows)

**Manuel Yedekleme:**
```cmd
cd C:\Users\Serdar Bayraktaroğlu\.gemini\antigravity\scratch\elektraweb-pms
scripts\backup.bat
```

**Zamanlanmış Yedekleme (Windows Task Scheduler):**
1. Task Scheduler'ı açın
2. "Create Basic Task" seçin
3. İsim: "ElektraWEB PMS Daily Backup"
4. Trigger: Daily, 02:00 AM
5. Action: Start a program
6. Program: `C:\Users\Serdar Bayraktaroğlu\.gemini\antigravity\scratch\elektraweb-pms\scripts\backup.bat`
7. Finish

### Linux/Mac Yedekleme

```bash
chmod +x scripts/backup.sh
./scripts/backup.sh
```

**Cron ile Otomatik Yedekleme:**
```bash
# Her gün saat 02:00'de yedek al
0 2 * * * /path/to/elektraweb-pms/scripts/backup.sh
```

---

## 🔄 Veritabanı Geri Yükleme

### Windows

```cmd
# Yedek dosyasını belirtin
scripts\restore.bat backups\elektraweb_pms_20240120_120000.sql.gz
```

### Linux/Mac

```bash
chmod +x scripts/restore.sh
./scripts/restore.sh backups/elektraweb_pms_20240120_120000.sql.gz
```

---

## 📁 Yedek Dosyaları

**Konum:** `./backups/`

**Format:** `elektraweb_pms_YYYYMMDD_HHMMSS.sql.gz`

**Saklama Süresi:** 30 gün (otomatik temizlenir)

---

## ⚠️ Önemli Notlar

1. **PostgreSQL Gerekli:** pg_dump ve pg_restore komutları PATH'te olmalı
2. **Yetki:** PostgreSQL kullanıcı şifresi gerekli
3. **Disk Alanı:** Yeterli disk alanı olduğundan emin olun
4. **Test:** Restore işlemini test ortamında deneyin

---

## 🔐 Güvenlik

- Yedek dosyalarını güvenli bir yerde saklayın
- Şifreli backup için GPG kullanabilirsiniz
- Offsite backup (cloud) önerilir

---

**Yedekleme sistemi hazır!** 🚀
