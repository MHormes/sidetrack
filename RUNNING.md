# Running the Application

This document covers the three ways to run the Sidetrack application: locally with pnpm (SQLite, no Docker), locally with Docker Compose (full PostgreSQL stack for validation), and in production with the production Docker Compose.

---

## 1. Dev — pnpm + SQLite

This is the recommended setup for day-to-day development. Next.js runs natively via pnpm and uses a local SQLite file as the database — no PostgreSQL or Docker required.

**Prerequisites:**

- Node.js 22+ installed
- pnpm installed (`npm install -g pnpm`)

**Steps:**

1. Copy the environment file:

    ```bash
    cp .env.example .env.local
    ```

    The default value (`DATABASE_URL=./data/sidetrack.db`) works out of the box.

2. Install dependencies:

    ```bash
    pnpm install
    ```

3. Start the dev server:

    ```bash
    pnpm dev
    ```

4. Open [http://localhost:3000](http://localhost:3000).

The SQLite database file lives at `data/sidetrack.db` and is gitignored. Migrations run automatically on every startup via `src/instrumentation.ts` — no manual migration step needed. When you change the schema, run `pnpm db:generate` to create a new migration file, then restart the dev server and it applies automatically.

---

## 2. Local — Docker Compose (Validation)

This spins up the full stack (Next.js app + PostgreSQL) in Docker containers using `compose.local.yml`. Useful for validating the containerized environment before deploying to production.

**Prerequisites:**

- Docker Desktop (or Podman with Docker-compatible CLI)

**Steps:**

1. Run the setup script with the `local` profile:

    ```bash
    bash scripts/setup.sh local
    ```

    This script will:
    - Generate PostgreSQL migration files (if not already present)
    - Stop any running local containers
    - Build the Docker image and start all containers
    - Migrations run automatically when the app container starts

2. The app is available at [http://localhost:3000](http://localhost:3000).

**What runs:**

| Container           | Role          | Port(s)     |
| ------------------- | ------------- | ----------- |
| `sidetrack_web`     | Next.js app   | `3000`      |
| `sidetrack_db`      | PostgreSQL 17 | `5432`      |

> Note: The local compose builds from the Dockerfile, so it reflects the exact production image. Code changes require a rebuild (`bash scripts/setup.sh local`).

---

## 3. Production — Docker Compose

The production setup (`compose.yaml`) runs on the Proxmox server and includes a Cloudflare Tunnel container for public HTTPS access via `sidetrackmusic.nl`. The database port is not exposed to the host — all traffic goes through the tunnel.

**Prerequisites:**

- An `.env.production` file on the server (use `.env.production.example` as a template)
- A valid `CLOUDFLARE_TUNNEL_TOKEN` in `.env.production`
- Docker installed on the server

**Steps:**

1. Pull the latest code (use the `sid-pull` alias — see [Aliases](#aliases)):

    ```bash
    git pull origin main
    ```

2. Run the setup script with the `production` profile:

    ```bash
    bash scripts/setup.sh production
    ```

    This script will:
    - Load environment variables from `.env.production`
    - Enable the Cloudflare maintenance page while deploying (if `CLOUDFLARE_ZONE_ID` is set)
    - Generate PostgreSQL migration files
    - Stop existing containers
    - Build and start all containers
    - Migrations run automatically when the app container starts
    - Disable the Cloudflare maintenance page when done

**What runs:**

| Container              | Role                      |
| ---------------------- | ------------------------- |
| `sidetrack_web`        | Next.js app               |
| `sidetrack_db`         | PostgreSQL 17             |
| `sidetrack_tunnel`     | Cloudflare Tunnel (HTTPS) |

> The database is not exposed on any host port in production — it is only reachable from within the Docker network.

---

## Aliases

Shell aliases are configured on both the laptop and the server to speed up common operations. Add these to your `~/.bashrc` or `~/.zshrc`.

### Laptop Aliases

```bash
# Sidetrack
alias sid='cd ~/Desktop/Projects/sidetrack'
alias siddev='cd ~/Desktop/Projects/sidetrack && pnpm dev'
alias sidlocal='cd ~/Desktop/Projects/sidetrack && bash scripts/setup.sh local'
alias siddb='cd ~/Desktop/Projects/sidetrack && pnpm db:studio'
alias sidmigrate='cd ~/Desktop/Projects/sidetrack && pnpm db:generate && pnpm db:migrate'
alias sid-connect='ssh user@your-proxmox-server'
```

| Alias          | Description                                                     |
| -------------- | --------------------------------------------------------------- |
| `sid`          | Navigate to the project root.                                   |
| `siddev`       | Start the local dev server (SQLite, no Docker).                 |
| `sidlocal`     | Build and start the local Docker stack (PostgreSQL, validation).|
| `siddb`        | Open Drizzle Studio to inspect the local SQLite database.       |
| `sidmigrate`   | Generate a new migration and apply it to the local SQLite DB.   |
| `sid-connect`  | Open an SSH connection to the Proxmox server.                   |

### Server Aliases

```bash
# Sidetrack (add to ~/.bashrc on the server)
alias sid-pull='cd ~/sidetrack && git pull origin main'
alias sid-deploy='cd ~/sidetrack && bash scripts/setup.sh production'
```

| Alias          | Description                                          |
| -------------- | ---------------------------------------------------- |
| `sid-pull`     | Pull the latest changes from Git.                    |
| `sid-deploy`   | Run `setup.sh` and deploy the current pull.          |
