import React from 'react';

const videos = [
    {
        id: 1,
        url: "https://www.youtube.com/embed/Snwt5fDLhoY",
        title: "Tanıtım Videosu 1"
    },
    {
        id: 2,
        url: "https://www.youtube.com/embed/ut22ViMc8x8",
        title: "Tanıtım Videosu 2"
    },
    {
        id: 3,
        url: "https://www.youtube.com/embed/K4afQ7fMSPo",
        title: "Tanıtım Videosu 3"
    }
];

export default function Videos() {
    return (
        <section id="medya" className="bg-white py-24">
            <div className="mx-auto max-w-7xl px-4">
                <div className="mb-12 text-center">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#12985a]">
                        MEDYA GALERİSİ
                    </h3>
                    <h2 className="mt-2 text-4xl font-black text-gray-900 sm:text-5xl">
                        TANITIM VİDEOLARIMIZ
                    </h2>
                    <div className="mx-auto mt-4 h-1 w-24 bg-[#12985a] rounded-full"></div>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {videos.map((video) => (
                        <div key={video.id} className="group relative overflow-hidden rounded-2xl bg-gray-100 shadow-lg transition-all hover:shadow-xl">
                            <div className="aspect-w-16 aspect-h-9 relative w-full pt-[56.25%]">
                                <iframe
                                    src={video.url}
                                    title={video.title}
                                    className="absolute top-0 left-0 bottom-0 right-0 h-full w-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
