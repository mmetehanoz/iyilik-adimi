import { useState, useEffect } from 'react';
import { getKurbanAvailability } from '../services/api';

/**
 * Büyükbaş kurban hisse seçimi modali.
 * Props:
 *   donation      — donation objesi (id, title, max_shares, fixed_price, currency)
 *   isOpen        — boolean
 *   onClose       — () => void
 *   onConfirm     — (shareData) => void
 *     shareData = { requested_shares, amount, participants: [{ name, email }] }
 */
export default function KurbanShareModal({ donation, isOpen, onClose, onConfirm }) {
    const isSingleShare = (donation?.max_shares ?? 1) <= 1;
    const [shareCount, setShareCount]       = useState(isSingleShare ? 1 : 1);
    const [participants, setParticipants]   = useState([{ name: '', email: '' }]);
    const [availability, setAvailability]   = useState(null);
    const [loading, setLoading]             = useState(false);

    // Doluluk bilgisini çek
    useEffect(() => {
        if (isOpen && donation?.id) {
            setLoading(true);
            setAvailability(null);
            getKurbanAvailability(donation.id)
                .then(setAvailability)
                .finally(() => setLoading(false));
        }
    }, [isOpen, donation?.id]);

    // Hisse sayısı değişince participant listesini ayarla (çok hisseli için)
    useEffect(() => {
        if (isSingleShare) return;
        setParticipants(prev => {
            const next = Array(shareCount).fill(null).map((_, i) =>
                prev[i] ?? { name: '', email: '' }
            );
            return next;
        });
    }, [shareCount, isSingleShare]);

    if (!isOpen) return null;

    const maxAllowed = availability?.max_available_shares ?? donation?.max_shares ?? 7;
    const perSharePrice = parseFloat(availability?.per_share_price ?? donation?.price ?? 0) || 0;
    const totalPrice = parseFloat((shareCount * perSharePrice).toFixed(2));
    const currency = availability?.currency ?? 'TRY';
    const isPriceReady = !loading && perSharePrice > 0;

    const handleParticipantChange = (index, field, value) => {
        setParticipants(prev => {
            const next = [...prev];
            next[index] = { ...next[index], [field]: value };
            return next;
        });
    };

    const handleConfirm = () => {
        if (!isPriceReady) {
            alert('Fiyat bilgisi henüz yüklenmedi. Lütfen bekleyiniz.');
            return;
        }
        if (!totalPrice || totalPrice <= 0) {
            alert('Geçerli bir tutar hesaplanamadı. Lütfen sayfayı yenileyip tekrar deneyin.');
            return;
        }
        const emptyIndex = participants.findIndex(p => !p.name.trim());
        if (emptyIndex !== -1) {
            alert(`Lütfen ${emptyIndex + 1}. hisse için vekalet sahibi adını giriniz.`);
            return;
        }

        const invalidEmailIndex = participants.findIndex(p => {
            const email = p.email.trim();
            return !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        });
        if (invalidEmailIndex !== -1) {
            alert(`Lütfen ${invalidEmailIndex + 1}. hisse için geçerli bir e-posta adresi giriniz.`);
            return;
        }

        onConfirm({
            requested_shares: shareCount,
            amount: totalPrice,
            participants: participants.map(p => ({
                name: p.name.trim(),
                email: p.email.trim(),
            })),
        });
        onClose();
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                {/* Modal */}
                <div
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
                    onClick={e => e.stopPropagation()}
                >
                    {/* Başlık */}
                    <div className="flex items-center justify-between p-5 border-b">
                        <div>
                            <h2 className="text-lg font-bold text-[#103e6a]">Kurban Hisse Seçimi</h2>
                            <p className="text-sm text-gray-500 mt-0.5">{donation?.title}</p>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                            <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="p-5 space-y-5">
                        {/* Hisse Sayısı Seçici — sadece çok hisseli bağışlarda */}
                        {!isSingleShare && (
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Hisse Sayısı
                            </label>
                            <div className="flex gap-2 flex-wrap">
                                {Array.from({ length: maxAllowed }, (_, i) => i + 1).map(n => (
                                    <button
                                        key={n}
                                        onClick={() => setShareCount(n)}
                                        className={`w-10 h-10 rounded-lg font-semibold text-sm transition-colors
                                            ${shareCount === n
                                                ? 'bg-[#12985a] text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                    >
                                        {n}
                                    </button>
                                ))}
                            </div>
                            {availability && (
                                <p className="text-xs text-gray-400 mt-1">
                                    Şu an en fazla {maxAllowed} hisse alabilirsiniz.
                                </p>
                            )}
                        </div>
                        )}

                        {/* Vekalet Sahibi Adları */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Vekalet Sahipleri
                            </label>
                            <div className="space-y-3">
                                {participants.map((p, idx) => (
                                    <div key={idx} className="flex items-start gap-2">
                                        <span className="w-6 text-xs text-gray-400 text-right shrink-0 pt-2.5">
                                            {idx + 1}.
                                        </span>
                                        <div className="flex-1 flex flex-col gap-1.5">
                                            <input
                                                type="text"
                                                value={p.name}
                                                onChange={e => handleParticipantChange(idx, 'name', e.target.value)}
                                                placeholder={`${idx + 1}. hisse sahibinin adı soyadı`}
                                                className="border border-gray-300 rounded-lg px-3 py-2 text-sm
                                                           focus:outline-none focus:ring-2 focus:ring-[#12985a] focus:border-transparent"
                                            />
                                            <input
                                                type="email"
                                                value={p.email}
                                                onChange={e => handleParticipantChange(idx, 'email', e.target.value)}
                                                placeholder="E-posta adresi"
                                                className="border border-gray-300 rounded-lg px-3 py-2 text-sm
                                                           focus:outline-none focus:ring-2 focus:ring-[#12985a] focus:border-transparent"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Fiyat Özeti */}
                        <div className="bg-[#f0faf5] rounded-xl p-4">
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                                <span>Hisse Başı</span>
                                <span>{Number(perSharePrice).toLocaleString('tr-TR')} {currency}</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                                <span>Hisse Sayısı</span>
                                <span>{shareCount}</span>
                            </div>
                            <div className="border-t border-[#12985a]/20 my-2" />
                            <div className="flex justify-between font-bold text-[#103e6a]">
                                <span>Toplam</span>
                                <span>{Number(totalPrice).toLocaleString('tr-TR')} {currency}</span>
                            </div>
                        </div>
                    </div>

                    {/* Butonlar */}
                    <div className="flex gap-3 p-5 border-t">
                        <button
                            onClick={onClose}
                            className="flex-1 py-3 border border-gray-300 rounded-xl font-semibold text-gray-600
                                       hover:bg-gray-50 transition-colors"
                        >
                            İptal
                        </button>
                        <button
                            onClick={handleConfirm}
                            disabled={!isPriceReady}
                            className="flex-1 py-3 bg-[#12985a] text-white rounded-xl font-semibold
                                       hover:bg-[#0e7d49] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Yükleniyor...' : 'Sepete Ekle'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
