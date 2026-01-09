import ContactBar from './ContactBar';

export default function Hero() {
    return (
        <section id="anasayfa" className="relative min-h-[80vh] w-full flex items-center justify-center">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage:
                        'url(https://images.unsplash.com/photo-1509098681029-b45e9c845022?q=80&w=2000&auto=format&fit=crop)',
                }}
            />
            <div className="absolute inset-0 bg-black/40" />

            <div className="relative z-10 mx-auto max-w-7xl px-4 text-center text-white">
                <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight">Her Adımda İyilik!</h1>
                <p className="mt-4 text-sm sm:text-base tracking-[0.2em] text-white/90">
                    İYİLİK ADIMI İNSANİ YARDIM DERNEĞİ
                </p>
            </div>

            <div className="absolute bottom-20 left-0 right-0 z-10 flex justify-center">
                <button className="h-12 w-12 rounded-full border-2 border-[#12985a] text-white hover:bg-[#12985a]/10 animate-bounce">
                    ↓
                </button>
            </div>

            <ContactBar />
        </section>
    );
}
