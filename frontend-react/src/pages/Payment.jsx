import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Payment() {
    const navigate = useNavigate()
    const { user } = useAuth()

    // Load cart from localStorage
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart')
        return savedCart ? JSON.parse(savedCart) : []
    })

    const [paymentMethod, setPaymentMethod] = useState('visa')
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        cardNumber: '',
        cardHolder: '',
        expiryMonth: '01',
        expiryYear: '2025',
        cvc: '',
        saveDetails: false
    })

    const totalAmount = cart.reduce((acc, item) => acc + (item.preu * item.quantity), 0)
    const shippingCost = 5.50
    const finalTotal = totalAmount + shippingCost

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [id]: type === 'checkbox' ? checked : value
        }))
    }

    const handleConfirmPayment = async (e) => {
        e.preventDefault()
        if (!user) return

        setLoading(true)
        try {
            const response = await fetch('http://127.0.0.1:3000/api/comandes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    usuariId: user.id,
                    total: finalTotal,
                    espases: cart.map(item => ({
                        espasaId: item.id,
                        quantitat: item.quantity
                    }))
                })
            })

            const data = await response.json()
            if (data.status === 'success') {
                localStorage.removeItem('cart') // Clear cart
                navigate('/thank-you')
            } else {
                alert('Error al processar el pagament: ' + (data.message || 'Error desconegut'))
            }
        } catch (error) {
            console.error(error)
            alert('Error connectant amb el servidor galàctic')
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
                        <span className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest">Mètode Pagament</span>
                    </div>
                </div>

                {/* Main Payment Container */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]">
                    <div className="px-12 sm:px-24 md:px-40 lg:px-64 py-16 space-y-12">

                        {/* Payment Method Selection */}
                        <div className="space-y-6">
                            <div className="flex flex-row flex-wrap items-center justify-center gap-4 md:gap-8">
                                {[
                                    {
                                        id: 'mastercard', component: (
                                            <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
                                                <circle cx="12" cy="12" r="10" fill="#EB001B" />
                                                <circle cx="28" cy="12" r="10" fill="#F79E1B" fillOpacity="0.8" />
                                            </svg>
                                        )
                                    },
                                    { id: 'visa', img: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Visa_Inc._logo_%282014%E2%80%932021%29.svg' },
                                    {
                                        id: 'paypal', component: (
                                            <div className="flex items-center gap-1 font-bold text-lg select-none">
                                                <span style={{ color: '#003087' }}>Pay</span>
                                                <span style={{ color: '#009cde' }}>Pal</span>
                                            </div>
                                        )
                                    },
                                ].map(method => (
                                    <label key={method.id} className="flex flex-col items-center gap-3 cursor-pointer group">
                                        <div className="relative flex items-center justify-center">
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                checked={paymentMethod === method.id}
                                                onChange={() => setPaymentMethod(method.id)}
                                                className="peer appearance-none w-4 h-4 border-2 border-white/20 rounded-full checked:border-yellow-500 transition-all cursor-pointer"
                                            />
                                            <div className="absolute w-1.5 h-1.5 bg-yellow-500 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity" />
                                        </div>
                                        <div className={`w-32 h-16 rounded-xl border-2 transition-all flex items-center justify-center p-3 bg-black/40 overflow-hidden flex-shrink-0 ${paymentMethod === method.id
                                                ? 'border-yellow-500 shadow-[0_0_15px_rgba(255,233,25,0.15)] opacity-100'
                                                : 'border-white/5 opacity-40 group-hover:opacity-60'
                                            }`}>
                                            {method.component ? (
                                                method.component
                                            ) : (
                                                <img
                                                    src={method.img}
                                                    alt={method.id}
                                                    className="max-h-8 max-w-[85%] w-auto object-contain pointer-events-none"
                                                />
                                            )}
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Credit Card Form */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 w-full">
                            <div className="space-y-2">
                                <label htmlFor="cardNumber" className="text-sm font-bold text-gray-400">Card number *</label>
                                <input
                                    type="text"
                                    id="cardNumber"
                                    value={formData.cardNumber}
                                    onChange={handleChange}
                                    placeholder="0000 0000 0000 0000"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-yellow-500/50 transition-all text-gray-200 placeholder:text-gray-700 font-mono tracking-widest"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="cardHolder" className="text-sm font-bold text-gray-400">Cardholder *</label>
                                <input
                                    type="text"
                                    id="cardHolder"
                                    value={formData.cardHolder}
                                    onChange={handleChange}
                                    placeholder="NOM COMPLET"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-yellow-500/50 transition-all text-gray-200"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-400">Expiry date *</label>
                                <div className="flex gap-2">
                                    <select
                                        id="expiryMonth"
                                        value={formData.expiryMonth}
                                        onChange={handleChange}
                                        className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-yellow-500/50 transition-all appearance-none cursor-pointer text-gray-400"
                                    >
                                        <option value="" disabled className="bg-neutral-900">Month</option>
                                        {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map(m => (
                                            <option key={m} value={m} className="bg-neutral-900">2025</option>
                                        ))}
                                    </select>
                                    <select
                                        id="expiryYear"
                                        value={formData.expiryYear}
                                        onChange={handleChange}
                                        className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-yellow-500/50 transition-all appearance-none cursor-pointer text-gray-400"
                                    >
                                        <option value="" disabled className="bg-neutral-900">Year</option>
                                        {[2025, 2026, 2027, 2028, 2029].map(y => (
                                            <option key={y} value={y} className="bg-neutral-900">{y}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2 relative">
                                <label htmlFor="cvc" className="text-sm font-bold text-gray-400 flex items-center gap-2">
                                    CVC *
                                    <div className="w-4 h-4 bg-white/10 rounded-full flex items-center justify-center text-[10px] text-gray-500">i</div>
                                </label>
                                <input
                                    type="password"
                                    id="cvc"
                                    maxLength="3"
                                    value={formData.cvc}
                                    onChange={handleChange}
                                    placeholder="•••"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-yellow-500/50 transition-all text-gray-200"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="flex items-center gap-3 cursor-pointer group w-fit">
                                    <input
                                        type="checkbox"
                                        id="saveDetails"
                                        checked={formData.saveDetails}
                                        onChange={handleChange}
                                        className="w-4 h-4 rounded border-white/20 bg-white/5 text-yellow-500 focus:ring-yellow-500/50 accent-yellow-500"
                                    />
                                    <span className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                                        Save my details for future purchases
                                    </span>
                                </label>
                            </div>
                        </div>

                        {/* Order Summary Integration */}
                        <div className="pt-12 border-t border-white/10 w-full">
                            <div className="bg-black/20 rounded-2xl p-6 md:p-8 space-y-4">
                                <div className="flex justify-between text-sm text-gray-400">
                                    <span className="font-bold">Subtotal ({cart.length} items)</span>
                                    <span className="font-mono">{totalAmount.toFixed(2)}€</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-400">
                                    <span>Home delivery cost</span>
                                    <span className="font-mono">{shippingCost.toFixed(2)}€</span>
                                </div>
                                <div className="pt-6 mt-6 border-t border-white/5 flex justify-between items-center">
                                    <span className="font-black text-gray-200 uppercase tracking-tighter text-lg">TOTAL AMOUNT</span>
                                    <span className="text-3xl font-black text-white">
                                        {finalTotal.toFixed(2)}€
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Button attached to card bottom */}
                    <button
                        onClick={handleConfirmPayment}
                        disabled={loading}
                        style={{ backgroundColor: '#ffe919', color: '#000000' }}
                        className="w-full py-6 font-black text-xl tracking-tighter transition-all active:scale-[0.99] disabled:opacity-50 hover:brightness-110"
                    >
                        {loading ? 'VERIFICANT...' : 'CONFIRMAR PAGAMENT'}
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
