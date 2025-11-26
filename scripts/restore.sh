#!/bin/bash

# ElektraWEB PMS Database Restore Script

if [ -z "$1" ]; then
  echo "Usage: ./restore.sh <backup_file>"
  echo "Example: ./restore.sh backups/elektraweb_pms_20240120_120000.sql.gz"
  exit 1
fi

BACKUP_FILE=$1
DB_NAME="elektraweb_pms"
DB_USER="postgres"
DB_HOST="localhost"
DB_PORT="5432"

echo "🔄 Starting database restore..."
echo "Backup file: $BACKUP_FILE"

# Check if file exists
if [ ! -f "$BACKUP_FILE" ]; then
  echo "❌ Backup file not found!"
  exit 1
fi

# Decompress if gzipped
if [[ $BACKUP_FILE == *.gz ]]; then
  echo "📦 Decompressing backup..."
  gunzip -k $BACKUP_FILE
  BACKUP_FILE="${BACKUP_FILE%.gz}"
fi

# Restore database
echo "🔄 Restoring database..."
PGPASSWORD=$POSTGRES_PASSWORD pg_restore \
  -h $DB_HOST \
  -p $DB_PORT \
  -U $DB_USER \
  -d $DB_NAME \
  -c \
  -v \
  $BACKUP_FILE

if [ $? -eq 0 ]; then
  echo "✅ Database restored successfully!"
else
  echo "❌ Restore failed!"
  exit 1
fi
