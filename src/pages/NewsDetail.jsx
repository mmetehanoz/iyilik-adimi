import { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getNewsDetail } from '../services/api';


export default function NewsDetail() {
    const { slug } = useParams();
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lightbox, setLightbox] = useState(null); // { src, alt }

    const closeLightbox = useCallback(() => setLightbox(null), []);

    useEffect(() => {
        const handleKey = (e) => { if (e.key === 'Escape') closeLightbox(); };
        if (lightbox) document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [lightbox, closeLightbox]);

    useEffect(() => {
        const fetchNewsDetail = async () => {
            try {
                setLoading(true);
                const data = await getNewsDetail(slug);
                setNews(data);
                document.title = `${data.title} - İyilik Adımı`;
            } catch (err) {
                console.error('Haber detayı yüklenirken hata:', err);
                setError('Haber bulunamadı veya yüklenirken bir hata oluştu.');
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchNewsDetail();
        }
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen pt-20 flex justify-center items-center">
                <div className="w-12 h-12 border-4 border-[#12985a] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error || !news) {
        return (
            <div className="min-h-screen pt-20 flex flex-col justify-center items-center px-4 text-center">
                <div className="text-red-500 text-xl font-bold mb-4">{error}</div>
                <Link to="/medya/haberler" className="text-[#103e6a] hover:text-[#12985a] underline">
                    Haberlere Geri Dön
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen pt-20">
            {/* Hero Image */}
            <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden !cursor-default" style={{ cursor: 'default' }}>
                <img
                    src={news.featured_image || news.list_image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1600&auto=format&fit=crop'}
                    alt={news.title}
                    className="w-full h-full object-cover !pointer-events-none !select-none !cursor-default"
                    draggable="false"
                    style={{ cursor: 'default', pointerEvents: 'none' }}
                />
                <div
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent !pointer-events-none !cursor-default"
                    style={{ cursor: 'default', pointerEvents: 'none' }}
                ></div>
                <div className="absolute bottom-0 inset-x-0 p-8 md:p-16 max-w-7xl mx-auto">
                    <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm font-medium mb-4">
                        <span className="bg-[#12985a] px-3 py-1 rounded-full text-white">{news.category?.name || 'Haber'}</span>
                        <span className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {new Date(news.publish_date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                        {news.author && (
                            <span className="flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                {news.author}
                            </span>
                        )}
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight max-w-4xl">
                        {news.title}
                    </h1>
                </div>
            </div>

            {/* Content Container */}
            <div className="max-w-4xl mx-auto px-4 py-12">
                {/* Summary */}
                {news.summary && (
                    <div
                        className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed mb-10 border-l-4 border-[#12985a] pl-6 italic"
                        dangerouslySetInnerHTML={{ __html: news.summary }}
                    />
                )}

                {/* Main Content */}
                <div
                    className="prose prose-lg max-w-none text-gray-700 space-y-6"
                    dangerouslySetInnerHTML={{ __html: news.content }} // Assuming content is HTML, otherwise just {news.content}
                />

                {/* Content Blocks */}
                {news.content_blocks && news.content_blocks.length > 0 && (
                    <div className="mt-12 space-y-12">
                        {news.content_blocks.map((block) => (
                            <div key={block.id} className="w-full">
                                {block.block_type === 'text' && (
                                    <div
                                        className="prose prose-lg max-w-none text-gray-700"
                                        dangerouslySetInnerHTML={{ __html: block.content }}
                                    />
                                )}
                                {block.block_type === 'image' && block.image_url && (
                                    <figure className="text-center">
                                        <img
                                            src={block.image_url}
                                            alt={block.image_caption || 'Haber görseli'}
                                            className="rounded-xl shadow-lg w-full max-h-[600px] object-cover"
                                        />
                                        {block.image_caption && (
                                            <figcaption className="mt-3 text-sm text-gray-500 italic">
                                                {block.image_caption}
                                            </figcaption>
                                        )}
                                    </figure>
                                )}
                                {block.block_type === 'youtube' && block.youtube_embed_url && (
                                    <div className="rounded-xl overflow-hidden shadow-lg aspect-video">
                                        <iframe
                                            src={block.youtube_embed_url}
                                            title="Video"
                                            className="w-full h-full"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Gallery */}
                {news.gallery_images && news.gallery_images.length > 0 && (
                    <div className="mt-16">
                        <h3 className="text-2xl font-bold text-[#103e6a] mb-6 flex items-center gap-2">
                            <span className="w-2 h-8 bg-[#12985a] rounded-full"></span>
                            Galeri
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {news.gallery_images.map((img) => (
                                <div
                                    key={img.id}
                                    className="rounded-xl overflow-hidden shadow-md group border border-gray-100 cursor-zoom-in"
                                    onClick={() => setLightbox({ src: img.image_url, alt: img.caption || 'Galeri görseli' })}
                                >
                                    <img
                                        src={img.image_url}
                                        alt={img.caption || 'Galeri görseli'}
                                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    {img.caption && (
                                        <div className="p-2 text-center text-sm text-gray-500 bg-gray-50 italic">
                                            {img.caption}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Lightbox */}
                {lightbox && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                        onClick={closeLightbox}
                    >
                        <div
                            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={closeLightbox}
                                className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
                                aria-label="Kapat"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <img
                                src={lightbox.src}
                                alt={lightbox.alt}
                                className="max-h-[80vh] max-w-full rounded-xl shadow-2xl object-contain"
                            />
                            {lightbox.alt && lightbox.alt !== 'Galeri görseli' && (
                                <p className="mt-3 text-white/80 text-sm italic text-center">{lightbox.alt}</p>
                            )}
                        </div>
                    </div>
                )}

                {/* Tags */}
                {news.tags_list && news.tags_list.length > 0 && (
                    <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap gap-2">
                        {news.tags_list.map((tag, index) => (
                            <span key={index} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-md text-sm hover:bg-[#103e6a] hover:text-white transition-colors cursor-pointer">
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Share/Navigation */}
                <div className="mt-12 flex justify-between items-center">
                    <Link to="/medya/haberler" className="flex items-center gap-2 text-[#103e6a] font-bold hover:text-[#12985a] transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Tüm Haberlere Dön
                    </Link>
                </div>
            </div>
        </div>
    );
}
