#!/bin/sh
set -eu

lock_hash=$(sha256sum /app/package-lock.json | cut -d ' ' -f 1)
stamp=/app/node_modules/.e2e-lock-hash

if [ "$(cat "$stamp" 2>/dev/null || true)" != "$lock_hash" ]; then
  echo "Installing app dependencies in the container (package-lock.json changed)"
  (cd /app && npm ci --no-audit --no-fund)
  echo "$lock_hash" > "$stamp"
fi

exec "$@"
