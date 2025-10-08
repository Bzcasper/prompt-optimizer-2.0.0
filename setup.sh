#!/bin/bash
# Jules Environment Setup Script for Prompt Optimizer Project
# This script installs dependencies and prepares the development environment

set -e  # Exit on error

echo "======================================"
echo "Jules Environment Setup"
echo "======================================"

# Check Node.js version
echo "Checking Node.js version..."
node_version=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$node_version" -lt 18 ]; then
    echo "❌ Node.js version 18+ required. Current: $(node -v)"
    exit 1
fi
echo "âœ… Node.js $(node -v) detected"

# Check pnpm
echo "Checking pnpm..."
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm not found. Installing..."
    npm install -g pnpm @10.6.1
fi
echo "âœ… pnpm $(pnpm -v) detected"

# Install dependencies
echo "Installing project dependencies..."
pnpm install

# Build core packages first
echo "Building core packages..."
pnpm -F @prompt-optimizer/core build
echo "âœ… Core package built"

pnpm -F @prompt-optimizer/ui build
echo "âœ… UI package built"

# Run linting to verify code quality
# echo "Running linter..."
# pnpm lint
# echo "âœ… Linting passed"

# Run tests to verify everything works
echo "Running tests..."
pnpm test
echo "âœ… Tests passed"

# Verify project structure
echo "Verifying project structure..."
required_dirs=(
    "packages/core"
    "packages/ui"
    "packages/web"
    "packages/extension"
    "packages/desktop"
    "packages/mcp-server"
)

for dir in "${required_dirs[@]}"; do
    if [ ! -d "$dir" ]; then
        echo "❌ Required directory missing: $dir"
        exit 1
    fi
done
echo "âœ… Project structure verified"

echo ""
echo "======================================"
echo "âœ… Setup Complete!"
echo "======================================"
echo ""
echo "Available commands:"
echo "  pnpm dev              - Start web development server"
echo "  pnpm dev:desktop      - Start desktop app development"
echo "  pnpm dev:ext          - Start extension development"
echo "  pnpm build            - Build all packages"
echo "  pnpm test             - Run all tests"
echo "  pnpm lint             - Run linter"
echo ""
echo "To start development:"
echo "  pnpm dev"
echo ""
