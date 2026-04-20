import { Outlet, Link } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

function App() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-black">
      {/* Premium Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        {/* Gradient line on top */}
        <div style={{ height: '2px', background: 'linear-gradient(to right, transparent, #ffe919, transparent)' }} />

        <div className="bg-black/80 backdrop-blur-xl border-b border-white/5">
          <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
            <div className="flex justify-between items-center h-20">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-4 group">
                <div>
                  <div style={{ color: '#ffe919', fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '0.05em' }}>
                    ESPASES LÀSER
                  </div>
                  <div className="text-[10px] font-medium text-gray-500 uppercase tracking-[0.3em]">
                    Star Wars Collection
                  </div>
                </div>
              </Link>

              {/* Navigation Links */}
              <div className="flex items-center gap-2">
                <Link
                  to="/"
                  className="px-5 py-2.5 text-gray-400 hover:text-white text-sm font-medium rounded-xl transition-all duration-300 hover:bg-white/5"
                >
                  Inici
                </Link>

                {user ? (
                  <>
                    <span className="px-5 py-2.5 text-yellow-400 text-sm font-bold">
                      Hola, {user.nom}
                    </span>
                    <button
                      onClick={logout}
                      className="px-5 py-2.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 text-sm font-medium rounded-xl transition-all duration-300 border border-red-500/20"
                    >
                      Tancar Sessió
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="px-5 py-2.5 text-gray-400 hover:text-white text-sm font-medium rounded-xl transition-all duration-300 hover:bg-white/5"
                    >
                      Iniciar Sessió
                    </Link>

                    <Link
                      to="/register"
                      className="px-5 py-2.5 text-gray-400 hover:text-white text-sm font-medium rounded-xl transition-all duration-300 hover:bg-white/5"
                    >
                      Registrar-se
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-[82px]" />

      {/* Admin Mode Banner */}
      {user?.role === 'admin' && (
        <div style={{
          background: 'linear-gradient(90deg, #7c3aed, #a855f7, #7c3aed)',
          backgroundSize: '200% 100%',
          animation: 'adminPulse 3s ease infinite',
          padding: '0.5rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.75rem',
          borderBottom: '1px solid #a855f7',
        }}>
          <span style={{ fontSize: '1.1rem' }}>⚙️</span>
          <span style={{
            color: '#fff',
            fontWeight: '700',
            fontSize: '0.85rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}>
            Mode Administrador
          </span>
          <span style={{
            background: 'rgba(255,255,255,0.2)',
            color: '#fff',
            fontSize: '0.7rem',
            fontWeight: '600',
            padding: '0.15rem 0.6rem',
            borderRadius: '999px',
            letterSpacing: '0.1em',
          }}>
            ADMIN
          </span>
          <span style={{ fontSize: '1.1rem' }}>⚙️</span>
        </div>
      )}

      <style>{`
        @keyframes adminPulse {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      {/* Main Content - This is where nested routes will render */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-16">
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center', width: '100%' }}>
          <h3 style={{ color: '#ffe919', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>
            Espases Làser Star Wars
          </h3>
          <p className="text-gray-500 mb-3">© 2024 Tots els drets reservats a la República Galàctica</p>
          <p className="text-sm text-gray-400">
            Que la Força t'acompanyi sempre
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App