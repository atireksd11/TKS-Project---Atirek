"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const testimonials = [
    {
        quote: "We described what we wanted on a Monday and had a working SaaS product deployed by Wednesday. No developers on staff. Just VØYD and a clear vision of what we needed.",
        name: "Alex R.",
        role: "Founder, Stealth Startup",
    },
    {
        quote: "Our dev team used to spend weeks just debating architecture decisions. Now VØYD handles that in minutes and we've cut our build time by about 80%. It's honestly ridiculous how fast things move now.",
        name: "Sarah K.",
        role: "CTO, Scale-up",
    },
    {
        quote: "I'm a solo developer and VØYD basically gave me a senior engineering team I couldn't afford to hire. It reviews my work, suggests better patterns, and handles deployment. Game changer.",
        name: "Marcus T.",
        role: "Freelance Developer",
    },
];

const cardVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            delay: 0.12 + i * 0.1,
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
        },
    }),
};

export default function Testimonials() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.15 });

    return (
        <section className="relative overflow-hidden" ref={ref}>
            {/* Background */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: "url('/testimonials-bg.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: 0.3,
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
                        Testimonials
                    </span>
                    <h2 className="font-semibold">Loved by builders</h2>
                </motion.div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 max-w-[960px] mx-auto">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={t.name}
                            custom={i}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            variants={cardVariants}
                            className="glass-card group flex flex-col"
                        >
                            {/* Quote icon */}
                            <span className="text-[36px] font-serif leading-none text-white/[0.05] select-none mb-3">
                                &ldquo;
                            </span>

                            <p className="text-[14px] text-white/40 leading-[1.8] font-light italic mb-auto pb-5 group-hover:text-white/55 transition-colors duration-300">
                                {t.quote}
                            </p>

                            {/* Divider */}
                            <div className="h-px bg-white/[0.04] mb-4" />

                            {/* Author */}
                            <div className="flex items-center gap-3">
                                <div className="w-7 h-7 rounded-full bg-white/[0.04] border border-white/[0.05] flex items-center justify-center shrink-0">
                                    <span className="text-[10px] font-bold text-white/30">
                                        {t.name.charAt(0)}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-[13px] font-medium text-white/50">{t.name}</p>
                                    <p className="text-[11px] text-white/20">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
