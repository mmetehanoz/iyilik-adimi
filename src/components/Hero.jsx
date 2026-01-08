import ContactBar from './ContactBar';

export default function Hero() {
    return (
        <section className="relative min-h-[80vh] w-full">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage:
                        'url(https://images.unsplash.com/photo-1509098681029-b45e9c845022?q=80&w=2000&auto=format&fit=crop)',
                }}
            />
            <div className="absolute inset-0 bg-black/40" />

            <div className="relative z-10 mx-auto max-w-7xl px-4 pt-36 pb-24 text-center text-white">
                <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight">Yardımlaşmayı Seviyoruz</h1>
                <p className="mt-4 text-sm sm:text-base tracking-[0.2em] text-white/90">
                    YENİ NESİL SİVİL TOPLUM BİLİNCİ
                </p>

                <div className="mt-16 flex justify-center">
                    <button className="h-12 w-12 rounded-full border border-white/60 text-white/90 hover:bg-white/10">
                        ↓
                    </button>
                </div>
            </div>

            <ContactBar />
        </section>
    );
}
