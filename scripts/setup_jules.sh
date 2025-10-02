#!/usr/bin/env bash
set -euo pipefail

echo "=== Jules Setup: prompt-optimizer ==="

# Show environment summary (for debugging)
echo "--- Environment summary ---"
. /opt/environment_summary.sh || true

# 1. Validate Node version
echo "Validating Node version..."
NODE_VERSION=$(node -v | sed 's/v//')
REQUIRED_NODE="18.0.0"
if ! [ "$(printf '%s\n' "$REQUIRED_NODE" "$NODE_VERSION" | sort -V | head -n1)" = "$REQUIRED_NODE" ]; then
  echo "Warning: Node version $NODE_VERSION is below required $REQUIRED_NODE"
fi

# 2. Choose Node version (if necessary)
# If your project expects a specific Node version, you could switch via nvm or use ".nvmrc"
if [ -f .nvmrc ]; then
  echo "Using Node version from .nvmrc"
  nvm install
  nvm use
fi

# 3. Setup environment variables
echo "Setting up environment variables..."
if [ -f env.local.example ] && [ ! -f .env.local ]; then
  echo "Copying env.local.example to .env.local"
  cp env.local.example .env.local
fi

# 4. Install Node / workspace dependencies
if [ -f pnpm-lock.yaml ]; then
  echo "Installing dependencies via pnpm"
  pnpm install --frozen-lockfile
elif [ -f package.json ]; then
  echo "pnpm lockfile not found; fallback to npm"
  npm install
else
  echo "No package manifest found — skipping dependency install"
fi

# 5. Run build tasks (if any)
# If project uses a build step (e.g. bundling / compiling)
if grep -q "\"build\"" package.json; then
  echo "Running build"
  pnpm run build
fi

# 6. Run linters / static analysis
echo "Running lint / static analysis checks"
if command -v eslint >/dev/null 2>&1 && [ -f package.json ]; then
  pnpm lint || true
fi

# 7. Run tests (if any)
echo "Running test suite"
if pnpm run test >/dev/null 2>&1; then
  pnpm test || true
else
  echo "No \`pnpm run test\` script, skipping tests"
fi

# 8. Setup Docker services (if available)
echo "Setting up Docker services..."
if [ -f docker-compose.dev.yml ]; then
  echo "Starting development services with Docker Compose"
  docker compose -f docker-compose.dev.yml up -d || echo "Docker services setup failed, continuing..."
fi

# 9. Version checks
echo "Verifying versions:"
node -v
pnpm -v
npm -v

echo "=== Setup script done ==="