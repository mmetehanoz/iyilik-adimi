import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function QuickDonation() {
    const [amount, setAmount] = useState('');
    const [donationType, setDonationType] = useState('genel');
    const { addToCart } = useCart();

    const handleAmountChange = (e) => {
        // Sadece rakamları al
        let value = e.target.value.replace(/\D/g, '');

        if (value) {
            // Türk Lirası formatına çevir (örn: 5.000)
            const formatted = new Intl.NumberFormat('tr-TR').format(value);
            // Sonuna ₺ ekle (kullanıcı silmek isterse son karakter kontrolü gerekebilir, basit tutuyoruz)
            setAmount(`${formatted} ₺`);
        } else {
            setAmount('');
        }
    };

    const handleDonate = () => {
        // Remove currency symbol and dots to get raw number
        const rawAmount = parseInt(amount.replace(/[^0-9]/g, ''));

        if (!rawAmount || rawAmount <= 0) {
            alert('Lütfen geçerli bir bağış tutarı giriniz.');
            return;
        }

        const donationLabels = {
            'genel': 'Genel Bağış',
            'kurban': 'Kurban Bağışı',
            'su_kuyusu': 'Su Kuyusu Bağışı',
            'egitim': 'Eğitim Yardımı',
            'sadaka': 'Sadaka'
        };

        const item = {
            id: `quick-${donationType}`,
            name: donationLabels[donationType] || 'Bağış',
            price: rawAmount,
            quantity: 1,
            selectedOption: 'Varsayılan', // Default option for compatibility
            image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=200&auto=format&fit=crop' // Generic image
        };

        addToCart(item);
        // Optional: Reset form or give feedback is handled by cart drawer opening
        setAmount('');
    };

    return (
        <div className="absolute -bottom-10 left-0 right-0 z-20">
            <div className="mx-auto max-w-7xl px-4">
                <div className="rounded-2xl bg-black/70 text-white backdrop-blur p-6 grid gap-4 md:grid-cols-3 border-2 border-[#12985a] shadow-[0_0_30px_rgba(18,152,90,0.3)]">
                    <div>
                        <label className="text-xs uppercase tracking-wide text-white/70">BAĞIŞ TÜRÜ</label>
                        <select
                            value={donationType}
                            onChange={(e) => setDonationType(e.target.value)}
                            className="mt-2 w-full rounded-md bg-white/10 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-[#12985a] [&>option]:text-black"
                        >
                            <option value="genel">Genel Bağış</option>
                            <option value="kurban">Kurban</option>
                            <option value="su_kuyusu">Su Kuyusu</option>
                            <option value="egitim">Eğitim Yardımı</option>
                            <option value="sadaka">Sadaka</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-xs uppercase tracking-wide text-white/70">BAĞIŞ TUTARI</label>
                        <input
                            type="text"
                            value={amount}
                            onChange={handleAmountChange}
                            className="mt-2 w-full rounded-md bg-white/10 px-4 py-3 placeholder-white/50 outline-none focus:ring-2 focus:ring-[#12985a]"
                            placeholder="Örn: 500 ₺"
                        />
                    </div>
                    <div className="flex items-end">
                        <button
                            onClick={handleDonate}
                            className="w-full rounded-full bg-[#103e6a] py-3 font-semibold text-white transition-all duration-300 animate-heartbeat hover:opacity-90 hover:scale-105 hover:shadow-[0_0_20px_rgba(16,62,106,0.5)] active:scale-95"
                        >
                            BAĞIŞ YAP
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
