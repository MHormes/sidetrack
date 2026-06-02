#!/bin/bash

REMOTE_HOST="sidetrack"
BASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REMOTE_BACKUPS_DIR="~/sidetrack/backups"
LOCAL_DEST="$HOME/Desktop/SidetrackBackups"

echo "🔍 Checking latest backup on $REMOTE_HOST..."
FOLDER_NAME=$(ssh "$REMOTE_HOST" "ls -1 $REMOTE_BACKUPS_DIR | grep -E '^[0-9]{4}-' | sort -r | head -1 | tr -d '\r\n'")

if [ -z "$FOLDER_NAME" ]; then
    echo "❌ No backups found on $REMOTE_HOST at $REMOTE_BACKUPS_DIR"
    exit 1
fi

echo "📦 Latest backup: $FOLDER_NAME"
mkdir -p "$LOCAL_DEST"

read -rp "Copy to $LOCAL_DEST/$FOLDER_NAME? (y/n) " CONFIRM
[ "$CONFIRM" != "y" ] && exit 0

echo "📥 Copying $FOLDER_NAME..."
scp -r "$REMOTE_HOST:$REMOTE_BACKUPS_DIR/$FOLDER_NAME" "$LOCAL_DEST/"

echo "✅ Done. Backup saved to $LOCAL_DEST/$FOLDER_NAME"

echo ""
read -rp "Stage for local Docker seed? Copies csv/ → database/data/ (y/n) " STAGE
if [ "$STAGE" = "y" ]; then
    DATA_DIR="$BASE_DIR/../database/data"
    mkdir -p "$DATA_DIR"

    if [ -d "$LOCAL_DEST/$FOLDER_NAME/csv" ]; then
        echo "📋 Staging CSVs..."
        cp -r "$LOCAL_DEST/$FOLDER_NAME/csv/." "$DATA_DIR/"
    fi

    echo "✅ Staged. Run 'bash scripts/setup.sh production' to boot and seed."
fi
