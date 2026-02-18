import Hero from '../components/Hero';
import Causes from '../components/Causes';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import CinAliDonation from '../components/CinAliDonation';
import Services from '../components/Services';
import Instagram from '../components/Instagram';
import ImpactMap from '../components/ImpactMap';
import Videos from '../components/Videos';
import WhatsAppButton from '../components/WhatsAppButton';
import LatestNews from '../components/LatestNews';
import HopeStories from '../components/HopeStories';

export default function Home() {
    return (
        <>
            <Hero />
            <Causes />
            <BeforeAfterSlider />
            <CinAliDonation />
            <Videos />
            <Instagram />
            <ImpactMap />
            <LatestNews />
            <HopeStories />
            <Services />
            <WhatsAppButton />
        </>
    );
}
