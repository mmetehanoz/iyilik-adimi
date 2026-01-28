import React from 'react';
import { useToast } from '../context/ToastContext';

export default function IbanModal({ isOpen, onClose }) {
    const showToast = useToast();
    if (!isOpen) return null;

    const bankDetails = {
        accountName: "İyilik Adımı Uluslarası İnsani Yardım Derneği",
        bank: "Vakıf Katılım",
        iban: "TR74 0021 0000 0012 7343 4000 02",
        note: "Ad - Soyad, Telefon No ve Bağış"
    };

    const handleCopy = (text, label) => {
        navigator.clipboard.writeText(text);
        showToast(`${label} kopyalandı!`, 'success');
    };

    const handleCopyAll = () => {
        const allText = `Hesap Adı: ${bankDetails.accountName}\nBanka: ${bankDetails.bank}\nIBAN: ${bankDetails.iban}\nNot: ${bankDetails.note}`;
        navigator.clipboard.writeText(allText);
        showToast("Tüm bilgiler kopyalandı!", 'success');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-2xl transition-all sm:p-8 animate-in fade-in zoom-in duration-200">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="text-center sm:text-left">
                    <h3 className="text-2xl font-bold leading-6 text-[#103e6a] mb-6">
                        Banka Hesap Bilgileri
                    </h3>

                    <div className="space-y-6">
                        {/* Account Name */}
                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 relative group hover:border-[#12985a]/30 transition-colors">
                            <div className="flex justify-between items-start mb-1">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">HESAP ADI</label>
                                <button
                                    onClick={() => handleCopy(bankDetails.accountName, "Hesap Adı")}
                                    className="bg-[#12985a] text-white text-xs px-3 py-1 rounded-full font-bold hover:bg-[#0e7a48] transition-colors shadow-sm"
                                >
                                    KOPYALA
                                </button>
                            </div>
                            <p className="font-semibold text-gray-800 pr-12">{bankDetails.accountName}</p>
                        </div>

                        {/* Bank Name */}
                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 relative group hover:border-[#12985a]/30 transition-colors">
                            <div className="flex justify-between items-start mb-1">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">BANKA</label>
                                <button
                                    onClick={() => handleCopy(bankDetails.bank, "Banka")}
                                    className="bg-[#12985a] text-white text-xs px-3 py-1 rounded-full font-bold hover:bg-[#0e7a48] transition-colors shadow-sm"
                                >
                                    KOPYALA
                                </button>
                            </div>
                            <p className="font-semibold text-gray-800">{bankDetails.bank}</p>
                        </div>

                        {/* IBAN */}
                        <div className="bg-[#12985a]/5 rounded-xl p-4 border border-[#12985a]/20 group hover:border-[#12985a] transition-colors relative overflow-hidden">
                            <div className="flex justify-between items-start mb-2">
                                <label className="text-xs font-bold text-[#12985a] uppercase tracking-wider">IBAN</label>
                                <button
                                    onClick={() => handleCopy(bankDetails.iban, "IBAN")}
                                    className="bg-[#12985a] text-white text-xs px-3 py-1 rounded-full font-bold hover:bg-[#0e7a48] transition-colors shadow-sm"
                                >
                                    KOPYALA
                                </button>
                            </div>
                            <p className="font-mono text-lg sm:text-xl font-bold text-gray-800 tracking-wide break-all">{bankDetails.iban}</p>
                        </div>

                        {/* Note */}
                        <div className="rounded-lg bg-orange-50 p-4 border border-orange-100">
                            <div className="flex items-start gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-orange-500 mt-0.5 shrink-0">
                                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                                </svg>
                                <div>
                                    <h4 className="text-sm font-bold text-gray-800">Önemli Not:</h4>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Açıklama kısmına <span className="font-semibold text-gray-900">"{bankDetails.note}"</span> yazılmalıdır.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Copy All Button */}
                        <button
                            onClick={handleCopyAll}
                            className="w-full flex justify-center items-center gap-2 rounded-xl bg-[#103e6a] p-4 text-white font-bold transition-all hover:bg-[#0d3257] hover:shadow-lg active:scale-[0.98]"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5" />
                            </svg>
                            TÜM BİLGİLERİ KOPYALA
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
