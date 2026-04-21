import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import logo from '../assets/color-logo.png';
import { getPublicVideoByShortId, incrementPublicVideoView } from '../services/api';

function formatRecordingDate(value) {
    if (!value) {
        return '';
    }

    try {
        return new Intl.DateTimeFormat('tr-TR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).format(new Date(value));
    } catch {
        return '';
    }
}

function getHomePath(pathname) {
    return pathname.startsWith('/iyilik-adimi/') ? '/iyilik-adimi' : '/';
}

function toPlainText(value) {
    if (!value) {
        return '';
    }

    return value
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<\/p>/gi, '\n')
        .replace(/<[^>]+>/g, ' ')
        .replace(/&nbsp;/gi, ' ')
        .replace(/&amp;/gi, '&')
        .replace(/\n\s*\n/g, '\n')
        .replace(/[ \t]+/g, ' ')
        .trim();
}

function LoadingState({ homePath }) {
    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(18,152,90,0.18),_transparent_32%),linear-gradient(180deg,#f4efe7_0%,#f7fafc_46%,#eef7f3_100%)] px-4 py-8 text-slate-800">
            <div className="mx-auto max-w-md animate-pulse">
                <div className="rounded-[32px] border border-white/70 bg-white/80 p-6 shadow-[0_18px_60px_rgba(16,62,106,0.10)] backdrop-blur">
                    <div className="mb-8 flex justify-center">
                        <Link to={homePath} className="h-14 w-48 rounded-2xl bg-slate-200" aria-label="Ana sayfaya dön" />
                    </div>
                    <div className="mb-6 h-56 rounded-[28px] bg-slate-200" />
                    <div className="mx-auto mb-6 h-16 w-16 rounded-full bg-emerald-100" />
                    <div className="mx-auto mb-3 h-6 w-56 rounded-full bg-slate-200" />
                    <div className="mx-auto mb-2 h-5 w-44 rounded-full bg-slate-200" />
                    <div className="mx-auto mt-6 h-16 w-full rounded-[24px] bg-slate-100" />
                </div>
            </div>
        </div>
    );
}

function ErrorState({ message, homePath }) {
    return (
        <div className="min-h-screen bg-[linear-gradient(180deg,#f8f4ee_0%,#f3f8fb_100%)] px-4 py-10 text-slate-800">
            <div className="mx-auto max-w-lg rounded-[32px] border border-white/80 bg-white p-8 text-center shadow-[0_20px_70px_rgba(16,62,106,0.12)]">
                <Link to={homePath} className="mb-8 inline-flex justify-center" aria-label="Ana sayfaya dön">
                    <img src={logo} alt="İyilik Adımı" className="h-14 w-auto" />
                </Link>
                <div className="mx-auto mb-5 flex h-18 w-18 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                    <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86l-7.4 12.82A2 2 0 004.62 20h14.76a2 2 0 001.73-3.32l-7.38-12.82a2 2 0 00-3.46 0z" />
                    </svg>
                </div>
                <h1 className="mb-3 text-3xl font-black tracking-tight text-slate-900">Video şu an görüntülenemiyor</h1>
                <p className="mb-8 text-lg leading-8 text-slate-600">{message || 'Bağlantı geçersiz olabilir veya video henüz yayına alınmamış olabilir.'}</p>
                <Link
                    to={homePath}
                    className="inline-flex items-center justify-center rounded-full bg-[#103e6a] px-7 py-3 text-sm font-bold tracking-[0.16em] text-white uppercase transition hover:bg-[#0b3153]"
                >
                    Ana Sayfaya Git
                </Link>
            </div>
        </div>
    );
}

