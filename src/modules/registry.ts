import {
  Navigation,
  Video,
  Home,
  Bot,
  Image,
  Radio,
  Coins,
  Server,
  LucideIcon,
} from 'lucide-react'

export interface HubModule {
  id: string
  title: string
  category: 'business' | 'security' | 'iot' | 'ai' | 'cloud' | 'media' | 'web3' | 'infra'
  subdomain: string
  engine: string
  description: string
  icon: LucideIcon
  status: 'live' | 'ready' | 'simulated'
  metrics: { label: string; value: string }[]
  tags: string[]
  quickAction?: { label: string; url?: string; actionId?: string }
}

export const HUB_MODULES: HubModule[] = [
  {
    id: 'fleet',
    title: 'Fleet Logistics & GPS',
    category: 'business',
    subdomain: 'fleet.uncharteduser.brave',
    engine: 'Traccar (PostgreSQL + PostGIS)',
    description: 'Real-time vehicle GPS tracking, geofence trip boundaries, speed compliance, and OBD-II diagnostics.',
    icon: Navigation,
    status: 'simulated',
    metrics: [
      { label: 'Active Fleet', value: '4 Vehicles' },
      { label: 'Moving', value: '2 En Route' },
      { label: 'Geofences', value: '8 Active' },
    ],
    tags: ['GPS', 'Logistics', 'Traccar', 'OBD-II'],
    quickAction: { label: 'Open Fleet Radar' },
  },
  {
    id: 'cctv',
    title: 'CCTV & Computer Vision NVR',
    category: 'security',
    subdomain: 'cctv.uncharteduser.brave',
    engine: 'Frigate NVR + go2rtc (Google Coral TPU)',
    description: 'Ultra-low latency WebRTC surveillance, neural network person/car detection, and AI snapshot summaries.',
    icon: Video,
    status: 'simulated',
    metrics: [
      { label: 'Cameras', value: '6 Online' },
      { label: 'Latency', value: '< 180ms' },
      { label: 'Inference', value: '8.4ms (TPU)' },
    ],
    tags: ['Frigate', 'WebRTC', 'RTSP', 'Coral TPU'],
    quickAction: { label: 'View Live Feeds' },
  },
  {
    id: 'home',
    title: 'Home Automation Hub',
    category: 'iot',
    subdomain: 'home.uncharteduser.brave',
    engine: 'Home Assistant Core + Mosquitto MQTT',
    description: 'Centralized smart home control for lighting scenes, HVAC climate zones, deadbolt security locks, and solar energy.',
    icon: Home,
    status: 'simulated',
    metrics: [
      { label: 'Entities', value: '142 Devices' },
      { label: 'Power Draw', value: '1.42 kW' },
      { label: 'Solar Output', value: '3.80 kW' },
    ],
    tags: ['Home Assistant', 'MQTT', 'Zigbee', 'Solar'],
    quickAction: { label: 'Control Center' },
  },
  {
    id: 'ai',
    title: 'Local AI Engine & Agents',
    category: 'ai',
    subdomain: 'ai.uncharteduser.brave',
    engine: 'Ollama + OpenWebUI (NVIDIA CUDA)',
    description: 'Private 100% offline LLM intelligence. Runs Llama-3, DeepSeek-Coder, and LLaVA vision summarization.',
    icon: Bot,
    status: 'simulated',
    metrics: [
      { label: 'Model', value: 'Llama-3 8B' },
      { label: 'VRAM Alloc', value: '5.8 GB / 12GB' },
      { label: 'Speed', value: '48.2 tok/s' },
    ],
    tags: ['Ollama', 'OpenWebUI', 'RAG', 'CUDA'],
    quickAction: { label: 'Launch AI Agent' },
  },
  {
    id: 'cloud',
    title: 'Photo Vault & Cloud Drive',
    category: 'cloud',
    subdomain: 'photos.uncharteduser.brave',
    engine: 'Immich + Nextcloud AIO',
    description: 'Complete self-hosted Google Photos and Drive replacement. Facial recognition clustering, pgvector search, and WebDAV.',
    icon: Image,
    status: 'simulated',
    metrics: [
      { label: 'Photos Stored', value: '42,890' },
      { label: 'Drive Files', value: '184 GB' },
      { label: 'Vault Security', value: 'E2EE AES-256' },
    ],
    tags: ['Immich', 'Nextcloud', 'pgvector', 'Photos'],
    quickAction: { label: 'Open Gallery' },
  },
  {
    id: 'stream',
    title: 'Private Media Streamer',
    category: 'media',
    subdomain: 'stream.uncharteduser.brave',
    engine: 'Jellyfin (Intel QuickSync VAAPI)',
    description: 'Private streaming node for movies, 4K series, and lossless FLAC music with hardware transcoding.',
    icon: Radio,
    status: 'simulated',
    metrics: [
      { label: 'Library', value: '1,240 Titles' },
      { label: 'Audiobooks', value: '185 Books' },
      { label: 'Bandwidth', value: 'Local LAN 1Gbps' },
    ],
    tags: ['Jellyfin', 'Streaming', 'Transcode', 'FLAC'],
    quickAction: { label: 'Start Player' },
  },
  {
    id: 'token',
    title: 'Web3 Coin Launchpad & DeFi',
    category: 'web3',
    subdomain: 'coin.uncharteduser.brave',
    engine: 'Foundry + OpenZeppelin + Private RPC',
    description: 'Personal ERC-20 token minting, liquidity pool depth, staking yield vault, and sovereign dApp ecosystem.',
    icon: Coins,
    status: 'simulated',
    metrics: [
      { label: 'Token Symbol', value: '$UNCHARTED' },
      { label: 'Total Supply', value: '10,000,000' },
      { label: 'Staking APR', value: '14.2%' },
    ],
    tags: ['ERC-20', 'Polygon', 'Uniswap v3', 'Staking'],
    quickAction: { label: 'Token Cockpit' },
  },
  {
    id: 'infra',
    title: 'Edge Ingress & Node Health',
    category: 'infra',
    subdomain: 'hub.uncharteduser.brave',
    engine: 'Traefik v3 + Authentik + ZFS + IPFS',
    description: 'Multi-layer L4/L7 ingress router, wildcard SSL automation, WireGuard mesh, and ZFS pool telemetry.',
    icon: Server,
    status: 'simulated',
    metrics: [
      { label: 'Containers', value: '18 Active' },
      { label: 'CPU Load', value: '14%' },
      { label: 'Storage Free', value: '3.4 TB' },
    ],
    tags: ['Traefik v3', 'Docker', 'ZFS', 'IPFS'],
    quickAction: { label: 'System Telemetry' },
  },
]
