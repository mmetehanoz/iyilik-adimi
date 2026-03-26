import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
import { Tooltip } from 'react-tooltip';
import { getGlobalAidMapData } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function ImpactMap() {
    const [data, setData] = useState({ summary: {}, countries: [] });
    const [loading, setLoading] = useState(true);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [tooltipContent, setTooltipContent] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getGlobalAidMapData();
                setData(response);
            } catch (error) {
                console.error("Harita verileri yüklenemedi:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Helper for formatting numbers
    const formatNumber = (num) => new Intl.NumberFormat('tr-TR').format(num || 0);

    return (
        <section className="bg-slate-50 py-16 relative overflow-hidden" id="impact-map">
            <div className="container mx-auto px-4 relative z-10">

                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-black text-[#103e6a] mb-4 tracking-tight">
                        Dünya Çapında <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#103e6a] to-[#12985a]">
                            Yardım Faaliyetlerimiz
                        </span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
                        Hangi ülkelerde ne kadar yardım yaptığımızı keşfedin. Ülkelere tıklayarak detaylı raporu görüntüleyebilirsiniz.
                    </p>
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
                    {[
                        { label: 'ÜLKE', value: data.summary.total_countries || 0 },
                        { label: 'PROJE', value: data.summary.total_projects || 0 },
                        { label: 'YARARLANAN', value: data.summary.total_beneficiaries || 0 }
                    ].map((stat, idx) => (
                        <div key={idx} className="bg-white rounded-2xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center justify-center transform hover:scale-105 transition-transform duration-300">
                            <span className="text-4xl font-black text-[#103e6a] mb-2 font-mono tracking-tighter">
                                {formatNumber(stat.value)}
                            </span>
                            <span className="text-sm font-bold text-gray-500 tracking-widest uppercase">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Map Container - Compact Size */}
                <div className="relative bg-blue-50/50 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-blue-100 overflow-hidden h-[500px] md:h-[650px] max-w-7xl mx-auto">

                    {/* Map Interaction Hint */}
                    <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs font-bold text-[#103e6a] shadow-sm pointer-events-none border border-slate-100/50">
                        🌍 Haritayı keşfetmek için sürükleyin ve yakınlaştırın
                    </div>

                    <ComposableMap projectionConfig={{ scale: 230, center: [20, 0] }} className="w-full h-full">
                        <ZoomableGroup zoom={1} minZoom={0.8} maxZoom={5}>
                            <Geographies geography={geoUrl}>
                                {({ geographies }) =>
                                    geographies.map((geo) => {
                                        // Check if this country has data
                                        // Note: geo.properties.ISO_A3 matching might be tricky with simple codes like 'TR' vs 'TUR'
                                        // But our API returns 2-char codes usually? Or 3? Country model has 3 char codes?
                                        // Let's rely on marker matching (latitude/longitude) for now, as we draw markers separately.
                                        // Just coloring the base map.
                                        return (
                                            <Geography
                                                key={geo.rsmKey}
                                                geography={geo}
                                                fill="#EAEAEC"
                                                stroke="#D6D6DA"
                                                strokeWidth={0.5}
                                                style={{
                                                    default: { outline: "none" },
                                                    hover: { fill: "#D6D6DA", outline: "none" },
                                                    pressed: { fill: "#E4E5E9", outline: "none" },
                                                }}
                                            />
                                        );
                                    })
                                }
                            </Geographies>

                            {/* Render Markers for Active Countries */}
                            {data.countries && data.countries.map((country) => (
                                <Marker
                                    key={country.code}
                                    coordinates={[country.longitude, country.latitude]}
                                    onClick={() => setSelectedCountry(country)}
                                    className="cursor-pointer group"
                                >
                                    {/* Flag Marker Implementation */}
                                    <g
                                        className="transition-transform duration-300 group-hover:scale-125 origin-center"
                                        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                                    >

                                        {country.flag_url ? (
                                            <g>
                                                {/* Outer Ring/Shadow for Image Flags */}
                                                <circle r="8" fill="white" fillOpacity="1" filter="drop-shadow(0px 2px 2px rgba(0,0,0,0.3))" />

                                                {/* Circular Flag Image */}
                                                <image
                                                    href={country.flag_url}
                                                    x="-6"
                                                    y="-6"
                                                    height="12"
                                                    width="12"
                                                    preserveAspectRatio="xMidYMid slice"
                                                    className="rounded-full"
                                                    clipPath="circle(6px at center)"
                                                />
                                            </g>
                                        ) : country.flag_emoji ? (
                                            /* Emoji Flag Fallback from Backend */
                                            <text
                                                textAnchor="middle"
                                                y="4"
                                                style={{ fontSize: "14px", filter: "drop-shadow(0px 2px 2px rgba(0,0,0,0.2))" }}
                                            >
                                                {country.flag_emoji}
                                            </text>
                                        ) : (
                                            /* Fallback Colored Circle */
                                            <g>
                                                <circle r="6" fill="#12985a" />
                                                <text
                                                    textAnchor="middle"
                                                    y="2"
                                                    style={{ fontSize: "5px", fill: "white", fontWeight: "bold", fontFamily: "Arial" }}
                                                >
                                                    {country.code}
                                                </text>
                                            </g>
                                        )}
                                    </g>
                                </Marker>
                            ))}
                        </ZoomableGroup>
                    </ComposableMap>

                    {/* Country Detail Popup (Absolute Positioned) */}
                    <AnimatePresence>
                        {selectedCountry && (
                            <motion.div
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:translate-x-0 md:translate-y-0 md:top-8 md:right-8 md:left-auto md:bottom-auto w-[calc(100%-2rem)] md:w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-blue-900/20 border border-white/20 z-50 overflow-hidden"
                            >
                                {/* Header */}
                                <div className="bg-[#103e6a] p-4 flex items-center justify-between text-white">
                                    <div className="flex items-center space-x-3">
                                        {selectedCountry.flag_url ? (
                                            <img src={selectedCountry.flag_url} alt={selectedCountry.name} className="w-8 h-6 object-cover rounded shadow-sm border border-white/20" />
                                        ) : selectedCountry.flag_emoji ? (
                                            <div className="text-2xl">{selectedCountry.flag_emoji}</div>
                                        ) : (
                                            <div className="w-8 h-6 bg-white/20 rounded flex items-center justify-center text-xs">🏳️</div>
                                        )}
                                        <h3 className="font-bold text-lg">{selectedCountry.name}</h3>
                                    </div>
                                    <button
                                        onClick={() => setSelectedCountry(null)}
                                        className="text-white/80 hover:text-white hover:bg-white/10 rounded-full p-1 transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Quick Stats */}
                                <div className="grid grid-cols-2 gap-px bg-slate-100 border-b border-slate-100">
                                    <div className="bg-white p-3 text-center">
                                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">PROJE</div>
                                        <div className="text-xl font-black text-[#103e6a]">{selectedCountry.total_projects} <span className="text-xs font-medium text-gray-400">Adet</span></div>
                                    </div>
                                    <div className="bg-white p-3 text-center">
                                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">İSTİFADE</div>
                                        <div className="text-xl font-black text-[#12985a]">{selectedCountry.total_beneficiaries} <span className="text-xs font-medium text-gray-400">Kişi</span></div>
                                    </div>
                                </div>

                                {/* Breakdown List */}
                                <div className="p-4 max-h-[300px] overflow-y-auto custom-scrollbar">
                                    {selectedCountry.breakdown && selectedCountry.breakdown.length > 0 ? (
                                        <div className="space-y-3">
                                            {/* Header Row */}
                                            <div className="flex justify-between text-xs font-bold text-gray-400 border-b pb-2 mb-2 uppercase tracking-tight">
                                                <span>BAĞIŞ TÜRÜ</span>
                                                <div className="flex space-x-6">
                                                    <span className="w-16 text-right">ADET</span>
                                                    <span className="w-16 text-right">KİŞİ</span>
                                                </div>
                                            </div>

                                            {selectedCountry.breakdown.map((item, idx) => (
                                                <div key={idx} className="flex justify-between items-center text-sm group hover:bg-slate-50 p-1.5 rounded-lg transition-colors">
                                                    <span className="font-semibold text-gray-700 truncate pr-2 flex-1">{item.type}</span>
                                                    <div className="flex space-x-6 text-right shrink-0">
                                                        <span className="w-16 font-mono text-gray-600">{formatNumber(item.count)}</span>
                                                        <span className="w-16 font-mono font-bold text-[#103e6a]">{formatNumber(item.beneficiaries)}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="p-8 text-center text-gray-400 text-sm">
                                            Detaylı veri bulunamadı.
                                        </div>
                                    )}
                                </div>

                                {/* Donate Button */}
                                <div className="px-4 pb-4 pt-2">
                                    <Link
                                        to={selectedCountry.name.toLowerCase().includes('gazze') || selectedCountry.name.toLowerCase().includes('filistin')
                                            ? '/bagislar?kategori=gazze'
                                            : '/bagislar'}
                                        onClick={() => setSelectedCountry(null)}
                                        className="block w-full text-center rounded-full bg-[#12985a] py-2.5 text-sm font-bold text-white transition-all hover:opacity-90 hover:scale-105 active:scale-95"
                                    >
                                        BAĞIŞ YAP
                                    </Link>
                                </div>

                                <div className="px-4 pb-3 text-[10px] text-center text-gray-400 font-medium">
                                    Veriler anlık olarak güncellenmektedir.
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
