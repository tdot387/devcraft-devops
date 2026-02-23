# Terraform – Hetzner VPS Setup

Diese Terraform-Konfiguration erstellt einen Server bei Hetzner Cloud für euer DevOps-Projekt.

## Voraussetzungen

1. **Hetzner Cloud Account:** https://console.hetzner.cloud (Registrierung + Zahlungsmethode)
2. **API Token:** Hetzner Console → Security → API Tokens → Token generieren (Read & Write)
3. **Terraform CLI:** `brew install terraform` (macOS) oder https://terraform.io/downloads
4. **SSH Key:** Falls nicht vorhanden: `ssh-keygen -t rsa -b 4096`

## Setup

```bash
cd terraform

cp terraform.tfvars.example terraform.tfvars

terraform init

terraform plan

terraform apply
```

Nach `terraform apply` wird die IP-Adresse eures Servers angezeigt.

## Verbinden

```bash
ssh root@<eure-server-ip>
```

## Was wird erstellt?

- **1 VPS** (CX22: 2 vCPU, 4GB RAM, 40GB SSD, Ubuntu 24.04)
- **1 Firewall** (Ports 22, 80, 443, 3000 offen)
- **1 SSH Key** (euer lokaler SSH-Schlüssel wird bei Hetzner registriert)

## Kosten

~€4/Monat für den CX22 Server. **Wichtig:** Am Projektende `terraform destroy` ausführen, um Kosten zu stoppen!

## Server löschen

```bash
terraform destroy
```
