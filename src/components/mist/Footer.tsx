import Image from "next/image";
import { bar } from "@/lib/mist";

const Footer = () => {
    return (
        <footer
            id="contact"
            className="scroll-mt-16 border-t border-mist-line bg-mist-bg px-4 py-24 text-center text-mist-text">
            <h2 className="flex justify-center">
                {/* brightness-0 + invert renders the gold logo white, matching the hero */}
                <Image
                    src="/mist-logo-gold.svg"
                    alt={bar.name}
                    width={116}
                    height={526}
                    className="h-28 w-auto brightness-0 invert"
                />
            </h2>

            <div className="mt-10 space-y-1 text-mist-muted">
                <p>{bar.address}</p>
                <a
                    href={`mailto:${bar.email}`}
                    className="block hover:text-mist-accent">
                    {bar.email}
                </a>
                <p>{bar.phone}</p>
            </div>

            <div className="mt-10 space-y-1">
                {bar.hours.map((row) => (
                    <p key={row.days}>
                        <span>{row.days}</span>
                        <span className="text-mist-muted"> · {row.time}</span>
                    </p>
                ))}
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm uppercase tracking-widest">
                <a
                    href={bar.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="border border-mist-accent px-6 py-3 text-mist-accent hover:bg-mist-accent cursor-pointer hover:text-mist-bg">
                    Instagram
                </a>
                <a
                    data-hash="aa5bfd25c6731e55ddc87b405d98883c"
                    className="waiteraid-widget border border-mist-accent px-6 py-3 text-mist-accent hover:bg-mist-accent cursor-pointer hover:text-mist-bg">
                    Book a table
                </a>
            </div>
        </footer>
    );
};

export default Footer;
