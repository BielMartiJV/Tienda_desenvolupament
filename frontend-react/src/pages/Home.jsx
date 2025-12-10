import { useState } from 'react'

function Home() {
    const [selectedColor, setSelectedColor] = useState('tots')

    const espadas = [
        {
            id: 1,
            nom: "Espasa de Darth Vader",
            colorFulla: "vermell",
            preu: 299.99,
            estoc: 5,
            descripcio: "L'espasa làser icònica del Senyor Fosc dels Sith. Cristall Kyber sagnós.",
            imatge: "saber-placeholder"
        },
        {
            id: 2,
            nom: "Espasa de Luke Skywalker",
            colorFulla: "verd",
            preu: 349.99,
            estoc: 3,
            descripcio: "L'espasa llegendària del Jedi més poderós. Construïda a Tatooine.",
            imatge: "saber-placeholder"
        },
        {
            id: 3,
            nom: "Espasa d'Obi-Wan Kenobi",
            colorFulla: "blau",
            preu: 329.99,
            estoc: 7,
            descripcio: "L'arma elegant d'un temps més civilitzat. Herència Jedi.",
            imatge: "saber-placeholder"
        },
        {
            id: 4,
            nom: "Espasa de Mace Windu",
            colorFulla: "porpra",
            preu: 399.99,
            estoc: 2,
            descripcio: "L'única espasa porpra del Consell Jedi. Vapaad Master.",
            imatge: "saber-placeholder"
        },
        {
            id: 5,
            nom: "Espasa del Temple Jedi",
            colorFulla: "groc",
            preu: 279.99,
            estoc: 10,
            descripcio: "Espasa d'entrenament dels Guardians del Temple.",
            imatge: "saber-placeholder"
        },
        {
            id: 6,
            nom: "Espasa de Kylo Ren",
            colorFulla: "vermell",
            preu: 379.99,
            estoc: 4,
            descripcio: "Disseny inestable amb guarda creuada. Cristall esquinçat.",
            imatge: "saber-placeholder"
        }
    ]

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
        ? espadas
        : espadas.filter(e => e.colorFulla === selectedColor)

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

            {/* Hero Section */}
            <section className="relative z-10 min-h-screen flex items-center justify-center px-6">
                <div className="max-w-6xl mx-auto text-center">
                    {/* Floating Badge */}
                    <div className="inline-flex items-center gap-3 px-6 py-3 mb-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full animate-pulse">
                        <span className="w-2 h-2 bg-green-400 rounded-full" />
                        <span className="text-sm font-medium text-gray-300 tracking-wide">Nova Col·lecció Galàctica 2024</span>
                    </div>

                    {/* Main Title */}
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-6">
                        <span className="block" style={{ color: '#ffe919', textShadow: '0 0 40px rgba(255,233,25,0.3)' }}>
                            ESPASES
                        </span>
                        <span className="block" style={{ color: '#ffe919', textShadow: '0 0 40px rgba(255,233,25,0.3)' }}>
                            LÀSER
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        La col·lecció més exclusiva d'armes Jedi i Sith de tota la galàxia.
                        <span className="text-cyan-400"> Que la Força t'acompanyi.</span>
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                        <a href="#cataleg" className="group relative px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(168,85,247,0.4)]">
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                Explorar Catàleg
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                        <button className="px-10 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl font-bold text-lg transition-all duration-300 hover:bg-white/10 hover:border-white/40">
                            Ofertes Especials
                        </button>
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
                        <p className="text-gray-400 text-lg">
                            <span className="text-purple-400 font-bold">{espadasFiltradas.length}</span> espases disponibles per a guerrers de la galàxia
                        </p>
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
                                className={`group relative w-[380px] bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 transition-all duration-500 hover:-translate-y-3 hover:${colorMap[espada.colorFulla].glow} hover:${colorMap[espada.colorFulla].border}`}
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Glow Effect on Hover */}
                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${colorMap[espada.colorFulla].bg}`} />

                                {/* Stock Badge */}
                                {espada.estoc < 5 && (
                                    <div className="absolute top-4 right-4 z-20 px-4 py-2 bg-red-500/20 backdrop-blur-sm border border-red-500/40 rounded-full">
                                        <span className="text-xs font-bold text-red-400 flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                                            {espada.estoc} unitats
                                        </span>
                                    </div>
                                )}

                                {/* Image Container - Placeholder */}
                                <div className="relative h-56 flex items-center justify-center overflow-hidden">
                                    <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent`} />
                                    {/* Color Circle Placeholder */}
                                    <div
                                        className={`w-32 h-32 rounded-full ${colorMap[espada.colorFulla].bg} transition-all duration-500 group-hover:scale-125 ${colorMap[espada.colorFulla].glow}`}
                                    />
                                </div>

                                {/* Content */}
                                <div className="relative p-8">
                                    {/* Color Tag */}
                                    <div className="flex items-center gap-2 mb-5">
                                        <span className={`w-3 h-3 rounded-full ${colorMap[espada.colorFulla].bg} shadow-[0_0_10px_currentColor]`} />
                                        <span className={`text-xs font-bold uppercase tracking-widest ${colorMap[espada.colorFulla].text}`}>
                                            Cristall {colorMap[espada.colorFulla].name}
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

                                    {/* Footer */}
                                    <div className="flex items-center justify-between pt-6 border-t border-white/10">
                                        <div>
                                            <span className="text-3xl font-black text-white">{espada.preu.toFixed(2)}</span>
                                            <span className="text-sm text-gray-500 ml-1">€</span>
                                        </div>
                                        <button className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all duration-300 bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]`}>
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                            Afegir
                                        </button>
                                    </div>
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