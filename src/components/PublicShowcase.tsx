import { Server, Radio, Mail, Boxes, Gamepad2, Users, ExternalLink, CheckCircle2 } from 'lucide-react'
import { SITE_CONFIG } from '../config'

const projects = [
  {
    icon: Gamepad2,
    title: 'Debt Runners',
    desc: 'A fast-paced game about escaping the debt cycle. Play it now.',
    tags: ['Game', 'Web'],
    status: 'live',
    url: '#',
  },
  {
    icon: Users,
    title: 'CommunityOS',
    desc: 'An open platform for building and managing communities online.',
    tags: ['Community', 'Platform'],
    status: 'live',
    url: 'https://communityos.vercel.app',
  },
  {
    icon: Boxes,
    title: 'dApps Ecosystem',
    desc: 'Decentralized apps built on Ethereum. Wallet-gated access.',
    tags: ['Web3', 'Ethereum'],
    status: 'upcoming',
    url: null,
  },
  {
    icon: Server,
    title: 'Home Server Node',
    desc: 'Self-hosted infrastructure running on Docker + Cloudflare Tunnels.',
    tags: ['Docker', 'Self-Hosted'],
    status: 'upcoming',
    url: null,
  },
  {
    icon: Mail,
    title: 'Decentralized Mail',
    desc: 'XMTP + Mailchain inbox. Message me wallet-to-wallet.',
    tags: ['XMTP', 'Privacy'],
    status: 'upcoming',
    url: null,
  },
  {
    icon: Radio,
    title: 'Private Streaming',
    desc: 'Self-hosted Jellyfin media server for authorized wallets.',
    tags: ['Jellyfin', 'Private'],
    status: 'upcoming',
    url: null,
  },
]

export default function PublicShowcase() {
  return (
    <>
      {/* Projects */}
      <section id="projects" className="py-20 px-6 max-w-5xl mx-auto">
        <p className="text-xs text-white/30 font-mono mb-2">// projects</p>
        <h2 className="text-2xl font-light text-white mb-10">What I'm Building</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {projects.map((p) => {
            const Icon = p.icon
            return (
              <div
                key={p.title}
                className="p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <Icon className="w-4 h-4 text-white/40" />
                  <span className={`text-xs font-mono ${p.status === 'live' ? 'text-owner' : 'text-white/20'}`}>
                    {p.status === 'live' ? '● live' : '○ soon'}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-white mb-1">{p.title}</h3>
                <p className="text-xs text-white/30 leading-relaxed mb-3">{p.desc}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1.5">
                    {p.tags.map((t) => (
                      <span key={t} className="text-xs text-white/20 font-mono">{t}</span>
                    ))}
                  </div>
                  {p.url && (
                    <a href={p.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-3 h-3 text-white/20 hover:text-white/60 transition-colors" />
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="py-20 px-6 max-w-5xl mx-auto">
        <p className="text-xs text-white/30 font-mono mb-2">// roadmap</p>
        <h2 className="text-2xl font-light text-white mb-10">The Journey</h2>

        <div className="space-y-0">
          {SITE_CONFIG.roadmap.map((node, i) => (
            <div key={node.id} className="flex gap-5 pb-8 last:pb-0">
              <div className="flex flex-col items-center">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${node.status === 'done' ? 'bg-owner' : 'bg-white/10'}`} />
                {i < SITE_CONFIG.roadmap.length - 1 && (
                  <div className="w-px flex-1 mt-2 bg-white/5" />
                )}
              </div>
              <div className="pb-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`text-sm ${node.status === 'done' ? 'text-white' : 'text-white/40'}`}>{node.label}</span>
                  {node.status === 'done' && <CheckCircle2 className="w-3 h-3 text-owner" />}
                </div>
                <p className="text-xs text-white/25 leading-relaxed">{node.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
