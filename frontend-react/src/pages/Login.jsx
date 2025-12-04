import { Link } from 'react-router-dom'

function Login() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Iniciar Sesión
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                        Accede a tu cuenta
                    </p>
                </div>

                <form className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            placeholder="tu@email.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                            <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">Recuérdame</span>
                        </label>
                        <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">
                            ¿Olvidaste tu contraseña?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                    >
                        Iniciar Sesión
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600 dark:text-gray-300">
                        ¿No tienes cuenta?{' '}
                        <Link to="/register" className="text-indigo-600 hover:text-indigo-500 font-semibold">
                            Regístrate
                        </Link>
                    </p>
                </div>

                <div className="mt-6">
                    <Link to="/" className="block text-center text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600">
                        ← Volver al inicio
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login
