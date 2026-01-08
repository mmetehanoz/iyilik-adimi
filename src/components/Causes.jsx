const causes = [
    {
        id: 1,
        title: "Herkes İçin Su",
        description:
            "Temiz suya erişim temel bir insan hakkıdır. Kuraklık çeken bölgelere su kuyuları açarak yaşam götürüyoruz.",
        goal: 320000,
        raised: 38989,
        percentage: 12,
        image: "https://images.unsplash.com/photo-1594372365401-4115d7f8d68d?w=800&q=80",
        color: "teal",
    },
    {
        id: 2,
        title: "Temiz Su",
        description:
            "Kirli su kaynaklı hastalıkların önüne geçmek için su arıtma sistemleri kuruyor ve halkı bilinçlendiriyoruz.",
        goal: 190000,
        raised: 9136,
        percentage: 4,
        image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=800&q=80", // Different water image
        color: "yellow",
    },
    {
        id: 3,
        title: "Yeni Okul",
        description:
            "Eğitim her çocuğun hakkıdır. Köy okullarını onarıyor ve çocukların geleceğine ışık tutuyoruz.",
        goal: 42000,
        raised: 34900,
        percentage: 83,
        image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
        color: "red",
    },
];

const colorClasses = {
    teal: {
        bg: "bg-[#12985a]",
        text: "text-[#12985a]",
        bar: "bg-[#12985a]",
        btn: "bg-[#12985a] hover:opacity-90",
    },
    yellow: {
        bg: "bg-[#12985a]",
        text: "text-[#12985a]",
        bar: "bg-[#12985a]",
        btn: "bg-[#12985a] hover:opacity-90",
    },
    red: {
        bg: "bg-[#12985a]",
        text: "text-[#12985a]",
        bar: "bg-[#12985a]",
        btn: "bg-[#12985a] hover:opacity-90",
    },
};

export default function Causes() {
    return (
        <section id="causes" className="mx-auto max-w-7xl px-4 py-24">
            {/* Header Section */}
            <div className="mb-16 grid gap-8 lg:grid-cols-2 lg:items-center">
                <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#12985a]">
                        PROJELERİMİZ
                    </h3>
                    <h2 className="mt-2 text-6xl font-black text-gray-700">
                        YARDIM <span className="text-[#12985a]">ET!</span>
                    </h2>
                </div>

                <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
                    <p className="text-gray-500 lg:max-w-md">
                        İyilik paylaştıkça çoğalır. Siz de projelerimize destek olarak ihtiyaç sahiplerinin yüzündeki tebessümün sebebi olabilirsiniz.
                    </p>
                    <button className="whitespace-nowrap rounded-full bg-[#103e6a] px-8 py-3 text-sm font-bold text-white transition-colors hover:opacity-90">
                        TÜMÜNÜ GÖR
                    </button>
                </div>
            </div>

            {/* Cards Grid */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {causes.map((cause) => {
                    const theme = colorClasses[cause.color];

                    return (
                        <div key={cause.id} className="group overflow-hidden bg-white shadow-sm transition-shadow hover:shadow-md">
                            {/* Image Container */}
                            <div className="relative h-64 w-full overflow-hidden">
                                <img
                                    src={cause.image}
                                    alt={cause.title}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/20" />

                                {/* Donate Badge */}
                                <div className={`absolute bottom-0 right-10 ${theme.bg} px-6 py-2 text-xs font-bold text-white`}>
                                    BAĞIŞ YAP
                                </div>
                                <div className="absolute bottom-0 right-0 bg-gray-900 px-[14px] py-[8px] text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-1.647-2.865A8.995 8.995 0 0112 18z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-gray-700">{cause.title}</h3>
                                <p className="mt-4 text-sm leading-relaxed text-gray-500">
                                    {cause.description}
                                </p>

                                {/* Progress Bar */}
                                <div className="mt-8">
                                    <div className="relative h-1 w-full bg-gray-100">
                                        <div
                                            className={`absolute left-0 top-0 h-full ${theme.bar}`}
                                            style={{ width: `${cause.percentage}%` }}
                                        />
                                        {/* Percentage Badge */}
                                        <div
                                            className={`absolute -top-3 ${theme.bg} px-2 py-0.5 text-[10px] font-bold text-white`}
                                            style={{ left: `${cause.percentage}%` }}
                                        >
                                            {cause.percentage}%
                                        </div>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="mt-4 flex items-center justify-between text-xs font-bold tracking-wider text-gray-500">
                                    <div>HEDEF : {cause.goal.toLocaleString('tr-TR')} ₺</div>
                                    <div>TOPLANAN : {cause.raised.toLocaleString('tr-TR')} ₺</div>
                                </div>

                                {/* View Details Button */}
                                <button className={`mt-8 rounded-full bg-[#103e6a] px-6 py-2.5 text-xs font-bold text-white transition-colors hover:opacity-90`}>
                                    DETAYLARI GÖR
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
