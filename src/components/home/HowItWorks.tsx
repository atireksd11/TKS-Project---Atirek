"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MessageSquareText, BrainCircuit, Send } from "lucide-react";

const steps = [
    {
        number: "01",
        title: "the problem: losing power",
        description:
            "when you pull power from a distant public grid, you literally lose up to 10% of that energy just in transmission. for AGI arrays, thats terawatts down the drain.",
        detail:
            "this isnt an issue we can fix with better code. its a literal physics limit of moving electrons over long copper wires.",
        icon: MessageSquareText,
    },
    {
        number: "02",
        title: "the solution: on-site smrs",
        description:
            "we place small modular reactors (SMRs) directly next to the compute cluster. it generates clean, limitless energy exactly where its needed.",
        detail:
            "the distance to the compute is pretty much zero. we completely bypass the public grid and get that 10% lost power back.",
        icon: BrainCircuit,
    },
    {
        number: "03",
        title: "the result: true scaling",
        description:
            "with reliable, massive scale energy generated right on site, the whole 'energy crisis' bottleneck just disappears. it gives us a clear runway to AGI.",
        detail:
            "no power grid negotiations. no brown-outs. just constant, stable nuclear power feeding the datacenters.",
        icon: Send,
    },
];

export default function HowItWorks() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.15 });

    return (
        <section className="section-spacing relative overflow-hidden" ref={ref}>
            {/* Background — UNTOUCHED */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: "url('/about-bg.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    opacity: 0.3,
                    transform: "scale(1.15)",
                }}
            />
            <div
                className="absolute inset-0 z-[1] pointer-events-none"
                style={{
                    background:
                        "linear-gradient(to bottom, black 0%, transparent 30%, transparent 70%, black 100%)",
                }}
            />

            <div className="section-container relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-16 md:mb-20"
                >
                    <span className="block text-[11px] tracking-[0.3em] uppercase text-white/30 mb-5 font-medium">
                        the energy base
                    </span>
                    <h2 className="font-semibold mb-4">on-site nuclear SMRs.</h2>
                    <p className="text-[17px] text-white/35 max-w-lg mx-auto font-light leading-relaxed">
                        eliminating the grid loss by generating terawatts right at the edge.
                    </p>
                </motion.div>

                {/* Steps — horizontal cards on desktop, stacked on mobile */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto">
                    {steps.map((step, index) => {
                        const Icon = step.icon;

                        return (
                            <motion.div
                                key={step.number}
                                initial={{ opacity: 0, y: 30 }}
                                animate={
                                    isInView
                                        ? { opacity: 1, y: 0 }
                                        : {}
                                }
                                transition={{
                                    duration: 0.7,
                                    ease: [0.22, 1, 0.36, 1],
                                    delay: 0.3 + index * 0.15,
                                }}
                                className="group relative rounded-2xl p-8 md:p-9 transition-all duration-500 hover:bg-white/[0.03]"
                                style={{
                                    background: "rgba(255,255,255,0.02)",
                                    border: "1px solid rgba(255,255,255,0.06)",
                                }}
                            >
                                {/* Step number — big watermark */}
                                <span
                                    className="block text-[56px] md:text-[64px] font-bold leading-none mb-5 tracking-tight"
                                    style={{
                                        background:
                                            "linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 100%)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                    }}
                                >
                                    {step.number}
                                </span>

                                {/* Icon */}
                                <div
                                    className="w-14 h-14 rounded-xl flex items-center justify-center text-white/50 mb-6 group-hover:text-white/70 group-hover:scale-105 transition-all duration-500"
                                    style={{
                                        background:
                                            "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                                        border: "1px solid rgba(255,255,255,0.07)",
                                        boxShadow:
                                            "inset 0 1px 0 rgba(255,255,255,0.05), 0 8px 24px rgba(0,0,0,0.4)",
                                    }}
                                >
                                    <Icon size={24} strokeWidth={1.5} />
                                </div>

                                {/* Title */}
                                <h3 className="text-[24px] md:text-[28px] font-semibold text-white/90 mb-4 group-hover:text-white transition-colors duration-300">
                                    {step.title}
                                </h3>

                                {/* Description */}
                                <p className="text-[15px] md:text-[16px] text-white/40 leading-[1.8] font-light mb-4 group-hover:text-white/55 transition-colors duration-300">
                                    {step.description}
                                </p>

                                {/* Detail */}
                                <p className="text-[14px] text-white/25 leading-[1.8] font-light group-hover:text-white/35 transition-colors duration-300">
                                    {step.detail}
                                </p>

                                {/* Subtle hover glow */}
                                <div
                                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                                    style={{
                                        background:
                                            "radial-gradient(ellipse at top left, rgba(255,255,255,0.02) 0%, transparent 70%)",
                                    }}
                                />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
