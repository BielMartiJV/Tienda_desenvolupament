import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Home() {
    const navigate = useNavigate()
    const { user } = useAuth()
    const [selectedColor, setSelectedColor] = useState('tots')
    // Inicialitzem la cistella des de localStorage si existeix
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart')
        return savedCart ? JSON.parse(savedCart) : []
    })
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [showAuthModal, setShowAuthModal] = useState(false) // Estat pel modal d'autenticació

    // Persistència de la cistella
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    const [error, setError] = useState(null)

    useEffect(() => {
        fetch('http://127.0.0.1:3000/api/products')
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    const mappedProducts = data.data.map(p => ({
                        ...p,
                        id: p._id,
                        imatge: "saber-placeholder"
                    }))
                    setProducts(mappedProducts)
                } else {
                    setError('Error: ' + JSON.stringify(data))
                }
                setLoading(false)
            })
            .catch(err => {
                console.error("Error fetching products:", err)
                setError('Error de connexió: ' + err.message + '. Assegura\'t que el backend està en marxa al port 3000.')
                setLoading(false)
            })
    }, [])

    const addToCart = (product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id)
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }
            return [...prevCart, { ...product, quantity: 1 }]
        })
        setIsCartOpen(true)
    }

    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId))
    }

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) return
        setCart(prevCart => prevCart.map(item =>
            item.id === productId ? { ...item, quantity: newQuantity } : item
        ))
    }

    const handleCheckout = async () => {
        if (!user) {
            setShowAuthModal(true);
            setIsCartOpen(false);
            return;
        }
        
        // Simplement naveguem a la pàgina de pagament
        // El cart ja es guarda a localStorage via useEffect
        navigate('/payment');
    }

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0)
    const totalPrice = cart.reduce((acc, item) => acc + (item.preu * item.quantity), 0)

    const colorMap = {
        vermell: {
            name: 'Vermell',
            bg: 'bg-red-500',
            glow: 'shadow-[0_0_30px_rgba(239,68,68,0.5)]',
            border: 'border-red-500/50',
            text: 'text-red-400'
        },
        blau: {
            name: 'Blau',
            bg: 'bg-blue-500',
            glow: 'shadow-[0_0_30px_rgba(59,130,246,0.5)]',
            border: 'border-blue-500/50',
            text: 'text-blue-400'
        },
        verd: {
            name: 'Verd',
            bg: 'bg-emerald-500',
            glow: 'shadow-[0_0_30px_rgba(16,185,129,0.5)]',
            border: 'border-emerald-500/50',
            text: 'text-emerald-400'
        },
        groc: {
            name: 'Groc',
            bg: 'bg-yellow-400',
            glow: 'shadow-[0_0_30px_rgba(250,204,21,0.5)]',
            border: 'border-yellow-400/50',
            text: 'text-yellow-400'
        },
        porpra: {
            name: 'Porpra',
            bg: 'bg-purple-500',
            glow: 'shadow-[0_0_30px_rgba(168,85,247,0.5)]',
            border: 'border-purple-500/50',
            text: 'text-purple-400'
        }
    }

    const espadasFiltradas = selectedColor === 'tots'
        ? products
        : products.filter(e => e.colorFulla === selectedColor)

    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden">
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
                    <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600 rounded-full blur-[128px]" />
                    <div className="absolute top-1/2 right-0 w-80 h-80 bg-blue-600 rounded-full blur-[128px]" />
                    <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-cyan-600 rounded-full blur-[128px]" />
                </div>
            </div>

            {/* Cart Button */}
            <button
                onClick={() => setIsCartOpen(true)}
                className="fixed top-6 right-6 z-50 p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300 group"
            >
                <div className="relative">
                    <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {totalItems > 0 && (
                        <span className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-xs font-bold flex items-center justify-center animate-pulse">
                            {totalItems}
                        </span>
                    )}
                </div>
            </button>

            {/* Cart Sidebar */}
            <div className={`fixed inset-0 z-[60] transition-all duration-500 ${isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    onClick={() => setIsCartOpen(false)}
                />

                {/* Sidebar Panel */}
                <div className={`absolute top-0 right-0 h-full w-full max-w-md bg-black/90 border-l border-white/10 shadow-[0_0_50px_rgba(168,85,247,0.2)] transform transition-transform duration-500 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="flex flex-col h-full p-6">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
                            <h2 className="text-2xl font-bold">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                                    La Teva Cistella
                                </span>
                            </h2>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                            {cart.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-4">
                                    <svg className="w-16 h-16 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                    <p>La teva cistella és buida, jove Padawan</p>
                                </div>
                            ) : (
                                cart.map(item => (
                                    <div key={item.id} className="group relative flex gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl hover:border-purple-500/30 transition-all">
                                        <div className={`w-20 h-20 rounded-xl ${colorMap[item.colorFulla]?.bg || 'bg-gray-700'} bg-opacity-20 flex items-center justify-center shrink-0`}>
                                            <div className={`w-12 h-12 rounded-full ${colorMap[item.colorFulla]?.bg || 'bg-gray-500'} opacity-50 blur-md`} />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <h3 className="font-bold text-sm text-gray-200 line-clamp-1">{item.nom}</h3>
                                                <p className="text-xs text-gray-400 mt-1">Cristall {colorMap[item.colorFulla]?.name || 'Desconegut'}</p>
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                                <div className="flex items-center gap-3 bg-black/40 rounded-lg p-1">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="w-6 h-6 flex items-center justify-center hover:bg-white/10 rounded transition-colors text-gray-400 hover:text-white"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="text-sm font-bold min-w-[1.5rem] text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-6 h-6 flex items-center justify-center hover:bg-white/10 rounded transition-colors text-gray-400 hover:text-white"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <span className="font-bold text-purple-400">{(item.preu * item.quantity).toFixed(2)}€</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="absolute top-2 right-2 p-1.5 hover:bg-red-500/20 rounded-lg text-gray-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                                        >
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        <div className="mt-6 pt-6 border-t border-white/10">
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-gray-400">Total Estimat</span>
                                <span className="text-3xl font-black text-white">{totalPrice.toFixed(2)}€</span>
                            </div>
                            <button
                                onClick={handleCheckout}
                                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-lg hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={cart.length === 0}
                            >
                                Procedir al Pagament
                            </button>
                        </div>
                    </div>
                </div>
            </div>
 
            {/* Auth Prompt Modal */}
            {showAuthModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-500"
                        onClick={() => setShowAuthModal(false)}
                    />
                    
                    {/* Modal Content */}
                    <div className="relative bg-[#111] border-2 border-yellow-500/30 rounded-3xl p-8 md:p-12 max-w-lg w-full shadow-[0_0_50px_rgba(255,233,25,0.15)] animate-in zoom-in-95 duration-300">
                        {/* Decorative Corners */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-yellow-500 rounded-tl-3xl opacity-50" />
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-right-2 border-yellow-500 rounded-tr-3xl opacity-50" />
                        
                        <div className="text-center">
                            <div className="w-20 h-20 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-yellow-500/20">
                                <svg className="w-10 h-10 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            
                            <h2 className="text-3xl font-black text-white mb-4 tracking-tight">
                                <span style={{ color: '#ffe919' }}>IDENTIFICACIÓ</span> REQUERIDA
                            </h2>
                            
                            <p className="text-gray-400 mb-8 leading-relaxed">
                                Per processar la teva comanda i assegurar el lliurament via hiperespai, necessitem saber qui ets, jove guerrer.
                            </p>
                            
                            <div className="flex flex-col gap-4">
                                <button
                                    onClick={() => navigate('/login')}
                                    className="w-full py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-yellow-500/20"
                                >
                                    Iniciar Sessió
                                </button>
                                
                                <button
                                    onClick={() => navigate('/register')}
                                    className="w-full py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/10 transition-all"
                                >
                                    Crear Nou Compte
                                </button>
                                
                                <button 
                                    onClick={() => setShowAuthModal(false)}
                                    className="mt-2 text-sm text-gray-500 hover:text-gray-400 underline underline-offset-4"
                                >
                                    Seguir mirant el catàleg
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Hero Section */}
            <section className="relative z-10 min-h-screen flex items-center justify-center px-6">
                <div className="max-w-6xl mx-auto text-center flex flex-col items-center gap-8">
                    {/* Floating Badge */}
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full animate-pulse">
                        <span className="w-2 h-2 bg-green-400 rounded-full" />
                        <span className="text-sm font-medium text-gray-300 tracking-wide">Nova Col·lecció Galàctica 2025</span>
                    </div>

                    {/* Main Title */}
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter">
                        <span className="block" style={{ color: '#ffe919', textShadow: '0 0 40px rgba(255,233,25,0.3)' }}>
                            ESPASES
                        </span>
                        <span className="block" style={{ color: '#ffe919', textShadow: '0 0 40px rgba(255,233,25,0.3)' }}>
                            LÀSER
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        La col·lecció més exclusiva d'armes Jedi i Sith de tota la galàxia.
                        <span className="text-cyan-400"> Que la Força t'acompanyi.</span>
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="#cataleg" className="group relative px-16 py-6 bg-transparent rounded-xl font-bold text-2xl text-yellow-400 overflow-hidden transition-all duration-300 hover:scale-105 hover:bg-purple-500/10 hover:shadow-[0_0_40px_rgba(168,85,247,0.4)]">
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                Explorar Catàleg
                            </span>
                        </a>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
                        <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-purple-500/50 transition-colors">
                            <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">+1K</div>
                            <div className="text-sm text-gray-400 mt-1">Jedis Satisfets</div>
                        </div>
                        <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-cyan-500/50 transition-colors">
                            <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-500">24h</div>
                            <div className="text-sm text-gray-400 mt-1">Enviament Galàctic</div>
                        </div>
                        <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-yellow-500/50 transition-colors">
                            <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">2 Anys</div>
                            <div className="text-sm text-gray-400 mt-1">Garantia Jedi</div>
                        </div>
                    </div>

                    {/* Scroll Indicator */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                        <svg className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                </div>
            </section>

            {/* Filter Bar */}
            <section id="cataleg" className="sticky top-0 z-50 py-6 bg-black/80 backdrop-blur-xl border-b border-white/10">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <h2 className="text-lg font-semibold text-gray-300">
                            Filtrar per <span className="text-purple-400">color del cristall</span>
                        </h2>
                        <div className="flex flex-wrap gap-3 justify-center">
                            <button
                                onClick={() => setSelectedColor('tots')}
                                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${selectedColor === 'tots'
                                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                                    : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                ✨ Tots
                            </button>
                            {Object.entries(colorMap).map(([key, value]) => (
                                <button
                                    key={key}
                                    onClick={() => setSelectedColor(key)}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${selectedColor === key
                                        ? `${value.bg} text-white ${value.glow}`
                                        : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white'
                                        }`}
                                >
                                    <span className={`w-3 h-3 rounded-full ${value.bg} ${selectedColor === key ? 'animate-pulse' : ''}`} />
                                    {value.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section className="relative z-10 py-32 px-8 lg:px-16">
                <div className="w-full">
                    {/* Section Header */}
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-black mb-6">
                            <span style={{ color: '#ffe919' }}>
                                El Nostre Arsenal
                            </span>
                        </h2>
                        {error ? (
                            <div className="p-4 bg-red-900/50 border border-red-500 rounded-xl text-red-200 inline-block">
                                <p className="font-bold">Error carregant productes:</p>
                                <p>{error}</p>
                            </div>
                        ) : (
                            <p className="text-gray-400 text-lg">
                                {loading ? (
                                    <span className="animate-pulse">Cargant arsenal de la República...</span>
                                ) : (
                                    <>
                                        <span className="text-purple-400 font-bold">{espadasFiltradas.length}</span> espases disponibles per a guerrers de la galàxia
                                    </>
                                )}
                            </p>
                        )}
                    </div>

                    {/* Products Grid - Centered with Flexbox */}
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            gap: '2.5rem',
                            width: '100%'
                        }}
                    >
                        {espadasFiltradas.map((espada, index) => (
                            <div
                                key={espada.id}
                                className={`group relative w-[380px] bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 transition-all duration-500 hover:-translate-y-3 hover:${colorMap[espada.colorFulla]?.glow || ''} hover:${colorMap[espada.colorFulla]?.border || ''}`}
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Glow Effect on Hover - Added pointer-events-none */}
                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${colorMap[espada.colorFulla]?.bg || ''} pointer-events-none`} />

                                {/* Stock Badge */}
                                {espada.estoc < 5 && (
                                    <div className="absolute top-4 right-4 z-20 px-4 py-2 bg-red-500/20 backdrop-blur-sm border border-red-500/40 rounded-full pointer-events-none">
                                        <span className="text-xs font-bold text-red-400 flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                                            {espada.estoc} unitats
                                        </span>
                                    </div>
                                )}

                                {/* Image Container - Placeholder */}
                                <div className="relative h-56 flex items-center justify-center overflow-hidden pointer-events-none">
                                    <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent`} />
                                    {/* Color Circle Placeholder */}
                                    <div
                                        className={`w-32 h-32 rounded-full ${colorMap[espada.colorFulla]?.bg || 'bg-gray-700'} transition-all duration-500 group-hover:scale-125 ${colorMap[espada.colorFulla]?.glow || ''}`}
                                    />
                                </div>

                                {/* Content */}
                                <div className="relative p-8 text-center pointer-events-none">
                                    {/* Color Tag */}
                                    <div className="flex items-center justify-center gap-2 mb-5">
                                        <span className={`w-3 h-3 rounded-full ${colorMap[espada.colorFulla]?.bg || 'bg-gray-500'} shadow-[0_0_10px_currentColor]`} />
                                        <span className={`text-xs font-bold uppercase tracking-widest ${colorMap[espada.colorFulla]?.text || 'text-gray-400'}`}>
                                            Cristall {colorMap[espada.colorFulla]?.name || 'Desc.'}
                                        </span>
                                    </div>

                                    {/* Name */}
                                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 transition-all">
                                        {espada.nom}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-gray-400 text-sm leading-relaxed mb-8 line-clamp-2">
                                        {espada.descripcio}
                                    </p>
                                </div>

                                {/* Footer - Centered Stack - Added relative and z-10 */}
                                <div className="relative z-10 flex flex-col items-center gap-6 px-8 py-6 bg-white/5 border-t border-white/10">
                                    <div>
                                        <span className="text-3xl font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">{espada.preu.toFixed(2)}</span>
                                        <span className="text-sm text-gray-400 ml-1">€</span>
                                    </div>
                                    <button
                                        onClick={() => {
                                            console.log("Adding to cart:", espada);
                                            addToCart(espada);
                                        }}
                                        className={`w-full flex items-center justify-center gap-3 px-6 py-5 rounded-xl font-bold text-lg transition-all duration-300 bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] active:scale-95 cursor-pointer`}
                                    >
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        Afegir
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="relative z-10 py-24 px-6 bg-gradient-to-b from-transparent via-purple-950/20 to-transparent">
                <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black mb-4">
                            <span style={{ color: '#ffe919' }}>
                                Per Què Triar-nos?
                            </span>
                        </h2>
                        <p className="text-gray-400 text-lg">Els millors avantatges de la galàxia</p>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem' }}>
                        <div style={{ width: '340px' }} className="group p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 text-center transition-all duration-300 hover:border-cyan-500/50 hover:bg-cyan-500/5">
                            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl group-hover:scale-110 transition-transform">
                                <svg className="w-10 h-10 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Enviament Hiperespai</h3>
                            <p className="text-gray-400">Lliurament en 24-48 hores a qualsevol sistema estel·lar de la República</p>
                        </div>

                        <div style={{ width: '340px' }} className="group p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 text-center transition-all duration-300 hover:border-purple-500/50 hover:bg-purple-500/5">
                            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl group-hover:scale-110 transition-transform">
                                <svg className="w-10 h-10 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Garantia del Consell</h3>
                            <p className="text-gray-400">2 anys de garantia completa certificada pel Consell Jedi</p>
                        </div>

                        <div style={{ width: '340px' }} className="group p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 text-center transition-all duration-300 hover:border-yellow-500/50 hover:bg-yellow-500/5">
                            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl group-hover:scale-110 transition-transform">
                                <svg className="w-10 h-10 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Cristalls Kyber Autèntics</h3>
                            <p className="text-gray-400">Materials premium extrets de les coves d'Ilum</p>
                        </div>
                    </div>
                </div>
            </section>

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

export default Home