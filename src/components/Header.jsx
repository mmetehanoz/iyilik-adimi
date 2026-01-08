import logo from '../assets/logo.png';

export default function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-30 bg-black/60 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Iyilik Adımı Logo" className="h-16 w-auto" />
        </div>
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-white/90">
          <a href="#" className="hover:text-[#12985a] transition-colors">ANASAYFA</a>
          <a href="#causes" className="hover:text-[#12985a] transition-colors">PROJELERİMİZ</a>
          <a href="#give" className="hover:text-[#12985a] transition-colors">BAĞIŞ</a>
          <a href="#about" className="hover:text-[#12985a] transition-colors">HAKKIMIZDA</a>
          <a href="#pages" className="hover:text-[#12985a] transition-colors">SAYFALAR</a>
          <a href="#shop" className="hover:text-[#12985a] transition-colors">MAĞAZA</a>
          <a href="#blog" className="hover:text-[#12985a] transition-colors">BLOG</a>
          <a href="#contact" className="hover:text-[#12985a] transition-colors">İLETİŞİM</a>
        </nav>
        <button className="inline-flex items-center rounded-full bg-[#103e6a] px-4 py-2 text-white hover:opacity-90">
          BAĞIŞ YAP
        </button>
      </div>
    </header>
  );
}
