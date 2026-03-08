"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import GradientDivider from "@/components/GradientDivider";

const problems = [
    {
        text: "gpus are literally melting right now. they hit thermal limits way before peak performance.",
        solved: "thermal intelligence & cooling protocols.",
        number: "01",
    },
    {
        text: "the public grid is way too weak to handle this. it cant support the energy needed to train AGI.",
        solved: "micro-grids & localized energy generation.",
        number: "02",
    },
    {
        text: "we lose over 10% of power just transmitting it through the grid. thats terawatts wasted.",
        solved: "on-site nuclear SMRs (no transmission loss).",
        number: "03",
    },
];

export default function ProblemSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

    return (
        <section className="section-spacing relative" id="problem">
            {/* Subtle red/orange glow that shifts to teal on interaction */}
            <div
                className="absolute inset-0 pointer-events-none transition-all duration-1000"
                style={{
                    background:
                        hoveredIdx !== null
                            ? "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(57,255,207,0.04), transparent 70%)"
                            : "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(249,115,22,0.03), transparent 70%)",
                }}
            />

            {/* Top gradient divider */}
            <GradientDivider className="absolute top-0 left-0 right-0" />

            <div className="section-container" ref={ref}>
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                    animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 md:mb-20"
                >
                    <span className="block text-[11px] tracking-[0.3em] uppercase text-[var(--gradient-orange)] mb-6">
                        the ai power wall
                    </span>
                    <h2 className="text-gradient-dim">gpu heat & grid limits</h2>
                </motion.div>

                {/* Problems — with animated strikethrough and solution reveal */}
                <div className="max-w-2xl mx-auto space-y-2 px-4">
                    {problems.map((problem, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                            transition={{
                                delay: 0.3 + i * 0.15,
                                duration: 0.7,
                                ease: [0.25, 0.46, 0.45, 0.94],
                            }}
                            className="relative text-center py-10 group cursor-default"
                            onMouseEnter={() => setHoveredIdx(i)}
                            onMouseLeave={() => setHoveredIdx(null)}
                        >
                            {/* Watermark number */}
                            <span className="watermark left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 group-hover:text-white/[0.03] transition-colors duration-700">
                                {problem.number}
                            </span>

                            {/* Icon — ❌ to ✓ */}
                            <div className="flex justify-center mb-4">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 group-hover:bg-[var(--accent-dim)] group-hover:shadow-[0_0_20px_rgba(57,255,207,0.1)]">
                                    <span className="text-sm group-hover:hidden text-[var(--gradient-orange)]/60">✕</span>
                                    <span className="text-sm hidden group-hover:inline text-[var(--accent)]">✓</span>
                                </div>
                            </div>

                            {/* Problem text with strikethrough on hover */}
                            <p className="relative z-10 text-lg md:text-xl lg:text-2xl font-light text-[var(--fg-muted)] leading-relaxed transition-all duration-500 mx-auto max-w-lg text-center px-4 group-hover:text-[var(--fg-subtle)]">
                                <span className="relative">
                                    {problem.text}
                                    {/* Animated strikethrough line */}
                                    <span className="absolute left-0 top-1/2 w-0 h-[1.5px] bg-[var(--gradient-orange)]/40 group-hover:w-full transition-all duration-700 ease-out" />
                                </span>
                            </p>

                            {/* Solution text — reveals on hover */}
                            <motion.p
                                className="mt-3 text-sm text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 tracking-wide"
                            >
                                {problem.solved}
                            </motion.p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
