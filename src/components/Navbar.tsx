import { Wallet, LogOut, Shield, Eye } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

interface NavbarProps {
  onOpenPin: () => void
}

export default function Navbar({ onOpenPin }: NavbarProps) {
  const { authState, connectedAddress, connect, disconnect } = useAuth()

  const short = connectedAddress
    ? `${connectedAddress.slice(0, 6)}…${connectedAddress.slice(-4)}`
    : null

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-14 bg-base-950/90 backdrop-blur-md border-b border-white/5">
      {/* Logo */}
      <a href="#" className="font-mono text-sm">
        <span className="text-white/60">uncharteduser</span>
        <span className="text-accent">.brave</span>
      </a>

      {/* Links */}
      <div className="hidden md:flex items-center gap-6 text-xs text-white/30">
        {['projects', 'roadmap', 'contact'].map((l) => (
          <a key={l} href={`#${l}`} className="hover:text-white/70 transition-colors capitalize">{l}</a>
        ))}
      </div>

      {/* Auth */}
      <div className="flex items-center gap-2">
        {authState === 'disconnected' && (
          <button onClick={onOpenPin} className="text-xs text-white/20 hover:text-white/40 transition-colors px-2 py-1">
            PIN
          </button>
        )}

        <button
          onClick={authState === 'disconnected' ? connect : undefined}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-colors ${
            authState === 'owner' || authState === 'pinauth'
              ? 'border-owner/30 text-owner bg-owner/5'
              : authState === 'guest'
              ? 'border-white/10 text-white/30'
              : 'border-white/10 text-white/40 hover:border-white/20 hover:text-white/60'
          }`}
        >
          {authState === 'owner' || authState === 'pinauth' ? (
            <><Shield className="w-3 h-3" /> {authState === 'pinauth' ? 'Owner · PIN' : `Owner · ${short}`}</>
          ) : authState === 'guest' ? (
            <><Eye className="w-3 h-3" /> Guest · {short}</>
          ) : (
            <><Wallet className="w-3 h-3" /> Connect</>
          )}
        </button>

        {authState !== 'disconnected' && (
          <button
            onClick={disconnect}
            className="p-1.5 rounded-lg border border-white/5 text-white/20 hover:text-red-400 hover:border-red-400/20 transition-colors"
          >
            <LogOut className="w-3 h-3" />
          </button>
        )}
      </div>
    </nav>
  )
}
