"use client";

import { motion } from "framer-motion";

export default function Footer() {
    return (
        <footer className="relative z-10 pb-10 pt-20">
            {/* Thin separator line */}
            <div className="max-w-5xl mx-auto px-6">
                <div
                    className="h-px w-full mb-10"
                    style={{
                        background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)",
                    }}
                />

                {/* Top row — brand + nav */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8"
                >
                    <div className="flex items-center gap-3">
                        <span className="text-white/40 font-bold tracking-widest text-sm uppercase">AETHER</span>
                        <span className="text-[11px] text-white/15">—</span>
                        <span className="text-[12px] text-white/20 font-light">
                            intelligence & energy base
                        </span>
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap items-center gap-6 md:gap-8 mt-6 md:mt-0">
                        <a
                            href="#summary"
                            className="text-[12px] text-white/20 hover:text-white/50 transition-colors duration-300"
                        >
                            vision
                        </a>
                        <a
                            href="#"
                            className="text-[12px] text-white/20 hover:text-white/50 transition-colors duration-300"
                        >
                            the energy crisis
                        </a>
                        <a
                            href="#contact"
                            className="text-[12px] text-white/20 hover:text-white/50 transition-colors duration-300"
                        >
                            contact me
                        </a>
                    </div>
                </motion.div>

                {/* Bottom row — copyright */}
                <div
                    className="h-px w-full mb-6"
                    style={{
                        background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)",
                    }}
                />
                <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
                    <p className="text-[11px] text-white/10 font-light">
                        © 2026 Project Aether. All rights reserved.
                    </p>
                    <p className="text-[11px] text-white/10 font-light">
                        scaling AGI via thermal intelligence.
                    </p>
                </div>
            </div>
        </footer>
    );
}
