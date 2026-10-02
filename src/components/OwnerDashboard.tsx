import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Server, Radio, Boxes, Mail, Inbox, Cpu, HardDrive,
  Wifi, Trash2, Shield, Lock, RefreshCw, ExternalLink, Activity
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const STORAGE_KEY = 'uncharteduser_inbox'

interface Message {
  from: string
  text: string
  ts: number
}

function loadMessages(): Message[] {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
}

// Simulated server metrics (replace with real API when home server is live)
function useMockTelemetry() {
  const [metrics, setMetrics] = useState({
    cpu: 12,
    ram: 34,
    disk: 61,
    uptime: '14d 3h 22m',
    network: '↑ 2.1 MB/s ↓ 0.8 MB/s',
    containers: 8,
    ipfsPeers: 142,
    online: false, // Set to true when real server is running
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        cpu: Math.max(2, Math.min(90, prev.cpu + (Math.random() - 0.5) * 10)),
        ram: Math.max(20, Math.min(85, prev.ram + (Math.random() - 0.5) * 5)),
      }))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return metrics
}

const dapps = [
  { name: 'Wallet Manager', icon: Shield, desc: 'View holdings and sign transactions.', color: 'accent' },
  { name: 'IPFS File Node', icon: HardDrive, desc: 'Browse and pin files to your IPFS node.', color: 'accent' },
  { name: 'Contract Deploy', icon: Boxes, desc: 'Deploy and interact with smart contracts.', color: 'accent' },
  { name: 'Streaming Node', icon: Radio, desc: 'Control your Jellyfin media server.', color: 'accent' },
]

type Tab = 'overview' | 'dapps' | 'inbox' | 'server'

