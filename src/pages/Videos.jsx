import { Link } from 'react-router-dom';

const VIDEOS = [
    {
        id: 'K2ll-v6wVmo',
        title: 'İyilik Adımı - Tanıtım Filmi',
    },
    {
        id: 'K4afQ7fMSPo',
        title: 'Gazze Yardım Faaliyetlerimiz',
    },
    {
        id: 'Snwt5fDLhoY',
        title: 'Afrika Su Kuyusu Açılışımız',
    },
    {
        id: 'ut22ViMc8x8',
        title: 'Yetimhane Ziyaretimiz',
    }
];

export default function Videos() {
    return (
        <div className="bg-gray-50 min-h-screen pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <span className="inline-block py-1 px-3 rounded-full bg-[#12985a]/10 text-[#12985a] font-bold text-sm mb-4">
                        MEDYA GALERİSİ
                    </span>
                    <h1 className="text-4xl font-bold text-[#103e6a] mb-4">
                        Videolarımız
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Faaliyetlerimizden kesitler ve tanıtım filmlerimizi buradan izleyebilirsiniz.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {VIDEOS.map((video) => (
                        <div key={video.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                            <div className="aspect-video relative bg-black">
                                <iframe
                                    className="absolute top-0 left-0 w-full h-full"
                                    src={`https://www.youtube.com/embed/${video.id}`}
                                    title={video.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-[#103e6a] line-clamp-2">
                                    {video.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <a
                        href="https://www.youtube.com/@iyilikadimitr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#FF0000] text-white rounded-xl font-bold hover:bg-[#CC0000] transition-colors shadow-lg shadow-red-900/10"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                        </svg>
                        YouTube Kanalımıza Abone Olun
                    </a>
                </div>
            </div>
        </div>
    );
}
