#!/bin/bash

# 1. Configuratie laden
BASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$BASE_DIR/../.env.production"

if [ -f "$ENV_FILE" ]; then
    echo "📖 Configuratie lezen uit $ENV_FILE..."
    export $(grep -v '^#' "$ENV_FILE" | xargs)
else
    echo "❌ Fout: $ENV_FILE niet gevonden!"
    exit 1
fi

# 2. Instellingen
BACKUP_BASE_DIR="${BACKUP_DIR:-$BASE_DIR/../backups}"
TIMESTAMP=$(date +%Y-%m-%d_%H-%M-%S)
BACKUP_DIR="$BACKUP_BASE_DIR/$TIMESTAMP"
DB_CONTAINER="sidetrack_db"

# Parse DATABASE_URL → postgres://user:password@host:port/dbname
DB_USER=$(echo "$DATABASE_URL" | sed -E 's|postgres://([^:]+):.*|\1|')
DB_NAME=$(echo "$DATABASE_URL" | sed -E 's|.*/([^/?]+).*$|\1|')

mkdir -p "$BACKUP_DIR/csv"

echo "📂 Starten van backup naar $BACKUP_DIR..."

# 3. Database tabellen exporteren naar CSV
echo "🐘 Database tabellen exporteren naar CSV..."

# Haal alle tabellen op, exclusief Drizzle's interne migratietabel
TABLES=$(docker exec "$DB_CONTAINER" psql -U "$DB_USER" -d "$DB_NAME" -t -c \
    "SELECT table_name FROM information_schema.tables \
     WHERE table_schema = 'public' \
       AND table_type = 'BASE TABLE' \
       AND table_name != '__drizzle_migrations';")

for TABLE in $TABLES; do
    echo "   -> Exporteren van $TABLE..."
    docker exec "$DB_CONTAINER" psql -U "$DB_USER" -d "$DB_NAME" \
        -c "COPY $TABLE TO STDOUT WITH (FORMAT CSV, HEADER);" \
        > "$BACKUP_DIR/csv/$TABLE.csv"
done

# 4. Controle en opschonen
if [ "$(ls -A "$BACKUP_DIR/csv")" ]; then
    echo "✅ Backup voltooid op $(date)"
    echo "📍 CSV's staan in: $BACKUP_DIR/csv"

    # Navigeer naar de hoofdmap voor opschonen
    cd "$BACKUP_BASE_DIR" || exit

    # Behoud alleen de 3 nieuwste mappen
    echo "🧹 Controleren op oude backups (maximaal 3 behouden)..."
    ls -dt */ | tail -n +4 | xargs -I {} rm -rf "{}"
    echo "✨ Backup opgeschoond."
else
    echo "❌ Backup mislukt! De backup map is leeg. Geen oude backups verwijderd."
    exit 1
fi
