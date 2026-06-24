#!/bin/bash
source "$(dirname "$0")/utils.sh"

if [ -z "$CLOUDFLARE_ZONE_ID" ]; then
    echo "⚠️ CLOUDFLARE_ZONE_ID not set. Skipping maintenance mode."
    exit 0
fi

echo "🚧 Enabling Maintenance Mode for $TARGET_DOMAIN..."
RESPONSE=$(curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/workers/routes" \
     -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
     -H "Content-Type: application/json" \
     --data "{\"pattern\":\"$TARGET_DOMAIN/*\",\"script\":\"$WORKER_NAME\"}")

if [ "$(echo "$RESPONSE" | jq -r '.success')" == "true" ]; then
    echo "✅ Maintenance Route active."
elif echo "$RESPONSE" | jq -r '.errors[].message' 2>/dev/null | grep -qi "route_pattern_exists\|already exists"; then
    echo "⚠️ Maintenance mode already active. Continuing deployment."
else
    echo "❌ Cloudflare Error: $RESPONSE"
    exit 1
fi
