#!/bin/bash
# Run on a copied staging VM to switch from prod to staging config.
# Swaps CLOUDFLARE_TUNNEL_TOKEN, EMAIL_PROVIDER, and APP_URL in .env.production,
# then restarts Docker Compose so the staging tunnel and Mailtrap become active.
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$SCRIPT_DIR/../.env.production"

if [ ! -f "$ENV_FILE" ]; then
    echo "Error: $ENV_FILE not found"
    exit 1
fi

source <(grep -v '^#' "$ENV_FILE" | grep '=')

: "${CLOUDFLARE_TUNNEL_TOKEN_STAGING:?CLOUDFLARE_TUNNEL_TOKEN_STAGING not set in .env.production}"
: "${APP_URL_STAGING:?APP_URL_STAGING not set in .env.production}"

sed -i \
    -e "s|^CLOUDFLARE_TUNNEL_TOKEN=.*|CLOUDFLARE_TUNNEL_TOKEN=$CLOUDFLARE_TUNNEL_TOKEN_STAGING|" \
    -e "s|^EMAIL_PROVIDER=.*|EMAIL_PROVIDER=disabled|" \
    -e "s|^APP_URL=.*|APP_URL=$APP_URL_STAGING|" \
    -e "s|^NEXT_PRIVATE_SKIP_FETCH_CACHE=.*|NEXT_PRIVATE_SKIP_FETCH_CACHE=1|" \
    "$ENV_FILE"

echo "Switched to staging config."
echo "  Tunnel : staging"
echo "  Email  : disabled"
echo "  Cache  : disabled"
echo "  URL    : $APP_URL_STAGING"
echo ""
echo "Restarting Docker Compose..."
cd "$SCRIPT_DIR/.."
docker compose -f docker-compose.yaml down
docker compose -f docker-compose.yaml --env-file "$ENV_FILE" up -d --build
echo ""
echo "Done. Staging running at $APP_URL_STAGING"
