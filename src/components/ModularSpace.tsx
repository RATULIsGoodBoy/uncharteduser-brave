import { useState } from 'react'
import { HUB_MODULES, HubModule } from '../modules/registry'
import {
  ShieldCheck,
  Zap,
  Activity,
} from 'lucide-react'
import toast from 'react-hot-toast'

export default function ModularSpace() {
  const [selectedModule, setSelectedModule] = useState<HubModule | null>(null)
  const [filter, setFilter] = useState<string>('all')
  const [modules] = useState<HubModule[]>(HUB_MODULES)

  const categories = [
    { id: 'all', label: 'All Modules' },
    { id: 'business', label: 'Fleet & Biz' },
    { id: 'security', label: 'CCTV Security' },
    { id: 'iot', label: 'Smart Home' },
    { id: 'ai', label: 'AI Engine' },
    { id: 'cloud', label: 'Photos & Cloud' },
    { id: 'web3', label: 'Coin & DeFi' },
    { id: 'infra', label: 'Hardware' },
  ]

  const filtered = filter === 'all' ? modules : modules.filter((m) => m.category === filter)

  const handleLaunch = (mod: HubModule) => {
    setSelectedModule(mod)
  }

  const simulateTokenAction = (action: string) => {
    toast.success(`Action "${action}" queued for $UNCHARTED smart contract!`, { icon: '🪙' })
  }

  return (
    <div className="py-8">
      {/* Header Banner */}
      <div className="mb-8 p-6 rounded-2xl border border-owner/20 bg-gradient-to-r from-owner/5 via-base-900/40 to-accent/5 backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-owner animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-wider text-owner font-semibold">
                Sovereign Master Space · Owner Cockpit
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-light text-white tracking-tight">
              Modular Control Center
            </h2>
            <p className="text-xs md:text-sm text-white/40 mt-1 max-w-2xl leading-relaxed">
              Your autonomous personal & business operating system. Add apps as you progress — from real-time fleet GPS and AI computer vision to private cloud backups and custom Web3 tokens.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 font-mono text-xs text-white/50 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-owner" /> 8 Nodes Ready
            </span>
            <span className="px-3 py-1.5 rounded-lg border border-owner/30 bg-owner/10 font-mono text-xs text-owner flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-owner" /> Zero-Trust OIDC
            </span>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setFilter(c.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              filter === c.id
                ? 'bg-owner/15 border border-owner/30 text-owner shadow-sm'
                : 'bg-white/[0.02] border border-white/5 text-white/40 hover:text-white/70 hover:border-white/15'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((mod) => {
          const Icon = mod.icon
          return (
            <div
              key={mod.id}
              className="group p-5 rounded-xl border border-white/5 bg-base-900/40 hover:border-owner/30 hover:bg-white/[0.03] transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-owner/10 border border-owner/20 flex items-center justify-center text-owner group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-owner/20 bg-owner/10 text-owner">
                      {mod.status === 'live' ? '● Live' : '○ Standby Engine'}
                    </span>
                    <span className="text-[10px] font-mono text-white/20 mt-1">{mod.subdomain}</span>
                  </div>
                </div>

                {/* Title & Engine */}
                <h3 className="text-base font-medium text-white mb-1">{mod.title}</h3>
                <p className="text-[11px] font-mono text-accent/80 mb-2">// {mod.engine}</p>
                <p className="text-xs text-white/40 leading-relaxed mb-4">{mod.description}</p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 p-2.5 rounded-lg bg-black/20 border border-white/5 mb-4">
                  {mod.metrics.map((m) => (
                    <div key={m.label} className="text-center">
                      <p className="text-[10px] text-white/30 truncate">{m.label}</p>
                      <p className="text-xs font-mono font-medium text-white truncate mt-0.5">{m.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags & Action */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {mod.tags.map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/30">
                      {t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => handleLaunch(mod)}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-white/10 hover:border-owner/40 hover:bg-owner/10 text-xs font-mono text-white/70 hover:text-owner transition-all"
                >
                  <Zap className="w-3.5 h-3.5 text-owner" />
                  {mod.quickAction?.label || 'Launch Module'}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Module Interactive Modal */}
      {selectedModule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-2xl bg-base-900 border border-owner/30 rounded-2xl p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedModule(null)}
              className="absolute top-4 right-4 text-white/30 hover:text-white text-xs font-mono"
            >
              ✕ Close
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-owner/10 border border-owner/20 flex items-center justify-center text-owner">
                <selectedModule.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">{selectedModule.title}</h3>
                <p className="text-xs font-mono text-owner">{selectedModule.subdomain}</p>
              </div>
            </div>

            <p className="text-xs text-white/50 mb-6 leading-relaxed">
              {selectedModule.description} Powered by <strong className="text-white/80">{selectedModule.engine}</strong>.
            </p>

            {/* Specialized interactive panels based on module */}
            {selectedModule.id === 'token' && (
              <div className="space-y-4 p-4 rounded-xl border border-white/10 bg-black/40">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <span className="text-xs text-white/40 font-mono">Personal Currency</span>
                    <p className="text-lg font-mono text-white font-medium">$UNCHARTED Token</p>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-owner/15 text-owner font-mono text-xs">ERC-20 Standby</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-2.5 rounded bg-white/5">
                    <span className="text-white/30">Total Supply:</span>
                    <p className="text-white mt-1">10,000,000 UNCHARTED</p>
                  </div>
                  <div className="p-2.5 rounded bg-white/5">
                    <span className="text-white/30">Owner Treasury:</span>
                    <p className="text-owner mt-1">100% (0x971Ab...E2E2)</p>
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => simulateTokenAction('Deploy ERC-20 on Polygon')}
                    className="flex-1 py-2 rounded-lg bg-owner/20 border border-owner/40 text-owner text-xs font-mono hover:bg-owner/30 transition-colors"
                  >
                    Deploy Contract (Foundry)
                  </button>
                  <button
                    onClick={() => simulateTokenAction('Initialize Uniswap v3 Pool')}
                    className="flex-1 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70 text-xs font-mono hover:bg-white/10 transition-colors"
                  >
                    Create Uniswap Pool
                  </button>
                </div>
              </div>
            )}

            {selectedModule.id === 'fleet' && (
              <div className="p-4 rounded-xl border border-white/10 bg-black/40 space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center text-white/40 pb-2 border-b border-white/5">
                  <span>Traccar GPS Stream</span>
                  <span className="text-owner">● Ingestion Active</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between p-2 rounded bg-white/5">
                    <span className="text-white">Van #01 (Delivery Express)</span>
                    <span className="text-owner">42 km/h · Sector 4</span>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-white/5">
                    <span className="text-white">Truck #02 (Heavy Cargo)</span>
                    <span className="text-white/40">Parked · HQ Depot</span>
                  </div>
                </div>
              </div>
            )}

            {selectedModule.id === 'cctv' && (
              <div className="p-4 rounded-xl border border-white/10 bg-black/40 space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center text-white/40 pb-2 border-b border-white/5">
                  <span>Frigate NVR + Coral TPU</span>
                  <span className="text-owner">● 8.4ms Inference</span>
                </div>
                <div className="h-28 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/30 flex-col gap-2">
                  <Activity className="w-6 h-6 text-owner animate-pulse" />
                  <span>WebRTC Feed Stream ready on local server</span>
                </div>
              </div>
            )}

            {selectedModule.id !== 'token' && selectedModule.id !== 'fleet' && selectedModule.id !== 'cctv' && (
              <div className="p-4 rounded-xl border border-white/10 bg-black/40 text-xs font-mono space-y-3">
                <div className="flex justify-between items-center text-white/40 pb-2 border-b border-white/5">
                  <span>Docker Deployment Specification</span>
                  <span className="text-owner">● Configured in HOMESERVER_BLUEPRINT.md</span>
                </div>
                <p className="text-white/50 leading-relaxed">
                  This service is mapped in your <code>docker-compose.yml</code> file. Once your physical server or mini-PC is booted, Traefik v3 will automatically route <strong>{selectedModule.subdomain}</strong> to this container with zero port forwarding!
                </p>
              </div>
            )}

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setSelectedModule(null)}
                className="px-4 py-2 rounded-lg border border-white/10 text-white/50 text-xs font-mono hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
