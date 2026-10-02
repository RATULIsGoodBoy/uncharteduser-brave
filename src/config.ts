// ============================================================
//  uncharteduser.brave — Site Configuration
//  Edit OWNER_ADDRESSES to include your wallet address(es).
//  You can have multiple wallets (cold + hot wallet).
// ============================================================

export const SITE_CONFIG = {
  domain: 'uncharteduser.brave',
  name: 'Eyamim Rahman',
  handle: 'uncharteduser',
  tagline: 'Uncharted Territory. Decentralized by Design.',
  bio: 'Building on the frontier of Web3 — self-hosted infrastructure, decentralized apps, and private digital sovereignty.',

  // 🔐 SECURITY: Add your wallet address(es) here (lowercase).
  // These are the ONLY wallets that will unlock the Owner Dashboard.
  OWNER_ADDRESSES: [
    '0x971ab50e1086a1660c340664c25e0649ee3fe2e2', // Brave Wallet — Account 1 (Ethereum)
  ] as string[],

  // 🔑 BACKUP PIN: SHA-256 hash of your backup passphrase.
  // The raw passphrase is never stored — only this hash.
  BACKUP_PIN_HASH: '8957ef9304eda76d91e1c750663a43853c10fee1c4d044e16cbf87c3925a909e',

  social: {
    github: 'https://github.com/RATULIsGoodBoy',
    xmtp: 'https://xmtp.chat/dm/uncharteduser.brave',
    mailchain: 'https://app.mailchain.com/new-message?to=uncharteduser@unstoppable',
    farcaster: 'https://warpcast.com/uncharteduser',
  },

  // 🗺️ Roadmap nodes shown publicly
  roadmap: [
    { id: 'domain', label: 'Web3 Domain', status: 'done', desc: 'uncharteduser.brave secured on Unstoppable Domains.' },
    { id: 'site', label: 'Landing Portal', status: 'done', desc: 'Public landing + owner-gated dashboard deployed on IPFS.' },
    { id: 'server', label: 'Home Server Node', status: 'upcoming', desc: 'Self-hosted Linux server with Docker, Nginx, and Cloudflare Tunnels.' },
    { id: 'mail', label: 'Decentralized Mail', status: 'upcoming', desc: 'XMTP + Mailchain inbox. Wallet-native messaging.' },
    { id: 'stream', label: 'Private Streaming', status: 'upcoming', desc: 'Jellyfin self-hosted media server behind private auth.' },
    { id: 'dapps', label: 'dApps Ecosystem', status: 'upcoming', desc: 'Custom decentralized applications accessible to authorized wallets.' },
    { id: 'node', label: 'IPFS/ETH Node', status: 'upcoming', desc: 'Run a personal Ethereum and IPFS node for full sovereignty.' },
  ],

  // Feature flags
  features: {
    walletConnect: true,
    backupPin: true,
    contactForm: true,
    roadmap: true,
    serverTelemetry: true, // Shows mock data until real server is online
  },
}
