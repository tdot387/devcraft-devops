output "server_ip" {
  description = "Öffentliche IP-Adresse des Servers"
  value       = hcloud_server.app.ipv4_address
}

output "ssh_command" {
  description = "SSH-Befehl zum Verbinden"
  value       = "ssh root@${hcloud_server.app.ipv4_address}"
}
