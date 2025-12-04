import { Outlet, Link } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation Bar */}
      <nav className="bg-gray-900 border-b border-purple-500/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center gap-3 group">
              <span className="text-4xl group-hover:scale-110 transition-transform">⚔️</span>
              <div>
                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  Espases Làser
                </div>
                <div className="text-xs text-purple-300">Star Wars Collection</div>
              </div>
            </Link>

            <div className="flex items-center space-x-2">
              <Link
                to="/"
                className="text-purple-300 hover:text-purple-400 hover:bg-purple-900/30 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
              >
                🏠 Inici
              </Link>
              <Link
                to="/login"
                className="text-purple-300 hover:text-purple-400 hover:bg-purple-900/30 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
              >
                👤 Iniciar Sessió
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50"
              >
                ✨ Registrar-se
              </Link>
              <button className="relative text-purple-300 hover:text-purple-400 hover:bg-purple-900/30 px-4 py-2 rounded-lg transition-all duration-300">
                🛒
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>


      {/* Main Content - This is where nested routes will render */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-purple-500/30 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="text-3xl mb-4">⚔️</div>
            <p className="text-purple-300 mb-2">© 2024 Espases Làser Star Wars</p>
            <p className="text-purple-400/60 text-sm">Que la Força t'acompanyi sempre ✨</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App