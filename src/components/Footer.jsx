import logo from '../assets/logo.png';

export default function Footer() {
    return (
        <footer id="iletisim" className="bg-gray-50 border-t border-gray-100 pt-16 pb-8">
            <div className="mx-auto max-w-7xl px-4 grid gap-12 lg:grid-cols-3 mb-16">
                {/* Brand & Legal */}
                <div className="space-y-6">
                    <img src={logo} alt="İyilik Adımı" className="h-20 w-auto" />
                    <p className="text-sm text-gray-600 leading-relaxed">
                        İyilik Adımı Uluslararası İnsani Yardım Derneği, düzenli aralıklarla resmi makamlarca denetlenmekte ve dernek bilgileri e-Devlet üzerinden kolayca sorgulanabilmektedir.
                    </p>
                    <div className="flex items-center gap-2 text-[#12985a] font-medium text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                        </svg>
                        Resmi Dernek Statüsü
                    </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-6">
                    <h3 className="text-[#103e6a] font-bold text-lg tracking-wide uppercase">İletişim Bilgileri</h3>
                    <div className="space-y-4">
                        <div className="flex gap-4 items-start">
                            <span className="text-2xl">🏢</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 text-sm">Dernek Merkezi</h4>
                                <p className="text-gray-600 text-sm mt-1">İyilik Adımı Uluslararası İnsani Yardım Derneği</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <span className="text-2xl">📍</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 text-sm">Adres</h4>
                                <p className="text-gray-600 text-sm mt-1">Yukarı Dudullu Mh. Alemdağ Cd.<br />No: 758 B - Ümraniye İstanbul</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <span className="text-2xl">📧</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 text-sm">E-posta</h4>
                                <a href="mailto:info@iyilikadimi.org.tr" className="text-gray-600 text-sm mt-1 hover:text-[#12985a] transition-colors">
                                    info@iyilikadimi.org.tr
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social Media */}
                <div className="space-y-6">
                    <h3 className="text-[#103e6a] font-bold text-lg tracking-wide uppercase">Bizi Takip Edin</h3>
                    <div className="grid grid-cols-3 gap-4">
                        <SocialLink href="https://www.facebook.com/iyilikadimitr" label="Facebook" color="hover:text-[#1877F2]">
                            <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                        </SocialLink>

                        <SocialLink href="https://www.instagram.com/iyilikadimitr" label="Instagram" color="hover:text-[#E4405F]">
                            <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069-3.204 0-3.584-.012-4.849-.069-3.225-.149-4.771-1.664-4.919-4.919-.058-1.265-.069-1.644-.069-4.849 0-3.204.012-3.584.069-4.849.149-3.225 1.664-4.771 4.919-4.919 1.266-.058 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.052.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                        </SocialLink>

                        <SocialLink href="https://x.com/iyilikadimitr" label="X (Twitter)" color="hover:text-black">
                            <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                        </SocialLink>

                        <SocialLink href="https://www.linkedin.com/company/iyilikadimitr/" label="LinkedIn" color="hover:text-[#0A66C2]">
                            <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                        </SocialLink>

                        <SocialLink href="https://www.youtube.com/@iyilikadimitr" label="YouTube" color="hover:text-[#FF0000]">
                            <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                        </SocialLink>

                        <SocialLink href="https://www.tiktok.com/@iyilikadimitr" label="TikTok" color="hover:text-black">
                            <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg>
                        </SocialLink>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-200">
                <div className="mx-auto max-w-7xl px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-gray-500">
                    <p>© 2025 Saye Medya & Babil Yazılım. Tüm hakları saklıdır.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-[#103e6a] transition-colors">Gizlilik Politikası</a>
                        <a href="#" className="hover:text-[#103e6a] transition-colors">Kullanım Şartları</a>
                        <a href="#" className="hover:text-[#103e6a] transition-colors">KVKK Aydınlatma Metni</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialLink({ href, children, label, color }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center bg-white border border-gray-200 shadow-sm rounded-xl h-12 w-12 text-gray-400 transition-all ${color} hover:shadow-md hover:scale-110`}
            aria-label={label}
        >
            {children}
        </a>
    );
}
