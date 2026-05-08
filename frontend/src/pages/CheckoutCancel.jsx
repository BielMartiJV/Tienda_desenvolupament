import { useNavigate } from 'react-router-dom'

function CheckoutCancel() {
    const navigate = useNavigate()

    return (
        <div className="min-h-[calc(100vh-82px)] bg-black text-white flex flex-col items-center justify-center p-6 text-center">
            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-8 border border-red-500/50">
                <span className="text-4xl">⚠️</span>
            </div>
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#ffe919' }}>PAGAMENT CANCEL·LAT</h2>
            <p className="text-gray-400 mb-8 max-w-md">
                Sembla que has decidit no completar la compra. Els teus articles segueixen a la cistella esperant per tu.
            </p>
            <button
                onClick={() => navigate('/payment')}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 rounded-xl transition-all border border-white/10 font-bold uppercase tracking-widest text-sm"
            >
                Tornar al Checkout
            </button>
        </div>
    )
}

export default CheckoutCancel
