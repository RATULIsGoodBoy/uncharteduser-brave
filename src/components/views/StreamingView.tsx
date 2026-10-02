import { useState } from 'react'
import {
  Radio,
  Play,
  Pause,
  SkipForward,
  Volume2,
  Film,
  Headphones,
  CheckCircle2,
} from 'lucide-react'
import toast from 'react-hot-toast'

export default function StreamingView() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const progress = 42

  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
    toast(isPlaying ? 'Playback paused' : 'Streaming 4K HDR stream via Intel QuickSync...', {
      icon: isPlaying ? '⏸️' : '▶️',
    })
  }

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Radio className="w-4 h-4 text-owner" />
            <h3 className="text-base font-medium text-white">Jellyfin Media Streaming Node</h3>
          </div>
          <p className="text-white/40">
            Hardware: Intel QuickSync VAAPI · 100% Ad-Free Private Cloud · Subdomain: <code>stream.uncharteduser.brave</code>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-lg border border-owner/30 bg-owner/10 text-owner flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" /> Hardware Transcoding Active
          </span>
        </div>
      </div>

      {/* Now Playing Console */}
      <div className="p-6 rounded-2xl border border-white/10 bg-gradient-to-r from-base-900/60 to-black/60 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-20 rounded-lg bg-zinc-800 border border-white/10 flex items-center justify-center text-white/30 flex-shrink-0">
            <Film className="w-8 h-8 text-owner/70" />
          </div>
          <div>
            <span className="text-[10px] text-owner uppercase tracking-wider">Now Playing · 4K HDR10</span>
            <h4 className="text-base font-medium text-white mt-0.5">Interstellar (2014)</h4>
            <p className="text-white/40 text-[11px] mt-0.5">HEVC Main 10 · DTS-HD Master Audio 5.1 · Bitrate: 42.4 Mbps</p>
          </div>
        </div>

        {/* Media Controls */}
        <div className="flex flex-col items-center gap-2 w-full md:w-64">
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlayback}
              className="w-10 h-10 rounded-full bg-owner text-black flex items-center justify-center hover:scale-105 transition-transform"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black ml-0.5" />}
            </button>
            <button
              onClick={() => toast('Skipped forward 30 seconds', { icon: '⏩' })}
              className="text-white/40 hover:text-white"
            >
              <SkipForward className="w-4 h-4" />
            </button>
            <Volume2 className="w-4 h-4 text-white/40" />
          </div>

          {/* Progress Bar */}
          <div className="w-full flex items-center gap-2 text-[10px] text-white/30">
            <span>1:12:40</span>
            <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden cursor-pointer">
              <div className="h-full bg-owner rounded-full" style={{ width: `${progress}%` }} />
            </div>
            <span>2:49:04</span>
          </div>
        </div>
      </div>

      {/* Library Collections Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border border-white/5 bg-base-900/40 space-y-2">
          <div className="flex items-center gap-2 text-white">
            <Film className="w-4 h-4 text-accent" />
            <h4 className="font-medium">Cinema Vault</h4>
          </div>
          <p className="text-white/40 text-[11px]">840 4K UHD & Blu-ray Movies in high-bitrate containers.</p>
          <span className="text-[10px] text-white/30 block pt-1">Direct Stream (Zero Transcode)</span>
        </div>

        <div className="p-4 rounded-xl border border-white/5 bg-base-900/40 space-y-2">
          <div className="flex items-center gap-2 text-white">
            <Radio className="w-4 h-4 text-amber-400" />
            <h4 className="font-medium">Television Series</h4>
          </div>
          <p className="text-white/40 text-[11px]">400 Complete Series with auto-skip intro detection.</p>
          <span className="text-[10px] text-white/30 block pt-1">Auto-Synced Across Devices</span>
        </div>

        <div className="p-4 rounded-xl border border-white/5 bg-base-900/40 space-y-2">
          <div className="flex items-center gap-2 text-white">
            <Headphones className="w-4 h-4 text-owner" />
            <h4 className="font-medium">Audiobooks & FLAC</h4>
          </div>
          <p className="text-white/40 text-[11px]">Lossless 24-bit 96kHz audio library with chapter sync.</p>
          <span className="text-[10px] text-white/30 block pt-1">Audiobookshelf Integrated</span>
        </div>
      </div>
    </div>
  )
}
