"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
    const ringRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);
    const pos = useRef({ x: 0, y: 0 });
    const ringPos = useRef({ x: 0, y: 0 });
    const isTouch = useRef(false);

    useEffect(() => {
        // Detect touch device
        isTouch.current = "ontouchstart" in window;
        if (isTouch.current) return;

        const ring = ringRef.current;
        const dot = dotRef.current;
        if (!ring || !dot) return;

        const onMouse = (e: MouseEvent) => {
            pos.current = { x: e.clientX, y: e.clientY };
            dot.style.left = `${e.clientX}px`;
            dot.style.top = `${e.clientY}px`;
        };

        const onEnter = () => {
            ring.style.opacity = "1";
            dot.style.opacity = "1";
        };

        const onLeave = () => {
            ring.style.opacity = "0";
            dot.style.opacity = "0";
        };

        // Hover detection for interactive elements  
        const onOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.closest("a") ||
                target.closest("button") ||
                target.closest("[data-cursor-hover]") ||
                target.tagName === "A" ||
                target.tagName === "BUTTON"
            ) {
                ring.classList.add("hovering");
            }
        };

        const onOut = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.closest("a") ||
                target.closest("button") ||
                target.closest("[data-cursor-hover]") ||
                target.tagName === "A" ||
                target.tagName === "BUTTON"
            ) {
                ring.classList.remove("hovering");
            }
        };

        // Smooth ring follow with lerp
        let raf: number;
        const animate = () => {
            ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.15;
            ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.15;
            ring.style.left = `${ringPos.current.x}px`;
            ring.style.top = `${ringPos.current.y}px`;
            raf = requestAnimationFrame(animate);
        };
        raf = requestAnimationFrame(animate);

        window.addEventListener("mousemove", onMouse);
        document.addEventListener("mouseenter", onEnter);
        document.addEventListener("mouseleave", onLeave);
        document.addEventListener("mouseover", onOver);
        document.addEventListener("mouseout", onOut);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("mousemove", onMouse);
            document.removeEventListener("mouseenter", onEnter);
            document.removeEventListener("mouseleave", onLeave);
            document.removeEventListener("mouseover", onOver);
            document.removeEventListener("mouseout", onOut);
        };
    }, []);

    return (
        <>
            <div ref={ringRef} className="cursor-ring" style={{ opacity: 0 }} />
            <div ref={dotRef} className="cursor-dot" style={{ opacity: 0 }} />
        </>
    );
}
