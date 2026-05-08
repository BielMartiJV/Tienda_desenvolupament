import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Payment() {
    const navigate = useNavigate()
    const { user, token } = useAuth()

    // Load cart from localStorage
    const [cart] = useState(() => {
        const savedCart = localStorage.getItem('cart')
        return savedCart ? JSON.parse(savedCart) : []
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const totalAmount = cart.reduce((acc, item) => acc + (item.preu * item.quantity), 0)
    const shippingCost = 5.50
    const finalTotal = totalAmount + shippingCost

    const handleConfirmPayment = async () => {
        if (!user || !token) {
            setError('Has d\'estar autenticat per realitzar la compra.')
            return
        }

        setLoading(true)
        setError(null)

        try {
            const response = await fetch('http://127.0.0.1:3000/api/checkout/create-checkout-session', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    cart: cart,
                    success_url: `${window.location.origin}/thank-you`,
                    cancel_url: `${window.location.origin}/checkout-cancel`
                })
            })

            const data = await response.json()
            if (data.status === 'success' && data.url) {
                // Clear cart before redirecting (or wait for webhook, but clear UI)
                localStorage.removeItem('cart')
                window.location.href = data.url
            } else {
                setError(data.message || 'Error al crear la sessió de pagament.')
            }
        } catch (err) {
            console.error('Checkout error:', err)
            setError('Error connectant amb el servidor galàctic.')
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

            <div className="max-w-3xl w-full relative z-10 flex flex-col gap-8">
                {/* Stepper */}
                <div className="flex justify-center items-center mb-4 max-w-xs mx-auto w-full">
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold border-4 border-yellow-500/20 text-sm">
                            1
                        </div>
                        <span className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest">Resum Comanda</span>
                    </div>
                </div>

                {/* Main Content */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]">
                    <div className="px-8 md:px-16 py-12 space-y-8">
                        <h2 className="text-2xl font-black uppercase tracking-tighter text-center">Finalitzar Compra</h2>
                        
                        {error && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            {cart.map((item) => (
                                <div key={item.id} className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-black/40 rounded-lg flex items-center justify-center p-2 border border-white/10">
                                            <span className="text-xl">⚔️</span>
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm">{item.nom}</p>
                                            <p className="text-[10px] text-gray-400 uppercase tracking-widest">Quantitat: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <p className="font-mono text-sm">{(item.preu * item.quantity).toFixed(2)}€</p>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="pt-8 border-t border-white/10 w-full">
                            <div className="bg-black/20 rounded-2xl p-6 md:p-8 space-y-4">
                                <div className="flex justify-between text-sm text-gray-400">
                                    <span className="font-bold">Subtotal ({cart.length} articles)</span>
                                    <span className="font-mono">{totalAmount.toFixed(2)}€</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-400">
                                    <span>Cost d'enviament galàctic</span>
                                    <span className="font-mono">{shippingCost.toFixed(2)}€</span>
                                </div>
                                <div className="pt-6 mt-6 border-t border-white/5 flex justify-between items-center">
                                    <span className="font-black text-gray-200 uppercase tracking-tighter text-lg">TOTAL A PAGAR</span>
                                    <span className="text-3xl font-black text-white">
                                        {finalTotal.toFixed(2)}€
                                    </span>
                                </div>
                            </div>
                        </div>

                        <p className="text-[10px] text-center text-gray-500 uppercase tracking-widest leading-loose">
                            Seràs redirigit a la passarel·la segura de Stripe per completar el pagament.
                        </p>
                    </div>

                    <button
                        onClick={handleConfirmPayment}
                        disabled={loading}
                        style={{ backgroundColor: '#ffe919', color: '#000000' }}
                        className="w-full py-6 font-black text-xl tracking-tighter transition-all active:scale-[0.99] disabled:opacity-50 hover:brightness-110 flex items-center justify-center gap-3"
                    >
                        {loading ? (
                            <>
                                <span className="animate-spin text-2xl">⏳</span>
                                REDIRIGINT...
                            </>
                        ) : (
                            'PAGAR AMB STRIPE'
                        )}
                    </button>
                </div>

                <p className="text-[10px] text-center text-gray-700 uppercase tracking-widest leading-loose">
                    SECURE ENCRYPTED TRANSACTION • JEDI COUNCIL STANDARDS
                </p>
            </div>
        </div>
    )
}

export default Payment
