import Image from "next/image";
import { bar } from "@/lib/mist";
import HeroSnap from "./HeroSnap";

const Hero = () => {
    return (
        <section className="flex min-h-svh flex-col items-center justify-center bg-mist-bg px-4 pt-20 pb-10 text-center text-mist-text">
            <h1 className="relative">
                <Image
                    src="/mist-logo-gold.svg"
                    alt={bar.name}
                    width={116}
                    height={526}
                    loading="eager"
                    fetchPriority="high"
                    className="h-[15svh] w-auto"
                />
                {/* White tint masked to the logo's shape, so only the logo is tinted */}
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-white"
                    style={{
                        maskImage: "url(/mist-logo-gold.svg)",
                        maskSize: "contain",
                        maskRepeat: "no-repeat",
                        maskPosition: "center",
                    }}
                />
            </h1>
            <p className="mt-10 font-display text-sm uppercase tracking-[0.5em] text-mist-muted sm:text-base">
                {bar.tagline}
            </p>
            <HeroSnap />
        </section>
    );
};

export default Hero;
