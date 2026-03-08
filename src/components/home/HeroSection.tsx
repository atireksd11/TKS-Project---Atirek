"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
    return (
        <section className="relative h-[100dvh] flex items-center justify-center overflow-hidden">
            {/* ─── Background: chrome sphere ─── */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    initial={{ scale: 1.08, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-[120%] absolute -top-[15%]"
                    style={{
                        backgroundImage: "url('/hero-bg.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center center",
                        backgroundRepeat: "no-repeat",
                    }}
                />
            </div>

            {/* ─── Bottom fade ─── */}
            <div className="absolute inset-x-0 bottom-0 h-[30vh] z-[1] pointer-events-none bg-gradient-to-t from-black via-black/70 to-transparent" />

            {/* ─── Content — vertically centered ─── */}
            <div className="relative z-10 text-center px-6 pb-12">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: {},
                        visible: {
                            transition: { staggerChildren: 0.1, delayChildren: 0.4 },
                        },
                    }}
                >
                    {/* Headline */}
                    <motion.h1
                        variants={{
                            hidden: { opacity: 0, y: 30, filter: "blur(12px)" },
                            visible: {
                                opacity: 1,
                                y: 0,
                                filter: "blur(0px)",
                                transition: {
                                    duration: 1,
                                    ease: [0.22, 1, 0.36, 1],
                                },
                            },
                        }}
                        className="leading-[0.92] tracking-[-0.04em] mb-4"
                        style={{
                            fontFamily: "var(--font-heading)",
                            fontWeight: 700,
                            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                        }}
                    >
                        <span className="gradient-heading">
                            Scaling AGI through thermal
                        </span>
                        <br />
                        <span
                            style={{
                                background:
                                    "linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.3) 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            intelligence & nuclear SMRs
                        </span>
                    </motion.h1>

                    {/* One-liner */}
                    <motion.p
                        variants={{
                            hidden: { opacity: 0, y: 15 },
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: { duration: 0.7 },
                            },
                        }}
                        className="text-[14px] md:text-[15px] text-white/35 font-light mb-8 text-center mx-auto"
                    >
                        a 14 year old&apos;s blueprint to solve the microsoft <span className="font-bold">energy crisis</span>
                    </motion.p>

                    {/* CTA */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 15 },
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: { duration: 0.5 },
                            },
                        }}
                        className="flex flex-col items-center"
                    >
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('summary')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }}
                            className="btn-gradient"
                        >
                            read the pitch
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                            >
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
