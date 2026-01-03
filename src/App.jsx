import Header from './components/Header';
import Hero from './components/Hero';
import Causes from './components/Causes';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <Hero />
      <Causes />
      <Footer />
    </div>
  );
}
