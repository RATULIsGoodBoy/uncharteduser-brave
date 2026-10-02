import { motion } from 'framer-motion'
import { Server, Radio, Mail, Boxes, CheckCircle2, Clock, Lock } from 'lucide-react'
import { SITE_CONFIG } from '../config'

const projects = [
  {
    icon: Boxes,
    title: 'dApps Ecosystem',
    desc: 'Custom decentralized applications built on Ethereum and EVM-compatible chains. Wallet-gated access for authorized users.',
    tags: ['Ethereum', 'Web3', 'Solidity'],
    status: 'upcoming',
  },
  {
    icon: Server,
    title: 'Home Server Node',
    desc: 'Self-hosted Linux server running Docker containers — Nginx, databases, APIs — exposed safely via Cloudflare Tunnels.',
    tags: ['Docker', 'Linux', 'Self-Hosted'],
    status: 'upcoming',
  },
  {
    icon: Mail,
    title: 'Decentralized Mail',
    desc: 'XMTP + Mailchain wallet-native inbox. Receive and send messages natively to uncharteduser.brave from any wallet.',
    tags: ['XMTP', 'Mailchain', 'Privacy'],
    status: 'upcoming',
  },
  {
    icon: Radio,
    title: 'Private Streaming',
    desc: 'Jellyfin-powered self-hosted media server. Private, ad-free, and accessible only to authorized wallet holders.',
    tags: ['Jellyfin', 'Media', 'Private'],
    status: 'upcoming',
  },
]

const statusIcon = {
  done: <CheckCircle2 className="w-3 h-3 text-owner" />,
  upcoming: <Clock className="w-3 h-3 text-white/30" />,
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function PublicShowcase() {
  return (
    <>
      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="font-mono text-xs text-accent mb-3">// what I'm building</p>
          <h2 className="text-3xl md:text-4xl font-light text-white mb-4">Projects & Services</h2>
          <p className="text-white/40 max-w-xl">
            A growing ecosystem of self-hosted infrastructure, decentralized applications, and private digital services.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {projects.map((project) => {
            const Icon = project.icon
            return (
              <motion.div
                key={project.title}
                variants={item}
                whileHover={{ y: -2 }}
                className="group relative p-6 rounded-2xl border border-white/5 bg-base-900/50 backdrop-blur-sm hover:border-white/10 transition-all duration-300"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-full border border-white/10 bg-base-800/50">
                      {statusIcon[project.status as keyof typeof statusIcon]}
                      <span className="text-xs font-mono text-white/30 capitalize">{project.status}</span>
                    </div>
                  </div>

                  <h3 className="text-white font-medium mb-2">{project.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-4">{project.desc}</p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-xs text-white/40 font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="py-24 px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="font-mono text-xs text-accent mb-3">// the journey</p>
          <h2 className="text-3xl md:text-4xl font-light text-white mb-4">Roadmap</h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-accent/30 via-white/10 to-transparent" />

          {SITE_CONFIG.roadmap.map((node, i) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative flex gap-6 pb-10 last:pb-0"
            >
              <div className={`relative z-10 w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 ${
                node.status === 'done'
                  ? 'border-owner/50 bg-owner/10'
                  : 'border-white/20 bg-base-800'
              }`}>
                {node.status === 'done'
                  ? <CheckCircle2 className="w-4 h-4 text-owner" />
                  : <Lock className="w-3 h-3 text-white/30" />
                }
              </div>

              <div className="pt-0.5">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className={`font-medium ${node.status === 'done' ? 'text-white' : 'text-white/60'}`}>
                    {node.label}
                  </h3>
                  {node.status === 'done' && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-mono bg-owner/10 border border-owner/30 text-owner">
                      Live
                    </span>
                  )}
                </div>
                <p className="text-sm text-white/30">{node.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  )
}