export default function PublicVideoView() {
    const { shortId } = useParams();
    const location = useLocation();
    const [videoData, setVideoData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [shareFeedback, setShareFeedback] = useState('');
    const [viewTracked, setViewTracked] = useState(false);
    const videoRef = useRef(null);
    const homePath = getHomePath(location.pathname);

    useEffect(() => {
        let isMounted = true;

        async function loadVideo() {
            setLoading(true);
            setError('');

            try {
                const data = await getPublicVideoByShortId(shortId);
                if (!isMounted) {
                    return;
                }
                setVideoData(data);
                document.title = `${data?.donation_title || 'Bağışınız'} Videosu - İyilik Adımı`;
                window.scrollTo(0, 0);
            } catch (loadError) {
                if (!isMounted) {
                    return;
                }
                setError(loadError?.response?.data?.error || 'Video bilgileri alınamadı.');
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        loadVideo();

        return () => {
            isMounted = false;
        };
    }, [shortId]);

    useEffect(() => {
        if (!shareFeedback) {
            return undefined;
        }

        const timer = window.setTimeout(() => setShareFeedback(''), 2400);
        return () => window.clearTimeout(timer);
    }, [shareFeedback]);

    const handleTrackView = async () => {
        if (viewTracked) {
            return;
        }

        setViewTracked(true);
        try {
            await incrementPublicVideoView(shortId);
        } catch {
            // Izlenme sayisi kritk degil; sayfa akisini bozma.
        }
    };

    const handleShare = async () => {
        const shareUrl = window.location.href;
        const shareTitle = videoData?.message_title || videoData?.title || 'Bağış videosu';

        try {
            if (navigator.share) {
                await navigator.share({
                    title: shareTitle,
                    text: videoData?.description || shareTitle,
                    url: shareUrl,
                });
                return;
            }

            await navigator.clipboard.writeText(shareUrl);
            setShareFeedback('Bağlantı panoya kopyalandı');
        } catch {
            setShareFeedback('Paylaşım açılamadı');
        }
    };

    if (loading) {
        return <LoadingState homePath={homePath} />;
    }

    if (error || !videoData) {
        return <ErrorState message={error} homePath={homePath} />;
    }

    const messageTitle = videoData.message_title || 'Bağışınız başarıyla ihtiyaç sahiplerine ulaştırıldı.';
    const recordingDate = formatRecordingDate(videoData.recording_date);
    const descriptionText = toPlainText(videoData.description) || `${videoData.donation_title || 'Bağışınız'} kapsamında hazırlanan bu kayıt, emanetinizin doğru yere ulaştığını göstermek için paylaşıldı.`;

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,62,106,0.16),_transparent_28%),radial-gradient(circle_at_bottom,_rgba(18,152,90,0.13),_transparent_30%),linear-gradient(180deg,#f7f1e8_0%,#fbfdff_40%,#eef7f2_100%)] px-4 py-5 text-slate-800 sm:px-6 sm:py-8">
            <div className="mx-auto max-w-xl">
                <div className="overflow-hidden rounded-[34px] border border-white/70 bg-white/85 shadow-[0_18px_70px_rgba(16,62,106,0.12)] backdrop-blur-sm">
                    <div className="relative border-b border-slate-100 bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(240,248,245,0.92))] px-6 pb-6 pt-7 sm:px-8">
                        <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[#12985a]/10 blur-3xl" />
                        <div className="absolute left-0 top-6 h-24 w-24 rounded-full bg-[#103e6a]/8 blur-3xl" />
                        <div className="relative z-10 flex justify-center">
                            <Link to={homePath} aria-label="İyilik Adımı ana sayfasına git" className="inline-flex transition hover:scale-[1.02]">
                                <img src={logo} alt="İyilik Adımı" className="h-14 w-auto sm:h-16" />
                            </Link>
                        </div>
                    </div>

                    <div className="px-5 pb-6 pt-5 sm:px-8 sm:pb-8">
                        <div className="relative overflow-hidden rounded-[28px] bg-slate-950 shadow-[0_18px_50px_rgba(15,23,42,0.28)]">
                            {videoData.video_url ? (
                                <video
                                    ref={videoRef}
                                    className="aspect-video w-full bg-black object-cover"
                                    controls
                                    playsInline
                                    preload="metadata"
                                    poster={videoData.thumbnail_url || undefined}
                                    onPlay={handleTrackView}
                                >
                                    <source src={videoData.video_url} type="video/mp4" />
                                    Tarayıcınız video oynatmayı desteklemiyor.
                                </video>
                            ) : (
                                <div className="flex aspect-video items-center justify-center bg-slate-900 text-center text-slate-300">
                                    Video dosyası şu anda kullanılamıyor.
                                </div>
                            )}
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent" />
                        </div>

                        <div className="mx-auto mt-4 flex w-fit items-center gap-3 rounded-full border border-white/80 bg-white px-4 py-2 shadow-lg shadow-slate-200/70">
                            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#12985a] text-white shadow-[0_8px_24px_rgba(18,152,90,0.28)]">
                                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </span>
                            <div className="text-left">
                                <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">İyilik ulaştı</div>
                                <div className="text-sm font-semibold text-slate-700">Bağış süreci başarıyla tamamlandı</div>
                            </div>
                        </div>

                        <div className="px-2 pt-7 text-center sm:px-6">
                            <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-900 sm:text-[2.85rem]">
                                {messageTitle}
                            </h1>
                            <p className="mt-4 text-xl font-semibold italic text-[#12985a] sm:text-2xl">
                                Allah kabul etsin.
                            </p>
                            <p className="mx-auto mt-6 max-w-lg whitespace-pre-line text-lg leading-8 text-slate-500 sm:text-[1.18rem]">
                                {descriptionText}
                            </p>
                        </div>

                        <div className="mt-8 grid gap-3 rounded-[28px] bg-[linear-gradient(135deg,#f8fbfd,#eef7f2)] p-4 sm:grid-cols-2 sm:gap-4 sm:p-5">
                            <div className="rounded-[22px] bg-white px-5 py-4 shadow-sm">
                                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Bağış Başlığı</div>
                                <div className="mt-2 text-lg font-bold text-slate-800">{videoData.donation_title || 'Bağış Videosu'}</div>
                            </div>
                            <div className="rounded-[22px] bg-white px-5 py-4 shadow-sm">
                                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Kayıt Tarihi</div>
                                <div className="mt-2 text-lg font-bold text-slate-800">{recordingDate || 'Paylaşıma hazır'}</div>
                            </div>
                        </div>

                        <div className="mt-8 grid gap-3 sm:grid-cols-2">
                            <a
                                href={videoData.video_url || '#'}
                                download
                                className={`inline-flex items-center justify-center gap-3 rounded-[22px] px-6 py-4 text-lg font-bold text-white shadow-[0_16px_36px_rgba(16,62,106,0.22)] transition ${videoData.video_url ? 'bg-[#103e6a] hover:bg-[#0c3255]' : 'pointer-events-none bg-slate-400'}`}
                            >
                                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l4-4m-4 4l-4-4M5 21h14" />
                                </svg>
                                İndir
                            </a>
                            <button
                                type="button"
                                onClick={handleShare}
                                className="inline-flex items-center justify-center gap-3 rounded-[22px] bg-[#e95f4d] px-6 py-4 text-lg font-bold text-white shadow-[0_16px_36px_rgba(233,95,77,0.24)] transition hover:bg-[#d74f3c]"
                            >
                                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.59 13.51L15.42 17.49M15.41 6.51L8.59 10.49M21 5a3 3 0 11-6 0 3 3 0 016 0zM9 12a3 3 0 11-6 0 3 3 0 016 0zM21 19a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Paylaş
                            </button>
                        </div>

                        <div className="mt-4 min-h-6 text-center text-sm font-medium text-[#103e6a]">
                            {shareFeedback}
                        </div>

                        <div className="mt-8 rounded-[24px] border border-dashed border-[#12985a]/25 bg-[#12985a]/5 px-5 py-4 text-center text-sm leading-7 text-slate-600 sm:text-[15px]">
                            Bu sayfa bağışçılar için özel olarak hazırlanmıştır. Linki açtığınızda video güvenli biçimde görüntülenir ve sadece onaylanmış kayıtlar yayınlanır.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}