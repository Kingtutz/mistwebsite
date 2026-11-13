import type { Metadata } from "next";
import { Cormorant_Garamond, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
    variable: "--font-cormorant",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
    title: "Mist — Cocktail Bar",
    description: "Mist is a cocktail bar. Drinks, snacks and late nights.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html
            lang="sv"
            className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} h-full antialiased scroll-smooth`}>
            <body className="min-h-full flex flex-col">{children}</body>
        </html>
    );
}
