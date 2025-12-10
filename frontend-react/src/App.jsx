import { Outlet, Link } from 'react-router-dom'

function App() {
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

                <Link
                  to="/login"
                  className="px-5 py-2.5 text-gray-400 hover:text-white text-sm font-medium rounded-xl transition-all duration-300 hover:bg-white/5"
                >
                  Iniciar Sessió
                </Link>

                <Link
                  to="/register"
                  className="px-6 py-2.5 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black text-sm font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/25 hover:scale-105"
                >
                  Registrar-se
                </Link>

                {/* Cart Button */}
                <button className="relative ml-2 flex items-center justify-center w-12 h-12 text-gray-400 hover:text-white rounded-xl transition-all duration-300 hover:bg-white/5 group">
                  <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="absolute -top-1 -right-1 bg-yellow-500 text-black text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    0
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-[82px]" />

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