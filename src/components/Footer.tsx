import { SITE_CONFIG } from '../config'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-10">
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/20">
        <span className="font-mono">
          <span className="text-white/40">uncharteduser</span>
          <span className="text-accent">.brave</span>
          {' '}· Eyamim Rahman
        </span>
        <div className="flex items-center gap-5">
          <a href={SITE_CONFIG.social.github} target="_blank" rel="noopener noreferrer" className="hover:text-white/50 transition-colors">GitHub</a>
          <a href={SITE_CONFIG.social.xmtp} target="_blank" rel="noopener noreferrer" className="hover:text-white/50 transition-colors">XMTP</a>
          <a href={SITE_CONFIG.social.mailchain} target="_blank" rel="noopener noreferrer" className="hover:text-white/50 transition-colors">Mail</a>
        </div>
      </div>
    </footer>
  )
}
