// PMS 337 50% gradient band. To use a real photo instead, put it in /public
// (e.g. public/bar.jpg) and replace the gradient div with:
// <Image src="/bar.jpg" alt="Inside Mist" fill className="object-cover" />  (import Image from "next/image")
const ImageBand = () => {
    return (
        <section className="relative h-[60svh] overflow-hidden" aria-hidden="true">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,var(--mist-light),transparent_45%),radial-gradient(ellipse_at_85%_15%,#d6ebc4,transparent_40%),linear-gradient(135deg,var(--mist-accent),#c4e6cd_55%,var(--mist-accent))]" />
        </section>
    );
};

export default ImageBand;
