import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStories } from '../services/api';

export default function StoryList() {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState(null);

    const fetchStories = async (pageNum) => {
        try {
            setLoading(true);
            const data = await getStories({ page: pageNum, page_size: 9 }); // 9 items per page

            if (data.results) {
                if (pageNum === 1) {
                    setStories(data.results);
                } else {
                    setStories(prev => [...prev, ...data.results]);
                }
                setHasMore(!!data.next);
            } else {
                setHasMore(false);
            }
        } catch (err) {
            console.error('Hikayeler yüklenirken hata:', err);
            setError('Hikayeler yüklenemedi. Lütfen tekrar deneyin.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        document.title = 'Umut Hikayeleri - İyilik Adımı';
        fetchStories(1);
    }, []);

    const loadMore = () => {
        if (!loading && hasMore) {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchStories(nextPage);
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
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Umut Hikayeleri</h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Sizlerin desteğiyle hayatlarına dokunduğumuz, umut olduğumuz gerçek yaşam hikayeleri.
                    </p>
                </div>
            </div>

            {/* Stories Grid */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                {stories.length === 0 && !loading && !error ? (
                    <div className="text-center py-20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <h3 className="text-xl font-medium text-gray-500">Henüz hikaye eklenmemiş.</h3>
                        <p className="text-gray-400 mt-2">Lütfen daha sonra tekrar kontrol edin.</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {stories.map((item) => (
                            <Link
                                to={`/hikayeler/${item.slug}`}
                                key={item.id}
                                className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:border-[#12985a]/30 hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="relative h-60 overflow-hidden">
                                    <img
                                        src={item.image_url || item.image || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop'}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-[#12985a] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                                            {item.category || 'Hikaye'}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex items-center text-xs text-gray-400 mb-3 gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {item.location && <span>{item.location}</span>}
                                    </div>
                                    {item.date && (
                                        <div className="flex items-center text-xs text-gray-400 mb-3 gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span>{item.date}</span>
                                        </div>
                                    )}
                                    <h3 className="text-xl font-bold text-[#103e6a] mb-3 line-clamp-2 group-hover:text-[#12985a] transition-colors">
                                        {item.title}
                                    </h3>
                                    <div className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
                                        {item.summary}
                                    </div>
                                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between text-[#103e6a] text-sm font-semibold group-hover:text-[#12985a] transition-colors">
                                        <span>Hikayeyi Oku</span>
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
                {!loading && hasMore && stories.length > 0 && (
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
                            onClick={() => fetchStories(1)}
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
