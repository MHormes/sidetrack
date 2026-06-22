#!/bin/bash
set -e

# Move to the root of the project
cd "$(dirname "$0")/.."

# 1. Bepaal het profiel (standaard 'dev')
PROFILE=${1:-dev}

echo "🌟 SideTrack setup — profiel: $PROFILE"

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

    echo "📦 Afhankelijkheden installeren..."
    pnpm install --frozen-lockfile

    bash "$(dirname "$0")/maintenance-on.sh"

    echo "🗄️  PostgreSQL migraties genereren..."
    pnpm db:generate:pg

    echo "🛑 Bestaande containers stoppen..."
    docker compose -f docker-compose.yaml down

    echo "🚀 Bouwen en opstarten..."
    docker compose -f docker-compose.yaml --env-file "$ENV_SOURCE" up -d --build

    bash "$(dirname "$0")/maintenance-off.sh"

    echo ""
    echo "✅ SideTrack is live op $APP_URL"

else
    echo "❌ Onbekend profiel: $PROFILE"
    echo "   Gebruik: bash scripts/setup.sh [dev|local|production]"
    exit 1
fi
