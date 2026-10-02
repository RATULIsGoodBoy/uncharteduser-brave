import { useState } from 'react'
import { Send, CheckCircle2, ExternalLink } from 'lucide-react'
import { SITE_CONFIG } from '../config'
import toast from 'react-hot-toast'

interface Message { from: string; text: string; ts: number }
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
    await new Promise((r) => setTimeout(r, 600))
    saveMessage({ from: from.trim(), text: text.trim(), ts: Date.now() })
    setSent(true)
    setLoading(false)
    toast.success('Message sent!')
  }

  return (
    <section id="contact" className="py-20 px-6 max-w-5xl mx-auto">
      <p className="text-xs text-white/30 font-mono mb-2">// contact</p>
      <h2 className="text-2xl font-light text-white mb-10">Get in Touch</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Form */}
        <div className="p-6 rounded-xl border border-white/5 bg-white/[0.02]">
          {sent ? (
            <div className="flex flex-col items-center justify-center h-full py-12 text-center">
              <CheckCircle2 className="w-8 h-8 text-owner mb-3" />
              <p className="text-sm text-white mb-1">Message sent.</p>
              <p className="text-xs text-white/30">I'll see it in my dashboard.</p>
              <button onClick={() => { setSent(false); setFrom(''); setText('') }} className="mt-4 text-xs text-accent hover:underline">
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-white/30 mb-1.5 font-mono">Name or wallet</label>
                <input
                  type="text"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  placeholder="0xabc... or your name"
                  required
                  className="w-full bg-white/5 border border-white/5 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/15 focus:outline-none focus:border-white/15 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-white/30 mb-1.5 font-mono">Message</label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="What's on your mind?"
                  rows={5}
                  required
                  maxLength={1000}
                  className="w-full bg-white/5 border border-white/5 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/15 focus:outline-none focus:border-white/15 transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/10 text-white/60 text-sm hover:text-white hover:border-white/20 transition-colors disabled:opacity-40"
              >
                {loading ? <div className="w-3.5 h-3.5 border border-white/30 border-t-white rounded-full animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                {loading ? 'Sending...' : 'Send'}
              </button>
            </form>
          )}
        </div>

        {/* Web3 links */}
        <div className="space-y-3">
          <p className="text-xs text-white/30 mb-4">Or reach me directly via Web3 messaging:</p>
          {[
            { label: 'XMTP', sub: 'uncharteduser.brave', url: SITE_CONFIG.social.xmtp },
            { label: 'Mailchain', sub: 'uncharteduser@unstoppable', url: SITE_CONFIG.social.mailchain },
          ].map((l) => (
            <a
              key={l.label}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all group"
            >
              <div>
                <p className="text-sm text-white">{l.label}</p>
                <p className="text-xs text-white/25 font-mono">{l.sub}</p>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-white/15 group-hover:text-white/40 transition-colors" />
            </a>
          ))}

          <div className="pt-4 text-xs text-white/20 leading-relaxed">
            Both protocols let you message me wallet-to-wallet. No email needed.
          </div>
        </div>
      </div>
    </section>
  )
}
