import Header from "@/components/mist/Header";
import Hero from "@/components/mist/Hero";
import EventSection from "@/components/mist/EventSection";
import ImageBand from "@/components/mist/ImageBand";
import Intro from "@/components/mist/Intro";
import Menu from "@/components/mist/Menu";
import Footer from "@/components/mist/Footer";
import MistIntro from "@/components/mist/MistIntro";
import { getMenu } from "@/lib/menu-store";

export default async function Home() {
    const menu = await getMenu();

    return (
        <>
            <MistIntro />
            <Header />
            <main className="flex-1">
                <Hero />
                <EventSection />
                <ImageBand />
                <Intro />
                <Menu menu={menu} />
            </main>
            <Footer />
        </>
    );
}
