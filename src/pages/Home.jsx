import Hero from '../components/Hero';
import GazzeSection from '../components/GazzeSection';
import Causes from '../components/Causes';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import CinAliDonation from '../components/CinAliDonation';
import Services from '../components/Services';
import Instagram from '../components/Instagram';
import ImpactMap from '../components/ImpactMap';
import Videos from '../components/Videos';
import WhatsAppButton from '../components/WhatsAppButton';
import ScrollToTopButton from '../components/ScrollToTopButton';
import LatestNews from '../components/LatestNews';
import HopeStories from '../components/HopeStories';
import HowToHelpSection from '../components/HowToHelpSection';
import BlogSection from '../components/BlogSection';

export default function Home() {
    return (
        <>
            <Hero />
            <GazzeSection />
            <Causes />
            <BeforeAfterSlider />
            <CinAliDonation />
            <Videos />
            <Instagram />
            <ImpactMap />
            <LatestNews />
            <HopeStories />
            <HowToHelpSection />
            <BlogSection/>
            <Services />
            <WhatsAppButton />
            <ScrollToTopButton />
        </>
    );
}
