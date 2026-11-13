import Header from "@/components/mist/Header";
import Hero from "@/components/mist/Hero";
import EventSection from "@/components/mist/EventSection";
import ImageBand from "@/components/mist/ImageBand";
import Intro from "@/components/mist/Intro";
import Menu from "@/components/mist/Menu";
import Footer from "@/components/mist/Footer";
import MistIntro from "@/components/mist/MistIntro";

export default function Home() {
    return (
        <>
            <MistIntro />
            <Header />
            <main className="flex-1">
                <Hero />
                <EventSection />
                <ImageBand />
                <Intro />
                <Menu />
            </main>
            <Footer />
        </>
    );
}
