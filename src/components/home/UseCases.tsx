"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Flame, Briefcase, Building2, Rocket, FileCheck, UserX, Gauge, Tag, Bot, Wrench, ShieldCheck, TrendingUp, type LucideIcon } from "lucide-react";

const tabs = [
    {
        id: "founders",
        label: "Founders",
        icon: Flame,
        cases: [
            {
                title: "Ship Your MVP This Week",
                desc: "Describe your product idea and get a working, deployed app with auth, payments, and a dashboard. No technical co founder needed.",
                detail: "Stop spending months looking for a CTO. Describe what you want, and get a live product you can show to investors, test with real users, and start iterating on right away.",
                stat: "Days, not months",
                icon: Rocket,
            },
            {
                title: "Walk Into Your Pitch Ready",
                desc: "Architecture docs, security reports, and scalability proof. All generated automatically. The kind of stuff that makes investors stop asking technical questions.",
                detail: "VØYD produces system diagrams, infrastructure docs, and compliance proof points that make due diligence feel like a formality, not a blocker.",
                stat: "Investor ready",
                icon: FileCheck,
            },
            {
                title: "Skip the $150K Developer",
                desc: "No recruiting, no onboarding, no equity conversations. VØYD is the technical co founder that never leaves and never burns out.",
                detail: "One mid level developer runs about $120K a year before benefits and equity. VØYD replaces the output of an entire dev team for a fraction of that.",
                stat: "Massive savings",
                icon: UserX,
            },
        ],
    },
    {
        id: "agencies",
        label: "Agencies",
        icon: Briefcase,
        cases: [
            {
                title: "Take On 5x More Clients",
                desc: "Deliver complex web applications in days instead of weeks. Handle more projects without needing to hire more devs.",
                detail: "Take on projects you used to turn down. VØYD lets your team ship production apps faster without sacrificing the quality your clients expect.",
                stat: "5x throughput",
                icon: Gauge,
            },
            {
                title: "Your Margins, Their Brand",
                desc: "Build fully custom, white labeled products for every client. VØYD handles the tech side. You keep the margins.",
                detail: "Create unique, fully branded solutions without the overhead of custom development. Each product is built from scratch, tailored to their needs.",
                stat: "Full margins",
                icon: Tag,
            },
            {
                title: "Zero Maintenance Overhead",
                desc: "AI agents monitor, patch, and optimize every client project around the clock. No more midnight server fires.",
                detail: "Security patches, performance fixes, and bug resolution happen in real time. Your team stays focused on new revenue instead of putting out fires on old projects.",
                stat: "Always on",
                icon: Bot,
            },
        ],
    },
    {
        id: "enterprise",
        label: "Enterprise",
        icon: Building2,
        cases: [
            {
                title: "Clear the Backlog Overnight",
                desc: "Build custom dashboards, admin panels, and workflow tools without pulling engineers off the product roadmap.",
                detail: "Every company has a backlog of internal tools that never get built. VØYD clears it by building exactly what your ops team needs, when they need it.",
                stat: "No team distraction",
                icon: Wrench,
            },
            {
                title: "Compliance Built In",
                desc: "GDPR, HIPAA, SOC2 ready infrastructure generated automatically. Audit trails, encryption, and access controls come standard.",
                detail: "Compliance isn't bolted on after the fact. It's built into every line of code from the start. Regulatory docs, data policies, security controls. All handled.",
                stat: "Auto compliant",
                icon: ShieldCheck,
            },
            {
                title: "Built for 10M Users From Day One",
                desc: "Auto scaling architecture, load balancing, and performance optimization from the start. No re architecture needed when you grow.",
                detail: "Your application handles massive growth from day one. Infrastructure scales as your business grows, with zero engineering intervention needed.",
                stat: "Infinite scale",
                icon: TrendingUp,
            },
        ],
    },
];

function GlowCard({ children, index }: { children: React.ReactNode; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }, []);

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
                delay: index * 0.1,
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

