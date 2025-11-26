@echo off
REM ElektraWEB PMS - Windows Hızlı Başlatma Scripti

echo.
echo ========================================
echo ElektraWEB PMS Kurulumu Basliyor...
echo ========================================
echo.

REM Docker kontrolü
docker --version >nul 2>&1
if errorlevel 1 (
    echo [HATA] Docker bulunamadi. Lutfen once Docker Desktop'i kurun.
    pause
    exit /b 1
)

docker-compose --version >nul 2>&1
if errorlevel 1 (
    echo [HATA] Docker Compose bulunamadi.
    pause
    exit /b 1
)

echo [OK] Docker ve Docker Compose bulundu
echo.

REM .env dosyası kontrolü
if not exist .env (
    echo [INFO] .env dosyasi olusturuluyor...
    copy .env.example .env
    echo [OK] .env dosyasi olusturuldu
    echo [UYARI] Lutfen .env dosyasindaki sifreleri degistirin!
    echo.
) else (
    echo [OK] .env dosyasi mevcut
    echo.
)

REM Docker konteynerlerini başlat
echo [INFO] Docker konteynerleri baslatiliyor...
docker-compose up -d postgres redis

echo [INFO] Veritabaninin hazir olmasi bekleniyor (10 saniye)...
timeout /t 10 /nobreak >nul

echo [OK] PostgreSQL ve Redis baslatildi
echo.

REM Veritabanı şemasını oluştur
echo [INFO] Veritabani semasi olusturuluyor...
docker exec -i elektraweb-postgres psql -U elektraweb -d elektraweb_pms < database\schema.sql

echo [OK] Veritabani semasi olusturuldu
echo.

REM Seed verilerini yükle
echo [INFO] Baslangic verileri yukleniyor...
docker exec -i elektraweb-postgres psql -U elektraweb -d elektraweb_pms < database\seeds.sql

echo [OK] Baslangic verileri yuklendi
echo.

REM Tüm servisleri başlat
echo [INFO] Tum servisler baslatiliyor...
docker-compose up -d --build

echo.
echo [OK] Tum servisler baslatildi!
echo.

REM Servislerin durumunu göster
echo Servis Durumu:
docker-compose ps

echo.
echo ========================================
echo Kurulum tamamlandi!
echo ========================================
echo.
echo Giris Bilgileri:
echo   Kullanici Adi: admin
echo   Sifre: admin123
echo.
echo Erisim URL'leri:
echo   API Gateway: http://localhost:3000
echo   API Docs: http://localhost:3000/api/docs
echo.
echo Dokumantasyon:
echo   Kurulum Kilavuzu: docs\deployment\INSTALLATION.md
echo   Gelistirici Kilavuzu: docs\DEVELOPMENT.md
echo   API Dokumantasyonu: docs\api\README.md
echo.
echo Faydali Komutlar:
echo   Loglari goruntule: docker-compose logs -f
echo   Servisleri durdur: docker-compose down
echo   Servisleri yeniden baslat: docker-compose restart
echo.
echo Basarilar!
echo.
pause
