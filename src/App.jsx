import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Donations from './pages/Donations';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bagislar" element={<Donations />} />
      </Routes>
      <CartDrawer />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
