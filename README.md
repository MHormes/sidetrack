# Sidetrack

Sidetrack is the official web presence for the Dutch band Sidetrack — a fast-loading Electronic Press Kit (EPK) combined with a pre-order merchandise shop. The site is self-hosted and designed to load in under a second.

## Features

- **EPK** — Band biography, discography, and high-resolution photography optimised via Next.js `<Image />`
- **Tour dates** — Upcoming and past gig listings
- **Video** — Facade-based YouTube/Vimeo embeds that keep the initial page load under 1 second
- **Merch shop** — Image-heavy product catalog at `/shop`
- **Pre-order system** — No-payment-automation flow: fans fill in contact and shipping details, the band follows up manually with a payment link (Tikkie)
- **Lead capture** — All pre-orders are saved to the database for manual follow-up

## Tech Stack

| Layer     | Technology                           |
| --------- | ------------------------------------ |
| Framework | Next.js 16 · App Router · TypeScript |
| Styling   | Tailwind CSS v4                      |
| Database  | PostgreSQL 17 (SQLite in dev)        |
| ORM       | Drizzle ORM                          |
| Hosting   | Docker · Cloudflare Tunnel           |

## Running the App

There are three ways to run Sidetrack:

| Mode           | Description                                                                                                                       |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Dev**        | Recommended for day-to-day development. Runs with SQLite — no Docker or external services needed.                                 |
| **Local**      | Full containerized stack (Next.js app + PostgreSQL) via `compose.local.yml`. Closest to production without the Cloudflare tunnel. |
| **Production** | Server deployment via `compose.yaml`. Adds a Cloudflare Tunnel container for public HTTPS access via `sidetracksounds.nl`.        |

For setup instructions, environment variables, aliases, and the nightly backup cron job see [RUNNING.md](RUNNING.md).

## Database

The schema has two tables — `products` and `preorders`. Migrations are managed by Drizzle Kit and run automatically on every server startup via `src/instrumentation.ts`.

Initial product data is loaded via the CSV seeder:

```bash
pnpm db:seed          # first-run setup (skips if data already exists)
pnpm db:seed:force    # restore mode — upserts from database/data/*.csv
```

## Branch Strategy

| Branch | Purpose                                                       |
| ------ | ------------------------------------------------------------- |
| `main` | Production-ready — deployed via `scripts/setup.sh production` |
