import { useState, useEffect } from 'react'
import {
  Navigation,
  Gauge,
  BatteryCharging,
  Fuel,
  MapPin,
  Play,
  RotateCcw,
  CheckCircle2,
  Copy,
} from 'lucide-react'
import toast from 'react-hot-toast'

interface Vehicle {
  id: string
  name: string
  type: string
  driver: string
  speed: number
  fuel: number
  battery: number
  status: 'moving' | 'idle' | 'parked'
  coords: [number, number]
  geofence: string
  odometer: number
}

const INITIAL_VEHICLES: Vehicle[] = [
  {
    id: 'veh-01',
    name: 'Van #01 — Express Cargo',
    type: 'Van',
    driver: 'Rahman E.',
    speed: 48,
    fuel: 72,
    battery: 12.6,
    status: 'moving',
    coords: [23.8103, 90.4125],
    geofence: 'Sector 4 Industrial',
    odometer: 14280,
  },
  {
    id: 'veh-02',
    name: 'Truck #02 — Heavy Freight',
    type: 'Truck',
    driver: 'Karim S.',
    speed: 0,
    fuel: 88,
    battery: 12.8,
    status: 'parked',
    coords: [23.7808, 90.4211],
    geofence: 'Central Logistics Depot',
    odometer: 68420,
  },
  {
    id: 'veh-03',
    name: 'Sedan #03 — Client Service',
    type: 'Sedan',
    driver: 'Hasan M.',
    speed: 34,
    fuel: 54,
    battery: 12.4,
    status: 'moving',
    coords: [23.7925, 90.4078],
    geofence: 'Downtown Commercial Hub',
    odometer: 28910,
  },
]

export default function FleetView() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(INITIAL_VEHICLES)
  const [selectedId, setSelectedId] = useState<string>('veh-01')
  const [replayActive, setReplayActive] = useState<boolean>(false)

  const activeVehicle = vehicles.find((v) => v.id === selectedId) || vehicles[0]

  useEffect(() => {
    const interval = setInterval(() => {
      setVehicles((prev) =>
        prev.map((v) => {
          if (v.status === 'moving') {
            const deltaSpeed = Math.round((Math.random() - 0.5) * 6)
            return {
              ...v,
              speed: Math.max(20, Math.min(85, v.speed + deltaSpeed)),
              fuel: Math.max(10, v.fuel - 0.02),
            }
          }
          return v
        })
      )
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const copyCoords = () => {
    navigator.clipboard.writeText(`${activeVehicle.coords[0]}, ${activeVehicle.coords[1]}`)
    toast.success(`Copied coordinates: ${activeVehicle.coords.join(', ')}`)
  }

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Navigation className="w-4 h-4 text-owner" />
            <h3 className="text-base font-medium text-white">Traccar Fleet Telemetry Radar</h3>
          </div>
          <p className="text-xs text-white/40 font-mono">
            Protocol: OsmAnd HTTP (5055) + Teltonika AVL (5027) · Subdomain: <code>fleet.uncharteduser.brave</code>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setReplayActive(!replayActive)
              toast(replayActive ? 'Trip replay stopped' : 'Replaying historical route (2x speed)...', { icon: '🔄' })
            }}
            className={`px-3 py-1.5 rounded-lg border text-xs font-mono flex items-center gap-1.5 transition-colors ${
              replayActive
                ? 'border-owner/40 bg-owner/15 text-owner'
                : 'border-white/10 text-white/50 hover:text-white'
            }`}
          >
            {replayActive ? <RotateCcw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
            {replayActive ? 'Replaying...' : 'Replay Trip'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vehicles Sidebar */}
        <div className="space-y-2">
          <p className="text-xs font-mono text-white/30 mb-2">// tracked assets ({vehicles.length})</p>
          {vehicles.map((v) => (
            <button
              key={v.id}
              onClick={() => setSelectedId(v.id)}
              className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                selectedId === v.id
                  ? 'border-owner/40 bg-owner/10 shadow-sm'
                  : 'border-white/5 bg-base-900/40 hover:border-white/15'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-white">{v.name}</span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                    v.status === 'moving' ? 'bg-owner/20 text-owner' : 'bg-white/10 text-white/40'
                  }`}
                >
                  {v.status === 'moving' ? `● ${v.speed} km/h` : '○ Parked'}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-white/30 font-mono">
                <span>Driver: {v.driver}</span>
                <span>{v.geofence}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Live HUD & Map Canvas */}
        <div className="lg:col-span-2 space-y-4">
          {/* Simulated Radar Map View */}
          <div className="relative h-64 rounded-xl border border-white/10 bg-black/60 overflow-hidden flex items-center justify-center p-4">
            {/* Grid Lines */}
            <div
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0, 212, 170, 0.2) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0, 212, 170, 0.2) 1px, transparent 1px)
                `,
                backgroundSize: '32px 32px',
              }}
            />

            {/* Radar Circular Sweep */}
            <div className="absolute w-48 h-48 rounded-full border border-owner/20 animate-ping opacity-25" />
            <div className="absolute w-32 h-32 rounded-full border border-owner/40" />

            {/* Simulated Vehicle Markers */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-owner/20 border-2 border-owner flex items-center justify-center text-owner shadow-lg animate-pulse">
                <Navigation className="w-4 h-4" />
              </div>
              <span className="mt-2 px-2.5 py-1 rounded bg-black/80 border border-owner/30 text-[11px] font-mono text-owner shadow-md">
                {activeVehicle.name} · {activeVehicle.speed} km/h
              </span>
              <span className="text-[10px] text-white/40 font-mono mt-0.5">{activeVehicle.geofence}</span>
            </div>

            {/* Coordinates Floating Pill */}
            <div className="absolute bottom-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/80 border border-white/10 text-[11px] font-mono text-white/60">
              <MapPin className="w-3 h-3 text-owner" />
              <span>{activeVehicle.coords[0].toFixed(4)}° N, {activeVehicle.coords[1].toFixed(4)}° E</span>
              <button onClick={copyCoords} className="text-white/30 hover:text-white ml-1">
                <Copy className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Telemetry Telemetry Gauges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
            <div className="p-3 rounded-xl border border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-1.5 text-white/30 text-[11px] mb-1">
                <Gauge className="w-3.5 h-3.5 text-accent" /> Speed
              </div>
              <p className="text-lg text-white font-medium">{activeVehicle.speed} <span className="text-xs text-white/30 font-normal">km/h</span></p>
            </div>

            <div className="p-3 rounded-xl border border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-1.5 text-white/30 text-[11px] mb-1">
                <Fuel className="w-3.5 h-3.5 text-amber-400" /> Fuel Level
              </div>
              <p className="text-lg text-white font-medium">{activeVehicle.fuel.toFixed(0)} <span className="text-xs text-white/30 font-normal">%</span></p>
            </div>

            <div className="p-3 rounded-xl border border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-1.5 text-white/30 text-[11px] mb-1">
                <BatteryCharging className="w-3.5 h-3.5 text-owner" /> Battery
              </div>
              <p className="text-lg text-white font-medium">{activeVehicle.battery} <span className="text-xs text-white/30 font-normal">V</span></p>
            </div>

            <div className="p-3 rounded-xl border border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-1.5 text-white/30 text-[11px] mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-owner" /> Odometer
              </div>
              <p className="text-lg text-white font-medium">{activeVehicle.odometer.toLocaleString()} <span className="text-xs text-white/30 font-normal">km</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
