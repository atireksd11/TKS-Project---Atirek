"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
    role: "user" | "assistant";
    content: string;
    isCode?: boolean;
}

const demoMessages: Message[] = [
    {
        role: "user",
        content: "Set up a Next.js app with auth and a dashboard.",
    },
    {
        role: "assistant",
        content:
            "Analyzing requirements... I'll scaffold a Next.js 15 app with Supabase Auth, protected routes, and a dashboard layout.",
    },
    {
        role: "assistant",
        content: `// Generated project structure
├── src/app/
│   ├── (auth)/login/page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── layout.tsx
│   └── middleware.ts
├── supabase/
│   └── config.ts
└── package.json`,
        isCode: true,
    },
    {
        role: "assistant",
        content:
            "✓ Project scaffolded. Auth middleware configured. Dashboard route protected. Ready to deploy.",
    },
];

export default function CopilotDemo() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center gap-2 text-sm text-[var(--accent)] hover:text-white transition-colors group cursor-pointer"
                aria-label="Open CTO Copilot demo"
            >
                <span className="inline-block w-2 h-2 rounded-full bg-[var(--accent)] group-hover:animate-pulse" />
                See CTO in action
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="transition-transform group-hover:translate-x-1"
                >
                    <path
                        d="M6 4L10 8L6 12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={(e) => {
                            if (e.target === e.currentTarget) setIsOpen(false);
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden"
                            role="dialog"
                            aria-modal="true"
                            aria-label="CTO Copilot demo"
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] animate-pulse" />
                                    <span className="text-sm font-medium tracking-wide">
                                        CTO Copilot
                                    </span>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-[var(--fg-subtle)] hover:text-white transition-colors p-1"
                                    aria-label="Close demo"
                                >
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path
                                            d="M4 4L12 12M12 4L4 12"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </button>
                            </div>

                            {/* Chat Messages */}
                            <div className="p-5 space-y-4 max-h-[400px] overflow-y-auto">
                                {demoMessages.map((msg, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.4, duration: 0.4 }}
                                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"
                                            }`}
                                    >
                                        <div
                                            className={`max-w-[85%] rounded-xl px-4 py-3 text-sm leading-relaxed ${msg.role === "user"
                                                    ? "bg-white/10 text-white"
                                                    : msg.isCode
                                                        ? "bg-[#111] border border-white/5 font-mono text-xs text-[var(--fg-muted)] whitespace-pre"
                                                        : "text-[var(--fg-muted)]"
                                                }`}
                                        >
                                            {msg.content}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Input bar (decorative) */}
                            <div className="px-5 py-4 border-t border-white/5">
                                <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3">
                                    <span className="text-sm text-[var(--fg-subtle)]">
                                        Ask CTO anything...
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
