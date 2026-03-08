"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
    x: number;
    y: number;
    z: number;
    vx: number;
    vy: number;
    vz: number;
    radius: number;
    baseAlpha: number;
    alpha: number;
    pulseOffset: number;
    color: string;
}

export default function NodeViz() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animRef = useRef<number>(0);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const isVisibleRef = useRef(true);
    const prefersReducedMotion = useRef(false);
    const timeRef = useRef(0);

    const PARTICLE_COUNT = 80;
    const MAX_DISTANCE = 180;
    const MOUSE_RADIUS = 250;
    const DEPTH = 400;

    const initParticles = useCallback((width: number, height: number) => {
        const particles: Particle[] = [];
        const colors = [
            "255, 255, 255",        // white
            "57, 255, 207",         // accent
            "57, 255, 207",         // accent
            "255, 255, 255",        // white
            "200, 200, 200",        // light gray
        ];

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                z: Math.random() * DEPTH,
                vx: (Math.random() - 0.5) * 0.25,
                vy: (Math.random() - 0.5) * 0.25,
                vz: (Math.random() - 0.5) * 0.15,
                radius: Math.random() * 2 + 0.5,
                baseAlpha: Math.random() * 0.25 + 0.08,
                alpha: 0,
                pulseOffset: Math.random() * Math.PI * 2,
                color: colors[Math.floor(Math.random() * colors.length)],
            });
        }
        particlesRef.current = particles;
    }, []);

    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        prefersReducedMotion.current = mq.matches;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);
            if (particlesRef.current.length === 0) {
                initParticles(rect.width, rect.height);
            }
        };

        resize();
        window.addEventListener("resize", resize);

        const observer = new IntersectionObserver(
            ([entry]) => { isVisibleRef.current = entry.isIntersecting; },
            { threshold: 0 }
        );
        observer.observe(canvas);

        const onMouse = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        };
        window.addEventListener("mousemove", onMouse);

        const animate = () => {
            if (!isVisibleRef.current || prefersReducedMotion.current) {
                animRef.current = requestAnimationFrame(animate);
                return;
            }

            timeRef.current += 0.008;
            const rect = canvas.getBoundingClientRect();
            const w = rect.width;
            const h = rect.height;
            ctx.clearRect(0, 0, w, h);

            const particles = particlesRef.current;
            const mouse = mouseRef.current;

            // Update & project particles
            const projected: { px: number; py: number; scale: number; idx: number; alpha: number }[] = [];

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.z += p.vz;

                // Wrap
                if (p.x < -50) p.x = w + 50;
                if (p.x > w + 50) p.x = -50;
                if (p.y < -50) p.y = h + 50;
                if (p.y > h + 50) p.y = -50;
                if (p.z < 0) p.z = DEPTH;
                if (p.z > DEPTH) p.z = 0;

                // 3D perspective projection
                const perspective = 600 / (600 + p.z);
                const px = (p.x - w / 2) * perspective + w / 2;
                const py = (p.y - h / 2) * perspective + h / 2;

                // Pulse
                const pulse = Math.sin(timeRef.current * 2.5 + p.pulseOffset) * 0.12;
                let alpha = (p.baseAlpha + pulse) * perspective;

                // Mouse proximity
                const mdx = px - mouse.x;
                const mdy = py - mouse.y;
                const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
                if (mDist < MOUSE_RADIUS) {
                    const boost = 1 - mDist / MOUSE_RADIUS;
                    alpha = Math.min(1, alpha + boost * 0.5);
                    // Repel slightly
                    p.x += mdx * 0.003;
                    p.y += mdy * 0.003;
                }

                p.alpha = alpha;
                projected.push({ px, py, scale: perspective, idx: i, alpha });
            }

            // Sort by z-depth (far to near)
            projected.sort((a, b) => a.scale - b.scale);

            // Draw edges
            for (let i = 0; i < projected.length; i++) {
                for (let j = i + 1; j < projected.length; j++) {
                    const a = projected[i];
                    const b = projected[j];
                    const dx = a.px - b.px;
                    const dy = a.py - b.py;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < MAX_DISTANCE * Math.min(a.scale, b.scale) * 1.5) {
                        const edgeAlpha = (1 - dist / (MAX_DISTANCE * 1.5)) * Math.min(a.alpha, b.alpha) * 0.4;
                        if (edgeAlpha > 0.005) {
                            ctx.beginPath();
                            ctx.moveTo(a.px, a.py);
                            ctx.lineTo(b.px, b.py);
                            ctx.strokeStyle = `rgba(57, 255, 207, ${edgeAlpha * 0.3})`;
                            ctx.lineWidth = 0.5 * Math.min(a.scale, b.scale);
                            ctx.stroke();
                        }
                    }
                }
            }

            // Draw particles
            for (const proj of projected) {
                const p = particles[proj.idx];
                const r = p.radius * proj.scale;

                // Main dot
                ctx.beginPath();
                ctx.arc(proj.px, proj.py, r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${p.color}, ${proj.alpha})`;
                ctx.fill();

                // Glow for bright particles
                if (proj.alpha > 0.25) {
                    const glowR = r * 6;
                    const gradient = ctx.createRadialGradient(
                        proj.px, proj.py, 0,
                        proj.px, proj.py, glowR
                    );
                    gradient.addColorStop(0, `rgba(57, 255, 207, ${proj.alpha * 0.12})`);
                    gradient.addColorStop(0.5, `rgba(57, 255, 207, ${proj.alpha * 0.04})`);
                    gradient.addColorStop(1, "rgba(57, 255, 207, 0)");
                    ctx.beginPath();
                    ctx.arc(proj.px, proj.py, glowR, 0, Math.PI * 2);
                    ctx.fillStyle = gradient;
                    ctx.fill();
                }
            }

            animRef.current = requestAnimationFrame(animate);
        };

        animRef.current = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animRef.current);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMouse);
            observer.disconnect();
        };
    }, [initParticles]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ opacity: 0.7 }}
            aria-hidden="true"
        />
    );
}
