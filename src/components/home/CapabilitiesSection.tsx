"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const capabilities = [
    {
        title: "standard gpu: pure brute force",
        description:
            "traditional models rely on thousands of gpus just crunching numbers linearly. its mad expensive, power-hungry, and constantly battles thermal throttling.",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="4" width="6" height="6" rx="1" />
                <rect x="14" y="4" width="6" height="6" rx="1" />
                <rect x="4" y="14" width="6" height="6" rx="1" />
                <rect x="14" y="14" width="6" height="6" rx="1" />
                <line x1="10" y1="7" x2="14" y2="7" />
                <line x1="7" y1="10" x2="7" y2="14" />
            </svg>
        ),
    },
    {
        title: "standard gpu: thermal wall",
        description:
            "beyond a certain point, adding more chips just gives diminishing returns. the real issue isnt lack of compute, its the inability to actually cool the silicon.",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
                <line x1="14" y1="4" x2="10" y2="20" />
            </svg>
        ),
    },
    {
        title: "quantum-hybrid: math offload",
        description:
            "by offloading the super complex combinatorial math to quantum cores, we relieve the classical gpu array of its most intensive, heat-generating tasks.",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
            </svg>
        ),
    },
    {
        title: "quantum-hybrid: zero bottleneck",
        description:
            "this targeted offloading drops overall heat output by like 30%, which unlocks higher clock speeds on classical chips and actually accelerates the path to AGI.",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
        ),
    },
];

export default function CapabilitiesSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.15 });

    return (
        <section
            className="section-spacing relative overflow-hidden"
            ref={ref}
            id="capabilities"
        >
            {/* Background */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: "url('/agents-bg.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    opacity: 0.35,
                    transform: "scaleX(-1) scale(1.15)",
                }}
            />
            <div
                className="absolute inset-0 z-[1] pointer-events-none"
                style={{
                    background:
                        "linear-gradient(to bottom, black 0%, transparent 30%, transparent 70%, black 100%)",
                }}
            />

            <div className="section-container relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                    animate={
                        isInView
                            ? { opacity: 1, y: 0, filter: "blur(0px)" }
                            : {}
                    }
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 md:mb-20"
                >
                    <span className="block text-[11px] tracking-[0.3em] uppercase text-white/30 mb-5 font-medium">
                        the compute layer
                    </span>
                    <h2 className="font-semibold mb-4">
                        standard gpu tasks vs
                        <br className="hidden sm:block" /> quantum-offloaded math
                    </h2>
                </motion.div>

                {/* 2×2 card grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] max-w-4xl mx-auto rounded-2xl overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.04)" }}
                >
                    {capabilities.map((cap, i) => (
                        <motion.div
                            key={cap.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={
                                isInView ? { opacity: 1, y: 0 } : {}
                            }
                            transition={{
                                delay: 0.15 + i * 0.1,
                                duration: 0.5,
                                ease: [0.25, 0.46, 0.45, 0.94],
                            }}
                            className="group relative p-8 md:p-10 bg-black hover:bg-white/[0.02] transition-colors duration-500"
                        >
                            {/* Icon */}
                            <div
                                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 text-white/40 group-hover:text-white/70 transition-all duration-500 group-hover:scale-110"
                                style={{
                                    background:
                                        "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                                    border: "1px solid rgba(255,255,255,0.06)",
                                }}
                            >
                                {cap.icon}
                            </div>

                            <h3 className="text-[16px] font-semibold mb-3 text-white/80 group-hover:text-white transition-colors duration-300">
                                {cap.title}
                            </h3>
                            <p className="text-[13px] text-white/25 leading-[1.7] group-hover:text-white/40 transition-colors duration-300">
                                {cap.description}
                            </p>

                            {/* Subtle hover glow */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                                style={{
                                    background:
                                        "radial-gradient(ellipse at top left, rgba(255,255,255,0.02) 0%, transparent 70%)",
                                }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
