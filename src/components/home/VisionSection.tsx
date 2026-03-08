"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Lightbulb, Wrench, TrendingUp } from "lucide-react";

const pillars = [
    {
        icon: Lightbulb,
        title: "Intent over instructions.",
        body: "You shouldn\u2019t have to learn a programming language just to build something. Tell V\u00d8YD what you want, and it builds it.",
        detail:
            "The best technology stays out of your way. You should be focused on your product, your customers, your growth. Building software should feel as easy as talking about it.",
        stat: "Describe, don\u2019t code",
    },
    {
        icon: Wrench,
        title: "Not a chatbot. An engineer.",
        body: "V\u00d8YD doesn\u2019t give suggestions. It writes code, runs tests, and ships working applications. There\u2019s a big difference between advice and execution.",
        detail:
            "Give it a plain language description and it turns that into a real, deployed product. Authentication, databases, APIs, a polished frontend. All of it.",
        stat: "Ships real products",
    },
    {
        icon: TrendingUp,
        title: "Every day, the gap shrinks.",
        body: "Every project V\u00d8YD completes makes it faster and sharper. We\u2019re building toward a world where the tool fades away and only the product remains.",
        detail:
            "One principle drives everything we do: the distance between having an idea and holding a finished product should be zero. We get closer every day.",
        stat: "Always improving",
    },
];

/* ── Glow Card (same style as UseCases) ── */
function GlowCard({
    children,
    index,
}: {
    children: React.ReactNode;
    index: number;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (!cardRef.current) return;
            const rect = cardRef.current.getBoundingClientRect();
            setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        },
        []
    );

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
                delay: index * 0.12,
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative group rounded-2xl p-6 md:p-7 transition-all duration-500"
            style={{
                background: "rgba(10,10,10,0.75)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
            }}
        >
            {isHovered && (
                <div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                        background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.04), transparent 60%)`,
                    }}
                />
            )}
            <div className="relative z-10">{children}</div>
        </motion.div>
    );
}

export default function VisionSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <section
            id="vision"
            className="section-spacing relative overflow-hidden"
            ref={ref}
        >
            {/* Background */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: "url('/vision-bg.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center bottom",
                    backgroundRepeat: "no-repeat",
                    opacity: 0.5,
                    transform: "rotate(180deg) scale(1.15)",
                }}
            />
            <div
                className="absolute inset-0 z-[1] pointer-events-none"
                style={{
                    background:
                        "linear-gradient(to bottom, black 0%, transparent 35%, transparent 65%, black 100%)",
                }}
            />

            <div className="section-container relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-16 md:mb-20"
                >
                    <span className="block text-[11px] tracking-[0.3em] uppercase text-white/30 mb-5 font-medium">
                        Why We Exist
                    </span>
                    <h2 className="font-semibold mb-4">
                        Software should build itself.
                    </h2>
                    <p className="text-[15px] text-white/30 max-w-lg mx-auto font-light leading-relaxed">
                        The gap between having an idea and holding a finished product should be zero. That's what we're working toward.
                    </p>
                </motion.div>

                {/* 3-column cards — same style as Use Cases */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-[1000px] mx-auto">
                    {isInView &&
                        pillars.map((pillar, i) => {
                            const PillarIcon = pillar.icon;
                            return (
                                <GlowCard key={pillar.title} index={i}>
                                    <div>
                                        <div
                                            className="w-9 h-9 rounded-lg flex items-center justify-center mb-4 text-white/40 group-hover:text-white/60 transition-all duration-300"
                                            style={{
                                                background:
                                                    "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                                                border: "1px solid rgba(255,255,255,0.05)",
                                            }}
                                        >
                                            <PillarIcon
                                                size={16}
                                                strokeWidth={1.5}
                                            />
                                        </div>
                                        <h3 className="text-[15px] font-medium text-white/80 mb-2 group-hover:text-white/90 transition-colors duration-300">
                                            {pillar.title}
                                        </h3>
                                        <p className="text-[13px] text-white/30 leading-[1.75] font-light mb-3 group-hover:text-white/40 transition-colors duration-300">
                                            {pillar.body}
                                        </p>
                                        <p className="text-[12px] text-white/20 leading-[1.7] font-light mb-4 group-hover:text-white/30 transition-colors duration-300">
                                            {pillar.detail}
                                        </p>
                                        <div
                                            className="inline-flex px-3 py-1 rounded-full text-[10px] font-medium tracking-wide"
                                            style={{
                                                background:
                                                    "rgba(255,255,255,0.03)",
                                                border: "1px solid rgba(255,255,255,0.06)",
                                                color: "rgba(255,255,255,0.4)",
                                            }}
                                        >
                                            {pillar.stat}
                                        </div>
                                    </div>
                                </GlowCard>
                            );
                        })}
                </div>
            </div>
        </section>
    );
}
