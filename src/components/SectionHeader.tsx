"use client";

import { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SectionHeaderProps {
    label?: string;
    title: ReactNode;
    description?: string;
    className?: string;
    align?: "center" | "left";
}

export default function SectionHeader({
    label,
    title,
    description,
    className = "",
    align = "center",
}: SectionHeaderProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    const alignment = align === "center" ? "text-center mx-auto" : "text-left";

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`mb-16 md:mb-20 px-4 ${alignment} ${className}`}
        >
            {label && (
                <span className="block text-[11px] tracking-[0.3em] uppercase text-[var(--accent)] mb-6">
                    {label}
                </span>
            )}
            <h2 className={align === "center" ? "mx-auto" : ""}>{title}</h2>
            {description && (
                <p className={`mt-5 text-lg text-[var(--fg-muted)] max-w-xl leading-relaxed font-light ${align === "center" ? "mx-auto" : ""}`}>
                    {description}
                </p>
            )}
        </motion.div>
    );
}
