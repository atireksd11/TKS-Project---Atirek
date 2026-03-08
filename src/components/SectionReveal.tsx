"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface SectionRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    direction?: "up" | "down" | "left" | "right";
}

export default function SectionReveal({
    children,
    className = "",
    delay = 0,
    direction = "up",
}: SectionRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.15 });

    const directionMap = {
        up: { y: 40, x: 0 },
        down: { y: -40, x: 0 },
        left: { x: -40, y: 0 },
        right: { x: 40, y: 0 },
    };

    const offset = directionMap[direction];

    return (
        <motion.div
            ref={ref}
            initial={{
                opacity: 0,
                y: offset.y,
                x: offset.x,
                filter: "blur(8px)",
            }}
            animate={
                isInView
                    ? {
                        opacity: 1,
                        y: 0,
                        x: 0,
                        filter: "blur(0px)",
                    }
                    : {}
            }
            transition={{
                duration: 0.8,
                delay,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
