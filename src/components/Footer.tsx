import { motion } from 'framer-motion'
import { Globe, Github, ExternalLink } from 'lucide-react'
import { SITE_CONFIG } from '../config'

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="border-t border-white/5 mt-16"
    >
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
              <Globe className="w-4 h-4 text-accent" />
            </div>
            <div>
              <span className="font-mono text-sm text-white">uncharteduser</span>
              <span className="font-mono text-sm text-accent">.brave</span>
              <p className="text-xs text-white/30">Powered by Unstoppable Domains + IPFS</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={SITE_CONFIG.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              GitHub
            </a>
            <a
              href={SITE_CONFIG.social.xmtp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              XMTP
            </a>
            <a
              href={SITE_CONFIG.social.mailchain}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Mailchain
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/20 font-mono">
          <span>© {new Date().getFullYear()} Eyamim Rahman. All rights reserved.</span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-owner" />
            Decentralized · Self-Sovereign · Web3
          </span>
        </div>
      </div>
    </motion.footer>
  )
}
