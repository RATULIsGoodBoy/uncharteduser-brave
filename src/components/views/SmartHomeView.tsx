import { useState } from 'react'
import {
  Home,
  Lightbulb,
  Thermometer,
  Lock,
  Unlock,
  Sun,
  BatteryCharging,
  Zap,
} from 'lucide-react'
import toast from 'react-hot-toast'

export default function SmartHomeView() {
  const [lights, setLights] = useState({ living: true, office: true, porch: false, rack: true })
  const [temp, setTemp] = useState<number>(22)
  const [deadboltLocked, setDeadboltLocked] = useState<boolean>(true)
  const [garageOpen, setGarageOpen] = useState<boolean>(false)

  const toggleLight = (key: keyof typeof lights) => {
    setLights((prev) => {
      const next = !prev[key]
      toast(`Light ${key} turned ${next ? 'ON' : 'OFF'}`, { icon: '💡' })
      return { ...prev, [key]: next }
    })
  }

  const toggleDeadbolt = () => {
    setDeadboltLocked(!deadboltLocked)
    toast(deadboltLocked ? 'Front Deadbolt UNLOCKED' : 'Front Deadbolt LOCKED', {
      icon: deadboltLocked ? '🔓' : '🔒',
    })
  }

  const toggleGarage = () => {
    setGarageOpen(!garageOpen)
    toast(garageOpen ? 'Garage Door CLOSING...' : 'Garage Door OPENING...', { icon: '🚗' })
  }

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Home className="w-4 h-4 text-owner" />
            <h3 className="text-base font-medium text-white">Home Assistant Core + Mosquitto MQTT</h3>
          </div>
          <p className="text-xs text-white/40 font-mono">
            142 Entities Active · Local Zigbee/Z-Wave Coordinator · Subdomain: <code>home.uncharteduser.brave</code>
          </p>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-3 py-1.5 rounded-lg border border-owner/30 bg-owner/10 text-owner">
            ● Solar Net Export: +2.38 kW
          </span>
        </div>
      </div>

      {/* Energy Flow Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex items-center justify-between">
          <div>
            <span className="text-[11px] text-white/30 flex items-center gap-1.5 mb-1">
              <Sun className="w-3.5 h-3.5 text-amber-400" /> Solar Production
            </span>
            <p className="text-xl text-white font-medium">3.80 <span className="text-xs text-white/30">kW</span></p>
          </div>
          <span className="text-xs text-amber-400">Peak Sun</span>
        </div>

        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex items-center justify-between">
          <div>
            <span className="text-[11px] text-white/30 flex items-center gap-1.5 mb-1">
              <BatteryCharging className="w-3.5 h-3.5 text-owner" /> Battery Storage
            </span>
            <p className="text-xl text-white font-medium">88 <span className="text-xs text-white/30">%</span></p>
          </div>
          <span className="text-xs text-owner">Charging</span>
        </div>

        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex items-center justify-between">
          <div>
            <span className="text-[11px] text-white/30 flex items-center gap-1.5 mb-1">
              <Zap className="w-3.5 h-3.5 text-accent" /> Total Home Draw
            </span>
            <p className="text-xl text-white font-medium">1.42 <span className="text-xs text-white/30">kW</span></p>
          </div>
          <span className="text-xs text-white/40">Self-Sufficient</span>
        </div>
      </div>

      {/* Control Tiles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Living Room Light */}
        <div
          onClick={() => toggleLight('living')}
          className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between h-36 ${
            lights.living ? 'border-amber-400/40 bg-amber-400/5' : 'border-white/5 bg-base-900/40'
          }`}
        >
          <div className="flex items-center justify-between">
            <Lightbulb className={`w-5 h-5 ${lights.living ? 'text-amber-400' : 'text-white/20'}`} />
            <span className={`text-xs font-mono ${lights.living ? 'text-amber-400' : 'text-white/30'}`}>
              {lights.living ? 'ON · 80%' : 'OFF'}
            </span>
          </div>
          <div>
            <h4 className="text-sm font-medium text-white">Living Room</h4>
            <p className="text-xs text-white/30 font-mono mt-0.5">Circadian Warm White</p>
          </div>
        </div>

        {/* Server Rack Lighting */}
        <div
          onClick={() => toggleLight('rack')}
          className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between h-36 ${
            lights.rack ? 'border-owner/40 bg-owner/5' : 'border-white/5 bg-base-900/40'
          }`}
        >
          <div className="flex items-center justify-between">
            <Zap className={`w-5 h-5 ${lights.rack ? 'text-owner' : 'text-white/20'}`} />
            <span className={`text-xs font-mono ${lights.rack ? 'text-owner' : 'text-white/30'}`}>
              {lights.rack ? 'ACTIVE' : 'OFF'}
            </span>
          </div>
          <div>
            <h4 className="text-sm font-medium text-white">Server Rack Illuminator</h4>
            <p className="text-xs text-white/30 font-mono mt-0.5">Cold LED Ambient</p>
          </div>
        </div>

        {/* Smart Thermostat */}
        <div className="p-4 rounded-xl border border-white/5 bg-base-900/40 flex flex-col justify-between h-36">
          <div className="flex items-center justify-between">
            <Thermometer className="w-5 h-5 text-accent" />
            <span className="text-xs font-mono text-accent">Auto Cool</span>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/40 font-mono">HVAC Zone 1</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTemp((t) => Math.max(18, t - 1))}
                  className="w-6 h-6 rounded bg-white/10 text-white flex items-center justify-center text-xs font-mono hover:bg-white/20"
                >
                  -
                </button>
                <span className="text-sm font-mono text-white font-medium">{temp}°C</span>
                <button
                  onClick={() => setTemp((t) => Math.min(28, t + 1))}
                  className="w-6 h-6 rounded bg-white/10 text-white flex items-center justify-center text-xs font-mono hover:bg-white/20"
                >
                  +
                </button>
              </div>
            </div>
            <p className="text-xs text-white/30 font-mono mt-1">Indoor Air: 22.4°C · 48% RH</p>
          </div>
        </div>

        {/* Smart Deadbolt */}
        <div
          onClick={toggleDeadbolt}
          className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between h-36 ${
            deadboltLocked ? 'border-owner/40 bg-owner/5' : 'border-red-400/40 bg-red-400/5'
          }`}
        >
          <div className="flex items-center justify-between">
            {deadboltLocked ? <Lock className="w-5 h-5 text-owner" /> : <Unlock className="w-5 h-5 text-red-400" />}
            <span className={`text-xs font-mono ${deadboltLocked ? 'text-owner' : 'text-red-400'}`}>
              {deadboltLocked ? 'SECURE' : 'UNLOCKED'}
            </span>
          </div>
          <div>
            <h4 className="text-sm font-medium text-white">Front Door Deadbolt</h4>
            <p className="text-xs text-white/30 font-mono mt-0.5">Z-Wave Mesh Keyless</p>
          </div>
        </div>
      </div>

      {/* Garage Door & Scene Strip */}
      <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-3">
          <span className="text-white/40">Motorized Garage:</span>
          <span className={garageOpen ? 'text-amber-400' : 'text-owner'}>
            {garageOpen ? '● Door OPEN' : '● Door CLOSED & LOCKED'}
          </span>
          <button
            onClick={toggleGarage}
            className="px-2.5 py-1 rounded border border-white/10 bg-white/5 text-white hover:border-white/30"
          >
            {garageOpen ? 'Close Door' : 'Open Door'}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-white/30">Quick Scenes:</span>
          {['Movie Night', 'Away', 'All Off'].map((scene) => (
            <button
              key={scene}
              onClick={() => toast.success(`Activated scene "${scene}"!`, { icon: '✨' })}
              className="px-2.5 py-1 rounded border border-white/10 text-white/60 hover:text-owner hover:border-owner/30 transition-colors"
            >
              {scene}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
