import { Link } from 'react-router-dom'

function Register() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-12">
            <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Crear Cuenta
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                        Únete a nuestra comunidad
                    </p>
                </div>

                <form className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Nombre Completo
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            placeholder="Juan Pérez"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
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
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            placeholder="••••••••"
                        />
                    </div>

                    <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Confirmar Contraseña
                        </label>
                        <input
                            type="password"
                            id="confirm-password"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="flex items-start">
                        <input
                            type="checkbox"
                            id="terms"
                            className="mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <label htmlFor="terms" className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                            Acepto los{' '}
                            <a href="#" className="text-purple-600 hover:text-purple-500">
                                términos y condiciones
                            </a>
                            {' '}y la{' '}
                            <a href="#" className="text-purple-600 hover:text-purple-500">
                                política de privacidad
                            </a>
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                    >
                        Crear Cuenta
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600 dark:text-gray-300">
                        ¿Ya tienes cuenta?{' '}
                        <Link to="/login" className="text-purple-600 hover:text-purple-500 font-semibold">
                            Inicia sesión
                        </Link>
                    </p>
                </div>

                <div className="mt-6">
                    <Link to="/" className="block text-center text-sm text-gray-600 dark:text-gray-300 hover:text-purple-600">
                        ← Volver al inicio
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Register
