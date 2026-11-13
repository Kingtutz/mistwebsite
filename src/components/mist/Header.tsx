import Link from "next/link";
import { bar } from "@/lib/mist";

const links = [
    { href: "#menu", label: "Cocktails" },
    { href: "#event", label: "Events" },
    { href: "#contact", label: "Contact" },
];

const Header = () => {
    return (
        <header className="fixed inset-x-0 top-0 z-50 bg-mist-bg/80 backdrop-blur-sm">
            <div className="mx-auto flex justify-between sm:grid sm:grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 py-4 text-xs uppercase tracking-widest text-mist-text sm:px-8">
                <span className="hidden truncate normal-case tracking-normal sm:block">
                    {bar.address}
                </span>
                <Link href="/" className="font-display text-lg tracking-[0.3em] sm:hidden">
                    {bar.name}
                </Link>
                <nav className="hidden gap-6 sm:flex">
                    {links.map((link) => (
                        <a key={link.href} href={link.href} className="hover:text-mist-accent">
                            {link.label}
                        </a>
                    ))}
                </nav>
                <a href={bar.bookingUrl} className="justify-self-end hover:text-mist-accent">
                    Book a table
                </a>
            </div>
        </header>
    );
};

export default Header;
