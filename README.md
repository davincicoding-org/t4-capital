## T4 Capital — Website & CMS

Production-ready Next.js application with an integrated Payload CMS. Includes i18n, file storage via S3-compatible storage (Supabase), transactional email via Resend, analytics, and Sentry monitoring.

### Tech Stack

- **App**: Next.js 15, React 19, TypeScript, Tailwind CSS 4
- **CMS**: Payload 3 (Next.js adapter, Lexical editor, SEO plugin, payload-intl)
- **DB**: PostgreSQL (via `@payloadcms/db-postgres` migrations)
- **Storage**: S3-compatible (Supabase) via `@payloadcms/storage-s3`
- **Email**: Resend
- **i18n**: `next-intl` + `payload-intl`
- **Monitoring**: `@sentry/nextjs`

---\*\*\*

### Quick Start

1. Install prerequisites
   - Node 18+ (LTS recommended)
   - pnpm (workspace uses `pnpm@10.8.0`)
   - Docker or Podman (optional, for local Postgres)

2. Install dependencies

```bash
pnpm install
```

3. Configure environment

- Copy `.env.example` to `.env.development.local` and fill values

```bash
cp .env.example .env.development.local
```

4. Start a local Postgres (optional)

- Ensure `POSTGRES_URL` is set in `.env.development.local`
- Then run:

```bash
./start-database.sh
```

5. Run database migrations (first time and whenever schema changes)

```bash
pnpm run migrate
```

6. Start the dev server

```bash
pnpm run dev
```

App will be available at `http://localhost:3000`. Payload Admin is served within the app at `/admin`.

---

### CMS & Data Model

- Admin UI: `http://localhost:3000/admin`
- First-time setup: After running migrations, open `/admin` and create the first admin user.
- Collections (see `src/payload.config.ts` and generated `src/payload-types.ts`):
  - `media`, `files`
  - `strategies`, `products`, `product-prices`, `disclaimers`
  - `users`, `legal-pages`
  - `messages` (created by `payload-intl` plugin)
- Globals: `landing-page`
- Rich text editor: Lexical with common features (bold, lists, links, etc.)
- SEO plugin: enabled for `legal-pages` and globals (`landing-page`, `prices-page`)

GraphQL:

- Endpoint: `POST /api/graphql`
- Playground (dev): `/api/graphql-playground`

Uploads & Storage:

- S3 storage is configured for `media`, `files`, and plugin-managed `messages` with public URLs generated against Supabase storage.

Internationalization:

- Admin content i18n managed via `payload-intl` (schema in `src/i18n/messages.ts`)
- Frontend i18n via `next-intl` (see `src/i18n/` and requests under `src/server/`)

---

### Development Scripts

- `pnpm run dev`: Start Next.js dev server
- `pnpm run build`: Build
- `pnpm run start`: Start production server locally
- `pnpm run preview`: Build + start
- `pnpm run migrate`: Apply Payload migrations
- `pnpm run migrate:create`: Create a new migration from current schema
- `pnpm run generate:types`: Generate `src/payload-types.ts`
- `pnpm run generate:importmap`: Generate Admin import map
- `pnpm run lint` | `lint:fix`: Lint
- `pnpm run typecheck`: TypeScript checks
- `pnpm run format`: Prettier format

Migrations live in `src/cms/migrations/`. When you change collections/globals, create a migration and commit it.

---

### Local Database Helper

`./start-database.sh`

- Reads `.env.development.local` for `POSTGRES_URL`
- Starts a Postgres container named `<db>-postgres` on the port from your URL
- Safe to re-run; will start existing container if present

---

### Deployment

Vercel is recommended. `vercel.json` runs:

```
pnpm run build && pnpm run migrate
```

Ensure all required environment variables are set in your hosting provider. Recommended regions: `fra1` (configured).

---

### Project Structure (high-level)

- `src/app/(public)`: Marketing/public pages (`/`, `/prices`, `/privacy`, `/imprint`)
- `src/app/(payload)`: Payload Admin and API routes (`/admin`, `/api/graphql`, `/api/graphql-playground`, `/api/[...slug]`)
- `src/cms`: Collections, components, globals, migrations
- `src/server`: Server-only utilities, cache, data fetchers
- `src/ui`: Isolated UI components
- `src/utils`: Helpers

---

### Monitoring & Analytics

- Sentry is configured via `@sentry/nextjs` with `sentry.edge.config.ts` and `sentry.server.config.ts`
- Vercel Analytics via `@vercel/analytics`

### License

Private. All rights reserved.