export default function UseCases() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });
    const [activeTab, setActiveTab] = useState(0);
    const [direction, setDirection] = useState(1);

    const handleTabChange = (index: number) => {
        setDirection(index > activeTab ? 1 : -1);
        setActiveTab(index);
    };

    return (
        <section id="use-cases" className="section-spacing relative overflow-hidden" ref={ref}>
            {/* Background */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: "url('/testimonials-bg.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    opacity: 0.25,
                    transform: "scale(1.15)",
                }}
            />
            <div
                className="absolute inset-0 z-[1] pointer-events-none"
                style={{ background: "linear-gradient(to bottom, black 0%, transparent 20%, transparent 80%, black 100%)" }}
            />

            <div className="section-container relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-10 md:mb-14"
                >
                    <span className="block text-[11px] tracking-[0.3em] uppercase text-white/30 mb-5 font-medium">
                        Built For
                    </span>
                    <h2 className="font-semibold mb-4">Who gets the most out of VØYD?</h2>
                    <p className="text-[15px] text-white/35 max-w-lg mx-auto font-light leading-relaxed">
                        The people who adopt VØYD early are going to move faster than everyone who doesn't.
                    </p>
                </motion.div>

                {/* Tab switcher */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="flex justify-center mb-10"
                >
                    <div
                        className="inline-flex gap-1 p-1 rounded-xl"
                        style={{
                            background: "rgba(10,10,10,0.6)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            backdropFilter: "blur(8px)",
                        }}
                    >
                        {tabs.map((tab, i) => (
                            <button
                                key={tab.id}
                                onClick={() => handleTabChange(i)}
                                className="relative px-5 py-2.5 rounded-lg text-[13px] font-medium transition-colors duration-300 flex items-center gap-2"
                                style={{
                                    color: activeTab === i ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.35)",
                                }}
                            >
                                {activeTab === i && (
                                    <motion.div
                                        layoutId="tab-bg"
                                        className="absolute inset-0 rounded-lg"
                                        style={{
                                            background: "rgba(255,255,255,0.06)",
                                            border: "1px solid rgba(255,255,255,0.08)",
                                            boxShadow: "0 0 20px rgba(255,255,255,0.02)",
                                        }}
                                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                    />
                                )}
                                <span className="relative z-10">{(() => { const TabIcon = tab.icon; return <TabIcon size={14} strokeWidth={1.5} />; })()}</span>
                                <span className="relative z-10">{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Tab content */}
                <div className="max-w-[1000px] mx-auto">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={activeTab}
                            custom={direction}
                            initial={{ opacity: 0, x: direction * 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: direction * -40 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-4"
                        >
                            {tabs[activeTab].cases.map((c, i) => {
                                const CaseIcon = c.icon;
                                return (
                                    <GlowCard key={c.title} index={i}>
                                        <div>
                                            <div
                                                className="w-9 h-9 rounded-lg flex items-center justify-center mb-4 text-white/40 group-hover:text-white/60 transition-all duration-300"
                                                style={{
                                                    background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                                                    border: "1px solid rgba(255,255,255,0.05)",
                                                }}
                                            >
                                                <CaseIcon size={16} strokeWidth={1.5} />
                                            </div>
                                            <h3 className="text-[15px] font-medium text-white/80 mb-2 group-hover:text-white/90 transition-colors duration-300">
                                                {c.title}
                                            </h3>
                                            <p className="text-[13px] text-white/30 leading-[1.75] font-light mb-3 group-hover:text-white/40 transition-colors duration-300">
                                                {c.desc}
                                            </p>
                                            <p className="text-[12px] text-white/20 leading-[1.7] font-light mb-4 group-hover:text-white/30 transition-colors duration-300">
                                                {c.detail}
                                            </p>
                                            <div
                                                className="inline-flex px-3 py-1 rounded-full text-[10px] font-medium tracking-wide"
                                                style={{
                                                    background: "rgba(255,255,255,0.03)",
                                                    border: "1px solid rgba(255,255,255,0.06)",
                                                    color: "rgba(255,255,255,0.4)",
                                                }}
                                            >
                                                {c.stat}
                                            </div>
                                        </div>
                                    </GlowCard>
                                );
                            })}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
