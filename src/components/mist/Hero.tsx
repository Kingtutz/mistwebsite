import Image from "next/image";
import { bar } from "@/lib/mist";

const Hero = () => {
    return (
        <section className="flex min-h-svh flex-col items-center justify-center bg-mist-bg px-4 pt-20 pb-10 text-center text-mist-text">
            <h1>
                <Image
                    src="/mist-logo-gold.svg"
                    alt={bar.name}
                    width={116}
                    height={526}
                    loading="eager"
                    fetchPriority="high"
                    className="h-[55svh] w-auto"
                />
            </h1>
            <p className="mt-10 font-display text-xl uppercase tracking-[0.5em] text-mist-muted sm:text-2xl">
                {bar.tagline}
            </p>
        </section>
    );
};

export default Hero;
