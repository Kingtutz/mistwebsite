import { bar } from "@/lib/mist";

const Footer = () => {
    return (
        <footer
            id="contact"
            className="scroll-mt-16 border-t border-mist-line bg-mist-bg px-4 py-24 text-center text-mist-text">
            <h2 className="font-display text-4xl uppercase tracking-[0.3em]">{bar.name}</h2>

            <div className="mt-10 space-y-1 text-mist-muted">
                <p>{bar.address}</p>
                <a href={`mailto:${bar.email}`} className="block hover:text-mist-accent">
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
                <a href={bar.instagram} target="_blank" rel="noreferrer" className="hover:text-mist-accent">
                    Instagram
                </a>
                <a
                    href={`mailto:${bar.email}?subject=Booking`}
                    className="border border-mist-accent px-6 py-3 text-mist-accent hover:bg-mist-accent hover:text-mist-bg">
                    Book a table
                </a>
            </div>
        </footer>
    );
};

export default Footer;
