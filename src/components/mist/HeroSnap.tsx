"use client";

import { useEffect, useRef } from "react";

// Placed inside the hero: scrolling down while on the hero jumps straight to
// the next section. Everywhere else the page scrolls normally.
const HeroSnap = () => {
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const hero = ref.current?.closest("section");
        const next = hero?.nextElementSibling as HTMLElement | null;
        if (!hero || !next) return;

        let jumping = false;
        let touchY = 0;

        // True while the hero is still (mostly) on screen
        const onHero = () => window.scrollY < hero.offsetHeight / 2;

        const jump = (e: Event) => {
            e.preventDefault();
            if (jumping) return;
            jumping = true;
            next.scrollIntoView({ behavior: "smooth" });
            setTimeout(() => (jumping = false), 900);
        };

        const onWheel = (e: WheelEvent) => {
            if (e.deltaY > 0 && onHero()) jump(e);
        };
        const onTouchStart = (e: TouchEvent) => {
            touchY = e.touches[0].clientY;
        };
        const onTouchMove = (e: TouchEvent) => {
            if (touchY - e.touches[0].clientY > 10 && onHero()) jump(e);
        };

        window.addEventListener("wheel", onWheel, { passive: false });
        window.addEventListener("touchstart", onTouchStart, { passive: true });
        window.addEventListener("touchmove", onTouchMove, { passive: false });
        return () => {
            window.removeEventListener("wheel", onWheel);
            window.removeEventListener("touchstart", onTouchStart);
            window.removeEventListener("touchmove", onTouchMove);
        };
    }, []);

    return <span ref={ref} hidden />;
};

export default HeroSnap;
