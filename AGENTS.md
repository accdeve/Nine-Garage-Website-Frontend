# AGENTS.md - Development Guide for Nine Garage Website

This document provides essential context and guidelines for agentic coding assistants operating in the Nine Garage Website Frontend repository.

## 1. Project Overview

- **Tech Stack**: Nuxt 4 (Vue 3 Composition API), TypeScript, Pinia, Nuxt UI (Tailwind CSS).
- **Domain**: Automotive workshop, retail, and distributor system (Nine Garage).
- **Structure**: Follows Nuxt 4 conventions with the core application located in the `app/` directory.

## 2. Core Commands

| Action           | Command                                              |
| :--------------- | :--------------------------------------------------- |
| **Development**  | `npm run dev`                                        |
| **Build**        | `npm run build`                                      |
| **Lint**         | `npx eslint .`                                       |
| **Type Check**   | `npx nuxi typecheck`                                 |
| **Post Install** | `npm run postinstall` (Nuxt prepare)                 |
| **Single Test**  | _(Not yet implemented - Use Vitest if adding tests)_ |

## 3. Code Style & Conventions

### 3.1 Vue Components

- **API**: Always use `<script setup lang="ts">`.
- **Naming**: PascalCase for files (e.g., `ProductCard.vue`) and components.
- **Organization**:
  - Components in `app/components/` (grouped by feature).
  - Pages in `app/pages/`.
  - Layouts in `app/layouts/`.
- **Props**: Use type-based `defineProps<{ ... }>()`.

### 3.2 State Management (Pinia)

- Use **Setup Store** syntax (refs and computeds) instead of Options API.
- Stores are located in `app/stores/`.
- Example: `export const useStore = defineStore('id', () => { ... })`.

### 3.3 TypeScript & Types

- Explicit types for complex objects and API responses.
- Prefer `interface` over `type` for object definitions.
- Use `import type` for type-only imports to optimize build.
- Place shared models in `app/models/`.

### 3.4 API & Error Handling

- Use the utility wrapper in `app/utils/api.ts` (`apiRequest`, `apiGet`, `apiPost`).
- Error handling should be centralized; the wrapper throws a structured `ApiError`.
- Nuxt `$fetch` is used under the hood with `useRuntimeConfig` for the base URL.

### 3.5 Styling & UI

- **Framework**: Tailwind CSS via Nuxt UI (`@nuxt/ui`).
- **Icons**: Use Lucide icons via the `i-lucide-[name]` class pattern.
- **Color Palette**:
  - `primary`: `#18181b` (Dark/Zinc)
  - `secondary`: `#71717a` (Gray)
  - `accent`/`success`: `#22c55e` (Green)
  - `danger`: `#ef4444` (Red)
- **Transitions**: Follow the page transition pattern in `app/app.vue`.

## 4. Domain & Business Logic

Nine Garage operates with a "Strict Schema, Flexible Logic" philosophy. Refer to `schema/full_context.md` for deep context. Key layers include:

### 4.1 Product & Catalog

- **Hierarchy**: `Brand` -> `Category` -> `Product` (Marketing) -> `Variant` (Physical SKU).
- **Specs**: Stored in `variant.specs` (JSONB) for attributes like voltage, material, etc.

### 4.2 Services & Installation

- **Services**: Defines technical labor (e.g., "Retrofit Headlamp").
- **Requirements**: Products can require mandatory services (`variant_required_services`).
- **Installation**: Operational record of work performed by technicians.

### 4.3 Pricing Engine

- Supports standalone product pricing, standalone service pricing, and **Variant-Service pricing** (service price depends on the product variant).
- **Bundling**: `product_packages` combine products and services with a locked contract price.

### 4.4 Booking & Orders

- **Bookings**: Purely for scheduling and arrangement (Pre-transaction).
- **Orders**: Financial transactions (Offline Workshop or Online Shop). Stock reduction happens upon order completion/installation.

### 4.5 Customers & Community

- **Loyalty**: Point-based system (`point_ledger`) for purchases, reviews, and referrals.
- **Affiliation**: Customers can be associated with automotive communities.

## 5. Workflow Expectations

1. **Directory Structure**: Respect the Nuxt 4 `app/` directory layout. Do not place core logic in the root unless it's configuration.
2. **Auto-imports**: Leverage Nuxt's auto-importing for composables, stores, and components. Avoid manual imports for core Nuxt/Vue functions.
3. **Environment**: Use `NUXT_PUBLIC_GOOGLE_CLIENT_ID` for Google Auth and ensure `public.apiBaseUrl` is configured in `nuxt.config.ts` or `.env`.
4. **Schema First**: Consult `schema/` before implementing new features to ensure data structures align with the backend PostgreSQL 18+ target.

## 6. Language & Localization

- **UI Labels**: Use Bahasa Indonesia for user-facing text (e.g., "Buat Janji Pemasangan", "Riwayat Poin").
- **Documentation**: Technical comments and documentation should remain in English.
- **Placeholders**: Use realistic placeholder data (Indonesian car models, plate numbers like "B 1234 ABC") when building prototypes.

## 7. Development Best Practices

- **Performance**: Use Nuxt's built-in optimizations (e.g., `lazy` components, `useAsyncData`).
- **Security**: Never expose secrets. Use environment variables via `useRuntimeConfig`.
- **Accessibility**: Use Nuxt UI's accessible components and ensure proper ARIA labels where necessary.
- **Responsive Design**: Mobile-first approach using Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`).

---

_Note: This file is optimized for consumption by AI agents. Keep it updated as the project evolves._
