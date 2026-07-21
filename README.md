# Bismillah Catering

A Next.js (App Router) site for Bismillah Catering with a Postgres-backed admin panel. Every piece of site content — services, packages, gallery, testimonials, homepage sections, FAQs, social links, and company/contact info — is managed from `/admin`, along with a small CRM (leads, clients, quotations).

## Stack

- **Next.js 16** (App Router, Route Handlers as the API layer)
- **PostgreSQL** via **Prisma** — local dev via Docker Compose, swap to [Neon](https://neon.tech) for production by changing one env var
- **Cloudinary** for admin-panel image uploads
- Custom cookie-session auth for the admin panel (no third-party auth service)

## Getting Started

1. **Copy the env file** and adjust values as needed:
   ```bash
   cp .env.example .env
   ```

2. **Start local Postgres** (Docker required):
   ```bash
   docker compose up -d
   ```
   This runs Postgres on `localhost:5433` (not 5432, to avoid clashing with any native Postgres install).

3. **Run migrations and seed the database**:
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```
   Seeding creates the admin account (from `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `.env`) and populates every content model with the site's original copy, so the site looks the same as before on first run.

4. **Run the dev server**:
   ```bash
   npm run dev
   ```
   - Public site: [http://localhost:3000](http://localhost:3000)
   - Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin) — log in with `ADMIN_EMAIL` / `ADMIN_PASSWORD`

## Project structure

- `app/(site)/**` — public pages (Navbar/Footer layout)
- `app/admin/**` — admin panel (own layout, session-gated by `middleware.ts`)
- `app/api/**` — public read-only REST endpoints (services, packages, gallery, etc.) and the public lead-capture endpoint
- `app/api/admin/**` — authenticated CRUD endpoints used by the admin panel
- `app/quote/[token]` — public, unauthenticated, printable quotation view shared with clients
- `lib/data/**` — server-only Prisma query functions used by public pages (the same logic the public API exposes)
- `prisma/schema.prisma` — data model; `prisma/seed.ts` + `prisma/seed-data/**` — initial content seed

## Content vs. CRM

- **Site content** (services, packages, gallery, testimonials, why-choose-us, process steps, FAQs, social links, company/contact settings) is fully editable from the admin panel and reflected on the public site within ~60 seconds (ISR revalidation) — no rebuild needed.
- **Leads**: booking and contact form submissions are saved automatically (`/admin/leads`), in addition to the existing WhatsApp deep-link.
- **Clients**: an internal contact list (`/admin/clients`); leads can be converted into clients from the leads table.
- **Quotations**: build a priced quote for a client (`/admin/quotations/new`), with a shareable public link (`/quote/<token>`) they can view and print/save as PDF — no login required on their end.

## Deploying / going live

- **Database**: create a [Neon](https://neon.tech) Postgres project, set `DATABASE_URL` (pooled) and `DIRECT_URL` (non-pooled, for migrations) to its connection strings, then run `npx prisma migrate deploy` against it. Nothing else in the app needs to change.
- **Uploaded images**: handled by Cloudinary (`CLOUDINARY_URL` in `.env`), so uploads work the same in local dev and on serverless hosts like Vercel — no local disk involved.
- **Secrets**: set `ADMIN_JWT_SECRET` to a long random string in production, and change the seeded admin password.
