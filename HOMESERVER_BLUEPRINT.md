# Home Server Blueprint — uncharteduser.brave

When you get a PC or server (even a Raspberry Pi!), this guide walks you
through standing up the full self-hosted ecosystem.

---

## Minimum Hardware Requirements

| Use Case           | Recommended Specs                      |
|--------------------|----------------------------------------|
| Web + Mail         | 2 CPU cores, 2GB RAM, 20GB SSD         |
| + Streaming (HD)   | 4 CPU cores, 4GB RAM, 1TB HDD          |
| + Transcoding      | Intel/AMD iGPU or NVIDIA GPU           |
| Full Stack         | 8 CPU cores, 16GB RAM, 2TB+ storage    |

---

## OS Setup (Ubuntu 22.04 LTS Recommended)

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker + Docker Compose
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
newgrp docker

# Clone the project
git clone https://github.com/YOUR_USERNAME/uncharteduser-brave.git
cd uncharteduser-brave
```

---

## Cloudflare Tunnel (Zero Port Forwarding — Recommended)

No need to open ports in your router. Cloudflare handles it all.

1. Go to https://dash.cloudflare.com → **Zero Trust** → **Tunnels**
2. Click **Create Tunnel** → choose **Cloudflared** → name it `uncharteduser`
3. Copy the tunnel token shown.
4. Create a `.env` file:
   ```
   CLOUDFLARE_TUNNEL_TOKEN=paste_your_token_here
   MEDIA_PATH=/path/to/your/media
   ```
5. In the tunnel dashboard, add a **Public Hostname**:
   - Subdomain: `www`, Domain: `uncharteduser.limo` (or your linked domain)
   - Service: `http://nginx:80`
6. Start everything:
   ```bash
   docker compose up -d
   ```

---

## Services Access After Setup

| Service       | URL                                | Description              |
|---------------|------------------------------------|--------------------------|
| Website       | https://uncharteduser.limo         | Your public landing page |
| Jellyfin      | http://SERVER_IP:8096              | Private media streaming  |
| Portainer     | http://SERVER_IP:9000              | Docker management UI     |
| Uptime Kuma   | http://SERVER_IP:3001              | Service monitoring       |

---

## Firewall Setup (UFW)

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
# Cloudflare Tunnel handles web traffic — NO need to open 80/443
sudo ufw enable
```

---

## Enabling Real Telemetry in the Dashboard

Once the server is running, update `HOMESERVER_BLUEPRINT.md` with your
telemetry API endpoint, then edit `OwnerDashboard.tsx`:

```typescript
// Replace useMockTelemetry() with:
const { data: metrics } = useQuery('metrics', () =>
  fetch('https://api.uncharteduser.limo/metrics').then(r => r.json())
)
```

Then redeploy. The dashboard will instantly show real CPU/RAM/disk/uptime data.

---

## Weekly Maintenance Script

```bash
#!/bin/bash
# Save as: /home/user/maintenance.sh
# Add to cron: 0 3 * * 0 /home/user/maintenance.sh

echo "Pulling latest Docker images..."
docker compose pull

echo "Restarting updated containers..."
docker compose up -d

echo "Pruning old images..."
docker system prune -f

echo "Done! — $(date)"
```

