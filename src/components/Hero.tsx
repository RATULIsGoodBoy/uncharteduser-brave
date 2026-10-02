import { Globe, Wallet, ArrowRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { SITE_CONFIG } from '../config'

interface HeroProps {
  onConnect: () => void
}

export default function Hero({ onConnect }: HeroProps) {
  const { authState, isOwner } = useAuth()

  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-2xl w-full">
        {/* Domain pill */}
        <div className="inline-flex items-center gap-2 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span className="font-mono text-xs text-white/40">{SITE_CONFIG.domain}</span>
        </div>

        {/* Name */}
        <h1 className="text-5xl md:text-6xl font-light text-white tracking-tight mb-4">
          {SITE_CONFIG.name}
        </h1>

        {/* Tagline */}
        <p className="text-white/40 text-lg mb-3 font-light">{SITE_CONFIG.tagline}</p>
        <p className="text-white/25 text-sm leading-relaxed max-w-lg mb-10">{SITE_CONFIG.bio}</p>

        {/* Owner badge */}
        {isOwner && (
          <div className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 rounded-lg border border-owner/20 bg-owner/5">
            <span className="w-1.5 h-1.5 rounded-full bg-owner" />
            <span className="text-xs font-mono text-owner">Owner access active</span>
          </div>
        )}

        {/* CTAs */}
        <div className="flex flex-wrap gap-3">
          <a
            href="#projects"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
          >
            View Projects <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <a
            href="#contact"
            className="px-5 py-2.5 rounded-lg border border-white/10 text-white/50 text-sm hover:text-white hover:border-white/20 transition-colors"
          >
            Contact
          </a>
          {authState === 'disconnected' && (
            <button
              onClick={onConnect}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/10 text-white/50 text-sm hover:text-white hover:border-white/20 transition-colors"
            >
              <Wallet className="w-3.5 h-3.5" /> Connect Wallet
            </button>
          )}
          {isOwner && (
            <a
              href="#dashboard"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-owner/20 text-owner text-sm hover:bg-owner/5 transition-colors"
            >
              <Globe className="w-3.5 h-3.5" /> Dashboard
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
