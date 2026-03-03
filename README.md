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

## Organisation

The repository has been moved to the Organisation "devops-team-devcraft". It can be reached here:
https://github.com/devops-team-devcraft/devcraft-devops

## Hetzner-Server IP

46.224.221.52

## CI/CD Übersicht

Der Workflow wird durch einen push oder einen pull request auf main ausgelöst.

Ablauf: 
1. Test-Job 
    - Startet PostgrSQL-Container
    - Installiert Dependencies
    - Führt Prisma-Setup aus
    - Führt Tests aus
    - Bei Fehler stoppt die Pipeline

2. Docker-Build-Job
    - Läuft nur, wenn Tests erfolgreich sind
    - Loggt sich bei ghcr ein
    - Baut ein Docker image
    - Veröffentlicht es bei ghcr

Nach jedem Push auf main wird automatisch ein aktuelles, versioniertes Docker Image bei ghcr erstellt.

