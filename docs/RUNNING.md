# Running the Application

This document covers the three ways to run the Sidetrack application: locally with pnpm (SQLite, no Docker), locally with Docker Compose (full PostgreSQL stack), and in production with the production Docker Compose.

---

## 1. Local Development — pnpm + SQLite

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

2. Run the setup script (installs dependencies, generates and applies migrations):

   ```bash
   bash scripts/setup.sh
   ```

3. Start the dev server:

   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

The SQLite database file lives at `data/sidetrack.db` and is gitignored. Migrations run automatically on startup via `src/instrumentation.ts`. When you change the schema, run `pnpm db:generate` to create a new migration file, then restart the dev server.

---

## 2. Local Docker Compose

This spins up the full stack (Next.js app + PostgreSQL) in Docker containers using `compose.local.yml`. Useful for testing the containerized environment without touching production.

**Prerequisites:**

- Docker Desktop (or Podman with Docker-compatible CLI)

**Steps:**

1. Run the setup script with the `docker` profile:

   ```bash
   bash scripts/setup.sh docker
   ```

   This script will:
   - Generate PostgreSQL migration files (if not already present)
   - Stop any running local containers
   - Build the Docker image and start all containers
   - Migrations run automatically when the app container starts

2. The app is available at [http://localhost:3000](http://localhost:3000).

**What runs:**

| Container       | Role          | Port(s) |
| --------------- | ------------- | ------- |
| `sidetrack_web` | Next.js app   | `3000`  |
| `sidetrack_db`  | PostgreSQL 17 | `5432`  |

> Note: The local compose builds from the Dockerfile, so it reflects the exact production image. Code changes require a rebuild (`bash scripts/setup.sh docker`).

---

## 3. Production Docker Compose

The production setup (`compose.yaml`) runs on the Proxmox server and includes a Cloudflare Tunnel container for public HTTPS access via `sidetracksounds.nl`. The database port is not exposed to the host — all traffic goes through the tunnel.

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

| Container          | Role                      |
| ------------------ | ------------------------- |
| `sidetrack_web`    | Next.js app               |
| `sidetrack_db`     | PostgreSQL 17             |
| `sidetrack_tunnel` | Cloudflare Tunnel (HTTPS) |

> The database is not exposed on any host port in production — it is only reachable from within the Docker network.

---

## Aliases

Shell aliases are configured on both the laptop and the server to speed up common operations.

### Laptop Aliases

| Alias          | Description                                                                                                                                  |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `side-connect` | Open an SSH connection to the Sidetrack VM.                                                                                                  |
| `side-data`    | Runs `scripts/copy_backup.sh` — SSHs in, finds the latest backup, confirms, downloads it to `~/Desktop/SidetrackBackups/`. Optionally stages `csv/` into `database/data/` for a local Docker seed. |
| `side-up`      | Build and start the local Docker stack (PostgreSQL) via `scripts/setup.sh local`.                                                            |

### Server Aliases

| Alias         | Description                                                |
| ------------- | ---------------------------------------------------------- |
| `side-pull`   | Pull the latest changes from Git.                          |
| `side-deploy` | Run `setup.sh` and deploy the current pull.                |
| `side-backup` | Run `backup.sh` and export current data to backups folder. |

### VM OS Updates

`scripts/vm-update.sh` automates the monthly OS update cycle. Run it from the project root on the server:

```bash
sudo bash scripts/vm-update.sh
```

It runs `apt update && apt upgrade -y`. If a kernel update requires a reboot, it automatically enables the Cloudflare maintenance page via `scripts/maintenance-on.sh` before rebooting. If no reboot is needed, it exits cleanly with zero downtime.

After a reboot the Docker containers come back up automatically (`restart: unless-stopped`). The `@reboot` cron entry below re-disables maintenance mode once the system is back.

### Cloudflare Maintenance Scripts

Three helper scripts in `scripts/` manage the Cloudflare maintenance page independently of deployment:

| Script | Purpose |
| --- | --- |
| `scripts/maintenance-on.sh` | Creates a Cloudflare Worker route that serves the maintenance page |
| `scripts/maintenance-off.sh` | Deletes the Worker route, restoring normal traffic |
| `scripts/utils.sh` | Sourced by the above; loads `.env.production` and derives domain + worker name |

These are also called by `scripts/setup.sh production` around the build/restart cycle.

### Server Cron Jobs

```cron
# Nightly database backup at 02:00
0 2 * * * /path/to/sidetrack/scripts/backup.sh

# Re-enable site after a VM reboot triggered by vm-update.sh
@reboot sleep 30 && /path/to/sidetrack/scripts/maintenance-off.sh
```

The backup creates a timestamped folder under `backups/` containing:

- `csv/` — every database table exported as a CSV file

A maximum of 3 backups are retained; older ones are deleted automatically.
