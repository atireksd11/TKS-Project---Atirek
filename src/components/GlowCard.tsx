"use client";

import { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface GlowCardProps {
    children: ReactNode;
    className?: string;
    badge?: string;
    delay?: number;
    hover?: boolean;
}

export default function GlowCard({
    children,
    className = "",
    badge,
    delay = 0,
    hover = true,
}: GlowCardProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`bento-card group relative ${hover ? "" : "pointer-events-none"} ${className}`}
        >
            {badge && (
                <span className="absolute top-4 right-4 text-[9px] tracking-[0.2em] uppercase text-[var(--accent)] bg-[var(--accent-dim)] px-3 py-1 rounded-full border border-[var(--accent)]/20 z-10">
                    {badge}
                </span>
            )}
            <div className="relative z-[2]">{children}</div>
        </motion.div>
    );
}
