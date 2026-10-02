import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, MessageCircle, Mail, ExternalLink, CheckCircle2 } from 'lucide-react'
import { SITE_CONFIG } from '../config'
import toast from 'react-hot-toast'

interface Message {
  from: string
  text: string
  ts: number
}

const STORAGE_KEY = 'uncharteduser_inbox'

function saveMessage(msg: Message) {
  const existing: Message[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  existing.unshift(msg)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing.slice(0, 100)))
}

export default function ContactPortal() {
  const [from, setFrom] = useState('')
  const [text, setText] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!from.trim() || !text.trim()) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    saveMessage({ from: from.trim(), text: text.trim(), ts: Date.now() })
    setSent(true)
    setLoading(false)
    toast.success('Message saved! The owner will see it in the dashboard.')
  }

  return (
    <section id="contact" className="py-24 px-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <p className="font-mono text-xs text-accent mb-3">// get in touch</p>
        <h2 className="text-3xl md:text-4xl font-light text-white mb-4">Contact</h2>
        <p className="text-white/40">
          Send a message through the contact form, or connect directly via Web3 messaging.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="p-6 rounded-2xl border border-white/5 bg-base-900/50"
        >
          <div className="flex items-center gap-2 mb-6">
            <Mail className="w-4 h-4 text-accent" />
            <h3 className="text-white font-medium">Leave a Message</h3>
          </div>

          {sent ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <CheckCircle2 className="w-10 h-10 text-owner mb-4" />
              <p className="text-white font-medium mb-2">Message Sent!</p>
              <p className="text-white/40 text-sm">It's saved privately. The owner will read it in their dashboard.</p>
              <button
                onClick={() => { setSent(false); setFrom(''); setText('') }}
                className="mt-6 text-sm text-accent hover:underline"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-white/40 mb-1.5 font-mono">Your name or wallet</label>
                <input
                  type="text"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  placeholder="0xabc... or Alice"
                  className="w-full bg-base-800/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-accent/40 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-white/40 mb-1.5 font-mono">Message</label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="What's on your mind?"
                  rows={5}
                  className="w-full bg-base-800/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-accent/40 transition-colors resize-none"
                  required
                  maxLength={1000}
                />
                <p className="text-right text-xs text-white/20 mt-1">{text.length}/1000</p>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-accent/10 border border-accent/30 text-accent text-sm font-medium hover:bg-accent/20 transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-accent/40 border-t-accent rounded-full animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </motion.div>

        {/* Web3 Messaging */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-4"
        >
          <div className="p-6 rounded-2xl border border-white/5 bg-base-900/50">
            <div className="flex items-center gap-2 mb-4">
              <MessageCircle className="w-4 h-4 text-accent" />
              <h3 className="text-white font-medium">Web3 Messaging</h3>
            </div>
            <p className="text-white/40 text-sm mb-6">
              Connect directly wallet-to-wallet using decentralized messaging protocols.
              No email, no middleman — just cryptographically secure chat.
            </p>
            <div className="space-y-3">
              <a
                href={SITE_CONFIG.social.xmtp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl border border-white/10 hover:border-accent/30 hover:bg-accent/5 transition-all group"
              >
                <div>
                  <p className="text-sm text-white font-medium">XMTP</p>
                  <p className="text-xs text-white/30 font-mono">uncharteduser.brave</p>
                </div>
                <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-accent transition-colors" />
              </a>
              <a
                href={SITE_CONFIG.social.mailchain}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl border border-white/10 hover:border-accent/30 hover:bg-accent/5 transition-all group"
              >
                <div>
                  <p className="text-sm text-white font-medium">Mailchain</p>
                  <p className="text-xs text-white/30 font-mono">uncharteduser@unstoppable</p>
                </div>
                <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-accent transition-colors" />
              </a>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-white/5 bg-base-900/30">
            <p className="text-xs text-white/30 font-mono leading-relaxed">
              💡 <strong className="text-white/50">Tip:</strong> If you use XMTP, you can message{' '}
              <span className="text-accent">uncharteduser.brave</span> directly from any XMTP-compatible app like
              Converse or hey.xyz
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
