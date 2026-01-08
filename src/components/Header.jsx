import logo from '../assets/logo.png';

export default function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-30 bg-black/60 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Iyilik Adımı Logo" className="h-16 w-auto" />
        </div>
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-white/90">
          <a href="#" className="hover:text-white">ANASAYFA</a>
          <a href="#causes" className="hover:text-white">PROJELERİMİZ</a>
          <a href="#give" className="hover:text-white">BAĞIŞ</a>
          <a href="#about" className="hover:text-white">HAKKIMIZDA</a>
          <a href="#pages" className="hover:text-white">SAYFALAR</a>
          <a href="#shop" className="hover:text-white">MAĞAZA</a>
          <a href="#blog" className="hover:text-white">BLOG</a>
          <a href="#contact" className="hover:text-white">İLETİŞİM</a>
        </nav>
        <button className="inline-flex items-center rounded-full bg-emerald-500 px-4 py-2 text-white hover:bg-emerald-600">
          BAĞIŞ YAP
        </button>
      </div>
    </header>
  );
}
