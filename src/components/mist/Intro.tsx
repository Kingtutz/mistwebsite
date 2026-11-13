import { intro } from "@/lib/mist";

const Intro = () => {
    return (
        <section className="bg-mist-bg px-4 py-32 text-center text-mist-text">
            <p className="mx-auto max-w-2xl font-display text-2xl leading-relaxed sm:text-3xl">
                {intro}
            </p>
            {/* <p className="mt-8 font-display text-2xl text-mist-accent">Welcome!</p> */}
        </section>
    );
};

export default Intro;
