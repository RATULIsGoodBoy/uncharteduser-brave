import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react'
import { SITE_CONFIG } from '../config'
import toast from 'react-hot-toast'

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>
      on: (event: string, handler: (...args: unknown[]) => void) => void
      removeListener: (event: string, handler: (...args: unknown[]) => void) => void
    }
  }
}

export type AuthState = 'disconnected' | 'guest' | 'owner' | 'pinauth'

interface AuthContextType {
  authState: AuthState
  connectedAddress: string | null
  connect: () => Promise<void>
  disconnect: () => void
  unlockWithPin: (pin: string) => Promise<boolean>
  isOwner: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>('disconnected')
  const [connectedAddress, setConnectedAddress] = useState<string | null>(null)

  const isOwner = authState === 'owner' || authState === 'pinauth'

  const checkOwnership = useCallback((address: string): boolean => {
    if (SITE_CONFIG.OWNER_ADDRESSES.length === 0) return false
    return SITE_CONFIG.OWNER_ADDRESSES.map((a) => a.toLowerCase()).includes(address.toLowerCase())
  }, [])

  const connect = useCallback(async () => {
    if (!window.ethereum) {
      toast.error('No Web3 wallet detected. Install Brave Wallet or MetaMask.', { icon: '🦊' })
      return
    }
    try {
      toast.loading('Connecting wallet...', { id: 'wallet-connect' })
      const accounts = (await window.ethereum.request({ method: 'eth_requestAccounts' })) as string[]
      if (!accounts || accounts.length === 0) {
        toast.error('No accounts found.', { id: 'wallet-connect' })
        return
      }
      const address = accounts[0]
      setConnectedAddress(address)

      if (checkOwnership(address)) {
        // 🔐 SIWE-style: Sign a challenge message to prove wallet ownership
        const message = `Welcome to uncharteduser.brave!\n\nSigning this message proves you own this wallet.\nThis does NOT trigger any blockchain transaction or cost any gas.\n\nTimestamp: ${Date.now()}`
        try {
          await window.ethereum.request({
            method: 'personal_sign',
            params: [message, address],
          })
          setAuthState('owner')
          toast.success('🔓 Owner access granted.', { id: 'wallet-connect' })
        } catch {
          toast.error('Signature rejected. Owner access denied.', { id: 'wallet-connect' })
          setAuthState('guest')
        }
      } else {
        setAuthState('guest')
        if (SITE_CONFIG.OWNER_ADDRESSES.length === 0) {
          toast('ℹ️ No owner wallet configured yet. Set OWNER_ADDRESSES in config.ts', { id: 'wallet-connect' })
        } else {
          toast('👁️ Connected as Guest. Read-only view.', { id: 'wallet-connect' })
        }
      }
    } catch (err) {
      toast.error('Wallet connection failed.', { id: 'wallet-connect' })
      console.error(err)
    }
  }, [checkOwnership])

  const disconnect = useCallback(() => {
    setAuthState('disconnected')
    setConnectedAddress(null)
    toast('Wallet disconnected.', { icon: '🔌' })
  }, [])

  const unlockWithPin = useCallback(async (pin: string): Promise<boolean> => {
    const encoder = new TextEncoder()
    const data = encoder.encode(pin)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
    if (hashHex === SITE_CONFIG.BACKUP_PIN_HASH) {
      setAuthState('pinauth')
      toast.success('🔓 Owner access granted via PIN.', { icon: '🔑' })
      return true
    }
    return false
  }, [])

  // Handle account changes in wallet
  useEffect(() => {
    if (!window.ethereum) return
    const handleAccountsChanged = (accounts: unknown) => {
      const accs = accounts as string[]
      if (!accs || accs.length === 0) {
        disconnect()
      } else {
        setConnectedAddress(accs[0])
        if (checkOwnership(accs[0])) {
          setAuthState('owner')
        } else {
          setAuthState('guest')
        }
      }
    }
    window.ethereum.on('accountsChanged', handleAccountsChanged)
    return () => {
      window.ethereum?.removeListener('accountsChanged', handleAccountsChanged)
    }
  }, [disconnect, checkOwnership])

  return (
    <AuthContext.Provider value={{ authState, connectedAddress, connect, disconnect, unlockWithPin, isOwner }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
