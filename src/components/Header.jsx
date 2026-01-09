import logo from '../assets/logo.png';

export default function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-30 bg-black/60 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Iyilik Adımı Logo" className="h-16 w-auto" />
        </div>
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-white/90">
          <a href="#anasayfa" className="hover:text-[#12985a] transition-colors">ANASAYFA</a>
          <a href="#hakkimizda" className="hover:text-[#12985a] transition-colors">HAKKIMIZDA</a>
          <a href="#projelerimiz" className="hover:text-[#12985a] transition-colors">PROJELERİMİZ</a>
          <a href="#medya" className="hover:text-[#12985a] transition-colors">MEDYA</a>
          <a href="#bagis-rehberi" className="hover:text-[#12985a] transition-colors">BAĞIŞ REHBERİ</a>
          <a href="#iletisim" className="hover:text-[#12985a] transition-colors">İLETİŞİM</a>
        </nav>
        <button className="inline-flex items-center rounded-full bg-[#103e6a] px-4 py-2 text-white hover:opacity-90">
          BAĞIŞ YAP
        </button>
      </div>
    </header>
  );
}
