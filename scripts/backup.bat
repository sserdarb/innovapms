@echo off
REM ElektraWEB PMS Database Backup Script (Windows)

set DATE=%date:~-4%%date:~3,2%%date:~0,2%_%time:~0,2%%time:~3,2%%time:~6,2%
set DATE=%DATE: =0%
set BACKUP_DIR=.\backups
set DB_NAME=elektraweb_pms
set DB_USER=postgres
set DB_HOST=localhost
set DB_PORT=5432

REM Create backup directory if it doesn't exist
if not exist %BACKUP_DIR% mkdir %BACKUP_DIR%

REM Backup filename
set BACKUP_FILE=%BACKUP_DIR%\elektraweb_pms_%DATE%.sql

echo 🔄 Starting database backup...

REM Create backup
pg_dump -h %DB_HOST% -p %DB_PORT% -U %DB_USER% -F c -b -v -f %BACKUP_FILE% %DB_NAME%

if %ERRORLEVEL% EQU 0 (
  echo ✅ Backup completed successfully: %BACKUP_FILE%
  
  REM Compress backup (requires 7-Zip or similar)
  if exist "C:\Program Files\7-Zip\7z.exe" (
    "C:\Program Files\7-Zip\7z.exe" a -tgzip %BACKUP_FILE%.gz %BACKUP_FILE%
    del %BACKUP_FILE%
    echo ✅ Backup compressed: %BACKUP_FILE%.gz
  )
) else (
  echo ❌ Backup failed!
  exit /b 1
)

echo ✅ Backup process completed!
pause
