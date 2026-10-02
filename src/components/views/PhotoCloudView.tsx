import { useState } from 'react'
import {
  Image,
  Folder,
  FileText,
  Lock,
  Upload,
  UserCheck,
  HardDrive,
} from 'lucide-react'
import toast from 'react-hot-toast'

interface CloudFile {
  name: string
  size: string
  date: string
  type: 'folder' | 'pdf' | 'archive'
}

const FILES: CloudFile[] = [
  { name: 'Fleet_Operating_Licenses_2026', size: '2.4 MB', date: 'Oct 01, 2026', type: 'pdf' },
  { name: 'Vehicle_Maintenance_Invoices', size: '8.1 MB', date: 'Sep 28, 2026', type: 'folder' },
  { name: 'Uncharted_Smart_Contracts_Audit', size: '1.2 MB', date: 'Sep 24, 2026', type: 'pdf' },
  { name: 'ZFS_Database_Encrypted_Backup', size: '14.8 GB', date: 'Today 04:00 AM', type: 'archive' },
]

export default function PhotoCloudView() {
  const [activeTab, setActiveTab] = useState<'photos' | 'drive'>('photos')

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Image className="w-4 h-4 text-owner" />
            <h3 className="text-base font-medium text-white">Immich Photo Vault & Nextcloud Drive</h3>
          </div>
          <p className="text-white/40">
            Self-hosted Google Photos & Google Drive sovereign replacement · Subdomain: <code>photos.uncharteduser.brave</code>
          </p>
        </div>
        <div className="flex items-center gap-1 bg-base-900 p-1 rounded-lg border border-white/10">
          <button
            onClick={() => setActiveTab('photos')}
            className={`px-3 py-1 rounded-md transition-colors ${
              activeTab === 'photos' ? 'bg-owner/20 text-owner' : 'text-white/40 hover:text-white'
            }`}
          >
            Immich Photos (42k)
          </button>
          <button
            onClick={() => setActiveTab('drive')}
            className={`px-3 py-1 rounded-md transition-colors ${
              activeTab === 'drive' ? 'bg-owner/20 text-owner' : 'text-white/40 hover:text-white'
            }`}
          >
            Nextcloud Drive (184 GB)
          </button>
        </div>
      </div>

      {activeTab === 'photos' && (
        <div className="space-y-4">
          {/* Facial Recognition & Smart Tags */}
          <div className="flex items-center justify-between p-3.5 rounded-xl border border-white/5 bg-base-900/40">
            <div className="flex items-center gap-2 text-white/50">
              <UserCheck className="w-4 h-4 text-owner" />
              <span>Face Clusters (pgvector ML):</span>
              <span className="px-2 py-0.5 rounded bg-white/5 text-white/70">Eyamim R. (8,410)</span>
              <span className="px-2 py-0.5 rounded bg-white/5 text-white/70">Family (12,180)</span>
              <span className="px-2 py-0.5 rounded bg-white/5 text-white/70">Fleet Ops (3,290)</span>
            </div>
            <span className="text-[11px] text-owner">● Auto-Sync: Active</span>
          </div>

          {/* Photo Gallery Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
              <div
                key={idx}
                onClick={() => toast.success(`Viewing photo #${idx} in full-resolution HDR lightbox`, { icon: '📸' })}
                className="group relative h-40 rounded-xl border border-white/5 bg-zinc-950 overflow-hidden cursor-pointer hover:border-owner/40 transition-all flex flex-col justify-end p-3"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                <div className="absolute top-2.5 right-2.5 z-20 text-[10px] px-1.5 py-0.5 rounded bg-black/60 text-white/60">
                  RAW 45MP
                </div>
                <div className="relative z-20">
                  <p className="text-white font-medium text-[11px]">IMG_2026_0{idx}.DNG</p>
                  <p className="text-[10px] text-white/40">Sony A7IV · 35mm f/1.4 · ISO 100</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'drive' && (
        <div className="p-4 rounded-xl border border-white/5 bg-base-900/40 space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div className="flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-accent" />
              <h4 className="text-sm font-medium text-white">Encrypted Business Drive</h4>
            </div>
            <button
              onClick={() => toast.success('Upload dialog opened — drag files to sync directly to ZFS pool', { icon: '☁️' })}
              className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-white hover:border-owner/30 flex items-center gap-1.5 text-xs"
            >
              <Upload className="w-3.5 h-3.5" /> Upload File
            </button>
          </div>

          <div className="divide-y divide-white/5">
            {FILES.map((f) => (
              <div key={f.name} className="py-2.5 flex items-center justify-between hover:bg-white/[0.01] px-2 rounded">
                <div className="flex items-center gap-2.5">
                  {f.type === 'folder' && <Folder className="w-4 h-4 text-amber-400" />}
                  {f.type === 'pdf' && <FileText className="w-4 h-4 text-accent" />}
                  {f.type === 'archive' && <Lock className="w-4 h-4 text-owner" />}
                  <div>
                    <p className="text-white font-medium">{f.name}</p>
                    <p className="text-[10px] text-white/30">{f.date}</p>
                  </div>
                </div>
                <span className="text-white/40">{f.size}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
