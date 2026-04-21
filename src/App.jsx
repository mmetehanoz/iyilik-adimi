import { Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';
// Pages
import Home from './pages/Home';
import Donations from './pages/Donations';
import About from './pages/About';
import ZekatGuide from './pages/ZekatGuide';
import SadakaGuide from './pages/SadakaGuide';
import KurbanGuide from './pages/KurbanGuide';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Payment from './pages/Payment';
import ZekatCalculator from './pages/ZekatCalculator';
import Videos from './pages/Videos';
import Activation from './pages/Activation';
import NewsList from './pages/NewsList';
import NewsDetail from './pages/NewsDetail';
import StoryList from './pages/StoryList';
import StoryDetail from './pages/StoryDetail';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailed from './pages/PaymentFailed';
import DuyurPage from './pages/DuyuPages';
import LegalPage from './pages/LegalPage';

import ProjectDetail from './pages/ProjectDetail';
import PublicVideoView from './pages/PublicVideoView';

function App() {
  const location = useLocation();
  const normalizedPath = location.pathname.replace(/\/+$/, '');
  const isPublicVideoRoute = /^\/(?:iyilik-adimi\/)?v\//.test(normalizedPath + '/');

  return (
    <AuthProvider>
      <ToastProvider>
        <CartProvider>
          <div className="font-sans antialiased text-gray-800 overflow-x-hidden">
            <ScrollToTop />
            {!isPublicVideoRoute && <Header />}
            {!isPublicVideoRoute && <CartDrawer />}

            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/iyilik-adimi" element={<Home />} />
                <Route path="/bagislar" element={<Donations />} />
                <Route path="/hakkimizda" element={<About />} />
                <Route path="/rehber/zekat-nedir" element={<ZekatGuide />} />
                <Route path="/rehber/sadaka-nedir" element={<SadakaGuide />} />
                <Route path="/rehber/kurban-nedir" element={<KurbanGuide />} />
                <Route path="/iletisim" element={<Contact />} />
                <Route path="/uyelik" element={<Auth />} />
                <Route path="/hesabim" element={<Dashboard />} />
                <Route path="/hesap/aktiflestir/basarili" element={<Activation />} />
                <Route path="/hesap/aktiflestir/hata" element={<Activation />} />
                <Route path="/odeme" element={<Payment />} />
                <Route path="/odeme/basarili" element={<PaymentSuccess />} />
                <Route path="/odeme/basarisiz" element={<PaymentFailed />} />
                <Route path="/zekat-hesaplama" element={<ZekatCalculator />} />
                <Route path="/medya/videolar" element={<Videos />} />
                <Route path="/medya/haberler" element={<NewsList />} />
                <Route path="/medya/haberler/:slug" element={<NewsDetail />} />
                <Route path="/medya/hikayeler" element={<StoryList />} />
                <Route path="/hikayeler/:slug" element={<StoryDetail />} />
                <Route path="/projeler/:slug" element={<ProjectDetail />} />
                <Route path="/duyur" element={<DuyurPage />} />
                <Route path="/yasal/:slug" element={<LegalPage />} />
                <Route path="/v/:shortId" element={<PublicVideoView />} />
                <Route path="/iyilik-adimi/v/:shortId" element={<PublicVideoView />} />
              </Routes>
            </main>

            {!isPublicVideoRoute && <Footer />}
            {!isPublicVideoRoute && <WhatsAppButton />}
          </div>
        </CartProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
