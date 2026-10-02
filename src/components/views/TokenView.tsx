import { useState } from 'react'
import {
  Coins,
  Flame,
  Award,
  Lock,
  ShieldCheck,
} from 'lucide-react'
import toast from 'react-hot-toast'

export default function TokenView() {
  const [stakedAmount, setStakedAmount] = useState<number>(50000)
  const [userBalance, setUserBalance] = useState<number>(9950000)
  const [mintInput, setMintInput] = useState<string>('')

  const handleStake = (amount: number) => {
    if (userBalance < amount) {
      toast.error('Insufficient $UNCHARTED balance!')
      return
    }
    setUserBalance((b) => b - amount)
    setStakedAmount((s) => s + amount)
    toast.success(`Staked ${amount.toLocaleString()} $UNCHARTED at 14.2% APR!`, { icon: '🪙' })
  }

  const handleMint = () => {
    const val = parseInt(mintInput)
    if (!val || val <= 0) return
    setUserBalance((b) => b + val)
    setMintInput('')
    toast.success(`Minted ${val.toLocaleString()} new $UNCHARTED tokens to owner wallet!`, { icon: '✨' })
  }

  const handleBurn = (amount: number) => {
    if (userBalance < amount) return
    setUserBalance((b) => b - amount)
    toast.error(`Burned ${amount.toLocaleString()} $UNCHARTED (sent to 0x0...dEaD)!`, { icon: '🔥' })
  }

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Coins className="w-4 h-4 text-owner" />
            <h3 className="text-base font-medium text-white">$UNCHARTED Token Cockpit & DeFi Hub</h3>
          </div>
          <p className="text-xs text-white/40 font-mono">
            Standard: ERC-20 (Polygon EVM) · Owner: <code>0x971Ab...E2E2</code> · Subdomain: <code>coin.uncharteduser.brave</code>
          </p>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-3 py-1.5 rounded-lg border border-owner/30 bg-owner/10 text-owner flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" /> Verified Smart Contract
          </span>
        </div>
      </div>

      {/* Token Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
        <div className="p-3.5 rounded-xl border border-white/5 bg-white/[0.02]">
          <span className="text-white/30 text-[11px] mb-1 block">Circulating Supply</span>
          <p className="text-lg text-white font-medium">10,000,000</p>
          <span className="text-[10px] text-white/30">$UNCHARTED</span>
        </div>

        <div className="p-3.5 rounded-xl border border-white/5 bg-white/[0.02]">
          <span className="text-white/30 text-[11px] mb-1 block">Owner Vault Balance</span>
          <p className="text-lg text-owner font-medium">{userBalance.toLocaleString()}</p>
          <span className="text-[10px] text-owner/60">Unstoppable Domain Vault</span>
        </div>

        <div className="p-3.5 rounded-xl border border-white/5 bg-white/[0.02]">
          <span className="text-white/30 text-[11px] mb-1 block">Staking Yield APR</span>
          <p className="text-lg text-amber-400 font-medium">14.2%</p>
          <span className="text-[10px] text-amber-400/60">Auto-Compounding</span>
        </div>

        <div className="p-3.5 rounded-xl border border-white/5 bg-white/[0.02]">
          <span className="text-white/30 text-[11px] mb-1 block">Liquidity Pool TVL</span>
          <p className="text-lg text-accent font-medium">$42,800</p>
          <span className="text-[10px] text-accent/60">Uniswap v3 Pool</span>
        </div>
      </div>

      {/* Interactive Controls & Staking */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Staking Yield Vault */}
        <div className="p-5 rounded-xl border border-white/5 bg-base-900/40 space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <h4 className="text-sm font-medium text-white">Staking Yield Vault</h4>
            </div>
            <span className="px-2 py-0.5 rounded bg-amber-400/10 text-amber-400 text-[10px]">14.2% APR</span>
          </div>

          <div className="p-3 rounded-lg bg-black/30 border border-white/5 flex justify-between items-center">
            <span className="text-white/40">Currently Staked:</span>
            <span className="text-base text-white font-medium">{stakedAmount.toLocaleString()} $UNCHARTED</span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => handleStake(10000)}
              className="flex-1 py-2.5 rounded-lg bg-owner/15 border border-owner/30 text-owner hover:bg-owner/25 transition-colors"
            >
              + Stake 10,000
            </button>
            <button
              onClick={() => {
                if (stakedAmount <= 0) return
                setUserBalance((b) => b + stakedAmount)
                setStakedAmount(0)
                toast.success('Unstaked all tokens and harvested yield rewards!', { icon: '🌾' })
              }}
              className="flex-1 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white transition-colors"
            >
              Claim & Unstake
            </button>
          </div>
        </div>

        {/* Mint & Burn Treasury Controls */}
        <div className="p-5 rounded-xl border border-white/5 bg-base-900/40 space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-owner" />
              <h4 className="text-sm font-medium text-white">Treasury Mint & Burn (Owner Only)</h4>
            </div>
            <span className="text-[10px] text-owner">0x971Ab...E2E2</span>
          </div>

          <div className="flex gap-2">
            <input
              type="number"
              value={mintInput}
              onChange={(e) => setMintInput(e.target.value)}
              placeholder="Amount to mint (e.g. 50000)..."
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/20 focus:outline-none focus:border-owner/40"
            />
            <button
              onClick={handleMint}
              className="px-4 py-2 rounded-lg bg-owner/20 border border-owner/40 text-owner hover:bg-owner/30 transition-colors"
            >
              Mint
            </button>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-white/30">Deflationary Burn:</span>
            <button
              onClick={() => handleBurn(5000)}
              className="px-3 py-1.5 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 flex items-center gap-1.5 transition-colors"
            >
              <Flame className="w-3.5 h-3.5" /> Burn 5,000 Tokens
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
