import { useState } from 'react'
import { HUB_MODULES } from '../modules/registry'
import {
  ShieldCheck,
  Zap,
  Activity,
  ArrowLeft,
} from 'lucide-react'

import FleetView from './views/FleetView'
import CCTVView from './views/CCTVView'
import SmartHomeView from './views/SmartHomeView'
import AIHubView from './views/AIHubView'
import PhotoCloudView from './views/PhotoCloudView'
import StreamingView from './views/StreamingView'
import TokenView from './views/TokenView'
import InfraView from './views/InfraView'

export default function ModularSpace() {
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null)
  const [filter, setFilter] = useState<string>('all')

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

  const filtered = filter === 'all' ? HUB_MODULES : HUB_MODULES.filter((m) => m.category === filter)
  const activeModule = HUB_MODULES.find((m) => m.id === activeModuleId)

  return (
    <div className="py-8 space-y-6">
      {/* If a module is active, render its full interactive view */}
      {activeModule ? (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-base-900/60 backdrop-blur-md">
            <button
              onClick={() => setActiveModuleId(null)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 hover:border-owner/40 hover:bg-owner/10 text-xs font-mono text-white/70 hover:text-owner transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to All Modules
            </button>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-owner flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-owner animate-pulse" />
                {activeModule.subdomain}
              </span>
              <button
                onClick={() => setActiveModuleId(null)}
                className="text-white/30 hover:text-white p-1"
                title="Close View"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Render target interactive view */}
          <div className="p-6 rounded-2xl border border-white/10 bg-base-900/40 backdrop-blur-sm">
            {activeModule.id === 'fleet' && <FleetView />}
            {activeModule.id === 'cctv' && <CCTVView />}
            {activeModule.id === 'home' && <SmartHomeView />}
            {activeModule.id === 'ai' && <AIHubView />}
            {activeModule.id === 'cloud' && <PhotoCloudView />}
            {activeModule.id === 'stream' && <StreamingView />}
            {activeModule.id === 'token' && <TokenView />}
            {activeModule.id === 'infra' && <InfraView />}
          </div>
        </div>
      ) : (
        /* Grid Overview of all modular apps */
        <>
          {/* Header Banner */}
          <div className="p-6 rounded-2xl border border-owner/20 bg-gradient-to-r from-owner/5 via-base-900/40 to-accent/5 backdrop-blur-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-owner animate-pulse" />
                  <span className="font-mono text-xs uppercase tracking-wider text-owner font-semibold">
                    Sovereign Master Space · Owner Cockpit
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-light text-white tracking-tight">
                  Modular Personal & Business OS
                </h2>
                <p className="text-xs md:text-sm text-white/40 mt-1 max-w-2xl leading-relaxed">
                  Your autonomous infrastructure foundation. Add modules as you progress in life — tracking vehicle fleets, monitoring CCTV feeds, smart home controls, local AI assistants, photo vaults, and your personal Web3 currency.
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
          <div className="flex flex-wrap gap-2">
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
                          ● Ready
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
                      onClick={() => setActiveModuleId(mod.id)}
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
        </>
      )}
    </div>
  )
}
