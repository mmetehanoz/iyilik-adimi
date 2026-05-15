import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getDonations } from '../services/api';
import { getCategoryMeta } from '../utils/donationCategories';

export default function DonationCategoryShowcase() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const [rawCategories, rawDonations] = await Promise.all([
                    getCategories(),
                    getDonations()
                ]);

                const categoryList = Array.isArray(rawCategories) ? rawCategories : (rawCategories.results || []);
                const donationList = Array.isArray(rawDonations) ? rawDonations : (rawDonations.results || []);

                const items = categoryList
                    .map((category) => {
                        const donationCount = donationList.filter((donation) => donation.category_id === category.id).length;
                        return {
                            id: category.id,
                            name: category.name,
                            donationCount,
                            ...getCategoryMeta(category.name)
                        };
                    })
                    .filter((category) => category.donationCount > 0);

                setCategories(items);
            } catch (error) {
                console.error('Kategori vitrin alanı yuklenemedi:', error);
            }
        };

        fetchCategories();
    }, []);

    if (categories.length === 0) {
        return null;
    }

    return (
        <section className="border-b border-[#103e6a]/10 bg-[radial-gradient(circle_at_top,#e7f4ff_0%,#ffffff_55%)]">
            <div className="mx-auto max-w-7xl px-4 py-8 md:py-10">
                <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                    <div>
                        <span className="inline-flex rounded-full bg-[#103e6a]/8 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.28em] text-[#103e6a]">
                            Bağış Kategorileri
                        </span>
                        <h2 className="mt-3 text-2xl font-black tracking-tight text-[#103e6a] md:text-3xl">
                            Destek vermek istediğin alanı hemen seç
                        </h2>
                    </div>
                    <p className="max-w-2xl text-sm leading-6 text-[#103e6a]/72 md:text-right">
                        Hemen bağış alanından sonra en çok ziyaret edilen kategorileri tek bakışta gör ve ilgili bağış listesine doğrudan geç.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            to={`/bagislar?category=${category.id}`}
                            className={`group relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br ${category.surfaceClass} p-[1px] shadow-[0_16px_40px_rgba(16,62,106,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(16,62,106,0.2)]`}
                        >
                            <div className="flex h-full min-h-[136px] flex-col justify-between rounded-[calc(1.5rem-1px)] bg-white/92 p-4 backdrop-blur-sm md:min-h-[150px]">
                                <div className="flex items-start justify-between gap-3">
                                    <span className="text-3xl leading-none">{category.icon}</span>
                                    <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ${category.badgeClass}`}>
                                        {category.donationCount} Bagis
                                    </span>
                                </div>

                                <div>
                                    <h3 className="text-base font-black text-[#103e6a] md:text-lg">{category.name}</h3>
                                    <div className="mt-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-[#12985a] transition-transform duration-300 group-hover:translate-x-1">
                                        Kategoriye Git
                                        <span aria-hidden="true">→</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}