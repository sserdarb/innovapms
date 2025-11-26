#!/bin/bash

# ElektraWEB PMS Database Backup Script

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="./backups"
DB_NAME="elektraweb_pms"
DB_USER="postgres"
DB_HOST="localhost"
DB_PORT="5432"

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Backup filename
BACKUP_FILE="$BACKUP_DIR/elektraweb_pms_$DATE.sql"

echo "🔄 Starting database backup..."

# Create backup
PGPASSWORD=$POSTGRES_PASSWORD pg_dump \
  -h $DB_HOST \
  -p $DB_PORT \
  -U $DB_USER \
  -F c \
  -b \
  -v \
  -f $BACKUP_FILE \
  $DB_NAME

if [ $? -eq 0 ]; then
  echo "✅ Backup completed successfully: $BACKUP_FILE"
  
  # Compress backup
  gzip $BACKUP_FILE
  echo "✅ Backup compressed: $BACKUP_FILE.gz"
  
  # Delete backups older than 30 days
  find $BACKUP_DIR -name "*.gz" -mtime +30 -delete
  echo "🗑️  Old backups cleaned up"
else
  echo "❌ Backup failed!"
  exit 1
fi
