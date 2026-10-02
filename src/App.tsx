import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import PublicShowcase from './components/PublicShowcase'
import ContactPortal from './components/ContactPortal'
import OwnerDashboard from './components/OwnerDashboard'
import PasskeyModal from './components/PasskeyModal'
import Footer from './components/Footer'

function AppContent() {
  const { connect } = useAuth()
  const [pinOpen, setPinOpen] = useState(false)

  return (
    <div className="min-h-screen bg-base-950 text-white">
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#1a1a24',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '12px',
            fontSize: '13px',
          },
        }}
      />

      <Navbar onOpenPin={() => setPinOpen(true)} />
      <Hero onConnect={connect} />
      <PublicShowcase />
      <ContactPortal />
      <OwnerDashboard />
      <Footer />
      <PasskeyModal open={pinOpen} onClose={() => setPinOpen(false)} />
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
