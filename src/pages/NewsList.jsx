import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getNews } from '../services/api';

export default function NewsList() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState(null);

    const fetchNews = async (pageNum) => {
        try {
            setLoading(true);
            const data = await getNews({ page: pageNum, page_size: 9 }); // 9 items per page

            if (data.results) {
                if (pageNum === 1) {
                    setNews(data.results);
                } else {
                    setNews(prev => [...prev, ...data.results]);
                }
                setHasMore(!!data.next);
            } else {
                setHasMore(false);
            }
        } catch (err) {
            console.error('Haberler yüklenirken hata:', err);
            setError('Haberler yüklenemedi. Lütfen tekrar deneyin.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        document.title = 'Haberler - İyilik Adımı';
        fetchNews(1);
    }, []);

    const loadMore = () => {
        if (!loading && hasMore) {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchNews(nextPage);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen pt-20">
            {/* Hero Section */}
            <div className="relative py-24 bg-[#103e6a] text-white overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#12985a]/10 rounded-full blur-3xl"></div>
                <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-[#12985a]/10 rounded-full blur-3xl"></div>

                <div className="relative max-w-7xl mx-auto px-4 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-[#12985a]/20 border border-[#12985a]/50 text-[#12985a] font-bold text-sm mb-4 backdrop-blur-sm">
                        MEDYA MERKEZİ
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Bizden Haberler</h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Derneğimizin faaliyetleri, projelerimizden gelişmeler ve iyilik yolculuğumuzdan en son haberler.
                    </p>
                </div>
            </div>

            {/* News Grid */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                {news.length === 0 && !loading && !error ? (
                    <div className="text-center py-20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                        <h3 className="text-xl font-medium text-gray-500">Henüz haber eklenmemiş.</h3>
                        <p className="text-gray-400 mt-2">Lütfen daha sonra tekrar kontrol edin.</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {news.map((item) => (
                            <Link
                                to={`/medya/haberler/${item.slug}`}
                                key={item.id}
                                className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:border-[#12985a]/30 hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="relative h-60 overflow-hidden">
                                    <img
                                        src={item.list_image || item.featured_image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800&auto=format&fit=crop'}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-[#12985a] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                                            {item.category?.name || 'Haber'}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex items-center text-xs text-gray-400 mb-3 gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span>{new Date(item.publish_date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-[#103e6a] mb-3 line-clamp-2 group-hover:text-[#12985a] transition-colors">
                                        {item.title}
                                    </h3>
                                    <div
                                        className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow"
                                        dangerouslySetInnerHTML={{ __html: item.summary }}
                                    />
                                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between text-[#103e6a] text-sm font-semibold group-hover:text-[#12985a] transition-colors">
                                        <span>Devamını Oku</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center py-12">
                        <div className="w-10 h-10 border-4 border-[#12985a] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}

                {/* Load More Button */}
                {!loading && hasMore && news.length > 0 && (
                    <div className="mt-12 text-center">
                        <button
                            onClick={loadMore}
                            className="inline-flex items-center gap-2 rounded-full border-2 border-[#103e6a] px-8 py-3 text-sm font-bold text-[#103e6a] transition-all hover:bg-[#103e6a] hover:text-white"
                        >
                            DAHA FAZLA YÜKLE
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="text-center py-12">
                        <p className="text-red-500 mb-4">{error}</p>
                        <button
                            onClick={() => fetchNews(1)}
                            className="text-[#103e6a] underline hover:text-[#12985a]"
                        >
                            Tekrar Dene
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
