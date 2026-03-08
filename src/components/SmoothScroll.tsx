"use client";

import { useEffect } from "react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        let lenis: unknown = null;
        let raf: number;

        async function init() {
            try {
                const Lenis = (await import("lenis")).default;
                lenis = new Lenis({
                    duration: 1.2,
                    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                    touchMultiplier: 2,
                });

                function animate(time: number) {
                    (lenis as any)?.raf(time);
                    raf = requestAnimationFrame(animate);
                }
                raf = requestAnimationFrame(animate);
            } catch {
                // lenis not installed — CSS smooth-scroll fallback is already active via html { scroll-behavior: smooth }
            }
        }

        init();

        return () => {
            if (raf) cancelAnimationFrame(raf);
            (lenis as any)?.destroy();
        };
    }, []);

    return <>{children}</>;
}
