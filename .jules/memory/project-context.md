# Project Context Memory

## Project Identity
**Name**: Prompt Optimizer  
**Type**: Monorepo TypeScript/Vue 3 Application  
**Purpose**: Multi-platform prompt optimization tool (Web, Desktop, Browser Extension, MCP Server)

## Architecture Overview

### Monorepo Structure
- **Package Manager**: pnpm workspaces (CRITICAL: Never use npm/yarn)
- **Workspace Packages**: 6 main packages in `packages/` directory
- **Build Tool**: Vite for frontends, tsup for libraries
- **Test Framework**: Vitest across all packages

### Core Packages
1. ** @prompt-optimizer/core** - Shared business logic and utilities
2. ** @prompt-optimizer/ui** - Shared Vue 3 component library
3. ** @prompt-optimizer/web** - Main web application
4. ** @prompt-optimizer/extension** - Browser extension
5. ** @prompt-optimizer/desktop** - Electron desktop app
6. ** @prompt-optimizer/mcp-server** - Model Context Protocol server

## Technology Stack

### Frontend
- Vue 3.5.13 (Composition API)
- TypeScript 5.8.2
- Element Plus (UI components)
- Vite (build tool)
- @vueuse/core (composables)

### Backend/Server
- Express (MCP server)
- @modelcontextprotocol/sdk
- Node.js 18+

### Build & Development
- pnpm 10.6.1 (workspace manager)
- tsup (library bundler)
- Vitest (testing)
- ESLint (linting)
- electron-builder (desktop app)

### Key Dependencies
- Element Plus icons
- date-fns (date handling)
- lodash-es (utilities)
- vue-i18n (internationalization)

## Build Dependencies

### Critical Build Order
1. **First**: @prompt-optimizer/core
2. **Second**: @prompt-optimizer/ui  
3. **Then**: web, extension, desktop (parallel)

**Why**: UI and other packages depend on core; other packages depend on UI

## Development Workflows

### Standard Development
```bash
pnpm dev              # Web app development
pnpm dev:desktop      # Desktop app development
pnpm dev:ext          # Extension development
```

### Building
```bash
pnpm build            # Build all packages (respects dependency order)
pnpm build:core       # Build core only
pnpm build:ui         # Build UI only
```

### Testing
```bash
pnpm test                              # All tests
pnpm -F @prompt-optimizer/core test    # Package-specific tests
```

## Code Quality Standards

### TypeScript
- Strict mode enabled
- Explicit return types preferred
- Use proper type imports/exports

### Vue 3
- Composition API (not Options API)
- `<script setup>` syntax
- PascalCase for component names
- Props with TypeScript interfaces

### Testing
- Unit tests for business logic
- Integration tests for cross-package flows
- Tests colocated with code or in tests/ directory
- Minimum coverage: aim for 60%+

### Commits
- Conventional Commits format required
- Format: `type(scope): description`
- Types: feat, fix, refactor, build, docs, test, chore

## Environment Configuration

### Required Environment Variables
- `NODE_ENV`: development/production/test
- `PORT`: Dev server port (default: 5173)
- `MCP_SERVER_PORT`: MCP server port (default: 3001)

### Configuration Files
- `.env.local`: Local environment variables (NOT committed)
- `.env.local.example`: Template for environment variables
- `setup.sh`: Jules environment setup script

## Package Management

### pnpm Workspace Commands
```bash
pnpm -F <package-name> <command>      # Run command in specific package
pnpm -r <command>                     # Run command in all packages
pnpm install                          # Install all dependencies
```

### Version Management
```bash
pnpm version:sync     # Sync versions across packages
pnpm version:prepare  # Prepare version bump
pnpm version:tag      # Create git tag
```

## Critical Constraints

### DO NOT
- Use npm or yarn (pnpm only)
- Commit `.env.local` files
- Commit `node_modules/` or `dist/` folders
- Break build dependency order
- Skip linting before commit

### ALWAYS
- Run `pnpm lint` before committing
- Run `pnpm test` before submitting PR
- Use pnpm for all package operations
- Follow conventional commit format
- Build core and UI before other packages

## Common Issues & Solutions

### Build Failures
1. Clean build artifacts: `pnpm clean`
2. Reinstall dependencies: `pnpm install`
3. Check build order (core → ui → others)

### Test Failures
1. Run tests in isolation: `pnpm -F <package> test`
2. Check for stale mocks or test data
3. Verify environment variables

### Linting Errors
1. Auto-fix: `pnpm lint:fix`
2. Check ESLint configuration in affected package

## Project Status
- **Active Development**: Yes
- **Primary Branch**: main
- **Node Version**: 18+ (18/20/22 supported)
- **Package Manager Version**: pnpm 10.6.1

## Recent Context
[Jules will append recent work context here during sessions]

## Known Issues
[Jules will track known issues discovered during development]

## Next Steps
[Jules will track planned next steps from conversations]
