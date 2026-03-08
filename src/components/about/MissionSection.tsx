"use client";

import { motion } from "framer-motion";

export default function MissionSection() {
    return (
        <section className="relative min-h-[80dvh] flex items-center justify-center hero-glow overflow-hidden">
            <div className="orb orb-teal w-[500px] h-[400px] top-[-10%] left-[30%]" style={{ opacity: 0.05 }} />

            <div
                className="floating-orb opacity-25"
                style={{
                    width: 500, height: 500,
                    top: "0%", left: "30%",
                    background: "radial-gradient(circle, rgba(57,255,207,0.06), transparent 70%)",
                }}
            />

            <div className="section-container relative z-10 text-center">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.2, delayChildren: 0.5 } },
                    }}
                >
                    <motion.h1
                        variants={{
                            hidden: { opacity: 0, filter: "blur(20px)", y: 30 },
                            visible: {
                                opacity: 1, filter: "blur(0px)", y: 0,
                                transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] },
                            },
                        }}
                        className="mb-8"
                    >
                        <span className="text-gradient-dim">Software should </span>
                        <span className="text-gradient-accent">build itself.</span>
                    </motion.h1>

                    <motion.p
                        variants={{
                            hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
                            visible: {
                                opacity: 1, y: 0, filter: "blur(0px)",
                                transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
                            },
                        }}
                        className="text-lg md:text-xl text-[var(--fg-muted)] max-w-lg mx-auto leading-relaxed font-light"
                    >
                        We&apos;re building the future where describing what you want is enough.{" "}
                        <span className="text-white/70">Architecture, code, tests, deployment — all handled by AI agents.</span>
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
}
