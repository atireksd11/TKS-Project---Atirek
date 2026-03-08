"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function AboutSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <section className="relative overflow-hidden" ref={ref}>
            {/* Background */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: "url('/about-bg.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: 0.25,
                }}
            />
            <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/80 via-transparent to-black/80 pointer-events-none" />

            <div className="section-container section-spacing relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
                    animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-12 md:mb-16"
                >
                    <span className="block text-[11px] tracking-[0.3em] uppercase text-white/30 mb-5 font-medium">
                        About
                    </span>
                    <h2 className="font-semibold">Building the future of software creation</h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 max-w-[900px] mx-auto items-center">
                    {/* Left — Story */}
                    <motion.div
                        initial={{ opacity: 0, x: -24, filter: "blur(8px)" }}
                        animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <p className="text-[14px] text-white/40 leading-[1.85] mb-5">
                            VØYD was born from a simple frustration: building software is too slow,
                            too expensive, and too dependent on finding the right talent. We asked —
                            what if AI didn&apos;t just advise on code, but actually built the entire product?
                        </p>
                        <p className="text-[14px] text-white/35 leading-[1.85] mb-5">
                            Today, VØYD is the first fully autonomous AI CTO. It architects systems,
                            writes production code, handles security, deploys to the cloud, and
                            iterates based on feedback — all without human intervention.
                        </p>
                        <p className="text-[14px] text-white/30 leading-[1.85]">
                            Whether you&apos;re a solo founder with a napkin idea, a dev team shipping
                            faster, or an enterprise automating internal tools — VØYD adapts to your
                            needs and operates at machine speed.
                        </p>
                    </motion.div>

                    {/* Right — Key quote card */}
                    <motion.div
                        initial={{ opacity: 0, x: 24, filter: "blur(8px)" }}
                        animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
                        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="glass-card relative">
                            <span className="text-[48px] font-serif leading-none text-white/[0.04] select-none absolute top-4 left-5">
                                &ldquo;
                            </span>
                            <p className="text-[15px] text-white/50 leading-[1.85] italic font-light pt-8 mb-5">
                                AI shouldn&apos;t just write code. It should understand what you&apos;re
                                building, why you&apos;re building it, and how to ship it — end to end.
                            </p>
                            <div>
                                <p className="text-[13px] font-medium text-white/50">VØYD Team</p>
                                <p className="text-[11px] text-white/20 mt-0.5">Founding Principle</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
