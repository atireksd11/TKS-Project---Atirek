"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { VoydLogo } from "@/components/VoydLogo";

/* ── Status pills ── */
const statusPills = [
    { label: "10k+ sensors live", icon: false },
    { label: "core temp: 42°C", icon: false },
];

/* ── Icon buttons (top bar) ── */
function ChatIcon() {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
    );
}
function PlusIcon() {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
    );
}
function BoltIcon() {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
    );
}
function GearIcon() {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
        </svg>
    );
}
function SendIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="19" x2="12" y2="5" />
            <polyline points="5 12 12 5 19 12" />
        </svg>
    );
}

const iconButtons = [
    { Icon: ChatIcon, label: "Chat" },
    { Icon: PlusIcon, label: "New" },
    { Icon: BoltIcon, label: "Quick" },
    { Icon: GearIcon, label: "Settings" },
];

/* ── Component ── */

export default function CTOPreview() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <section className="section-spacing relative overflow-hidden" ref={ref}>
            {/* Background  */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: "url('/command-bg.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    opacity: 0.5,
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
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-14 md:mb-18"
                >
                    <span className="block text-[11px] tracking-[0.3em] uppercase text-white/30 mb-5 font-medium">
                        the intelligence layer
                    </span>
                    <h2 className="font-semibold mb-4">live sensor dashboard</h2>
                    <p className="text-[15px] md:text-[17px] text-white/35 max-w-md mx-auto font-light leading-relaxed">
                        real-time thermal monitoring across the entire cluster.
                    </p>
                </motion.div>

                {/* ── Command Bar Card ── */}
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.97 }}
                    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{
                        duration: 1,
                        ease: [0.22, 1, 0.36, 1],
                        delay: 0.2,
                    }}
                    className="max-w-[680px] mx-auto"
                >
                    <div
                        className="relative rounded-[20px] overflow-hidden"
                        style={{
                            background: "rgba(20, 20, 20, 0.95)",
                            border: "1px solid rgba(255, 255, 255, 0.08)",
                            boxShadow:
                                "inset 0 1px 0 rgba(255,255,255,0.05), 0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,0,0,0.3)",
                        }}
                    >
                        {/* Dot matrix texture overlay */}
                        <div
                            className="absolute inset-0 pointer-events-none z-0 opacity-[0.15]"
                            style={{
                                backgroundImage:
                                    "radial-gradient(circle, rgba(255,255,255,0.5) 0.5px, transparent 0.5px)",
                                backgroundSize: "8px 8px",
                            }}
                        />

                        {/* Inner glow at top */}
                        <div
                            className="absolute inset-x-0 top-0 h-[1px] pointer-events-none z-[2]"
                            style={{
                                background:
                                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
                            }}
                        />

                        {/* ── Top bar ── */}
                        <div className="relative z-[1] flex items-center justify-between px-5 py-4">
                            {/* Brand */}
                            <div className="flex items-center">
                                <VoydLogo size={24} className="text-white/50" />
                            </div>

                            {/* Right side — pills + icons */}
                            <div className="flex items-center gap-2">
                                {/* Status pills */}
                                {statusPills.map((pill) => (
                                    <motion.span
                                        key={pill.label}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={
                                            isInView
                                                ? { opacity: 1, scale: 1 }
                                                : {}
                                        }
                                        transition={{
                                            delay: 0.8,
                                            duration: 0.4,
                                        }}
                                        className="text-[11px] px-3 py-1.5 rounded-lg font-medium text-white/30"
                                        style={{
                                            background: "rgba(255,255,255,0.04)",
                                            border: "1px solid rgba(255,255,255,0.06)",
                                        }}
                                    >
                                        {pill.label}
                                    </motion.span>
                                ))}

                                {/* Divider */}
                                <div className="w-px h-5 bg-white/[0.06] mx-1" />

                                {/* Icon buttons */}
                                {iconButtons.map(({ Icon, label }, i) => (
                                    <motion.button
                                        key={label}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={
                                            isInView
                                                ? { opacity: 1, scale: 1 }
                                                : {}
                                        }
                                        transition={{
                                            delay: 1.0 + i * 0.08,
                                            duration: 0.3,
                                        }}
                                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white/25 hover:text-white/50 hover:bg-white/[0.04] transition-all duration-200"
                                        style={{
                                            background: "rgba(255,255,255,0.03)",
                                            border: "1px solid rgba(255,255,255,0.05)",
                                        }}
                                    >
                                        <Icon />
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* ── Command input ── */}
                        <div className="relative z-[1] px-5 pb-5">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={
                                    isInView ? { opacity: 1, y: 0 } : {}
                                }
                                transition={{ delay: 0.6, duration: 0.6 }}
                                className="flex items-center gap-3 rounded-xl px-5 py-3.5"
                                style={{
                                    background: "rgba(255,255,255,0.04)",
                                    border: "1px solid rgba(255,255,255,0.07)",
                                    boxShadow:
                                        "inset 0 1px 0 rgba(255,255,255,0.03), 0 2px 8px rgba(0,0,0,0.2)",
                                }}
                            >
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={
                                        isInView ? { opacity: 1 } : {}
                                    }
                                    transition={{ delay: 1.2, duration: 0.8 }}
                                    className="flex-1 text-[14px] text-[#00f3ff] font-mono tracking-[-0.01em]"
                                    style={{ textShadow: "0 0 10px rgba(0, 243, 255, 0.4)" }}
                                >
                                    if (chip_temp &gt; 80) &#123; trigger_voyd_cooling_boost(); &#125;
                                </motion.span>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={
                                        isInView
                                            ? { opacity: 1, scale: 1 }
                                            : {}
                                    }
                                    transition={{ delay: 1.4, duration: 0.3 }}
                                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                                    style={{
                                        background: "rgba(255,255,255,0.08)",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                    }}
                                >
                                    <SendIcon />
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
