"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

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

                {/* YouTube Video Embed */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    animate={isInView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-[960px] mx-auto mb-16 aspect-video rounded-2xl overflow-hidden glass-card relative shadow-[0_0_40px_rgba(0,243,255,0.1)] group"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#00f3ff]/5 to-transparent pointer-events-none mix-blend-overlay z-10" />
                    <iframe
                        className="w-full h-full object-cover relative z-0"
                        src="https://www.youtube.com/embed/9Q2zE-HuTqE?autoplay=0&rel=0&showinfo=0"
                        title="TKS Application Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </motion.div>

                {/* End of Founder Section */}
            </div>
        </section>
    );
}
