"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const logos = [
    "Y Combinator",
    "Techstars",
    "AWS Activate",
    "Google for Startups",
    "Microsoft for Startups",
    "Vercel",
    "Supabase",
    "Stripe",
    "Y Combinator",
    "Techstars",
    "AWS Activate",
    "Google for Startups",
    "Microsoft for Startups",
    "Vercel",
    "Supabase",
    "Stripe",
];

export default function TrustBar() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    return (
        <section className="py-16 md:py-20 relative" id="trust" ref={ref}>
            {/* Top divider */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />

            <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 1 }}
            >
                <p className="text-[10px] tracking-[0.3em] uppercase text-white/20 text-center mb-8">
                    Backed by the best
                </p>

                <div className="marquee-container">
                    <div className="marquee-track">
                        {logos.map((name, i) => (
                            <span
                                key={`${name}-${i}`}
                                className="text-[14px] font-medium text-white/15 hover:text-white/30 transition-colors duration-300 tracking-[0.15em] whitespace-nowrap"
                            >
                                {name}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
