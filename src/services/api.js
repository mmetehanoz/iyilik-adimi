import axios from 'axios';

// Axios instance oluşturma
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    // CSRF token ve auth cookie'leri için
    withCredentials: true,
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFToken',
});

// Request interceptor: Token ekle
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor: 401 hatasını yakala (Token yenileme için)
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refresh = localStorage.getItem('refresh_token');
            if (refresh) {
                try {
                    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/hesap/token/yenile/`, { refresh });
                    const { access } = response.data;
                    localStorage.setItem('access_token', access);
                    api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
                    return api(originalRequest);
                } catch (refreshError) {
                    // Refresh token da geçersizse çıkış yap
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                    localStorage.removeItem('user');
                    window.location.href = '/giris';
                }
            }
        }
        return Promise.reject(error);
    }
);

// API Fonksiyonları

// Bağışları Listele
export const getDonations = async (params) => {
    try {
        const response = await api.get('/bagislar/bagislar/', { params });
        return response.data;
    } catch (error) {
        console.error("Bağışlar yüklenirken hata oluştu:", error);
        throw error;
    }
};

// Kategorileri Listele
export const getCategories = async () => {
    try {
        const response = await api.get('/bagislar/kategoriler/');
        return response.data;
    } catch (error) {
        console.error("Kategoriler yüklenirken hata oluştu:", error);
        throw error;
    }
};

// Bağış Detayı (Slug ile)
export const getDonationDetail = async (slug) => {
    try {
        const response = await api.get(`/bagislar/bagislar/${slug}/`);
        return response.data;
    } catch (error) {
        console.error("Bağış detayı yüklenirken hata oluştu:", error);
        throw error;
    }
};

// Hızlı Bağış Ayarlarını Getir
export const getQuickDonationSettings = async () => {
    try {
        const response = await api.get('/icerik/hizli-bagis/');
        return response.data;
    } catch (error) {
        console.error("Hızlı bağış ayarları yüklenirken hata oluştu:", error);
        throw error;
    }
};

// Cin Ali Öğelerini Getir (Ülkeye göre)
export const getCinAliItems = async (country = 'african') => {
    try {
        const response = await api.get('/cin-ali/items/main/', { params: { country } });
        return response.data;
    } catch (error) {
        console.error("Cin Ali öğeleri yüklenirken hata oluştu:", error);
        throw error;
    }
};

// Haberleri Listele
export const getNews = async (params) => {
    try {
        const response = await api.get('/icerik/haberler/', { params });
        return response.data;
    } catch (error) {
        console.error("Haberler yüklenirken hata oluştu:", error);
        throw error;
    }
};

// Haber Detayı (Slug ile)
export const getNewsDetail = async (slug) => {
    try {
        const response = await api.get(`/icerik/haberler/${slug}/`);
        return response.data;
    } catch (error) {
        console.error("Haber detayı yüklenirken hata oluştu:", error);
        throw error;
    }
};

// Hikaye Detayı (Slug ile)
export const getStoryDetail = async (slug) => {
    try {
        const response = await api.get(`/icerik/hikayeler/${slug}/`);
        return response.data;
    } catch (error) {
        console.error("Hikaye detayı yüklenirken hata oluştu:", error);
        throw error;
    }
};

// Ana Sayfa Verilerini Getir
export const getHomepageData = async () => {
    try {
        const response = await api.get('/icerik/ana-sayfa/');
        return response.data;
    } catch (error) {
        console.error("Ana sayfa verileri yüklenirken hata oluştu:", error);
        throw error; // Hata fırlat ki çağıran yer handle edebilsin
    }
};

// Öne Çıkan Bağışları Getir (is_featured=true ve target_amount var)
export const getFeaturedDonations = async () => {
    try {
        const response = await api.get('/bagislar/bagislar/', {
            params: {
                is_featured: true,
                has_target: true  // Backend'de target_amount olan bağışları filtrele
            }
        });
        return response.data;
    } catch (error) {
        console.error("Öne çıkan bağışlar yüklenirken hata oluştu:", error);
        throw error;
    }
};


// Proje Menüsünü Getir
export const getProjectMenu = async () => {
    try {
        const response = await api.get('/bagislar/proje-menusu/');
        return response.data;
    } catch (error) {
        console.error("Proje menüsü yüklenirken hata oluştu:", error);
        throw error;
    }
};

export const getProjectDetail = async (slug) => {
    try {
        const response = await api.get(`/icerik/projeler/${slug}/`);
        return response.data;
    } catch (error) {
        console.error("Proje detayı yüklenirken hata oluştu:", error);
        throw error;
    }
};

// --- Sepet ve Bağış Başvurusu İşlemleri ---

// Bağış Başvurusu Oluştur (Sepete eklemeden önce)
export const createDonationSubmission = async (data) => {
    try {
        const response = await api.post('/bagislar/basvurular/', data);
        return response.data;
    } catch (error) {
        console.error("Bağış başvurusu oluşturulamadı:", error);
        console.error("🔴 ERROR RESPONSE DATA:", error.response?.data);
        throw error;
    }
};

// Sepeti Getir
export const getCart = async () => {
    try {
        const response = await api.get('/sepet/');
        return response.data;
    } catch (error) {
        // Eğer sepet boşsa veya oturum yeniyse 404 dönebilir, boş obje dönelim
        if (error.response && error.response.status === 404) {
            return { items: [], total_amount: 0, items_count: 0 };
        }
        console.error("Sepet yüklenirken hata oluştu:", error);
        throw error;
    }
};

// Sepete Ekle (Submission ID ile)
export const addToCart = async (submissionId) => {
    try {
        const response = await api.post('/sepet/ekle/', { donation_submission_id: submissionId });
        return response.data;
    } catch (error) {
        console.error("Sepete eklenirken hata oluştu:", error);
        throw error;
    }
};

// Cin Ali Sepete Ekle
export const addCinAliToCart = async (data) => {
    try {
        const response = await api.post('/sepet/ekle/', data);
        return response.data;
    } catch (error) {
        console.error("Cin Ali sepete eklenirken hata oluştu:", error);
        throw error;
    }
};

// Sepetten Çıkar
export const removeFromCart = async (itemId) => {
    try {
        const response = await api.post('/sepet/cikar/', { item_id: itemId });
        return response.data;
    } catch (error) {
        console.error("Sepetten çıkarılırken hata oluştu:", error);
        throw error;
    }
};

// Miktar Güncelle
export const updateCartItemQuantity = async (itemId, quantity) => {
    try {
        const response = await api.post('/sepet/miktar-guncelle/', { item_id: itemId, quantity });
        return response.data;
    } catch (error) {
        console.error("Miktar güncellenirken hata oluştu:", error);
        throw error;
    }
};

// Sepeti Temizle
export const clearCart = async () => {
    try {
        const response = await api.post('/sepet/temizle/');
        return response.data;
    } catch (error) {
        console.error("Sepet temizlenirken hata oluştu:", error);
        throw error;
    }
};

// --- Checkout ve Sipariş İşlemleri ---

// Sipariş Oluştur (Genel)
export const createOrder = async (orderData) => {
    try {
        const response = await api.post('/sepet/odeme/siparis-olustur/', orderData);
        return response.data;
    } catch (error) {
        console.error("Sipariş oluşturulamadı:", error);
        throw error;
    }
};

// Havale ile Sipariş
export const createBankTransferOrder = async (orderData) => {
    try {
        const response = await api.post('/sepet/odeme/havale/', orderData);
        return response.data;
    } catch (error) {
        console.error("Havale siparişi oluşturulamadı:", error);
        throw error;
    }
};

// Kredi Kartı (Payfor) ile Ödeme Başlat
export const paymentCheckout = async (checkoutData) => {
    try {
        const response = await api.post('/sepet/odeme/payfor/', checkoutData);
        return response.data; // { status: 'success', redirect_url: ..., html_content: ... }
    } catch (error) {
        console.error("Ödeme başlatılamadı:", error);
        throw error;
    }
};

// Backward compatibility alias
export const payforCheckout = paymentCheckout;

// TEST: Ödeme Adımını Atla (Sadece DEBUG modunda çalışır)
export const testCheckout = async (checkoutData) => {
    try {
        const response = await api.post('/bagislar/test-checkout-odeme-atla/', checkoutData);
        return response.data;
    } catch (error) {
        console.error("Test checkout hatası:", error);
        throw error;
    }
};

// --- Kimlik Doğrulama (Auth) İşlemleri ---

// Giriş Yap
export const login = async (email, password) => {
    try {
        const response = await api.post('/hesap/giris/', { email, password });
        return response.data; // Başarılıysa tokens döndürür veya creates_otp: true döner
    } catch (error) {
        console.error("Giriş yapılırken hata oluştu:", error);
        throw error;
    }
};

// Üye Ol
export const register = async (userData) => {
    try {
        const response = await api.post('/hesap/kayit/', userData);
        return response.data;
    } catch (error) {
        console.error("Üye olunurken hata oluştu:", error);
        throw error;
    }
};

// Çıkış Yap
export const logout = async (refreshToken) => {
    try {
        const response = await api.post('/hesap/cikis/', { refresh: refreshToken });
        return response.data;
    } catch (error) {
        console.error("Çıkış yapılırken hata oluştu:", error);
        throw error;
    }
};

// Token Yenile
export const refreshToken = async (refresh) => {
    try {
        const response = await api.post('/hesap/token/yenile/', { refresh });
        return response.data;
    } catch (error) {
        console.error("Token yenilenirken hata oluştu:", error);
        throw error;
    }
};

// OTP Gönder
export const sendOtp = async (phoneNumber) => {
    try {
        const response = await api.post('/hesap/otp/gonder/', { phone_number: phoneNumber });
        return response.data;
    } catch (error) {
        console.error("OTP gönderilirken hata oluştu:", error);
        throw error;
    }
};

// OTP Doğrula
export const verifyOtp = async (phoneNumber, otpCode) => {
    try {
        const response = await api.post('/hesap/otp/dogrula/', { phone_number: phoneNumber, otp_code: otpCode });
        return response.data;
    } catch (error) {
        console.error("OTP doğrulanırken hata oluştu:", error);
        throw error;
    }
};

// Şifre Değiştir
export const changePassword = async (passwords) => {
    try {
        const response = await api.post('/hesap/sifre-degistir/', passwords);
        return response.data;
    } catch (error) {
        console.error("Şifre değiştirilirken hata oluştu:", error);
        throw error;
    }
};

// Şifre Sıfırlama İsteği
export const requestPasswordReset = async (email) => {
    try {
        const response = await api.post('/hesap/sifre-sifirla/', { email });
        return response.data;
    } catch (error) {
        console.error("Şifre sıfırlama isteği gönderilirken hata oluştu:", error);
        throw error;
    }
};

// Şifre Sıfırlama Onayla
export const confirmPasswordReset = async (token, passwords) => {
    try {
        const response = await api.post(`/hesap/sifre-sifirla-onay/${token}/`, passwords);
        return response.data;
    } catch (error) {
        console.error("Şifre sıfırlama onaylanırken hata oluştu:", error);
        throw error;
    }
};

// Profil Bilgilerini Getir
export const getUserProfile = async () => {
    try {
        const response = await api.get('/hesap/profil/');
        return response.data;
    } catch (error) {
        console.error("Profil bilgileri yüklenirken hata oluştu:", error);
        throw error;
    }
};

// --- Dashboard ve Kullanıcı İşlemleri ---

// Dashboard Verilerini Getir
export const getUserDashboard = async () => {
    try {
        const response = await api.get('/hesap/panel/');
        return response.data; // { success: true, data: { ... } }
    } catch (error) {
        console.error("Dashboard verileri yüklenirken hata oluştu:", error);
        throw error;
    }
};

// Bağış Geçmişini Getir (Filtreleme ve Sayfalama ile)
export const getUserDonations = async (params) => {
    try {
        const response = await api.get('/hesap/panel/bagislar/', { params });
        return response.data; // { success: true, data: { donations: [], pagination: {} } }
    } catch (error) {
        console.error("Bağış geçmişi yüklenirken hata oluştu:", error);
        throw error;
    }
};

// Hızlı İstatistikleri Getir
export const getQuickStats = async () => {
    try {
        const response = await api.get('/hesap/panel/hizli-istatistikler/');
        return response.data;
    } catch (error) {
        console.error("Hızlı istatistikler yüklenirken hata oluştu:", error);
        throw error;
    }
};

// Son Aktiviteleri Getir
export const getRecentActivity = async (limit = 10) => {
    try {
        const response = await api.get('/hesap/panel/son-aktiviteler/', { params: { limit } });
        return response.data;
    } catch (error) {
        console.error("Son aktiviteler yüklenirken hata oluştu:", error);
        throw error;
    }
};

// Harita Verilerini Getir
export const getGlobalAidMapData = async () => {
    try {
        const response = await api.get('/core/map/world-data/');
        return response.data;
    } catch (error) {
        console.error("Harita verileri yüklenirken hata oluştu:", error);
        throw error;
    }
};

// Zekat Kurlarını Getir
export const getZakatRates = async () => {
    try {
        const response = await api.get('/bagislar/zekat-kurlari/');
        return response.data;
    } catch (error) {
        console.error("Zekat kurları yüklenirken hata oluştu:", error);
        throw error;
    }
};

// Global Sistem Ayarlarını Getir (Feature Flags vb.)
export const getGlobalSettings = async () => {
    try {
        const response = await api.get('/core/system-settings/');
        return response.data;
    } catch (error) {
        console.error("Global ayarlar yüklenirken hata oluştu:", error);
        return { enable_zakat_calculator: false }; // Hata durumunda varsayılan kapalı
    }
};

export default api;
