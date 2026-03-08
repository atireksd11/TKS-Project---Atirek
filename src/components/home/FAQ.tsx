"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const faqs = [
    {
        q: "How does VØYD actually work?",
        a: "You describe the product you want to build in plain language. VØYD's AI agents then architect the system, write the code, test everything, and deploy it live. You get a working application, not a mockup or a plan.",
    },
    {
        q: "Do I need any technical skills to use this?",
        a: "Not at all. If you can explain your idea to a friend, you can use VØYD. You won't need to touch code, configure servers, or learn any dev tools. That's the whole point.",
    },
    {
        q: "What kind of things can VØYD build?",
        a: "Web applications, SaaS products, internal business tools, mobile app backends, admin dashboards, AI powered workflows, and more. Basically, if it runs on the web, VØYD can build it for you.",
    },
    {
        q: "How much money does this actually save compared to hiring?",
        a: "A mid level developer costs around $120K a year before you add benefits, equity, and management time. And that's just one person. VØYD replaces the output of an entire development team at a fraction of that cost, and the work gets done in days instead of months.",
    },
    {
        q: "Is the code production ready or just a prototype?",
        a: "Everything VØYD ships is production grade. That means real authentication, real databases, tested APIs, SSL, monitoring, and proper deployment infrastructure. It's not a demo. It's software you can put in front of paying customers on day one.",
    },
    {
        q: "When will I get access?",
        a: "We're rolling out access in waves during our private beta. Join the waitlist and we'll reach out as soon as your spot opens. Everyone who joins now locks in our lowest pricing permanently, and gets direct access to our founding team.",
    },
    {
        q: "Can I make changes after the product is built?",
        a: "Yes. You can request changes or new features the same way you described the original product. VØYD updates the codebase, runs tests again, and redeploys. Think of it like having an engineering team on call.",
    },
    {
        q: "What if I already have a development team?",
        a: "VØYD works great alongside existing teams too. You can use it to clear your backlog, prototype new ideas quickly, or handle the parts of development that slow your engineers down. It doesn't have to be all or nothing.",
    },
];

function FAQItem({
    item,
    isOpen,
    toggle,
}: {
    item: (typeof faqs)[0];
    isOpen: boolean;
    toggle: () => void;
    index: number;
}) {
    return (
        <div className="border-b border-white/[0.04] last:border-b-0">
            <button
                onClick={toggle}
                className="w-full flex items-center justify-between py-5 md:py-6 text-left group"
            >
                <span
                    className={`text-[14px] md:text-[15px] font-medium transition-colors duration-300 pr-4 ${isOpen ? "text-white/80" : "text-white/45 group-hover:text-white/60"
                        }`}
                >
                    {item.q}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="shrink-0 w-6 h-6 rounded-lg flex items-center justify-center transition-colors duration-300"
                    style={{
                        background: isOpen ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.02)",
                        border: `1px solid ${isOpen ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)"}`,
                    }}
                >
                    <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className={`transition-colors duration-300 ${isOpen ? "text-white/60" : "text-white/25"}`}
                    >
                        <path d="M12 5v14M5 12h14" />
                    </svg>
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                    >
                        <p className="pb-5 md:pb-6 text-[13px] md:text-[14px] text-white/35 leading-[1.85] max-w-xl">
                            {item.a}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function FAQ() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="section-spacing relative overflow-hidden" ref={ref}>
            {/* Background image — diagonal ridges */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: "url('/faq-bg.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    opacity: 0.6,
                    transform: "scale(1.15)",
                }}
            />


            <div className="section-container relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-12"
                >
                    <span className="block text-[11px] tracking-[0.3em] uppercase text-white/30 mb-5 font-medium">
                        FAQ
                    </span>
                    <h2 className="font-semibold">Frequently Asked Questions</h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                    className="max-w-[680px] mx-auto rounded-2xl px-6 md:px-8 py-2"
                    style={{
                        background: "rgba(255,255,255,0.015)",
                        border: "1px solid rgba(255,255,255,0.04)",
                        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02)",
                    }}
                >
                    {faqs.map((item, i) => (
                        <FAQItem
                            key={i}
                            item={item}
                            isOpen={openIndex === i}
                            toggle={() => setOpenIndex(openIndex === i ? null : i)}
                            index={i}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
