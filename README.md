# Notes API – Starter Code

Eine schlanke REST API zum Erstellen, Lesen, Aktualisieren und Löschen von Notizen – gebaut mit Node.js, Express und Prisma. Die App läuft lokal mit SQLite und in Produktion mit PostgreSQL, wird via Docker containerisiert und automatisch über eine GitHub Actions CI/CD-Pipeline gebaut, getestet und auf einen Hetzner-Server deployed.

---

## Lokales Setup

**Voraussetzungen:**
- Node.js >= 18
- npm >= 9
- Docker & Docker Compose (für die containerisierte Variante)
- `.env`-Datei mit gesetzter `DATABASE_URL` (siehe `.env.example`)

**Schritte:**

```bash
git clone https://github.com/devops-team-devcraft/devcraft-devops
cd devcraft-devops
npm install
cp .env.example .env
npx prisma db push
npm start
```

Die API läuft dann auf http://localhost:3000.

---

## Endpoints

| Method | Endpoint | Beschreibung |
|--------|----------|-------------|
| GET | /health | Health Check |
| GET | /notes | Alle Notizen auflisten |
| POST | /notes | Neue Notiz erstellen |
| GET | /notes/:id | Einzelne Notiz abrufen |
| PATCH | /notes/:id | Notiz aktualisieren |
| DELETE | /notes/:id | Notiz löschen |

---

## Tests

```bash
npm test
```

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **ORM:** Prisma
- **Datenbank:** SQLite (lokal), PostgreSQL (Docker/Production)
- **Tests:** Jest + Supertest

---

## Team

Andrei: Docker Lead
Mike: Docs Lead
Viktor: CI/CD Lead
Thomas: Infrastructure Lead

---

## CI/CD Übersicht

Der Workflow wird durch einen push oder einen pull request auf main ausgelöst.

Ablauf:
1. Test-Job
    - Startet PostgreSQL-Container
    - Installiert Dependencies
    - Führt Prisma-Setup aus
    - Führt Tests aus
    - Bei Fehler stoppt die Pipeline

2. Docker-Build-Job
    - Läuft nur, wenn Tests erfolgreich sind
    - Loggt sich bei ghcr ein
    - Baut ein Docker Image
    - Veröffentlicht es bei ghcr

Nach jedem Push auf main wird automatisch ein aktuelles, versioniertes Docker Image bei ghcr erstellt.

![CI/CD Architektur](github-workflow-diagram.png)

---

## Deployment

**Automatisch (CD-Pipeline):**

Push auf `main` triggert GitHub Actions:
1. Tests laufen durch
2. Docker Image wird gebaut und zu `ghcr.io` gepusht
3. Server wird per SSH angewiesen, das neue Image zu pullen und die Container neu zu starten

**Manuell (Fallback):**

```bash
ssh user@46.224.221.52
cd /app
docker compose pull
docker compose up -d
```

---

## Monitoring

| Was | URL |
|-----|-----|
| Health Check | http://46.224.221.52:3000/health |
| Uptime Kuma Dashboard | http://46.224.221.52:3001 |
| Logs (auf dem Server) | `docker compose logs -f app` |

---

## Wichtige Docker-Befehle

Alle Services starten:                  docker compose up
Alle Services im Hintergrund starten:   docker compose up -d
Alles stoppen und aufräumen:            docker compose down
Alles stoppen und Volumes löschen:      docker compose down -v

Logs aller Services anzeigen:           docker compose logs
Logs eines best. Services anzeigen:     docker compose logs app
Logs live verfolgen:                    docker compose logs -f app

Images neu bauen:                       docker compose build
Images neu bauen und Services starten:  docker compose up --build
Status der laufenden Services:          docker compose ps

Shell in laufendem Container öffnen:    docker compose exec app sh

<!-- Test row for build -->
