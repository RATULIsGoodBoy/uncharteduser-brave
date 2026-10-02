import { useState } from 'react'
import {
  Server,
  RefreshCw,
} from 'lucide-react'
import toast from 'react-hot-toast'

interface DockerService {
  name: string
  image: string
  subdomain: string
  status: 'running' | 'restarting'
  cpu: string
  mem: string
}

const INITIAL_SERVICES: DockerService[] = [
  { name: 'traefik_ingress', image: 'traefik:v3.1', subdomain: '*.uncharteduser.brave', status: 'running', cpu: '1.2%', mem: '48 MB' },
  { name: 'authentik_core', image: 'ghcr.io/goauthentik/server', subdomain: 'auth.uncharteduser.brave', status: 'running', cpu: '2.4%', mem: '182 MB' },
  { name: 'traccar_fleet', image: 'traccar/traccar:latest', subdomain: 'fleet.uncharteduser.brave', status: 'running', cpu: '0.8%', mem: '210 MB' },
  { name: 'frigate_cctv', image: 'blakeblackshear/frigate', subdomain: 'cctv.uncharteduser.brave', status: 'running', cpu: '6.4%', mem: '420 MB' },
  { name: 'immich_server', image: 'ghcr.io/immich-app/server', subdomain: 'photos.uncharteduser.brave', status: 'running', cpu: '1.8%', mem: '310 MB' },
  { name: 'homeassistant', image: 'homeassistant/home-assistant', subdomain: 'home.uncharteduser.brave', status: 'running', cpu: '3.1%', mem: '280 MB' },
  { name: 'ollama_ai', image: 'ollama/ollama:latest', subdomain: 'ai.uncharteduser.brave', status: 'running', cpu: '4.2%', mem: '5,820 MB' },
  { name: 'jellyfin_stream', image: 'jellyfin/jellyfin:latest', subdomain: 'stream.uncharteduser.brave', status: 'running', cpu: '0.9%', mem: '160 MB' },
]

export default function InfraView() {
  const [services, setServices] = useState<DockerService[]>(INITIAL_SERVICES)

  const restartContainer = (name: string) => {
    setServices((prev) =>
      prev.map((s) => (s.name === name ? { ...s, status: 'restarting' } : s))
    )
    toast(`Restarting container ${name}...`, { icon: '🔄' })
    setTimeout(() => {
      setServices((prev) =>
        prev.map((s) => (s.name === name ? { ...s, status: 'running' } : s))
      )
      toast.success(`Container ${name} is back online!`, { icon: '✅' })
    }, 1500)
  }

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Server className="w-4 h-4 text-owner" />
            <h3 className="text-base font-medium text-white">Bare-Metal Infrastructure & Docker Swarm</h3>
          </div>
          <p className="text-white/40">
            Host: Ubuntu 24.04 LTS · Kernel 6.8.0 · Traefik v3 HTTP/3 · ZFS RAIDZ2
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-lg border border-owner/30 bg-owner/10 text-owner">
            ● 8/8 Containers Healthy
          </span>
        </div>
      </div>

      {/* Hardware Telemetry Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl border border-white/5 bg-white/[0.02]">
          <span className="text-white/30 text-[11px] block mb-1">CPU Load (8 Cores)</span>
          <p className="text-lg text-white font-medium">14.2%</p>
          <span className="text-[10px] text-white/30">Intel Core i7 (4.8 GHz)</span>
        </div>

        <div className="p-3.5 rounded-xl border border-white/5 bg-white/[0.02]">
          <span className="text-white/30 text-[11px] block mb-1">RAM Memory</span>
          <p className="text-lg text-owner font-medium">7.8 / 32 <span className="text-xs text-white/30">GB</span></p>
          <span className="text-[10px] text-owner/60">DDR5 ECC Active</span>
        </div>

        <div className="p-3.5 rounded-xl border border-white/5 bg-white/[0.02]">
          <span className="text-white/30 text-[11px] block mb-1">ZFS Pool (NVMe Mirror)</span>
          <p className="text-lg text-white font-medium">1.8 / 3.8 <span className="text-xs text-white/30">TB</span></p>
          <span className="text-[10px] text-white/30">LZ4 Compression: 1.48x</span>
        </div>

        <div className="p-3.5 rounded-xl border border-white/5 bg-white/[0.02]">
          <span className="text-white/30 text-[11px] block mb-1">NVMe Endurance</span>
          <p className="text-lg text-white font-medium">99%</p>
          <span className="text-[10px] text-owner/60">S.M.A.R.T. 0 Errors</span>
        </div>
      </div>

      {/* Docker Containers Table */}
      <div className="p-4 rounded-xl border border-white/5 bg-base-900/40">
        <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
          <h4 className="text-sm font-medium text-white">Active Docker Microservice Containers</h4>
          <span className="text-white/30 text-[11px]">GitOps Monorepo Stack</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-white/30 border-b border-white/5 pb-2 text-[11px]">
                <th className="py-2">Service</th>
                <th>Subdomain Ingress</th>
                <th>CPU</th>
                <th>Memory</th>
                <th>Status</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {services.map((s) => (
                <tr key={s.name} className="hover:bg-white/[0.01]">
                  <td className="py-2.5 font-medium text-white flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-owner" /> {s.name}
                  </td>
                  <td className="text-white/50">{s.subdomain}</td>
                  <td className="text-white/40">{s.cpu}</td>
                  <td className="text-white/40">{s.mem}</td>
                  <td>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                      s.status === 'running' ? 'bg-owner/15 text-owner' : 'bg-amber-400/15 text-amber-400'
                    }`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="text-right">
                    <button
                      onClick={() => restartContainer(s.name)}
                      className="text-white/30 hover:text-white transition-colors"
                      title="Restart container"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 inline ${s.status === 'restarting' ? 'animate-spin text-amber-400' : ''}`} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
