import { Link } from 'react-router-dom'

function CheckoutSuccess() {
    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden flex flex-col items-center justify-center relative">
            {/* Animated Starfield Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
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
                    <div className="absolute top-1/4 -left-20 w-96 h-96 bg-green-600 rounded-full blur-[128px]" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600 rounded-full blur-[128px]" />
                </div>
            </div>

            <div className="relative z-10 max-w-3xl mx-auto text-center px-6 py-20 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                {/* Success Icon */}
                <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-green-500/20 to-cyan-500/20 rounded-full flex items-center justify-center border border-green-500/30">
                    <svg className="w-12 h-12 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <h1 className="text-4xl md:text-6xl font-black mb-6">
                    <span className="block" style={{ color: '#ffe919', textShadow: '0 0 20px rgba(255,233,25,0.3)' }}>
                        Gràcies per la
                    </span>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
                        teva compra!
                    </span>
                </h1>

                <p className="text-xl text-gray-400 mb-10 leading-relaxed">
                    La teva comanda ha estat processada amb èxit i aviat serà enviada a través de l'hiperespai directament al teu sistema estel·lar.
                    <br />
                    <span className="text-cyan-400 font-medium mt-4 block">Que la Força t'acompanyi sempre.</span>
                </p>

                <Link
                    to="/"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-lg hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all transform hover:scale-[1.05]"
                >
                    Tornar a l'Inici
                </Link>
            </div>

            <style>{`
                @keyframes twinkle {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 1; }
                }
            `}</style>
        </div>
    )
}

export default CheckoutSuccess
