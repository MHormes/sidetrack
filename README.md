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

## License

Copyright (c) 2026 Maarten Hormes. All rights reserved.

This repository is for portfolio review and demonstration purposes only. No permission is granted to copy, distribute, or modify the software. See the [LICENSE](LICENSE) file for full details.
