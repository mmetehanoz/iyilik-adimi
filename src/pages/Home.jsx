import Hero from '../components/Hero';
import Causes from '../components/Causes';
import Services from '../components/Services';
import Instagram from '../components/Instagram';
import Videos from '../components/Videos';
import WhatsAppButton from '../components/WhatsAppButton';

export default function Home() {
    return (
        <>
            <Hero />
            <Causes />
            <Videos />
            <Instagram />
            <Services />
            <WhatsAppButton />
        </>
    );
}
