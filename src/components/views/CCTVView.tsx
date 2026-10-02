import { useState } from 'react'
import {
  Video,
  Camera,
  Cpu,
  ShieldAlert,
  Moon,
  Volume2,
  VolumeX,
} from 'lucide-react'
import toast from 'react-hot-toast'

interface CameraFeed {
  id: string
  name: string
  location: string
  fps: number
  resolution: string
  detection: string | null
  confidence: number | null
}

const CAMERAS: CameraFeed[] = [
  { id: 'cam-01', name: 'CAM 01 — Front Gate', location: 'Perimeter West', fps: 30, resolution: '4K (3840x2160)', detection: 'Vehicle (Delivery)', confidence: 94 },
  { id: 'cam-02', name: 'CAM 02 — Main Driveway', location: 'Perimeter East', fps: 30, resolution: '2K (2560x1440)', detection: null, confidence: null },
  { id: 'cam-03', name: 'CAM 03 — Front Porch', location: 'Main Entrance', fps: 25, resolution: '1080p', detection: 'Person', confidence: 91 },
  { id: 'cam-04', name: 'CAM 04 — Server Vault', location: 'Interior Rack 1', fps: 30, resolution: '1080p', detection: null, confidence: null },
]

export default function CCTVView() {
  const [selectedCam, setSelectedCam] = useState<string>('cam-01')
  const [audioMuted, setAudioMuted] = useState<boolean>(true)
  const [nightVision, setNightVision] = useState<boolean>(false)

  const captureSnapshot = (name: string) => {
    toast.success(`Snapshot captured from ${name} and archived to Immich vault!`, { icon: '📸' })
  }

  const triggerSiren = () => {
    toast.error('Perimeter siren triggered! Warning sound active.', { icon: '🚨' })
  }

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Video className="w-4 h-4 text-owner" />
            <h3 className="text-base font-medium text-white">Frigate NVR + go2rtc WebRTC Console</h3>
          </div>
          <p className="text-xs text-white/40 font-mono">
            Hardware: Google Coral USB Edge TPU (8.4ms) · RTSP 8554 · Subdomain: <code>cctv.uncharteduser.brave</code>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setNightVision(!nightVision)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-mono flex items-center gap-1.5 transition-colors ${
              nightVision
                ? 'border-accent/40 bg-accent/15 text-accent'
                : 'border-white/10 text-white/50 hover:text-white'
            }`}
          >
            <Moon className="w-3.5 h-3.5" />
            {nightVision ? 'IR Mode Active' : 'IR Auto'}
          </button>

          <button
            onClick={triggerSiren}
            className="px-3 py-1.5 rounded-lg border border-red-500/30 bg-red-500/10 text-xs font-mono text-red-400 hover:bg-red-500/20 flex items-center gap-1.5 transition-colors"
          >
            <ShieldAlert className="w-3.5 h-3.5" /> Siren Test
          </button>
        </div>
      </div>

      {/* Camera Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CAMERAS.map((cam) => {
          const isSelected = selectedCam === cam.id
          return (
            <div
              key={cam.id}
              onClick={() => setSelectedCam(cam.id)}
              className={`relative rounded-xl border overflow-hidden transition-all bg-black cursor-pointer group ${
                isSelected ? 'border-owner/60 shadow-lg' : 'border-white/10 hover:border-white/20'
              }`}
            >
              {/* Simulated Camera Video View */}
              <div className={`h-56 relative flex items-center justify-center ${nightVision ? 'bg-zinc-900' : 'bg-zinc-950'}`}>
                {/* Scanline Effect */}
                <div
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)',
                    backgroundSize: '100% 4px',
                  }}
                />

                {/* Camera HUD Header */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono z-10">
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/70 border border-white/10 text-white">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    <span>REC · {cam.name}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-black/70 border border-white/10 text-owner">
                    {cam.fps} FPS · {cam.resolution}
                  </span>
                </div>

                {/* Bounding Box Simulation if detected */}
                {cam.detection ? (
                  <div className="relative border-2 border-owner/80 bg-owner/10 rounded p-4 flex flex-col items-center animate-pulse">
                    <span className="px-2 py-0.5 rounded bg-owner text-black font-mono text-[10px] font-bold mb-1">
                      {cam.detection} · {cam.confidence}%
                    </span>
                    <div className="w-16 h-24 border border-dashed border-owner/40 rounded flex items-center justify-center">
                      <Camera className="w-6 h-6 text-owner/70" />
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-white/20 font-mono text-xs flex flex-col items-center gap-2">
                    <Camera className="w-8 h-8 opacity-40" />
                    <span>Live WebRTC Stream · {cam.location}</span>
                  </div>
                )}

                {/* Bottom Stream Controls */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono z-10">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setAudioMuted(!audioMuted)
                      }}
                      className="p-1.5 rounded bg-black/70 border border-white/10 text-white/60 hover:text-white"
                    >
                      {audioMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-owner" />}
                    </button>
                    <span className="text-[10px] text-white/40">{cam.location}</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      captureSnapshot(cam.name)
                    }}
                    className="px-2.5 py-1 rounded bg-black/70 border border-white/10 text-white/60 hover:text-owner hover:border-owner/30 flex items-center gap-1 text-[11px]"
                  >
                    <Camera className="w-3 h-3" /> Snapshot
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* TPU Telemetry Bar */}
      <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-2 text-white/60">
          <Cpu className="w-4 h-4 text-owner" />
          <span>Google Coral Edge TPU Coprocessor</span>
        </div>
        <div className="flex gap-4 text-white/40">
          <span>Inference: <strong className="text-owner">8.4 ms</strong></span>
          <span>Load: <strong className="text-white">14%</strong></span>
          <span>Temperature: <strong className="text-white">41°C</strong></span>
        </div>
      </div>
    </div>
  )
}
