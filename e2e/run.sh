#!/bin/sh
set -eu

cd "$(dirname "$0")"

if command -v docker >/dev/null 2>&1; then
  engine=docker
elif command -v podman >/dev/null 2>&1; then
  engine=podman
else
  echo "Neither docker nor podman was found on PATH" >&2
  exit 1
fi

exec "$engine" compose -f docker-compose.yml "$@"
