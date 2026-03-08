"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const metrics = [
    { value: 10, suffix: "x", label: "Faster than traditional development" },
    { value: 100, suffix: "+", label: "Projects deployed" },
    { value: 50, suffix: "k+", label: "Lines of production code generated" },
    { value: 99.9, suffix: "%", label: "Uptime reliability" },
];

function AnimatedNumber({ target, suffix, isInView }: { target: number; suffix: string; isInView: boolean }) {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!isInView) return;
        const isDecimal = target % 1 !== 0;
        const duration = 1800;
        const steps = 60;
        const stepDuration = duration / steps;
        let step = 0;

        const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const val = eased * target;
            setCurrent(isDecimal ? parseFloat(val.toFixed(1)) : Math.round(val));
            if (step >= steps) {
                setCurrent(target);
                clearInterval(timer);
            }
        }, stepDuration);

        return () => clearInterval(timer);
    }, [isInView, target]);

    return (
        <span>
            {current}
            {suffix}
        </span>
    );
}

export default function Metrics() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <section className="py-20 md:py-28 relative section-bg-radial" ref={ref}>
            <div className="section-container relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 max-w-[960px] mx-auto">
                    {metrics.map((m, i) => (
                        <motion.div
                            key={m.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="text-center"
                        >
                            <p className="text-[40px] md:text-[56px] font-bold tracking-tighter text-white/90 leading-none mb-2">
                                <AnimatedNumber target={m.value} suffix={m.suffix} isInView={isInView} />
                            </p>
                            <p className="text-[12px] text-white/25 font-light tracking-wide leading-relaxed max-w-[160px] mx-auto">
                                {m.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
