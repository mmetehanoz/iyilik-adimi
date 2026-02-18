import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import IbanModal from './IbanModal';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { getProjectMenu, getGlobalSettings } from '../services/api';

export default function Header() {
  const [isIbanModalOpen, setIsIbanModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount, toggleCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [projectMenuItems, setProjectMenuItems] = useState([]);
  const [menuMode, setMenuMode] = useState('hierarchical'); // 'hierarchical' or 'category_only'
  const [zakatEnabled, setZakatEnabled] = useState(false);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const [menuData, settingsData] = await Promise.all([
          getProjectMenu(),
          getGlobalSettings()
        ]);

        if (menuData.success) {
          setProjectMenuItems(menuData.menu_items);
          if (menuData.mode) setMenuMode(menuData.mode);
        }

        if (settingsData) {
          setZakatEnabled(settingsData.enable_zakat_calculator ?? false);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchMenu();
  }, []);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-30 bg-black/60 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2 shrink-0">
            <Link to="/">
              <img src={logo} alt="Iyilik Adımı Logo" className="h-16 w-auto object-contain" />
            </Link>
          </div>

          {/* Separator */}
          <div className="hidden lg:block text-white/30 text-3xl font-thin mx-4 pb-2">|</div>

          <nav className="hidden lg:flex items-center gap-6 text-sm font-bold text-white/90 whitespace-nowrap">
            <Link to="/" className="hover:text-[#12985a] transition-colors">ANASAYFA</Link>
            <Link to="/hakkimizda" className="hover:text-[#12985a] transition-colors">HAKKIMIZDA</Link>

            <div className="relative group">
              <button className="hover:text-[#12985a] transition-colors py-4 flex items-center gap-1 uppercase">
                PROJELERİMİZ
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-white rounded-xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top border border-gray-100 max-h-[70vh] overflow-y-auto custom-scrollbar">
                {projectMenuItems.length > 0 ? (
                  <>
                    {projectMenuItems.map((category) => (
                      <div key={category.id} className="relative group/sub">
                        {menuMode === 'hierarchical' ? (
                          <div className="flex items-center justify-between px-4 py-3 text-left text-gray-700 hover:bg-[#12985a]/10 hover:text-[#12985a] transition-all border-b border-gray-50 last:border-0 cursor-default">
                            <span className="font-bold text-sm uppercase">{category.name}</span>
                            <svg className="w-4 h-4 text-gray-400 group-hover/sub:text-[#12985a] transform group-hover/sub:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        ) : (
                          <Link
                            to={`/projeler/${category.project_slug}`}
                            className="block px-4 py-3 text-left text-gray-700 hover:bg-[#12985a]/10 hover:text-[#12985a] transition-all border-b border-gray-50 last:border-0"
                          >
                            <span className="font-bold text-sm uppercase">{category.name}</span>
                            <div className="text-[10px] text-gray-400 mt-0.5 truncate">{category.summary}</div>
                          </Link>
                        )}

                        {/* Sub-menu (Donations) */}
                        {menuMode === 'hierarchical' && (
                          <div className="absolute top-0 left-full ml-1 w-64 bg-white rounded-xl shadow-2xl py-2 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-300 transform origin-left-top border border-gray-100 z-50">
                            <div className="px-4 py-2 border-b border-gray-50 mb-1">
                              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{category.name} BAĞIŞLARI</span>
                            </div>
                            <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                              {category.donations?.map((donation) => (
                                <Link
                                  key={donation.id}
                                  to={donation.project_slug ? `/projeler/${donation.project_slug}` : `/bagislar/${donation.slug}`}
                                  className="block px-4 py-2.5 text-xs text-gray-600 hover:bg-[#12985a]/5 hover:text-[#12985a] transition-colors"
                                >
                                  {donation.title}
                                  {donation.price_display && (
                                    <span className="block text-[9px] text-gray-400 mt-0.5">{donation.price_display}</span>
                                  )}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    <div className="p-2 mt-1">
                      <Link to="/bagislar" className="block text-center py-2 bg-[#103e6a] text-white rounded-lg text-xs font-bold hover:bg-[#103e6a]/90 transition-colors">
                        TÜMÜNÜ GÖR
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className="px-4 py-3 text-sm text-gray-400 italic">Yükleniyor...</div>
                )}
              </div>
            </div>

            <div className="relative group">
              <button className="hover:text-[#12985a] transition-colors py-4 flex items-center gap-1">
                MEDYA
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-48 bg-white rounded-xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top border border-gray-100">
                <Link to="/medya/videolar" className="block px-4 py-2 text-gray-700 hover:bg-[#12985a]/10 hover:text-[#12985a] transition-colors">Videolar</Link>
                <Link to="/medya/haberler" className="block px-4 py-2 text-gray-700 hover:bg-[#12985a]/10 hover:text-[#12985a] transition-colors">Haberler</Link>
                {/* Future media items can go here */}
              </div>
            </div>

            <div className="relative group">
              <button className="hover:text-[#12985a] transition-colors py-4 flex items-center gap-1">
                BAĞIŞ REHBERİ
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-48 bg-white rounded-xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top border border-gray-100">
                {zakatEnabled && (
                  <Link to="/zekat-hesaplama" className="block px-4 py-2 text-gray-700 hover:bg-[#12985a]/10 hover:text-[#12985a] transition-colors">Zekat Hesaplama</Link>
                )}
                <Link to="/rehber/zekat-nedir" className="block px-4 py-2 text-gray-700 hover:bg-[#12985a]/10 hover:text-[#12985a] transition-colors">Zekat Nedir?</Link>
                <Link to="/rehber/sadaka-nedir" className="block px-4 py-2 text-gray-700 hover:bg-[#12985a]/10 hover:text-[#12985a] transition-colors">Sadaka Nedir?</Link>
              </div>
            </div>

            <Link to="/iletisim" className="hover:text-[#12985a] transition-colors">İLETİŞİM</Link>
          </nav>

          {/* Separator */}
          <div className="hidden lg:block text-white/30 text-3xl font-thin mx-4 pb-2">|</div>

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
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#12985a] text-xs font-bold text-white shadow-sm ring-2 ring-black animate-heartbeat">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsIbanModalOpen(true)}
              className="hidden sm:inline-flex items-center justify-center rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[#103e6a] hover:bg-gray-100 transition-colors btn-animate-loop w-32 relative"
            >
              <span className="btn-icon absolute left-2.5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                </svg>
              </span>
              <span className="btn-text pl-5">KOLAY IBAN</span>
            </button>
            {isAuthenticated ? (
              <Link to="/hesabim" className="hidden lg:inline-flex items-center justify-center rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white hover:bg-white/20 transition-colors mr-2 btn-animate-loop w-32 relative">
                <span className="btn-icon absolute left-2.5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                </span>
                <span className="btn-text pl-5">HESABIM</span>
              </Link>
            ) : (
              <Link to="/uyelik" className="hidden lg:inline-flex items-center justify-center rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white hover:bg-white/20 transition-colors mr-2 btn-animate-loop w-32 relative">
                <span className="btn-icon absolute left-2.5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                </span>
                <span className="btn-text pl-5">ÜYE GİRİŞİ</span>
              </Link>
            )}
            <Link to="/bagislar" className="inline-flex items-center justify-center rounded-full bg-[#103e6a] px-3 py-1.5 text-xs font-bold text-white hover:opacity-90 btn-animate-loop w-32 relative">
              <span className="btn-icon absolute left-2.5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
              </span>
              <span className="btn-text pl-5">BAĞIŞ YAP</span>
            </Link>
          </div>
          <button
            className="lg:hidden p-2 text-white hover:text-[#12985a] transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-xl transition-transform duration-300 lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-end mb-8">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-white hover:text-[#12985a] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col gap-6 text-xl font-medium text-white text-center">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#12985a]">ANASAYFA</Link>
            <Link to="/hakkimizda" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#12985a]">HAKKIMIZDA</Link>

            <div className="py-2 border-y border-white/10 flex flex-col gap-4 text-center">
              <span className="text-white/60 text-sm font-bold uppercase tracking-wider">PROJELERİMİZ</span>
              <div className="grid grid-cols-1 gap-3 max-h-[50vh] overflow-y-auto px-4 custom-scrollbar">
                {projectMenuItems.map((category) => (
                  <div key={category.id} className="flex flex-col gap-2 bg-white/5 rounded-xl p-3">
                    <Link
                      to={menuMode === 'hierarchical' ? `/bagislar?category=${category.id}` : `/projeler/${category.project_slug}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-white hover:text-[#12985a] text-base font-bold flex items-center justify-between uppercase"
                    >
                      <span>{category.name}</span>
                      <svg className="w-4 h-4 text-[#12985a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </Link>
                    {menuMode === 'hierarchical' && (
                      <div className="flex flex-col gap-2 pl-2 border-l border-[#12985a]/30 mt-1 pb-1">
                        {category.donations?.map((donation) => (
                          <Link
                            key={donation.id}
                            to={donation.project_slug ? `/projeler/${donation.project_slug}` : `/bagislar/${donation.slug}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-gray-400 hover:text-[#12985a] text-sm text-left flex justify-between items-center"
                          >
                            <span className="truncate pr-2">{donation.title}</span>
                            {donation.price_display && <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded shrink-0">{donation.price_display}</span>}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="mt-2 pb-4">
                  <Link
                    to="/bagislar"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="inline-block w-full text-center py-3 border border-[#12985a] text-[#12985a] rounded-xl text-sm font-bold hover:bg-[#12985a] hover:text-white transition-all"
                  >
                    TÜMÜNÜ GÖR →
                  </Link>
                </div>
              </div>
            </div>

            <div className="py-2 border-y border-white/10 flex flex-col gap-4">
              <span className="text-white/60 text-sm font-bold uppercase tracking-wider">MEDYA</span>
              <Link to="/medya/videolar" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-[#12985a] text-lg">Videolar</Link>
              <Link to="/medya/haberler" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-[#12985a] text-lg">Haberler</Link>
            </div>

            <div className="py-2 border-b border-white/10 flex flex-col gap-4">
              {zakatEnabled && (
                <Link to="/zekat-hesaplama" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-[#12985a] text-lg">Zekat Hesaplama</Link>
              )}
              <Link to="/rehber/zekat-nedir" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-[#12985a] text-lg">Zekat Nedir?</Link>
              <Link to="/rehber/sadaka-nedir" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-[#12985a] text-lg">Sadaka Nedir?</Link>
            </div>

            <Link to="/iletisim" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#12985a]">İLETİŞİM</Link>

            <div className="mt-4 flex flex-col gap-4">
              <button
                onClick={() => {
                  setIsIbanModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full rounded-full bg-white py-3 text-[#103e6a] font-bold"
              >
                KOLAY IBAN
              </button>

              {isAuthenticated ? (
                <Link
                  to="/hesabim"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full rounded-full bg-white/10 py-3 text-white font-bold"
                >
                  HESABIM
                </Link>
              ) : (
                <Link
                  to="/uyelik"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full rounded-full bg-white/10 py-3 text-white font-bold"
                >
                  ÜYE GİRİŞİ
                </Link>
              )}
            </div>
          </nav>
        </div>
      </div>

      <IbanModal
        isOpen={isIbanModalOpen}
        onClose={() => setIsIbanModalOpen(false)}
      />
    </>
  );
}
