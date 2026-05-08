import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Register() {
    const navigate = useNavigate()
    const { login } = useAuth()
    const [formData, setFormData] = useState({
        nom: '',
        cognom: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleChange = (e) => {
        const { id, value } = e.target
        setFormData(prev => ({
            ...prev,
            [id]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (formData.password !== formData.confirmPassword) {
            setError('Les contrasenyes no coincideixen')
            return
        }

        setLoading(true)

        try {
            const response = await fetch('http://127.0.0.1:3000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nom: formData.nom,
                    cognom: formData.cognom,
                    email: formData.email,
                    password: formData.password
                })
            })

            const data = await response.json()

            if (data.status === 'success') {
                alert('Registre realitzat amb èxit! Benvingut a la República.')
                navigate('/login')
            } else {
                setError(data.message || 'Error en el registre')
            }
        } catch (err) {
            console.error(err)
            setError('Error de connexió amb el servidor')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-[calc(100vh-82px)] bg-black text-white px-4 flex items-center justify-center relative overflow-hidden py-12">
            {/* Animated Starfield Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {/* Stars Layer 1 */}
                <div className="absolute inset-0" style={{
                    background: `radial-gradient(1px 1px at 20px 30px, white, transparent),
                                radial-gradient(1px 1px at 40px 70px, rgba(255,255,255,0.8), transparent),
                                radial-gradient(1px 1px at 50px 160px, rgba(255,255,255,0.6), transparent),
                                radial-gradient(1px 1px at 90px 40px, white, transparent),
                                radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.7), transparent),
                                radial-gradient(1px 1px at 160px 120px, white, transparent)`,
                    backgroundSize: '200px 200px',
                    animation: 'twinkle 4s ease-in-out infinite'
                }} />
                {/* Nebula Effects */}
                <div className="absolute top-0 left-0 w-full h-full opacity-30">
                    <div className="absolute top-1/4 -right-20 w-96 h-96 bg-purple-600 rounded-full blur-[128px]" />
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-600 rounded-full blur-[128px]" />
                </div>
            </div>

            <div className="max-w-md w-full bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-3xl p-10 relative z-10 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-black mb-2" style={{ color: '#ffe919', textShadow: '0 0 20px rgba(255,233,25,0.3)' }}>
                        REGISTRE
                    </h2>
                    <p className="text-gray-400">
                        Comença el teu camí cap a la grandesa
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm text-center">
                        {error}
                    </div>
                )}

                <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="nom" className="block text-sm font-medium text-gray-300 mb-2">
                                Nom
                            </label>
                            <input
                                type="text"
                                id="nom"
                                value={formData.nom}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
                                placeholder="Anakin"
                            />
                        </div>
                        <div>
                            <label htmlFor="cognom" className="block text-sm font-medium text-gray-300 mb-2">
                                Cognom
                            </label>
                            <input
                                type="text"
                                id="cognom"
                                value={formData.cognom}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
                                placeholder="Skywalker"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
                            placeholder="tu@email.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                            Contrasenya
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                            Confirmar Contrasenya
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="flex items-start justify-center mt-4 gap-4">
                        <div className="flex items-center h-5">
                            <input
                                id="terms"
                                type="checkbox"
                                required
                                className="w-4 h-4 rounded border-gray-600 text-purple-600 focus:ring-purple-500 bg-black/40"
                            />
                        </div>
                        <div className="text-sm">
                            <label htmlFor="terms" className="text-gray-400">
                                Accepto la{' '}
                                <a href="#" className="font-medium text-purple-400 hover:text-purple-300 transition-colors">
                                    Politica de Privacitat
                                </a>
                                {' '}i les{' '}
                                <a href="#" className="font-medium text-purple-400 hover:text-purple-300 transition-colors">
                                    Condicions d'ús
                                </a>
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-5 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 rounded-xl font-bold text-lg text-black shadow-lg shadow-yellow-500/20 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Processant...' : 'Unir-me a la Força'}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-gray-500">
                        Ja tens compte?{' '}
                        <Link to="/login" className="text-purple-400 hover:text-purple-300 font-bold transition-colors">
                            Identifica't
                        </Link>
                    </p>
                </div>

                <div className="mt-8 border-t border-white/5 pt-8">
                    <Link to="/" style={{ display: 'flex' }} className="w-full flex-row items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl !text-gray-300 hover:!text-white hover:bg-white/10 transition-all duration-300 font-medium group text-decoration-none">
                        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span className="whitespace-nowrap">Tornar al Inici</span>
                    </Link>
                </div>
            </div>

            {/* CSS Animation Keyframes */}
            <style>{`
                @keyframes twinkle {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 1; }
                }
            `}</style>
        </div>
    )
}

export default Register
