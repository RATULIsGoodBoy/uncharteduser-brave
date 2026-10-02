import { motion } from 'framer-motion'
import { Wallet, LogOut, Shield, Eye, Globe } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

interface NavbarProps {
  onOpenPin: () => void
}

export default function Navbar({ onOpenPin }: NavbarProps) {
  const { authState, connectedAddress, connect, disconnect } = useAuth()

  const short = connectedAddress ? `${connectedAddress.slice(0, 6)}...${connectedAddress.slice(-4)}` : null

  const stateConfig = {
    disconnected: { label: 'Connect Wallet', icon: Wallet, color: 'border-white/20 text-white/60 hover:border-accent/60 hover:text-accent' },
    guest: { label: `Guest · ${short}`, icon: Eye, color: 'border-white/20 text-white/40' },
    owner: { label: `Owner · ${short}`, icon: Shield, color: 'border-owner/40 text-owner animate-pulse-glow' },
    pinauth: { label: 'Owner · PIN', icon: Shield, color: 'border-owner/40 text-owner animate-pulse-glow' },
  }

  const cfg = stateConfig[authState]
  const Icon = cfg.icon

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-base-950/80 backdrop-blur-xl border-b border-white/5"
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center">
          <Globe className="w-4 h-4 text-accent" />
        </div>
        <div>
          <span className="font-mono text-sm font-medium text-white">uncharteduser</span>
          <span className="font-mono text-sm text-accent">.brave</span>
        </div>
      </div>

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-6 text-sm text-white/50">
        <a href="#about" className="hover:text-white transition-colors">About</a>
        <a href="#projects" className="hover:text-white transition-colors">Projects</a>
        <a href="#roadmap" className="hover:text-white transition-colors">Roadmap</a>
        <a href="#contact" className="hover:text-white transition-colors">Contact</a>
      </div>

      {/* Wallet Controls */}
      <div className="flex items-center gap-2">
        {authState === 'disconnected' && (
          <button
            onClick={onOpenPin}
            className="hidden sm:flex items-center gap-1 text-xs text-white/30 hover:text-white/60 transition-colors px-2 py-1"
          >
            PIN
          </button>
        )}
        <button
          onClick={authState === 'disconnected' ? connect : undefined}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-mono transition-all duration-200 ${cfg.color}`}
        >
          <Icon className="w-3.5 h-3.5" />
          <span>{cfg.label}</span>
        </button>
        {authState !== 'disconnected' && (
          <button
            onClick={disconnect}
            className="p-2 rounded-lg border border-white/10 text-white/30 hover:text-red-400 hover:border-red-400/30 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </motion.nav>
  )
}
