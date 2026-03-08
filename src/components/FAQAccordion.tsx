"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ease } from "@/lib/animations";

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQAccordionProps {
    items: FAQItem[];
    className?: string;
}

function FAQRow({ item, index }: { item: FAQItem; index: number }) {
    const [open, setOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06, duration: 0.5, ease }}
            className="border-b border-white/[0.04] last:border-b-0"
        >
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between py-6 text-left group"
            >
                <span className="text-[15px] font-medium text-white/60 group-hover:text-white/85 transition-colors duration-300 pr-8">
                    {item.question}
                </span>
                <motion.span
                    animate={{ rotate: open ? 45 : 0 }}
                    transition={{ duration: 0.25, ease }}
                    className="shrink-0 w-6 h-6 rounded-full border border-white/[0.08] flex items-center justify-center group-hover:border-white/[0.15] transition-colors duration-300"
                >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-white/25">
                        <path d="M5 0v10M0 5h10" stroke="currentColor" strokeWidth="1" />
                    </svg>
                </motion.span>
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease }}
                        className="overflow-hidden"
                    >
                        <p className="text-[14px] text-white/30 leading-[1.7] pb-6 pr-12">
                            {item.answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function FAQAccordion({ items, className = "" }: FAQAccordionProps) {
    return (
        <div className={`border-t border-white/[0.04] ${className}`}>
            {items.map((item, i) => (
                <FAQRow key={i} item={item} index={i} />
            ))}
        </div>
    );
}
