import Image from "next/image";

// Decorative photo band.
const ImageBand = () => {
    return (
        <section className="relative h-[60svh] overflow-hidden" aria-hidden="true">
            <Image src="/lamp-ai.png" alt="" fill sizes="100vw" className="object-cover" />
        </section>
    );
};

export default ImageBand;
