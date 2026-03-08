"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function FinalCTA() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <section id="waitlist" className="relative overflow-hidden py-32 md:py-44" ref={ref}>
            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center"
                >

                    {/* Headline */}
                    <h2 className="text-[36px] md:text-[52px] lg:text-[60px] font-semibold leading-[1.1] mb-6 tracking-tight">
                        <span className="text-white/90">Stop hiring.</span>
                        <br />
                        <span className="gradient-heading">Start shipping.</span>
                    </h2>

                    <p className="text-[15px] md:text-[17px] text-white/35 max-w-lg mx-auto font-light leading-relaxed mb-12">
                        We're opening access in waves. Join now to lock in the lowest pricing
                        we'll ever offer and get onboarded first.
                    </p>

                    {/* Clean CTA button */}
                    <button
                        data-waitlist-trigger
                        className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-[14px] font-medium transition-all duration-300 hover:scale-[1.02]"
                        style={{
                            background: "rgba(255,255,255,0.95)",
                            color: "#000",
                        }}
                    >
                        Request Early Access
                        <ArrowRight size={15} strokeWidth={2.5} />
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
