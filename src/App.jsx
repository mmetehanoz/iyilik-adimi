import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
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
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Payment from './pages/Payment';
import ZekatCalculator from './pages/ZekatCalculator';
import Videos from './pages/Videos';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="font-sans antialiased text-gray-800">
          <ScrollToTop />
          <Header />
          <CartDrawer />

          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/bagislar" element={<Donations />} />
              <Route path="/hakkimizda" element={<About />} />
              <Route path="/rehber/zekat-nedir" element={<ZekatGuide />} />
              <Route path="/rehber/sadaka-nedir" element={<SadakaGuide />} />
              <Route path="/iletisim" element={<Contact />} />
              <Route path="/uyelik" element={<Auth />} />
              <Route path="/hesabim" element={<Dashboard />} />
              <Route path="/odeme" element={<Payment />} />
              <Route path="/zekat-hesaplama" element={<ZekatCalculator />} />
              <Route path="/medya/videolar" element={<Videos />} />
            </Routes>
          </main>

          <Footer />
          <WhatsAppButton />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
