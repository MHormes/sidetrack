#!/bin/bash
set -e

# Move to the root of the project
cd "$(dirname "$0")/.."

# 1. Bepaal het profiel (standaard 'dev')
PROFILE=${1:-dev}

echo "🌟 Sidetrack setup — profiel: $PROFILE"

# ─────────────────────────────────────────────────────────────────────────────
# Cloudflare onderhoudsmodus (alleen actief als CLOUDFLARE_ZONE_ID is ingesteld)
# ─────────────────────────────────────────────────────────────────────────────
toggle_maintenance() {
    local action=$1
    if [ "$PROFILE" = "production" ] && [ -n "$CLOUDFLARE_ZONE_ID" ]; then
        local TARGET_DOMAIN
        TARGET_DOMAIN=$(echo "$APP_URL" | sed -e 's|^[^/]*//||' -e 's|/.*$||')
        local WORKER_NAME="${CLOUDFLARE_WORKER_NAME:-sidetrack-maintenance}"

        if [ "$action" = "on" ]; then
            echo "🚧 Onderhoudsmodus inschakelen voor $TARGET_DOMAIN..."
            RESPONSE=$(curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/workers/routes" \
                 -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
                 -H "Content-Type: application/json" \
                 --data "{\"pattern\":\"$TARGET_DOMAIN/*\",\"script\":\"$WORKER_NAME\"}")
            SUCCESS=$(echo "$RESPONSE" | jq -r '.success')
            if [ "$SUCCESS" = "true" ]; then
                echo "✅ Onderhoudsmodus actief."
            else
                echo "❌ Cloudflare fout: $RESPONSE"
            fi
        else
            echo "🟢 Onderhoudsmodus uitschakelen..."
            ROUTE_ID=$(curl -s -X GET "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/workers/routes" \
                        -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" | \
                        jq -r ".result[] | select(.pattern==\"$TARGET_DOMAIN/*\") | .id")
            if [ -n "$ROUTE_ID" ] && [ "$ROUTE_ID" != "null" ]; then
                curl -s -X DELETE "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/workers/routes/$ROUTE_ID" \
                     -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" > /dev/null
                echo "✅ Site is live."
            else
                echo "⚠️  Geen actieve onderhoudsroute gevonden voor $TARGET_DOMAIN."
            fi
        fi
    fi
}

# ─────────────────────────────────────────────────────────────────────────────
# DEV MODUS — SQLite, geen Docker nodig
# ─────────────────────────────────────────────────────────────────────────────
if [ "$PROFILE" = "dev" ]; then
    echo "🏠 Dev modus: SQLite, geen Docker nodig."

    echo "📦 Afhankelijkheden installeren..."
    pnpm install

    echo "📁 Data-map aanmaken..."
    mkdir -p data

    echo "🗄️  SQLite migraties genereren..."
    pnpm db:generate

    echo "🗄️  SQLite migraties uitvoeren..."
    pnpm db:migrate

    echo ""
    echo "✅ Klaar! Start de dev server met:"
    echo "   pnpm dev"
    echo ""
    echo "   Of gebruik het alias: siddev"

# ─────────────────────────────────────────────────────────────────────────────
# LOCAL MODUS — PostgreSQL via Docker Compose (validatie)
# ─────────────────────────────────────────────────────────────────────────────
elif [ "$PROFILE" = "local" ]; then
    echo "🐳 Local modus: Next.js + PostgreSQL in containers."

    echo "🗄️  PostgreSQL migraties genereren..."
    pnpm db:generate:pg

    echo "🛑 Bestaande containers stoppen..."
    docker compose -f docker-compose-local.yml down

    echo "🚀 Bouwen en opstarten..."
    docker compose -f docker-compose-local.yml up -d --build

    echo ""
    echo "✅ Lokale Docker stack draait op http://localhost:3000"
    echo "   Migraties worden automatisch uitgevoerd bij het opstarten van de container."

# ─────────────────────────────────────────────────────────────────────────────
# PRODUCTION MODUS — PostgreSQL + Cloudflare Tunnel via Docker Compose
# ─────────────────────────────────────────────────────────────────────────────
elif [ "$PROFILE" = "production" ]; then
    ENV_SOURCE=".env.production"

    if [ ! -f "$ENV_SOURCE" ]; then
        echo "❌ Fout: $ENV_SOURCE niet gevonden!"
        echo "   Kopieer .env.production.example naar $ENV_SOURCE en vul de waarden in."
        exit 1
    fi

    echo "📝 Omgevingsvariabelen laden uit $ENV_SOURCE..."
    set -o allexport
    # shellcheck source=/dev/null
    source "$ENV_SOURCE"
    set +o allexport

    toggle_maintenance "on"

    echo "🗄️  PostgreSQL migraties genereren..."
    pnpm db:generate:pg

    echo "🛑 Bestaande containers stoppen..."
    docker compose -f docker-compose.yaml down

    echo "🚀 Bouwen en opstarten..."
    docker compose -f docker-compose.yaml --env-file "$ENV_SOURCE" up -d --build

    toggle_maintenance "off"

    echo ""
    echo "✅ Sidetrack is live op $APP_URL"

else
    echo "❌ Onbekend profiel: $PROFILE"
    echo "   Gebruik: bash scripts/setup.sh [dev|local|production]"
    exit 1
fi
