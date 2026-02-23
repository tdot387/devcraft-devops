variable "hcloud_token" {
  description = "Hetzner Cloud API Token"
  type        = string
  sensitive   = true
}

variable "ssh_key_name" {
  description = "Name für den SSH Key in Hetzner Cloud"
  type        = string
  default     = "devops-project"
}

variable "ssh_public_key_path" {
  description = "Pfad zum öffentlichen SSH-Schlüssel"
  type        = string
  default     = "~/.ssh/id_rsa.pub"
}

variable "server_type" {
  description = "Hetzner Server-Typ (CX22 = 2 vCPU, 4GB RAM)"
  type        = string
  default     = "cx22"
}

variable "location" {
  description = "Server-Standort"
  type        = string
  default     = "nbg1"
}