export default function OwnerDashboard() {
  const { isOwner, authState } = useAuth()
  const [tab, setTab] = useState<Tab>('overview')
  const [messages, setMessages] = useState<Message[]>(loadMessages())
  const metrics = useMockTelemetry()

  const deleteMessage = (i: number) => {
    const updated = [...messages]
    updated.splice(i, 1)
    setMessages(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  if (!isOwner) {
    return (
      <section id="dashboard" className="py-24 px-6 max-w-4xl mx-auto">
        <div className="p-8 rounded-2xl border border-white/10 bg-base-900/50 text-center">
          <Lock className="w-10 h-10 text-white/20 mx-auto mb-4" />
          <h3 className="text-white/60 font-medium mb-2">Owner Dashboard</h3>
          <p className="text-white/30 text-sm">
            Connect your owner wallet or use the PIN fallback to unlock this area.
          </p>
        </div>
      </section>
    )
  }

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'dapps', label: 'dApps', icon: Boxes },
    { id: 'inbox', label: `Inbox (${messages.length})`, icon: Inbox },
    { id: 'server', label: 'Server', icon: Server },
  ]

  return (
    <section id="dashboard" className="py-24 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-2 h-2 rounded-full bg-owner animate-pulse" />
          <p className="font-mono text-xs text-owner">
            {authState === 'pinauth' ? 'Authenticated via PIN' : 'Owner Wallet Verified'}
          </p>
        </div>
        <h2 className="text-3xl font-light text-white">Owner Dashboard</h2>
        <p className="text-white/40 mt-1 text-sm">Full control over your uncharteduser.brave ecosystem.</p>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 p-1 rounded-xl bg-base-900/80 border border-white/5 w-fit">
        {tabs.map((t) => {
          const Icon = t.icon
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
                tab === t.id
                  ? 'bg-owner/10 border border-owner/20 text-owner'
                  : 'text-white/30 hover:text-white/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {t.label}
            </button>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        {/* OVERVIEW TAB */}
        {tab === 'overview' && (
          <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Inbox Messages', value: messages.length, icon: Mail },
                { label: 'dApps Available', value: dapps.length, icon: Boxes },
                { label: 'Server Status', value: metrics.online ? 'Online' : 'Offline', icon: Server },
                { label: 'IPFS Peers', value: metrics.ipfsPeers, icon: Wifi },
              ].map((stat) => {
                const Icon = stat.icon
                return (
                  <div key={stat.label} className="p-4 rounded-xl border border-white/5 bg-base-900/50">
                    <Icon className="w-4 h-4 text-accent mb-3" />
                    <p className="font-mono text-2xl text-white mb-1">{stat.value}</p>
                    <p className="text-xs text-white/30">{stat.label}</p>
                  </div>
                )
              })}
            </div>

            <div className="p-4 rounded-xl border border-white/5 bg-base-900/30">
              <p className="text-xs font-mono text-white/30 mb-2">// recent activity</p>
              {messages.slice(0, 3).map((msg, i) => (
                <div key={i} className="flex items-start gap-3 py-2 border-b border-white/5 last:border-0">
                  <Mail className="w-3.5 h-3.5 text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-xs font-mono text-white/50">{msg.from}</span>
                    <p className="text-xs text-white/30 truncate">{msg.text}</p>
                  </div>
                </div>
              ))}
              {messages.length === 0 && (
                <p className="text-xs text-white/20 text-center py-4">No messages yet.</p>
              )}
            </div>
          </motion.div>
        )}

        {/* DAPPS TAB */}
        {tab === 'dapps' && (
          <motion.div key="dapps" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dapps.map((app) => {
                const Icon = app.icon
                return (
                  <div key={app.name} className="group p-6 rounded-2xl border border-white/5 bg-base-900/50 hover:border-owner/20 transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-owner/10 border border-owner/20 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-owner" />
                      </div>
                      <span className="px-2 py-0.5 text-xs font-mono bg-owner/10 border border-owner/20 rounded-full text-owner">Active</span>
                    </div>
                    <h3 className="text-white font-medium mb-1">{app.name}</h3>
                    <p className="text-sm text-white/30 mb-4">{app.desc}</p>
                    <button className="flex items-center gap-2 text-xs text-owner hover:underline">
                      <ExternalLink className="w-3 h-3" />
                      Launch (coming soon)
                    </button>
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* INBOX TAB */}
        {tab === 'inbox' && (
          <motion.div key="inbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="space-y-3">
              {messages.length === 0 ? (
                <div className="text-center py-20 text-white/20">
                  <Inbox className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">No messages yet.</p>
                </div>
              ) : (
                messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="group p-4 rounded-xl border border-white/5 bg-base-900/50 hover:border-white/10 transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono text-accent">{msg.from}</span>
                          <span className="text-xs text-white/20">{new Date(msg.ts).toLocaleDateString()}</span>
                        </div>
                        <p className="text-sm text-white/70 leading-relaxed">{msg.text}</p>
                      </div>
                      <button
                        onClick={() => deleteMessage(i)}
                        className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-red-500/10 text-white/20 hover:text-red-400 transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}

        {/* SERVER TAB */}
        {tab === 'server' && (
          <motion.div key="server" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="flex items-center gap-2 mb-6 p-3 rounded-lg border border-white/10 bg-base-900/30 w-fit">
              <div className={`w-2 h-2 rounded-full ${metrics.online ? 'bg-owner animate-pulse' : 'bg-red-500/50'}`} />
              <span className="text-xs font-mono text-white/40">
                {metrics.online ? 'Server Online' : 'Server Offline — Configure your home server to enable telemetry'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {[
                { label: 'CPU Usage', value: `${Math.round(metrics.cpu)}%`, icon: Cpu, bar: metrics.cpu },
                { label: 'RAM Usage', value: `${Math.round(metrics.ram)}%`, icon: Activity, bar: metrics.ram },
                { label: 'Disk Usage', value: `${metrics.disk}%`, icon: HardDrive, bar: metrics.disk },
              ].map((stat) => {
                const Icon = stat.icon
                return (
                  <div key={stat.label} className="p-4 rounded-xl border border-white/5 bg-base-900/50">
                    <div className="flex items-center justify-between mb-3">
                      <Icon className="w-4 h-4 text-accent" />
                      <span className="font-mono text-lg text-white">{stat.value}</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden mb-2">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-accent to-owner transition-all duration-1000"
                        style={{ width: `${stat.bar}%` }}
                      />
                    </div>
                    <p className="text-xs text-white/30">{stat.label}</p>
                  </div>
                )
              })}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Uptime', value: metrics.uptime, icon: RefreshCw },
                { label: 'Network', value: metrics.network, icon: Wifi },
                { label: 'Containers', value: `${metrics.containers} running`, icon: Server },
                { label: 'IPFS Peers', value: metrics.ipfsPeers, icon: Wifi },
              ].map((s) => {
                const Icon = s.icon
                return (
                  <div key={s.label} className="p-3 rounded-xl border border-white/5 bg-base-900/50">
                    <Icon className="w-3.5 h-3.5 text-white/30 mb-2" />
                    <p className="font-mono text-xs text-white mb-0.5">{s.value}</p>
                    <p className="text-xs text-white/30">{s.label}</p>
                  </div>
                )
              })}
            </div>

            <div className="mt-6 p-4 rounded-xl border border-white/10 bg-white/2">
              <p className="text-xs font-mono text-white/30">
                // Real-time telemetry will auto-populate once your home server is running.<br />
                // See HOMESERVER_BLUEPRINT.md for setup instructions.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
