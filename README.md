# 📄 Xtraction — Frontend

**The intelligent document platform that brings your files to life.**

![CI](https://img.shields.io/badge/CI-passing-brightgreen?logo=github-actions&logoColor=white)
![Deploy](https://img.shields.io/badge/Deploy-DigitalOcean-0080FF?logo=digitalocean&logoColor=white)
![Release](https://img.shields.io/badge/Release-semantic--release-e10079?logo=semantic-release&logoColor=white)
[![Angular](https://img.shields.io/badge/Angular-21.x-DD0031?logo=angular&logoColor=white)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![pnpm](https://img.shields.io/badge/pnpm-10.23.0-F69220?logo=pnpm&logoColor=white)](https://pnpm.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Version](https://img.shields.io/badge/version-2.10.3-blue)](./CHANGELOG.md)

[Live App](https://xtraction.brintsgroup.xyz) · [Changelog](./CHANGELOG.md) · [Contributing](./.github/CONTRIBUTING.md)

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Application Routes](#application-routes)
- [Available Scripts](#available-scripts)
- [Environment Configuration](#environment-configuration)
- [Docker & Deployment](#docker--deployment)
- [CI/CD Pipeline](#cicd-pipeline)
- [Code Quality & Standards](#code-quality--standards)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**Xtraction** is a full-featured, AI-powered document management platform. It is a modern **Angular 21** single-page application (SPA) that enables users to upload, extract, manage, and collaborate on documents — with built-in OCR, rich-text editing, subscription management, and intelligent AI assistance.

---

## Key Features

| Feature                                    | Description                                                                       |
|--------------------------------------------|-----------------------------------------------------------------------------------|
| 📑 **Document Management**                 | Upload, organize, view, and manage documents with a rich document viewer          |
| 🔍 **OCR (Optical Character Recognition)** | Extract text from scanned files and images automatically                          |
| 🤖 **AI Assistant**                        | AI-driven insights and intelligent document processing                            |
| ✏️ **Rich Text Editor**                    | TipTap-powered editor with full formatting support (bold, underline, links, etc.) |
| 👥 **Teams & Collaboration**               | Create team workspaces and manage members                                         |
| 💳 **Payments & Subscriptions**            | Paystack-integrated billing with plan management and credits                      |
| 🔔 **Notifications**                       | In-app notification center with per-user preferences                              |
| 🎟️ **Promo Codes**                        | Promo Codes/discount code support at checkout                                     |
| 📊 **Analytics Dashboard**                 | Usage stats and document activity charts via Chart.js                             |
| 🌐 **Landing Page**                        | Public marketing landing page with hero, pricing, testimonials, and FAQs          |
| 🔒 **Auth & Security**                     | JWT-based authentication, route guards, and HTTP interceptors                     |
| ♿ **Accessibility**                        | Lighthouse accessibility score enforced at ≥ 0.9 in CI                            |

---

## Tech Stack

| Category               | Technology                                                                                  |
|------------------------|---------------------------------------------------------------------------------------------|
| **Framework**          | [Angular 21](https://angular.dev)                                                           |
| **Language**           | [TypeScript 5.9](https://www.typescriptlang.org)                                            |
| **Styling**            | [Tailwind CSS v4](https://tailwindcss.com) + PostCSS                                        |
| **Rich Text**          | [TipTap 3](https://tiptap.dev) (with Starter Kit, Link, Underline, Placeholder)             |
| **Charts**             | [Chart.js 4](https://www.chartjs.org) + [ng2-charts](https://valor-software.com/ng2-charts) |
| **HTTP Client**        | Angular `HttpClient` with JWT auth interceptor                                              |
| **Push Notifications** | Firebase Messaging (service worker)                                                         |
| **Package Manager**    | [pnpm 10.23.0](https://pnpm.io)                                                             |
| **Node Version**       | 22.15.1 (managed via [Volta](https://volta.sh))                                             |
| **Containerisation**   | Docker (multi-stage: Node 22 Alpine → Nginx 1.27 Alpine)                                    |
| **Web Server**         | Nginx with Gzip, security headers, and SPA fallback                                         |
| **Testing**            | Karma + Jasmine                                                                             |
| **Linting**            | Angular ESLint                                                                              |
| **Releases**           | [semantic-release](https://semantic-release.gitbook.io)                                     |
| **Commits**            | [Commitizen](https://commitizen-tools.github.io/commitizen/) + Conventional Commits         |
| **CI/CD**              | GitHub Actions                                                                              |
| **Hosting**            | DigitalOcean Droplet (via Docker + SSH)                                                     |

---

## Prerequisites

Ensure the following tools are installed before you start:

| Tool                  | Version   | Install                                                          |
|-----------------------|-----------|------------------------------------------------------------------|
| Node.js               | `22.15.1` | [nodejs.org](https://nodejs.org) or `volta install node@22.15.1` |
| pnpm                  | `10.23.0` | `npm install -g pnpm@10.23.0`                                    |
| Angular CLI           | `21.x`    | `pnpm add -g @angular/cli`                                       |
| Docker *(optional)*   | Latest    | [docker.com](https://www.docker.com)                             |
| Volta *(recommended)* | Latest    | [volta.sh](https://volta.sh)                                     |

> **Tip:** If you use [Volta](https://volta.sh), it will automatically pin and use `node@22.15.1` when you enter the project directory — no manual switching required.

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Brints/unraveldocs-frontend.git
cd unraveldocs-frontend
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment variables

Copy the example environment file and fill in your values:

```bash
# Edit src/environments/environment.ts for development
# Edit src/environments/environment.prod.ts for production
```

See [Environment Configuration](#environment-configuration) for all available variables.

### 4. Start the development server

```bash
pnpm start
```

The app will be served at **[http://localhost:4200](http://localhost:4200)** and hot-reloads on any file change.

---

## Project Structure

```
xtraction-ui/
├── .github/
│   ├── workflows/              # GitHub Actions CI/CD pipelines
│   │   ├── ci.yml              # Lint, test, and build on every push/PR
│   │   ├── deploy.yml          # Deploy to DigitalOcean on push to main
│   │   ├── release.yml         # semantic-release automation
│   │   ├── bundle-size.yml     # Bundle size tracking
│   │   ├── lighthouse.yml      # Lighthouse performance audits
│   │   ├── codeql-analysis.yml # Security scanning
│   │   ├── dependency-review.yml
│   │   ├── pr-checks.yml       # PR title / commit message linting
│   │   ├── auto-merge.yml      # Dependabot auto-merge
│   │   ├── labeler.yml         # Automatic PR labelling
│   │   └── stale.yml           # Stale issue / PR management
│   ├── dependabot.yml          # Automated dependency updates
│   └── labeler.yml
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── auth/           # Authentication (guards, interceptors, services, models)
│   │   │   │   ├── components/ # Login, register, password-reset pages
│   │   │   │   ├── guards/     # authGuard (route protection)
│   │   │   │   ├── interceptors/ # authInterceptor (JWT header injection)
│   │   │   │   ├── models/     # Auth DTOs / interfaces
│   │   │   │   ├── services/   # AuthService
│   │   │   │   └── auth.routes.ts
│   │   │   └── services/
│   │   │       └── logger.service.ts
│   │   ├── features/
│   │   │   ├── ai/             # AI assistant models & services
│   │   │   ├── coupon/         # Coupon / discount code support
│   │   │   ├── credits/        # User credits management
│   │   │   ├── documents/      # Document upload, viewer, management
│   │   │   ├── landing-page/   # Public marketing landing page
│   │   │   ├── notifications/  # In-app notification center
│   │   │   ├── ocr/            # OCR text extraction
│   │   │   ├── payments/       # Paystack payment gateway integration
│   │   │   ├── privacy/        # Privacy policy / terms pages
│   │   │   ├── subscription/   # Plan selection & subscription management
│   │   │   ├── teams/          # Team workspaces & member management
│   │   │   └── user/           # User dashboard, settings, billing, storage
│   │   ├── shared/
│   │   │   ├── components/     # Reusable UI components
│   │   │   │   ├── blog-preview, charts, cta, date-picker
│   │   │   │   ├── document-viewer, faq, features, hero
│   │   │   │   ├── how-it-works, logo, navbar, newsletter
│   │   │   │   ├── plan-pricing, pricing, profile-dropdown
│   │   │   │   ├── rich-text-editor, search, stats, testimonials
│   │   │   ├── directives/     # Custom Angular directives
│   │   │   ├── models/         # Shared interfaces & types
│   │   │   ├── pipes/          # Custom Angular pipes
│   │   │   ├── services/       # Shared services
│   │   │   ├── ui/             # Base UI primitives
│   │   │   └── validators/     # Custom form validators
│   │   ├── app.component.ts    # Root component
│   │   ├── app.config.ts       # Application providers / DI setup
│   │   └── app.routes.ts       # Root route configuration (lazy-loaded)
│   ├── assets/                 # Static assets (images, icons, fonts)
│   ├── environments/           # Environment-specific configuration
│   │   ├── environment.ts      # Development environment
│   │   └── environment.prod.ts # Production environment
│   ├── firebase-messaging-sw.js # Firebase Cloud Messaging service worker
│   ├── index.html              # App entry point
│   ├── main.ts                 # Angular bootstrap
│   └── styles.css              # Global styles (Tailwind CSS entry)
├── public/                     # Static public assets (favicon, etc.)
├── Dockerfile                  # Multi-stage Docker build
├── nginx.conf                  # Nginx config (SPA routing, gzip, security headers)
├── angular.json                # Angular workspace configuration
├── tsconfig.json               # TypeScript root config
├── tsconfig.app.json           # App-specific TypeScript config
├── tsconfig.spec.json          # Test-specific TypeScript config
├── .commitlintrc.json          # Commit message linting rules
├── .releaserc.json             # semantic-release configuration
├── .size-limit.json            # Bundle size budget (800 kB gzipped)
├── lighthouserc.json           # Lighthouse CI thresholds
├── CHANGELOG.md                # Auto-generated release history
└── package.json
```

---

## Application Routes

| Path                           | Feature                  | Auth Required |
|--------------------------------|--------------------------|---------------|
| `/`                            | Redirects to `/home`     | No            |
| `/home`                        | Landing page             | No            |
| `/auth/login`                  | Login                    | No            |
| `/auth/register`               | Registration             | No            |
| `/auth/forgot-password`        | Password reset           | No            |
| `/user/dashboard`              | User dashboard           | ✅             |
| `/user/settings/profile`       | Profile settings         | ✅             |
| `/user/settings/security`      | Security settings        | ✅             |
| `/user/settings/billing`       | Billing & subscription   | ✅             |
| `/user/settings/notifications` | Notification preferences | ✅             |
| `/user/settings/storage`       | Storage & usage          | ✅             |
| `/search`                      | Global document search   | ✅             |
| `/notifications`               | Notification center      | ✅             |
| `documents/*`                  | Document management      | ✅             |
| `ocr/*`                        | OCR processing           | ✅             |
| `subscription/*`               | Subscription plans       | ✅             |
| `payments/*`                   | Payment processing       | ✅             |
| `credits/*`                    | Credits management       | ✅             |
| `teams/*`                      | Team workspaces          | ✅             |
| `privacy/*`                    | Privacy policy / Terms   | No            |

---

## Available Scripts

```bash
# ─── Development ───────────────────────────────────────────
pnpm start              # Start dev server on http://localhost:4200
pnpm run watch          # Build in watch mode (development config)

# ─── Build ─────────────────────────────────────────────────
pnpm run build          # Production build → dist/unraveldocs-frontend/

# ─── Testing ───────────────────────────────────────────────
pnpm test               # Run unit tests (interactive / watch mode)
pnpm run test:ci        # Run unit tests headlessly with code coverage

# ─── Code Quality ──────────────────────────────────────────
pnpm run lint           # Run Angular ESLint
pnpm run size           # Check bundle size against budget (800 kB gzipped)

# ─── Code Generation ───────────────────────────────────────
pnpm run ng generate component <name>  # Scaffold a new component
pnpm run ng generate service <name>    # Scaffold a new service
pnpm run ng generate --help            # List all schematics

# ─── Releases & Commits ────────────────────────────────────
pnpm run commit                # Interactive conventional commit via Commitizen
pnpm run semantic-release      # Trigger semantic release (CI only)
```

---

## Environment Configuration

The application uses Angular's environment replacement pattern. Create or update the following files:

**`src/environments/environment.ts`** (Development)

```typescript
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:3000/api',   // Backend API URL
  firebaseConfig: { /* your Firebase config */ },
};
```

**`src/environments/environment.prod.ts`** (Production)

```typescript
export const environment = {
  production: true,
  apiBaseUrl: 'https://api.unraveldocs.xyz',
  firebaseConfig: { /* your Firebase config */ },
};
```

> The production file is automatically swapped in by the Angular build when running `ng build --configuration production`.

---

## Docker & Deployment

### Build the Docker image locally

```bash
docker build -t unraveldocs-frontend:local .
```

### Run the container locally

```bash
docker run -p 8080:80 unraveldocs-frontend:local
# Open http://localhost:8080
```

### Docker build stages

The `Dockerfile` uses a **two-stage build** for a lean production image:

| Stage        | Base Image          | Purpose                                         |
|--------------|---------------------|-------------------------------------------------|
| `build`      | `node:22-alpine`    | Install pnpm, install deps, compile Angular app |
| `production` | `nginx:1.27-alpine` | Serve compiled assets via optimised Nginx       |

### Nginx features (production)

- ✅ SPA routing fallback (`try_files $uri /index.html`)
- ✅ Gzip compression (level 6) for JS, CSS, fonts, SVG, JSON
- ✅ Immutable long-term caching for hashed static assets (1 year)
- ✅ `no-cache` on `index.html` so users always receive fresh deployments
- ✅ Security headers: `X-Frame-Options`, `X-Content-Type-Options`, `X-XSS-Protection`, `Referrer-Policy`, `Permissions-Policy`

---

## CI/CD Pipeline

All automation lives in [`.github/workflows/`](./.github/workflows/).

### Workflow Overview

```
Push / PR
    │
    ├─► ci.yml ──────────────── Lint → Test → Build (development)
    │                                │
    │                    (only on push to main)
    │                                │
    │                                ▼
    │                      Build (production)
    │
    ├─► pr-checks.yml ──────── Validate commit message & PR title format
    ├─► bundle-size.yml ─────── Track JS bundle size (< 800 kB gzipped)
    ├─► lighthouse.yml ──────── Audit performance/accessibility/SEO scores
    ├─► dependency-review.yml ─ Detect vulnerable dependencies in PRs
    └─► codeql-analysis.yml ──── Static security analysis
    
Push to main
    │
    ├─► release.yml ────────── semantic-release → bump version, update CHANGELOG, tag GitHub release
    └─► deploy.yml ─────────── Build Docker image → push to DO registry → SSH deploy to Droplet
```

### Deployment details

Production deployments run automatically on every push to `main`:

1. Docker image is built and pushed to **DigitalOcean Container Registry** (`registry.digitalocean.com/redraft`)
2. The Droplet pulls the exact SHA-tagged image (not `:latest`) for reproducible deployments
3. The old container is replaced with zero-downtime rolling restart
4. A health-check `curl` verifies the deployment returned HTTP 200

**Required GitHub Secrets:**

| Secret                      | Description                                           |
|-----------------------------|-------------------------------------------------------|
| `DIGITALOCEAN_ACCESS_TOKEN` | DigitalOcean API token with registry & droplet access |
| `DROPLET_IP`                | Public IP address of the DigitalOcean Droplet         |
| `DROPLET_SSH_KEY`           | Private SSH key for root access to the Droplet        |

---

## Code Quality & Standards

### Commit Messages

This project enforces **[Conventional Commits](https://www.conventionalcommits.org/)** via `commitlint` and `commitizen`.

Use the interactive commit helper (recommended):

```bash
pnpm run commit
```

Or write commits manually following the format:

```
<type>(<optional scope>): <description>

Examples:
  feat(documents): add bulk upload support
  fix(auth): resolve token expiry edge case
  docs(readme): update deployment instructions
  refactor(ocr): extract text processing to service
```

**Commit types and their effect on versioning:**

| Type                        | Description             | Version bump    |
|-----------------------------|-------------------------|-----------------|
| `feat`                      | New feature             | Minor (`1.x.0`) |
| `fix`                       | Bug fix                 | Patch (`1.0.x`) |
| `docs`                      | Documentation           | Patch           |
| `refactor`                  | Code refactoring        | Patch           |
| `style`                     | Code style / formatting | Patch           |
| `perf`                      | Performance improvement | Patch           |
| `test`                      | Adding / updating tests | —               |
| `build`                     | Build system changes    | —               |
| `ci`                        | CI/CD changes           | —               |
| `chore`                     | Maintenance             | —               |
| `feat!` / `BREAKING CHANGE` | Breaking change         | Major (`x.0.0`) |

### Bundle Size Budget

The CI pipeline enforces a JavaScript bundle budget via [`size-limit`](https://github.com/ai/size-limit):

- **Limit:** 800 kB (gzipped)
- **Config:** [`.size-limit.json`](./.size-limit.json)

Run locally: `pnpm run size`

### Lighthouse Score Thresholds

Lighthouse CI audits run against every production build:

| Category       | Threshold                  |
|----------------|----------------------------|
| Performance    | ≥ 0.80 (warn)              |
| Accessibility  | ≥ 0.90 (error — breaks CI) |
| Best Practices | ≥ 0.90 (warn)              |
| SEO            | ≥ 0.90 (warn)              |

---

### Code Standards

- All tests must pass: `pnpm run test:ci`
- Build must succeed: `pnpm run build`
- Bundle must stay under budget: `pnpm run size`
- Commits must follow Conventional Commits format

### Branch Strategy

| Branch    | Purpose                                          |
|-----------|--------------------------------------------------|
| `main`    | Production-ready code; triggers release + deploy |
| `develop` | Integration branch; triggers pre-release         |
| `feat/*`  | New features                                     |
| `fix/*`   | Bug fixes                                        |
| `chore/*` | Maintenance / tooling                            |

---

<div align="center">

**Brints Global** team · [xtraction](https://xtraction.brintsgroup.xyz)

</div>
