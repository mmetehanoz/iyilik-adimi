import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Causes from './components/Causes';
import Videos from './components/Videos';
import Instagram from './components/Instagram';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import WhatsAppButton from './components/WhatsAppButton';
// Pages
import Home from './pages/Home';
import Donations from './pages/Donations';
import About from './pages/About';
import DonationGuide from './pages/DonationGuide';

function App() {
  return (
    <div className="font-sans antialiased text-gray-800">
      <Header />
      <CartDrawer />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bagislar" element={<Donations />} />
          <Route path="/hakkimizda" element={<About />} />
          <Route path="/rehber/:type" element={<DonationGuide />} />
        </Routes>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
