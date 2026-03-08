"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

export default function SummarySection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.15 });

    return (
        <section className="relative overflow-hidden section-spacing" id="summary" ref={ref}>
            <div className="section-container relative z-10 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                    animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="glass-card p-8 md:p-14 relative overflow-hidden"
                >
                    {/* Background glows */}
                    <div className="absolute -top-32 -right-32 w-80 h-80 bg-[#00f3ff] rounded-full mix-blend-screen filter blur-[120px] opacity-10 pointer-events-none" />
                    <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-red-600 rounded-full mix-blend-screen filter blur-[120px] opacity-10 pointer-events-none" />

                    <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-center">
                        <div className="flex-1 space-y-7 relative z-10">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-semibold mb-3 tracking-tight text-white/95">
                                    Project Aether: explained
                                </h2>
                                <p className="text-[#00f3ff] text-sm md:text-base uppercase tracking-[0.2em] font-medium" style={{ textShadow: "0 0 10px rgba(0,243,255,0.3)" }}>
                                    my blueprint for the future
                                </p>
                            </div>

                            <div className="space-y-5">
                                <p className="text-[15px] md:text-[16px] text-white/50 leading-[1.8] font-light">
                                    most people think AGI is just a software problem—writing better code. but the truth is, we are hitting a physical wall. traditional gpus get way too hot, and our public energy grid is too weak to power the future of AI. the real solution isnt just software; its physical infrastructure.
                                </p>

                                <p className="text-[15px] md:text-[16px] text-white/50 leading-[1.8] font-light">
                                    by using <strong className="text-white/80 font-medium">thermal intelligence</strong> (smart cooling and quantum offloading) and <strong className="text-white/80 font-medium">nuclear SMRs</strong> (on-site clean energy), we can completely bypass the public grid's limits and stop chips from melting down. this is the exact physical foundation we need to hit true AGI.
                                </p>
                            </div>
                        </div>

                        {/* Profile Image Column */}
                        <div className="flex-shrink-0 w-full md:w-56 flex flex-col items-center relative z-10">
                            <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border border-white/10 relative shadow-[0_0_40px_rgba(0,243,255,0.08)] mb-6 group">
                                <Image
                                    src="/atirek.png"
                                    alt="Atirek Singh"
                                    fill
                                    unoptimized
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    onError={(e) => {
                                        // Fallback if image isn't placed in public directory yet
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                                {/* Fallback background if image is missing */}
                                <div className="absolute inset-0 bg-white/5 flex items-center justify-center -z-10 text-white/20 text-xs text-center p-4">
                                    Update /public/atirek.png
                                </div>
                            </div>
                            <h3 className="text-white/95 font-medium text-xl mb-1 tracking-tight">atirek singh</h3>
                            <p className="text-white/40 text-[13px] font-medium uppercase tracking-wider text-center">
                                14-year-old builder & founder
                            </p>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="w-full h-px mt-16 mb-12 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    {/* About Me & Contact */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                        {/* Left Column: Who I Am */}
                        <div className="space-y-6 relative z-10">
                            <div>
                                <h3 className="text-xl md:text-2xl font-semibold mb-2 tracking-tight text-white/95">
                                    about me
                                </h3>
                                <p className="text-[#00f3ff] text-sm md:text-[13px] uppercase tracking-[0.2em] font-medium" style={{ textShadow: "0 0 10px rgba(0,243,255,0.2)" }}>
                                    the "XYZ" framework
                                </p>
                            </div>
                            <p className="text-[15px] text-white/50 leading-[1.8] font-light">
                                im a builder who spends almost all my time digging into the foundational base layers that run civilization intelligence, energy, capital, and soon space tech. my actual goal is to build <strong className="text-white/80 font-medium">"base companies"</strong> that become the literal infrastructure for the future.
                            </p>
                            <div className="space-y-4 pt-2">
                                <h4 className="text-white/80 font-medium text-sm tracking-wide">WHAT IM BUILDING RIGHT NOW</h4>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#00f3ff] mt-2 shrink-0" />
                                        <p className="text-[14px] text-white/50 leading-[1.6]"><strong className="text-white/80 font-medium">KroniQ:</strong> all in one content creation platform, combining of all biggest models like chatgpt 5.2, claude 4.6 opus, sora 2, nano banana pro etc in one single chat.</p>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#00f3ff] mt-2 shrink-0" />
                                        <p className="text-[14px] text-white/50 leading-[1.6]"><strong className="text-white/80 font-medium">trading ai:</strong> ingesting news, sentiment, and financial data to run predictive markets.</p>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#00f3ff] mt-2 shrink-0" />
                                        <p className="text-[14px] text-white/50 leading-[1.6]"><strong className="text-white/80 font-medium">automation agency:</strong> shipping sites and automating ops for local businesses so i can learn real sales.</p>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#00f3ff] mt-2 shrink-0" />
                                        <p className="text-[14px] text-white/50 leading-[1.6]"><strong className="text-white/80 font-medium">stealth prototypes:</strong> rapidly testing out some new autonomous agent architectures.</p>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Right Column: Why TKS & Contact */}
                        <div className="space-y-6 relative z-10 flex flex-col justify-between">
                            <div>
                                <div>
                                    <h3 className="text-xl md:text-2xl font-semibold mb-2 tracking-tight text-white/95">
                                        tks application context
                                    </h3>
                                    <p className="text-red-500 text-sm md:text-[13px] uppercase tracking-[0.2em] font-medium" style={{ textShadow: "0 0 10px rgba(239,68,68,0.2)" }}>
                                        100% financial aid required
                                    </p>
                                </div>
                                <p className="text-[15px] text-white/50 leading-[1.8] font-light mt-6">
                                    tks excites me alot because it gathers ambitious builders focused on frontier tech. joining this environment will just massively accelerate my learning and let me collab with people actually solving hard problems.
                                </p>
                                <p className="text-[15px] text-white/50 leading-[1.8] font-light mt-4">
                                    because my family's household income is currently <strong className="text-white/80 font-medium">below $10,000 CAD per year</strong>, i am applying for full financial aid. if i get in, im ready to prove i can straight up maximize every ounce of this opportunity.
                                </p>
                            </div>

                            {/* Contact Box */}
                            <div className="mt-8 p-6 rounded-xl border border-white/5 bg-white/[0.02]" id="contact">
                                <h4 className="text-white/80 font-medium mb-5 text-sm uppercase tracking-[0.1em]">get in touch</h4>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/60"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                        </div>
                                        <div>
                                            <p className="text-[11px] text-white/40 uppercase tracking-wider mb-0.5">Mobile Phone (Applicant)</p>
                                            <p className="text-[15px] font-medium text-white/90">+1 647 638 7018</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/60"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                        </div>
                                        <div>
                                            <p className="text-[11px] text-white/40 uppercase tracking-wider mb-0.5">Email (Applicant)</p>
                                            <p className="text-[15px] font-medium text-white/90">atirek.sd11@gmail.com</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/60"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                        </div>
                                        <div>
                                            <p className="text-[11px] text-white/40 uppercase tracking-wider mb-0.5">parent email (js dahiya)</p>
                                            <p className="text-[15px] font-medium text-white/90">jsdahiya.ca@gmail.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
