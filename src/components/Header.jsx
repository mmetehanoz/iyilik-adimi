import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import IbanModal from './IbanModal';
import { useCart } from '../context/CartContext';

export default function Header() {
  const [isIbanModalOpen, setIsIbanModalOpen] = useState(false);
  const { cartCount, toggleCart } = useCart();

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-30 bg-black/60 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <Link to="/">
              <img src={logo} alt="Iyilik Adımı Logo" className="h-16 w-auto" />
            </Link>
          </div>
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-white/90">
            <Link to="/" className="hover:text-[#12985a] transition-colors">ANASAYFA</Link>
            <Link to="/hakkimizda" className="hover:text-[#12985a] transition-colors">HAKKIMIZDA</Link>
            <a href="#projelerimiz" className="hover:text-[#12985a] transition-colors">PROJELERİMİZ</a>
            <a href="#medya" className="hover:text-[#12985a] transition-colors">MEDYA</a>
            <div className="relative group">
              <button className="hover:text-[#12985a] transition-colors py-4 flex items-center gap-1">
                BAĞIŞ REHBERİ
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-48 bg-white rounded-xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top border border-gray-100">
                <Link to="/rehber/zekat-nedir" className="block px-4 py-2 text-gray-700 hover:bg-[#12985a]/10 hover:text-[#12985a] transition-colors">Zekat Nedir?</Link>
                <Link to="/rehber/sadaka-nedir" className="block px-4 py-2 text-gray-700 hover:bg-[#12985a]/10 hover:text-[#12985a] transition-colors">Sadaka Nedir?</Link>
              </div>
            </div>

            <a href="#iletisim" className="hover:text-[#12985a] transition-colors">İLETİŞİM</a>
          </nav>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleCart}
              className="relative p-2 rounded-full hover:bg-white/10 transition-colors group mr-2"
              aria-label="Sepet"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white group-hover:text-[#12985a] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#12985a] text-xs font-bold text-white shadow-sm ring-2 ring-black">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsIbanModalOpen(true)}
              className="hidden sm:inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-bold text-[#103e6a] hover:bg-gray-100 transition-colors"
            >
              KOLAY IBAN
            </button>
            <Link to="/bagislar" className="inline-flex items-center rounded-full bg-[#103e6a] px-4 py-2 text-sm font-bold text-white hover:opacity-90">
              BAĞIŞ YAP
            </Link>
          </div>
        </div>
      </header>

      <IbanModal
        isOpen={isIbanModalOpen}
        onClose={() => setIsIbanModalOpen(false)}
      />
    </>
  );
}
