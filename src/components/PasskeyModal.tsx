import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Key, X, Eye, EyeOff, AlertTriangle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

interface PasskeyModalProps {
  open: boolean
  onClose: () => void
}

export default function PasskeyModal({ open, onClose }: PasskeyModalProps) {
  const { unlockWithPin } = useAuth()
  const [pin, setPin] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [loading, setLoading] = useState(false)

  const handleUnlock = async () => {
    if (attempts >= 5) return
    setLoading(true)
    setError('')
    await new Promise((r) => setTimeout(r, 600))
    const success = await unlockWithPin(pin)
    if (success) {
      setPin('')
      setAttempts(0)
      onClose()
    } else {
      const newAttempts = attempts + 1
      setAttempts(newAttempts)
      if (newAttempts >= 5) {
        setError('Too many failed attempts. Please try again later.')
      } else {
        setError(`Incorrect PIN. ${5 - newAttempts} attempt(s) remaining.`)
      }
      setPin('')
    }
    setLoading(false)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative z-10 w-full max-w-sm p-6 rounded-2xl border border-white/10 bg-base-900/95 backdrop-blur-xl"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-white/20 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                <Key className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="text-white font-medium">Backup PIN Access</h3>
                <p className="text-xs text-white/30">Emergency owner authentication</p>
              </div>
            </div>

            <p className="text-xs text-white/30 mb-6 leading-relaxed">
              Use your backup PIN if your wallet is unavailable. This is hashed via SHA-256 and never stored in plaintext.
            </p>

            <div className="relative mb-4">
              <input
                type={show ? 'text' : 'password'}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
                placeholder="Enter backup PIN..."
                disabled={attempts >= 5 || loading}
                className="w-full bg-base-800/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-accent/40 transition-colors pr-12"
              />
              <button
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/40 transition-colors"
              >
                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 mb-4">
                <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <p className="text-xs text-red-400">{error}</p>
              </div>
            )}

            <button
              onClick={handleUnlock}
              disabled={!pin || loading || attempts >= 5}
              className="w-full py-3 rounded-xl bg-accent/10 border border-accent/30 text-accent text-sm font-medium hover:bg-accent/20 transition-colors disabled:opacity-40"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-accent/40 border-t-accent rounded-full animate-spin mx-auto" />
              ) : 'Unlock Dashboard'}
            </button>

            <p className="text-center text-xs text-white/20 mt-4 font-mono">
              Default PIN: uncharted2025 — change in config.ts
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
