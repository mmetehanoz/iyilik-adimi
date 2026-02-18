import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProjectDetail } from '../services/api';

export default function ProjectDetail() {
    const { slug } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjectDetail = async () => {
            try {
                setLoading(true);
                const data = await getProjectDetail(slug);
                setProject(data);
                document.title = `${data.title} - İyilik Adımı`;
            } catch (err) {
                console.error('Proje detayı yüklenirken hata:', err);
                setError('Proje bulunamadı veya yüklenirken bir hata oluştu.');
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchProjectDetail();
        }
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen pt-20 flex justify-center items-center">
                <div className="w-12 h-12 border-4 border-[#12985a] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="min-h-screen pt-20 flex flex-col justify-center items-center px-4 text-center">
                <div className="text-red-500 text-xl font-bold mb-4">{error}</div>
                <Link to="/" className="text-[#103e6a] hover:text-[#12985a] underline">
                    Ana Sayfaya Dön
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen pt-20">
            {/* Hero Section */}
            <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden">
                <img
                    src={project.featured_image || project.image || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1600&auto=format&fit=crop'}
                    alt={project.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                <div className="absolute bottom-0 inset-x-0 p-8 md:p-16 max-w-7xl mx-auto">
                    <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm font-medium mb-4">
                        {project.category && (
                            <span className="bg-[#12985a] px-3 py-1 rounded-full text-white uppercase tracking-wider text-xs font-bold">
                                {project.category}
                            </span>
                        )}

                        {project.location && (
                            <span className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {project.location}
                            </span>
                        )}

                        {(project.start_date || project.end_date) && (
                            <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {project.start_date} {project.end_date && `- ${project.end_date}`}
                            </span>
                        )}
                    </div>

                    <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight max-w-4xl">
                        {project.title}
                    </h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
                {/* Main Content */}
                <div className="lg:w-2/3">
                    {project.summary && (
                        <div className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed mb-10 border-l-4 border-[#12985a] pl-6 italic">
                            {project.summary}
                        </div>
                    )}

                    {project.description && (
                        <div
                            className="prose prose-lg max-w-none text-gray-700 mb-12"
                            dangerouslySetInnerHTML={{ __html: project.description }}
                        />
                    )}

                    {/* Content Blocks */}
                    {project.content_blocks && project.content_blocks.length > 0 && (
                        <div className="space-y-12">
                            {project.content_blocks.map((block) => (
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
                                                alt={block.image_caption || 'Proje görseli'}
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
                    {project.gallery_images && project.gallery_images.length > 0 && (
                        <div className="mt-16">
                            <h3 className="text-2xl font-bold text-[#103e6a] mb-6 flex items-center gap-2">
                                <span className="w-2 h-8 bg-[#12985a] rounded-full"></span>
                                Galeri
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {project.gallery_images.map((img) => (
                                    <div
                                        key={img.id}
                                        className="rounded-xl overflow-hidden shadow-md group border border-gray-100"
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
                </div>

                {/* Sidebar */}
                <div className="lg:w-1/3">
                    <div className="sticky top-32 space-y-6">
                        {/* Highlights Card */}
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                            <h4 className="text-lg font-bold text-[#103e6a] mb-4">Proje Bilgileri</h4>
                            <div className="space-y-4">
                                {project.beneficiaries_count > 0 && (
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-[#12985a]/10 flex items-center justify-center text-[#12985a]">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 110 8 4 4 0 010-8z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Yararlanıcı Sayısı</p>
                                            <p className="font-bold text-[#103e6a]">{project.beneficiaries_count.toLocaleString()}+ Kişi</p>
                                        </div>
                                    </div>
                                )}
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#12985a]/10 flex items-center justify-center text-[#12985a]">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Lokasyon</p>
                                        <p className="font-bold text-[#103e6a]">{project.location}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Support Card */}
                        <div className="bg-[#103e6a] rounded-2xl p-6 text-white text-center">
                            <h4 className="text-xl font-bold mb-2">Bu Projeye Destek Ol</h4>
                            <p className="text-white/80 text-sm mb-6">İyilik paylaştıkça çoğalır. Siz de bu hayra ortak olabilirsiniz.</p>
                            <Link
                                to="/bagislar"
                                className="block w-full py-3 bg-[#12985a] hover:bg-[#12985a]/90 text-white rounded-xl font-bold transition-all shadow-lg shadow-[#12985a]/20"
                            >
                                Hemen Bağış Yap
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
