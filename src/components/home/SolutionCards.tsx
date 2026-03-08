"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Layers, Zap, BarChart3, Globe, ShieldCheck, RefreshCcw } from "lucide-react";

const cards = [
    {
        title: "Full-Stack Products",
        desc: "Complete web apps, SaaS platforms, mobile backends. Architected properly and production ready from the moment they're built.",
        icon: Layers,
    },
    {
        title: "AI-Powered Agents",
        desc: "QA testers, design agents, code reviewers, performance monitors. Autonomous team members that work around the clock without needing a break.",
        icon: Zap,
    },
    {
        title: "Analytics & Dashboards",
        desc: "Real time metrics, user tracking, conversion funnels, and business intelligence. Baked into every project from the start.",
        icon: BarChart3,
    },
    {
        title: "Domain & Hosting",
        desc: "Custom domains, SSL, CDN, auto scaling infrastructure. All the operational stuff is handled so you never have to think about it.",
        icon: Globe,
    },
    {
        title: "Security & Auth",
        desc: "OAuth, encryption, vulnerability scanning, role based access. Enterprise grade security without the enterprise setup process.",
        icon: ShieldCheck,
    },
    {
        title: "CI/CD & DevOps",
        desc: "Automated testing, continuous deployment, monitoring, instant rollbacks. Ship confidently every single time.",
        icon: RefreshCcw,
    },
];

function GlowCard({ card, index, isInView }: { card: typeof cards[0]; index: number; isInView: boolean }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const Icon = card.icon;

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    }, []);

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.15 + index * 0.1,
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative group rounded-2xl p-6 md:p-7 transition-all duration-500"
            style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
            }}
        >
            {/* Mouse-tracking glow */}
            {isHovered && (
                <div
                    className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 opacity-100"
                    style={{
                        background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.04), transparent 60%)`,
                    }}
                />
            )}

            {/* Border glow follow */}
            {isHovered && (
                <div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                        background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.08), transparent 60%)`,
                        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        maskComposite: "exclude",
                        WebkitMaskComposite: "xor",
                        padding: "1px",
                        borderRadius: "16px",
                    }}
                />
            )}

            <div className="relative z-10">
                <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 text-white/40 group-hover:text-white/70 group-hover:scale-110 transition-all duration-300"
                    style={{
                        background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                        border: "1px solid rgba(255,255,255,0.06)",
                    }}
                >
                    <Icon size={18} strokeWidth={1.5} />
                </div>
                <h3 className="text-[15px] font-medium text-white/80 mb-2 group-hover:text-white/90 transition-colors duration-300">
                    {card.title}
                </h3>
                <p className="text-[13px] text-white/30 leading-[1.75] font-light group-hover:text-white/40 transition-colors duration-300">
                    {card.desc}
                </p>
            </div>
        </motion.div>
    );
}

export default function SolutionCards() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    return (
        <section id="capabilities" className="section-spacing relative overflow-hidden" ref={ref}>
            {/* Background image */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: "url('/solutions-bg.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    opacity: 0.35,
                }}
            />
            <div
                className="absolute inset-0 z-[1] pointer-events-none"
                style={{ background: "linear-gradient(to bottom, black 0%, transparent 30%, transparent 70%, black 100%)" }}
            />

            <div className="section-container relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-14 md:mb-18"
                >
                    <span className="block text-[11px] tracking-[0.3em] uppercase text-white/30 mb-5 font-medium">
                        Capabilities
                    </span>
                    <h2 className="font-semibold mb-4">One platform. No loose ends.</h2>
                    <p className="text-[15px] text-white/35 max-w-lg mx-auto font-light leading-relaxed">
                        Everything you need to go from idea to live product. Nothing left for you to figure out.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {cards.map((card, i) => (
                        <GlowCard key={card.title} card={card} index={i} isInView={isInView} />
                    ))}
                </div>
            </div>
        </section>
    );
}
