"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const panels = [
    {
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
            </svg>
        ),
        title: "The Vision",
        description:
            "Your startup should understand intent, not just execute commands. Describe what you want to build in plain language and watch it come to life.",
    },
    {
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
        ),
        title: "Where We Are",
        description:
            "VØYD is the first step — a fully autonomous AI CTO that architects, codes, tests, and deploys your entire product. Not a chatbot that advises, but an operator that acts.",
    },
    {
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
            </svg>
        ),
        title: "The Journey",
        description:
            "We're closing the gap between human intention and machine execution. Every interaction makes the system smarter. We're building toward a future where the tool disappears and only the product remains.",
    },
];

export default function FounderSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.15 });

    return (
        <section className="relative overflow-hidden" id="vision" ref={ref}>
            {/* Background image */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: "url('/vision-bg.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            />
            <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black via-black/50 to-black pointer-events-none" />

            <div className="section-container section-spacing relative z-10">
                {/* Header — label + italic heading */}
                <motion.div
                    initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
                    animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-12 md:mb-16"
                >
                    <span className="block text-[11px] tracking-[0.3em] uppercase text-white/30 mb-5 font-medium">
                        Vision
                    </span>
                    <h2 className="font-semibold italic text-white/90">Our Vision</h2>
                </motion.div>

                {/* Real Video Player */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    animate={isInView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-[960px] mx-auto mb-16 aspect-video rounded-2xl overflow-hidden glass-card relative shadow-[0_0_40px_rgba(255,0,0,0.1)]"
                >
                    <video
                        className="w-full h-full object-cover"
                        controls
                        playsInline
                        poster="/vision-bg.png"
                    >
                        <source src="/tks-application.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </motion.div>

                {/* End of Founder Section */}
            </div>
        </section>
    );
}
