# Notes API – Starter Code

Eine einfache REST API für Notizen. Dieser Starter-Code ist die Basis für das DevOps-Projekt "From Code to Production".

## Quick Start

```bash
npm install
cp .env.example .env
npx prisma db push
npm start
```

Die API läuft auf http://localhost:3000.

## Endpoints

| Method | Endpoint | Beschreibung |
|--------|----------|-------------|
| GET | /health | Health Check |
| GET | /notes | Alle Notizen auflisten |
| POST | /notes | Neue Notiz erstellen |
| GET | /notes/:id | Einzelne Notiz abrufen |
| PATCH | /notes/:id | Notiz aktualisieren |
| DELETE | /notes/:id | Notiz löschen |

## Tests

```bash
npm test
```

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **ORM:** Prisma
- **Datenbank:** SQLite (lokal), PostgreSQL (Docker/Production)
- **Tests:** Jest + Supertest


## Team

Andrei: Docker Lead
Mike: Docs Lead
Viktor: CI/CD Lead
Thomas: Infrastructure Lead