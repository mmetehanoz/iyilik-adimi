import Header from './components/Header';
import Hero from './components/Hero';
import Causes from './components/Causes';
import Services from './components/Services';
import Instagram from './components/Instagram';
import Videos from './components/Videos';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <Hero />
      <Causes />
      <Videos />
      <Instagram />
      <Services />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
