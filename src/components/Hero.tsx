import { motion } from 'framer-motion'
import { ArrowDown, Hexagon, Wallet, Globe } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { SITE_CONFIG } from '../config'

interface HeroProps {
  onConnect: () => void
}

export default function Hero({ onConnect }: HeroProps) {
  const { authState, isOwner } = useAuth()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(124,131,253,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,131,253,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Domain badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/5 mb-8"
        >
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="font-mono text-xs text-accent">{SITE_CONFIG.domain}</span>
          <span className="text-xs text-white/30">· Unstoppable Domain</span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-light text-white mb-4 tracking-tight"
        >
          {SITE_CONFIG.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl md:text-2xl text-white/30 font-light mb-6"
        >
          {SITE_CONFIG.tagline}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-2xl mx-auto text-white/50 leading-relaxed mb-10"
        >
          {SITE_CONFIG.bio}
        </motion.p>

        {/* Status indicator */}
        {isOwner && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-owner/30 bg-owner/5 mb-8"
          >
            <Hexagon className="w-3 h-3 text-owner fill-owner" />
            <span className="font-mono text-xs text-owner">Owner Mode Active · Full Access Granted</span>
          </motion.div>
        )}

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          <a
            href="#projects"
            className="px-6 py-3 rounded-xl bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-6 py-3 rounded-xl border border-white/20 text-white/70 text-sm hover:border-white/40 hover:text-white transition-colors"
          >
            Get in Touch
          </a>
          {authState === 'disconnected' && (
            <button
              onClick={onConnect}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-accent/30 text-accent text-sm hover:bg-accent/10 transition-colors"
            >
              <Wallet className="w-4 h-4" />
              Connect Wallet
            </button>
          )}
          {isOwner && (
            <a
              href="#dashboard"
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-owner/30 bg-owner/5 text-owner text-sm hover:bg-owner/10 transition-colors"
            >
              <Globe className="w-4 h-4" />
              Open Dashboard
            </a>
          )}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <ArrowDown className="w-5 h-5 text-white/20 animate-bounce" />
        </motion.div>
      </div>
    </section>
  )
}
