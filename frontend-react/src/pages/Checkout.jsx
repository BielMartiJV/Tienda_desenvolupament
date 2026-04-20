import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe("pk_test_51TLerYAiZb6tZWGt0eWnpjQcP6zcEfuEQDYzRZvcC0KL5qND0KuT1eJ1bI4fYDiaQ8SmP1KIL5JeR0zkfsh9dgXc00RhncZqn0")

function Checkout() {
    const navigate = useNavigate()
    const { user, token } = useAuth()

    const [cart] = useState(() => {
        const savedCart = localStorage.getItem('cart')
        return savedCart ? JSON.parse(savedCart) : []
    })

    const [step, setStep] = useState(1) // 1: Cart/Summary, 2: Shipping
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [shippingData, setShippingData] = useState({
        nom: user ? `${user.nom} ${user.cognom}` : '',
        adreca: '',
        ciutat: '',
        codiPostal: '',
        pais: 'Espanya'
    })

    const totalAmount = cart.reduce((acc, item) => acc + (item.preu * item.quantity), 0)
    const shippingCost = 5.50
    const finalTotal = totalAmount + shippingCost

    const handleShippingChange = (e) => {
        const { id, value } = e.target
        setShippingData(prev => ({ ...prev, [id]: value }))
    }

    const validateShipping = () => {
        if (!shippingData.nom || !shippingData.adreca || !shippingData.ciutat || !shippingData.codiPostal) {
            setError('Si us plau, emplena tots els camps obligatoris d\'enviament.')
            return false
        }
        return true
    }

    const handlePay = async () => {
        if (!validateShipping()) return
        if (!user || !token) {
            setError('Has d\'estar autenticat per continuar.')
            return
        }

        setLoading(true)
        setError(null)

        try {
            const response = await fetch('http://127.0.0.1:3000/api/checkout/create-session', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    cart: cart,
                    shippingData: shippingData,
                    success_url: `${window.location.origin}/checkout/success`,
                    cancel_url: `${window.location.origin}/checkout/cancel`
                })
            })

            const data = await response.json()
            if (data.status === 'success' && data.sessionId) {
                const stripe = await stripePromise
                localStorage.removeItem('cart') // Clear cart
                
                // Use redirectToCheckout as requested in 4.4
                const { error } = await stripe.redirectToCheckout({
                    sessionId: data.sessionId
                })
                
                if (error) setError(error.message)
            } else {
                setError(data.message || 'Error al connectar amb Stripe.')
            }
        } catch (err) {
            console.error('Checkout error:', err)
            setError('Error de connexió intergalàctica.')
        } finally {
            setLoading(false)
        }
    }

    if (cart.length === 0) {
        return (
            <div className="min-h-[calc(100vh-82px)] bg-black text-white flex flex-col items-center justify-center p-6 text-center">
                <h2 className="text-3xl font-bold mb-4" style={{ color: '#ffe919' }}>LA TEVA CISTELLA ÉS BUIDA</h2>
                <p className="text-gray-400 mb-8">No pots processar un pagament sense productes, jove Padawan.</p>
                <button
                    onClick={() => navigate('/')}
                    className="px-8 py-4 bg-white/10 hover:bg-white/20 rounded-xl transition-all border border-white/10"
                >
                    Tornar al Catàleg
                </button>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-black text-white px-8 py-8 md:py-16 relative overflow-hidden flex flex-col items-center">
            {/* Background Starfield */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 opacity-20" style={{
                    background: `radial-gradient(1px 1px at 20px 30px, white, transparent),
                                 radial-gradient(1px 1px at 40px 70px, white, transparent)`,
                    backgroundSize: '200px 200px',
                }} />
                <div className="absolute top-1/4 -right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px]" />
                <div className="absolute bottom-0 -left-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px]" />
            </div>

            <div className="max-w-4xl w-full relative z-10 flex flex-col gap-8">
                {/* Stepper */}
                <div className="flex justify-between items-center mb-8 max-w-md mx-auto w-full relative">
                    <div className="absolute top-4 left-0 w-full h-[2px] bg-white/10 z-0" />
                    <div className="absolute top-4 left-0 h-[2px] bg-yellow-500 transition-all duration-500 z-0" style={{ width: step === 1 ? '0%' : '100%' }} />
                    
                    <div className="relative z-10 flex flex-col items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step >= 1 ? 'bg-yellow-500 text-black shadow-[0_0_15px_rgba(255,233,25,0.5)]' : 'bg-white/10 text-gray-400'}`}>1</div>
                        <span className={`text-[10px] uppercase tracking-widest font-black ${step >= 1 ? 'text-yellow-500' : 'text-gray-500'}`}>Resum</span>
                    </div>
                    <div className="relative z-10 flex flex-col items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step >= 2 ? 'bg-yellow-500 text-black shadow-[0_0_15px_rgba(255,233,25,0.5)]' : 'bg-white/10 text-gray-400'}`}>2</div>
                        <span className={`text-[10px] uppercase tracking-widest font-black ${step >= 2 ? 'text-yellow-500' : 'text-gray-500'}`}>Enviament</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-6">
                        {error && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-100 text-xs flex items-center gap-3">
                                <span>⚠️</span> {error}
                            </div>
                        )}

                        {step === 1 ? (
                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 space-y-6 animate-in slide-in-from-left duration-500">
                                <h3 className="text-xl font-bold uppercase tracking-tight" style={{ color: '#ffe919' }}>Articles a la comanda</h3>
                                <div className="space-y-4">
                                    {cart.map(item => (
                                        <div key={item.id} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-black/40 rounded-xl flex items-center justify-center border border-white/10">⚔️</div>
                                                <div>
                                                    <p className="font-bold text-sm">{item.nom}</p>
                                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">Preu unitari: {item.preu}€</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-mono text-sm">{item.quantity} x {item.preu}€</p>
                                                <p className="font-bold">{(item.preu * item.quantity).toFixed(2)}€</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={() => setStep(2)}
                                    className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-xl font-bold uppercase tracking-widest text-sm transition-all border border-white/10"
                                >
                                    Continuar a Enviament
                                </button>
                            </div>
                        ) : (
                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 space-y-8 animate-in slide-in-from-right duration-500">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl font-bold uppercase tracking-tight" style={{ color: '#ffe919' }}>Dades d'Enviament</h3>
                                    <button onClick={() => setStep(1)} className="text-[10px] text-gray-500 hover:text-white uppercase tracking-widest">Tornar al resum</button>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Nom Complet *</label>
                                        <input
                                            type="text"
                                            id="nom"
                                            value={shippingData.nom}
                                            onChange={handleShippingChange}
                                            placeholder="Ex: Luke Skywalker"
                                            className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-yellow-500/50 transition-all font-medium"
                                        />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Adreça *</label>
                                        <input
                                            type="text"
                                            id="adreca"
                                            value={shippingData.adreca}
                                            onChange={handleShippingChange}
                                            placeholder="Ex: Carrer de la República, 12, 3r 2a"
                                            className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-yellow-500/50 transition-all font-medium"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Ciutat *</label>
                                        <input
                                            type="text"
                                            id="ciutat"
                                            value={shippingData.ciutat}
                                            onChange={handleShippingChange}
                                            placeholder="Ex: Mos Eisley"
                                            className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-yellow-500/50 transition-all font-medium"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Codi Postal *</label>
                                        <input
                                            type="text"
                                            id="codiPostal"
                                            value={shippingData.codiPostal}
                                            onChange={handleShippingChange}
                                            placeholder="Ex: 08001"
                                            className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-yellow-500/50 transition-all font-mono"
                                        />
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <button
                                        onClick={handlePay}
                                        disabled={loading}
                                        style={{ backgroundColor: '#ffe919', color: '#000' }}
                                        className="w-full py-5 rounded-2xl font-black text-lg tracking-tighter hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(255,233,25,0.2)]"
                                    >
                                        {loading ? (
                                            <>
                                                <span className="w-5 h-5 border-3 border-black/30 border-t-black rounded-full animate-spin" />
                                                REDIRIGINT A STRIPE...
                                            </>
                                        ) : (
                                            'PAGAR ARA'
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 space-y-6 lg:sticky lg:top-24">
                        <h3 className="text-sm font-black uppercase tracking-widest text-gray-500">Resum del Total</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Subtotal ({cart.length} articles)</span>
                                <span className="font-mono">{totalAmount.toFixed(2)}€</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Cost d'enviament</span>
                                <span className="font-mono">{shippingCost.toFixed(2)}€</span>
                            </div>
                            <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                                <span className="font-black uppercase tracking-tighter text-lg">TOTAL</span>
                                <div className="text-right">
                                    <span className="block text-3xl font-black text-white">{finalTotal.toFixed(2)}€</span>
                                    <span className="text-[8px] text-gray-500 uppercase tracking-widest">IVA INCLÒS</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-yellow-500/5 border border-yellow-500/10 rounded-2xl">
                            <p className="text-[10px] text-yellow-500/80 leading-relaxed italic">
                                "Sempre en moviment està el futur, però la teva comanda arribarà puntual a la cita."
                            </p>
                        </div>
                        
                        <div className="flex items-center gap-3 justify-center pt-2">
                           <div className="w-8 h-8 opacity-20 grayscale brightness-200"><img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" /></div>
                           <div className="w-8 h-8 opacity-20 grayscale brightness-200"><img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="MasterCard" /></div>
                        </div>
                    </div>
                </div>

                <p className="text-[9px] text-center text-gray-700 uppercase tracking-[0.3em] font-medium py-8">
                    SECURE ENCRYPTED TRANSACTION • JEDI ORDER CERTIFIED
                </p>
            </div>
        </div>
    )
}

export default Checkout
