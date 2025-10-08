# Coding Standards

## TypeScript
- Use `strict` mode.
- Avoid `any` where possible.
- Use interfaces for object shapes.

## Vue 3
- Use Composition API with `<script setup>`.
- Components should be named in PascalCase.
- Props should be typed using TypeScript interfaces.

## Naming Conventions
- `components/`: PascalCase (e.g., `MyComponent.vue`)
- `composables/`: camelCase (e.g., `useMyComposable.ts`)
- `services/`: PascalCase (e.g., `MyService.ts`)

## Testing
- Unit tests for logic, UI components, and composables.
- Integration tests for user flows.
- Aim for at least 60% test coverage.
