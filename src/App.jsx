export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header / Nav (dark over hero) */}
      <header className="fixed top-0 inset-x-0 z-30 bg-black/60 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <span className="text-2xl">❤</span>
            <div className="text-xl font-semibold tracking-wide">CHARITY</div>
          </div>
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-white/90">
            <a href="#" className="hover:text-white">HOME</a>
            <a href="#causes" className="hover:text-white">CAUSES</a>
            <a href="#give" className="hover:text-white">GIVE</a>
            <a href="#about" className="hover:text-white">ABOUT US</a>
            <a href="#pages" className="hover:text-white">PAGES</a>
            <a href="#shop" className="hover:text-white">SHOP</a>
            <a href="#blog" className="hover:text-white">BLOG</a>
            <a href="#contact" className="hover:text-white">CONTACT</a>
          </nav>
          <button className="inline-flex items-center rounded-full bg-emerald-500 px-4 py-2 text-white hover:bg-emerald-600">DONATE NOW</button>
        </div>
      </header>

      {/* Hero with background image and overlay */}
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
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight">We Love Help</h1>
          <p className="mt-4 text-sm sm:text-base tracking-[0.2em] text-white/90">
            A NEW WAY OF NONPROFIT AGENCY
          </p>

          <div className="mt-16 flex justify-center">
            <button className="h-12 w-12 rounded-full border border-white/60 text-white/90 hover:bg-white/10">
              ↓
            </button>
          </div>
        </div>

        {/* Bottom contact bar over hero */}
        <div className="absolute -bottom-10 left-0 right-0 z-20">
          <div className="mx-auto max-w-7xl px-4">
            <div className="rounded-2xl bg-black/70 text-white backdrop-blur p-6 grid gap-4 md:grid-cols-4">
              <div>
                <label className="text-xs uppercase tracking-wide text-white/70">Name</label>
                <input className="mt-2 w-full rounded-md bg-white/10 px-4 py-3 placeholder-white/50 outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Insert your Name" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wide text-white/70">Email</label>
                <input type="email" className="mt-2 w-full rounded-md bg-white/10 px-4 py-3 placeholder-white/50 outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Insert your Email" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wide text-white/70">Message</label>
                <input className="mt-2 w-full rounded-md bg-white/10 px-4 py-3 placeholder-white/50 outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Type your Message" />
              </div>
              <div className="flex items-end">
                <button className="w-full rounded-full bg-emerald-500 py-3 font-semibold hover:bg-emerald-600">Contact</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Causes (placeholder) */}
      <section id="causes" className="mx-auto max-w-7xl px-4 pt-24 pb-16">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold">Our Causes</h2>
          <a href="#" className="text-teal-700 font-medium hover:underline">View All</a>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1,2,3].map((i) => (
            <div key={i} className="rounded-lg border p-5">
              <div className="h-40 w-full rounded bg-gray-100" />
              <h3 className="mt-4 text-lg font-semibold">Cause #{i}</h3>
              <p className="mt-1 text-sm text-gray-600">Kısa açıklama metni için yer tutucu.</p>
              <div className="mt-4 h-2 w-full rounded bg-gray-100">
                <div className="h-2 rounded bg-teal-600" style={{ width: `${i*25}%` }} />
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-gray-600">
                <span>Goal: ${(i*10000).toLocaleString()}</span>
                <span>Raised: ${(i*2500).toLocaleString()}</span>
              </div>
              <button className="mt-4 w-full rounded-md bg-teal-600 px-4 py-2 text-white hover:bg-teal-700">Donate</button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t">
        <div className="mx-auto max-w-7xl px-4 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">© {new Date().getFullYear()} Iyilik Adımı</p>
          <div className="flex gap-4 text-sm">
            <a href="#" className="hover:text-teal-600">Privacy</a>
            <a href="#" className="hover:text-teal-600">Terms</a>
            <a href="#" className="hover:text-teal-600">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
