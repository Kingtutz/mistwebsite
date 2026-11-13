"use client";

import { useEffect, useRef, useState } from "react";

// Smoke that fills the screen on load, then curls upward and clears.
// Tweak these to change the feel.
const PUFF_COUNT = 140; // more = thicker smoke
const DURATION = 4000; // ms until the smoke is fully gone
const HOLD = 0; // ms the smoke stays at full thickness before it starts clearing
const START_THICKNESS = 0.3; // 0–1, how see-through it starts (lower = thinner, logo shows through)

type Puff = {
    x: number;
    y: number;
    size: number;
    vx: number;
    vy: number;
    angle: number;
    spin: number;
    wobble: number;
    alpha: number;
};

// A soft, uneven blob of smoke, drawn once and reused for every puff.
function makePuffTexture(color: string) {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    for (let i = 0; i < 18; i++) {
        const r = size * (0.12 + Math.random() * 0.22);
        const x = size / 2 + (Math.random() - 0.5) * size * 0.4;
        const y = size / 2 + (Math.random() - 0.5) * size * 0.4;
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, color);
        g.addColorStop(1, "transparent");
        ctx.globalAlpha = 0.25;
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, size, size);
    }
    return canvas;
}

const MistIntro = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [done, setDone] = useState(false);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setDone(true);
            return;
        }

        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;
        const w = (canvas.width = window.innerWidth);
        const h = (canvas.height = window.innerHeight);

        const color = getComputedStyle(document.documentElement).getPropertyValue("--mist-fog").trim() || "#dfe4ec";
        const textures = [makePuffTexture(color), makePuffTexture(color), makePuffTexture(color)];

        const base = Math.max(w, h);
        const puffs: (Puff & { tex: HTMLCanvasElement })[] = Array.from({ length: PUFF_COUNT }, () => ({
            x: Math.random() * w,
            y: Math.random() * h * 1.2,
            size: base * (0.25 + Math.random() * 0.35),
            vx: (Math.random() - 0.5) * 0.4,
            vy: -(0.3 + Math.random() * 0.9),
            angle: Math.random() * Math.PI * 2,
            spin: (Math.random() - 0.5) * 0.004,
            wobble: Math.random() * Math.PI * 2,
            alpha: 0.5 + Math.random() * 0.5,
            tex: textures[Math.floor(Math.random() * textures.length)],
        }));

        const start = performance.now();
        let last = start;
        let frame = 0;

        const draw = (now: number) => {
            const elapsed = now - start;
            const dt = Math.min((now - last) / 16.7, 3);
            last = now;

            // Thick at first, then thins out smoothly to nothing.
            const t = Math.min(Math.max((elapsed - HOLD) / (DURATION - HOLD), 0), 1);
            const fade = START_THICKNESS * (1 - t * t * (3 - 2 * t));

            ctx.clearRect(0, 0, w, h);
            for (const p of puffs) {
                // Smoke speeds up as it clears, and curls sideways as it rises.
                const speed = 2 + t * 2;
                p.wobble += 0.01 * dt;
                p.x += (p.vx + Math.sin(p.wobble) * 0.6) * dt * speed;
                p.y += p.vy * dt * speed;
                p.angle += p.spin * dt;
                p.size *= 1 + 0.0015 * dt;

                ctx.save();
                ctx.globalAlpha = p.alpha * fade;
                ctx.translate(p.x, p.y);
                ctx.rotate(p.angle);
                ctx.drawImage(p.tex, -p.size / 2, -p.size / 2, p.size, p.size);
                ctx.restore();
            }

            if (elapsed < DURATION) {
                frame = requestAnimationFrame(draw);
            } else {
                setDone(true);
            }
        };
        frame = requestAnimationFrame(draw);

        return () => cancelAnimationFrame(frame);
    }, []);

    if (done) return null;

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[100] h-full w-full"
        />
    );
};

export default MistIntro;
