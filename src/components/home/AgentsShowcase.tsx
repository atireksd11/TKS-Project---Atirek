"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { LayoutGrid, Code2, FlaskConical, ShieldAlert, Rocket, FileText } from "lucide-react";

const agents = [
    {
        name: "Architect Agent",
        role: "System Design",
        description: "Figures out the full system architecture from your description. Database schemas, API routes, infrastructure. All mapped out before a single line of code is written.",
        icon: LayoutGrid,
    },
    {
        name: "Code Agent",
        role: "Full-Stack Development",
        description: "Writes the actual frontend and backend code. Complete features with proper error handling and clean documentation. Not snippets. Finished work.",
        icon: Code2,
    },
    {
        name: "Test Agent",
        role: "Quality Assurance",
        description: "Builds unit, integration, and end to end test suites automatically. Catches bugs and regressions before anything gets close to production.",
        icon: FlaskConical,
    },
    {
        name: "Security Agent",
        role: "Vulnerability Scanning",
        description: "Continuously scans for vulnerabilities, sets up authentication flows, and makes sure everything meets security standards. No shortcuts.",
        icon: ShieldAlert,
    },
    {
        name: "Deploy Agent",
        role: "CI/CD & Infrastructure",
        description: "Handles deployment pipelines, containerization, and monitoring. Your code goes from finished to live without you touching a terminal.",
        icon: Rocket,
    },
    {
        name: "Docs Agent",
        role: "Documentation",
        description: "Writes API documentation, READMEs, inline comments, and onboarding guides so your project stays understandable as it grows.",
        icon: FileText,
    },
];

export default function AgentsShowcase() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    return (
        <section className="section-spacing relative overflow-hidden" ref={ref} id="agents">
            {/* Background */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: "url('/agents-bg.png')",
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
                    initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                    animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 md:mb-20"
                >
                    <span className="block text-[11px] tracking-[0.3em] uppercase text-white/30 mb-5 font-medium">
                        The Team
                    </span>
                    <h2 className="font-semibold">
                        Six specialized agents,<br className="hidden sm:block" /> one unified pipeline
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] max-w-5xl mx-auto rounded-2xl overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.04)" }}
                >
                    {agents.map((agent, i) => {
                        const Icon = agent.icon;
                        return (
                            <motion.div
                                key={agent.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{
                                    delay: 0.15 + i * 0.08,
                                    duration: 0.5,
                                    ease: [0.25, 0.46, 0.45, 0.94],
                                }}
                                className="group relative p-7 md:p-8 bg-black hover:bg-white/[0.02] transition-colors duration-500"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white/40 group-hover:text-white/70 group-hover:scale-110 transition-all duration-300"
                                        style={{
                                            background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                                            border: "1px solid rgba(255,255,255,0.06)",
                                        }}
                                    >
                                        <Icon size={18} strokeWidth={1.5} />
                                    </div>
                                    <span className="text-[9px] tracking-[0.15em] uppercase text-white/15 font-medium mt-1">
                                        {agent.role}
                                    </span>
                                </div>
                                <h3 className="text-[15px] font-semibold mb-2 text-white/80 group-hover:text-white transition-colors duration-300">
                                    {agent.name}
                                </h3>
                                <p className="text-[13px] text-white/25 leading-[1.7] group-hover:text-white/40 transition-colors duration-300">
                                    {agent.description}
                                </p>

                                {/* Subtle hover glow */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                                    style={{
                                        background: "radial-gradient(ellipse at top left, rgba(255,255,255,0.02) 0%, transparent 70%)",
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
