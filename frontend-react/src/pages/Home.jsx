import { Link } from 'react-router-dom'
import { useState } from 'react'
import './Home.css'

function Home() {
    const [selectedColor, setSelectedColor] = useState('tots')

    // Espadas de ejemplo (después se conectarán con la API)
    const espadas = [
        {
            id: 1,
            nom: "Espasa de Darth Vader",
            colorFulla: "vermell",
            preu: 299.99,
            estoc: 5,
            descripcio: "L'espasa làser icònica del Senyor Fosc dels Sith",
            imatge: "🔴"
        },
        {
            id: 2,
            nom: "Espasa de Luke Skywalker",
            colorFulla: "verd",
            preu: 349.99,
            estoc: 3,
            descripcio: "L'espasa llegendària del Jedi més poderós",
            imatge: "🟢"
        },
        {
            id: 3,
            nom: "Espasa d'Obi-Wan Kenobi",
            colorFulla: "blau",
            preu: 329.99,
            estoc: 7,
            descripcio: "L'arma elegant d'un temps més civilitzat",
            imatge: "🔵"
        },
        {
            id: 4,
            nom: "Espasa de Mace Windu",
            colorFulla: "porpra",
            preu: 399.99,
            estoc: 2,
            descripcio: "L'única espasa porpra del Consell Jedi",
            imatge: "🟣"
        },
        {
            id: 5,
            nom: "Espasa del Temple Jedi",
            colorFulla: "groc",
            preu: 279.99,
            estoc: 10,
            descripcio: "Espasa d'entrenament dels Guardians del Temple",
            imatge: "🟡"
        },
        {
            id: 6,
            nom: "Espasa de Kylo Ren",
            colorFulla: "vermell",
            preu: 379.99,
            estoc: 4,
            descripcio: "Disseny inestable amb guarda creuada",
            imatge: "🔴"
        }
    ]

    const colorMap = {
        vermell: { name: 'Vermell', class: 'bg-red-500', border: 'border-red-500', shadow: 'shadow-red-500/50' },
        blau: { name: 'Blau', class: 'bg-blue-500', border: 'border-blue-500', shadow: 'shadow-blue-500/50' },
        verd: { name: 'Verd', class: 'bg-green-500', border: 'border-green-500', shadow: 'shadow-green-500/50' },
        groc: { name: 'Groc', class: 'bg-yellow-500', border: 'border-yellow-500', shadow: 'shadow-yellow-500/50' },
        porpra: { name: 'Porpra', class: 'bg-purple-500', border: 'border-purple-500', shadow: 'shadow-purple-500/50' }
    }

    const espadasFiltradas = selectedColor === 'tots'
        ? espadas
        : espadas.filter(e => e.colorFulla === selectedColor)

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 px-4 sm:px-6 lg:px-8">
            {/* Hero Section - Grid 12 columnas */}
            <section className="relative overflow-hidden py-24 md:py-32 lg:py-40">
                {/* Estrellas de fondo animadas */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="stars"></div>
                    <div className="stars2"></div>
                    <div className="stars3"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-12 gap-8 items-center">
                        {/* Columna izquierda - Contenido principal */}
                        <div className="col-span-12 lg:col-span-7 text-center lg:text-left space-y-8">
                            <div className="inline-block lg:block">
                                <span className="text-8xl md:text-9xl inline-block interactive-icon">⚔️</span>
                            </div>

                            <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold gradient-text-animated animate-fade-in leading-tight">
                                Espases Làser de Star Wars
                            </h1>

                            <p className="text-lg md:text-xl lg:text-2xl text-purple-200 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                Descobreix la col·lecció més completa d'espases làser de la galàxia.
                                <span className="block mt-3 text-purple-300 font-semibold">Que la Força t'acompanyi! ✨</span>
                            </p>

                            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start pt-4">
                                <button className="premium-button group relative px-12 py-5 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white text-lg font-bold rounded-2xl shadow-2xl shadow-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-purple-500/80 overflow-hidden">
                                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></span>
                                    <span className="relative z-10 flex items-center justify-center gap-3">
                                        <span className="text-2xl">🚀</span>
                                        Explorar Catàleg
                                        <span className="group-hover:translate-x-2 transition-transform text-xl">→</span>
                                    </span>
                                </button>

                                <button className="secondary-button group px-12 py-5 bg-transparent border-3 border-purple-400 text-purple-300 hover:bg-purple-500/20 text-lg font-bold rounded-2xl transition-all duration-300 hover:scale-105 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-500/30">
                                    <span className="flex items-center justify-center gap-3">
                                        <span className="text-2xl">🎁</span>
                                        Ofertes Especials
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Columna derecha - Estadísticas/Info */}
                        <div className="col-span-12 lg:col-span-5 space-y-6 mt-12 lg:mt-0">
                            <div className="card-glass p-8 rounded-3xl border-2 border-purple-500/40 hover:border-purple-400 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30">
                                <div className="text-center space-y-4">
                                    <div className="text-6xl">🌟</div>
                                    <h3 className="text-3xl font-bold text-white">+1000</h3>
                                    <p className="text-purple-300 text-lg">Clients Satisfets</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="card-glass p-6 rounded-2xl border-2 border-purple-500/30 hover:border-purple-400 transition-all duration-300 hover:scale-105">
                                    <div className="text-center space-y-3">
                                        <div className="text-4xl">⚡</div>
                                        <h3 className="text-2xl font-bold text-white">24h</h3>
                                        <p className="text-purple-300 text-sm">Enviament</p>
                                    </div>
                                </div>

                                <div className="card-glass p-6 rounded-2xl border-2 border-purple-500/30 hover:border-purple-400 transition-all duration-300 hover:scale-105">
                                    <div className="text-center space-y-3">
                                        <div className="text-4xl">🛡️</div>
                                        <h3 className="text-2xl font-bold text-white">2 Anys</h3>
                                        <p className="text-purple-300 text-sm">Garantia</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Separador decorativo mejorado */}
                <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                        <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" fill="#0f172a" fillOpacity="0.7" />
                    </svg>
                </div>
            </section>

            {/* Espacio entre secciones */}
            <div className="h-16"></div>

            {/* Filtros - Con mejor espaciado */}
            <section className="filter-bar-backdrop sticky top-0 z-30 py-8 border-y-2 border-purple-500/30 shadow-xl">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-12 gap-6 items-center">
                        <div className="col-span-12 lg:col-span-3 text-center lg:text-left">
                            <span className="text-purple-300 font-bold text-xl">Filtrar per color:</span>
                        </div>

                        <div className="col-span-12 lg:col-span-9 flex flex-wrap gap-4 justify-center lg:justify-end">
                            <button
                                onClick={() => setSelectedColor('tots')}
                                className={`filter-button px-10 py-4 rounded-2xl font-bold text-base transition-all duration-300 ${selectedColor === 'tots'
                                    ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-2xl shadow-purple-500/50 scale-110 border-2 border-purple-400'
                                    : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700 hover:scale-105 border-2 border-gray-700'
                                    }`}
                            >
                                Tots
                            </button>

                            {Object.entries(colorMap).map(([key, value]) => (
                                <button
                                    key={key}
                                    onClick={() => setSelectedColor(key)}
                                    className={`filter-button px-9 py-4 rounded-2xl font-bold text-base transition-all duration-300 flex items-center gap-3 border-2 ${selectedColor === key
                                        ? `${value.class} text-white shadow-2xl ${value.shadow} scale-110 border-white/30`
                                        : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700 hover:scale-105 border-gray-700'
                                        }`}
                                >
                                    <span className={`w-4 h-4 rounded-full ${value.class} ${selectedColor === key ? 'animate-pulse shadow-lg' : ''}`}></span>
                                    {value.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Espacio entre secciones */}
            <div className="h-24"></div>

            {/* Catálogo - Grid 12 columnas con mejor espaciado */}
            <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
                <div className="grid grid-cols-12 gap-8 mb-20">
                    <div className="col-span-12 lg:col-span-8 lg:col-start-3 text-center space-y-6">
                        <h2 className="text-5xl lg:text-6xl font-bold text-white text-glow">
                            El Nostre Catàleg
                        </h2>
                        <p className="text-purple-300 text-xl lg:text-2xl">
                            <span className="inline-block px-6 py-3 bg-purple-600/30 rounded-full border-2 border-purple-500/50 text-3xl font-bold text-purple-400">
                                {espadasFiltradas.length}
                            </span>
                            <span className="block mt-4">espases disponibles a la galàxia</span>
                        </p>
                    </div>
                </div>

                {/* Grid de productos con espaciado mejorado */}
                <div className="grid grid-cols-12 gap-10">
                    {espadasFiltradas.map((espada) => (
                        <div
                            key={espada.id}
                            className="col-span-12 md:col-span-6 lg:col-span-4"
                        >
                            <div className="card-glass card-hover-effect group relative rounded-3xl overflow-hidden border-2 border-purple-500/30 hover:border-purple-400 h-full flex flex-col">
                                {/* Badge de stock mejorado */}
                                {espada.estoc < 5 && (
                                    <div className="badge-pulse absolute top-6 right-6 z-10 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-bold px-5 py-2.5 rounded-full flex items-center gap-2 shadow-xl shadow-red-500/50">
                                        <span className="text-lg">⚠️</span>
                                        Últimes unitats!
                                    </div>
                                )}

                                {/* Imagen/Emoji mejorado */}
                                <div className="relative h-64 bg-gradient-to-br from-gray-900 to-purple-900/40 flex items-center justify-center overflow-hidden">
                                    <span className="text-9xl interactive-icon z-10">
                                        {espada.imatge}
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-800/95 via-transparent to-transparent"></div>

                                    {/* Efecto de brillo en hover */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                                </div>

                                {/* Contenido con más espaciado */}
                                <div className="p-8 flex-grow flex flex-col">
                                    <div className="flex items-center gap-3 mb-5">
                                        <span className={`w-6 h-6 rounded-full ${colorMap[espada.colorFulla].class} shadow-xl ${colorMap[espada.colorFulla].shadow} animate-pulse`}></span>
                                        <span className="text-purple-300 text-sm font-bold uppercase tracking-wider">
                                            {colorMap[espada.colorFulla].name}
                                        </span>
                                    </div>

                                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors leading-tight">
                                        {espada.nom}
                                    </h3>

                                    <p className="text-gray-400 mb-8 line-clamp-2 leading-relaxed text-base flex-grow">
                                        {espada.descripcio}
                                    </p>

                                    <div className="space-y-6">
                                        <div className="flex items-end justify-between">
                                            <div>
                                                <span className="text-sm text-gray-500 block mb-1">Preu</span>
                                                <span className="text-4xl lg:text-5xl font-bold text-purple-400 price-highlight">
                                                    {espada.preu.toFixed(2)}€
                                                </span>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-xs text-gray-500 block mb-1">Disponibilitat</span>
                                                <span className={`text-base font-bold px-4 py-2 rounded-full ${espada.estoc < 5
                                                    ? 'bg-red-500/20 text-red-400 border border-red-500/50'
                                                    : 'bg-green-500/20 text-green-400 border border-green-500/50'
                                                    }`}>
                                                    {espada.estoc} unitats
                                                </span>
                                            </div>
                                        </div>

                                        <button className="cart-button w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-bold py-5 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 flex items-center justify-center gap-3 group border-2 border-purple-500/30">
                                            <span className="text-2xl group-hover:scale-125 transition-transform">🛒</span>
                                            <span className="text-lg">Afegir al Carret</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Espacio entre secciones */}
            <div className="h-32"></div>

            {/* Sección de características - Grid 12 columnas */}
            <section className="bg-gray-900/90 backdrop-blur-sm py-24 border-y-2 border-purple-500/30">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-12 gap-8 mb-16">
                        <div className="col-span-12 lg:col-span-8 lg:col-start-3 text-center space-y-4">
                            <h2 className="text-5xl lg:text-6xl font-bold text-white text-glow">
                                Per què Triar-nos?
                            </h2>
                            <p className="text-purple-300 text-xl">Els millors avantatges de la galàxia</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-10">
                        <div className="col-span-12 md:col-span-6 lg:col-span-4">
                            <div className="card-glass text-center p-10 rounded-3xl hover:border-purple-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 group h-full border-2 border-purple-500/30">
                                <div className="text-7xl mb-8 inline-block interactive-icon">🚀</div>
                                <h3 className="text-3xl font-bold text-white mb-5 group-hover:text-purple-300 transition-colors">Enviament Ràpid</h3>
                                <p className="text-purple-300 leading-relaxed text-lg">Lliurament en 24-48 hores a tota la galàxia amb seguiment espacial en temps real</p>
                            </div>
                        </div>

                        <div className="col-span-12 md:col-span-6 lg:col-span-4">
                            <div className="card-glass text-center p-10 rounded-3xl hover:border-purple-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 group h-full border-2 border-purple-500/30">
                                <div className="text-7xl mb-8 inline-block interactive-icon">🛡️</div>
                                <h3 className="text-3xl font-bold text-white mb-5 group-hover:text-purple-300 transition-colors">Garantia Jedi</h3>
                                <p className="text-purple-300 leading-relaxed text-lg">2 anys de garantia en tots els productes certificats pel Consell Jedi</p>
                            </div>
                        </div>

                        <div className="col-span-12 md:col-span-6 lg:col-span-4">
                            <div className="card-glass text-center p-10 rounded-3xl hover:border-purple-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 group h-full border-2 border-purple-500/30">
                                <div className="text-7xl mb-8 inline-block interactive-icon">⭐</div>
                                <h3 className="text-3xl font-bold text-white mb-5 group-hover:text-purple-300 transition-colors">Qualitat Premium</h3>
                                <p className="text-purple-300 leading-relaxed text-lg">Materials kyber autèntics de la més alta qualitat galàctica disponible</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Espacio antes del footer */}
            <div className="h-16"></div>

            {/* Footer mejorado */}
            <footer className="bg-gray-950/90 backdrop-blur-sm py-12 border-t-2 border-purple-500/20">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-12 gap-8">
                        <div className="col-span-12 text-center space-y-4">
                            <div className="text-6xl mb-4">⚔️</div>
                            <p className="text-purple-400 text-lg font-semibold">
                                © 2024 Espases Làser Star Wars
                            </p>
                            <p className="text-purple-500 text-base">
                                Que la Força t'acompanyi sempre ✨
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Home