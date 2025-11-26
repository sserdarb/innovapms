@echo off
REM InnovaPMS - Lokal Kurulum Scripti (Docker'siz)

echo.
echo ========================================
echo InnovaPMS Lokal Kurulum Basliyor...
echo ========================================
echo.

REM Node.js kontrolü
node --version >nul 2>&1
if errorlevel 1 (
    echo [HATA] Node.js bulunamadi!
    echo Lutfen Node.js yukleyin: https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js bulundu
echo.

REM PostgreSQL kontrolü
psql --version >nul 2>&1
if errorlevel 1 (
    echo [UYARI] PostgreSQL bulunamadi veya PATH'e eklenmemis
    echo Lutfen PostgreSQL yukleyin: https://www.postgresql.org/download/
    echo.
)

REM .env dosyası kontrolü
if not exist .env (
    echo [INFO] .env dosyasi olusturuluyor...
    copy .env.example .env
    echo [OK] .env dosyasi olusturuldu
    echo.
    echo [ONEMLI] .env dosyasini acip PostgreSQL sifrenizi girin!
    echo.
    pause
)

echo.
echo ========================================
echo Backend Servisleri Kuruluyor...
echo ========================================
echo.

REM Auth Service
echo [1/10] Auth Service kuruluyor...
cd services\auth-service
call npm install
if errorlevel 1 (
    echo [HATA] Auth Service kurulumunda hata!
    pause
    exit /b 1
)
cd ..\..

REM Hotel Service
echo [2/10] Hotel Service kuruluyor...
cd services\hotel-service
call npm install
cd ..\..

REM Reservation Service
echo [3/10] Reservation Service kuruluyor...
cd services\reservation-service
call npm install
cd ..\..

REM Folio Service
echo [4/10] Folio Service kuruluyor...
cd services\folio-service
call npm install
cd ..\..

REM Integration Service
echo [5/10] Integration Service kuruluyor...
cd services\integration-service
call npm install
cd ..\..

REM Notification Service
echo [6/10] Notification Service kuruluyor...
cd services\notification-service
call npm install
cd ..\..

REM Reports Service
echo [7/10] Reports Service kuruluyor...
cd services\reports-service
call npm install
cd ..\..

REM WebSocket Gateway
echo [8/10] WebSocket Gateway kuruluyor...
cd services\websocket-gateway
call npm install
cd ..\..

REM Payment Service
echo [9/10] Payment Service kuruluyor...
cd services\payment-service
call npm install
cd ..\..

REM API Gateway
echo [10/10] API Gateway kuruluyor...
cd services\api-gateway
call npm install
cd ..\..

echo.
echo [OK] Tum backend servisleri kuruldu!
echo.

REM Frontend
echo ========================================
echo Frontend Kuruluyor...
echo ========================================
echo.
cd frontend
call npm install
if errorlevel 1 (
    echo [HATA] Frontend kurulumunda hata!
    pause
    exit /b 1
)
cd ..

echo.
echo [OK] Frontend kuruldu!
echo.

echo.
echo ========================================
echo Kurulum Tamamlandi!
echo ========================================
echo.
echo Simdi yapmaniz gerekenler:
echo.
echo 1. PostgreSQL'de veritabani olusturun:
echo    - Veritabani adi: innovapms_db
echo    - Kullanici: postgres
echo.
echo 2. Backend servisleri baslatmak icin:
echo    Her servis icin ayri terminal acin ve:
echo    cd services\auth-service
echo    npm run start:dev
echo.
echo 3. Frontend baslatmak icin:
echo    Yeni terminal acin:
echo    cd frontend
echo    npm run dev
echo.
echo 4. Tarayicida acin:
echo    http://localhost:5173
echo.
echo Giris Bilgileri:
echo   Kullanici: admin
echo   Sifre: admin123
echo.
echo Detayli bilgi: KURULUM.md
echo.
pause
