"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useVignette } from "./Vignette";

const roles = [
    { label: "Founder", icon: "🚀" },
    { label: "CTO", icon: "⚙️" },
    { label: "Developer", icon: "💻" },
    { label: "Student", icon: "🎓" },
    { label: "Teacher", icon: "📚" },
    { label: "Other", icon: "✦" },
];

const stepLabels = ["Your Info", "Your Role", "You're In"];

// Pre-computed sparkle positions to avoid Math.random() hydration mismatch
const sparkleOffsets = [
    { x: -80, y: -60 },
    { x: 70, y: -90 },
    { x: -95, y: 40 },
    { x: 85, y: 55 },
    { x: -40, y: -85 },
    { x: 50, y: 70 },
];

export default function WaitlistModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(0);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("");
    const [otherRole, setOtherRole] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const { setHidden } = useVignette();

    // Listen for trigger clicks
    useEffect(() => {
        const handler = (e: Event) => {
            const target = e.target as HTMLElement;
            const trigger = target.closest("[data-waitlist-trigger]");
            if (trigger) {
                e.preventDefault();
                setIsOpen(true);
            }
        };
        document.addEventListener("click", handler);
        return () => document.removeEventListener("click", handler);
    }, []);

    // Toggle vignette when modal opens/closes
    useEffect(() => {
        setHidden(isOpen);
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen, setHidden]);

    const close = () => {
        setIsOpen(false);
        // Reset after animation
        setTimeout(() => {
            setStep(0);
            setName("");
            setEmail("");
            setPhone("");
            setRole("");
            setOtherRole("");
            setSubmitError("");
        }, 400);
    };

    const canProceedStep0 = name.trim().length > 0 && email.trim().length > 0 && email.includes("@");
    const canProceedStep1 = role.length > 0 && (role !== "Other" || otherRole.trim().length > 0);

    const submitToWaitlist = async () => {
        setIsSubmitting(true);
        setSubmitError("");

        try {
            const res = await fetch(process.env.NEXT_PUBLIC_WAITLIST_URL!, {
                method: "POST",
                body: JSON.stringify({
                    name: name.trim(),
                    email: email.trim().toLowerCase(),
                    phone: phone.trim(),
                    role,
                    otherRole: role === "Other" ? otherRole.trim() : "",
                }),
            });

            const data = await res.json();

            if (data.status === "duplicate") {
                setStep(3);
                return;
            }

            setStep(2);
        } catch {
            setSubmitError("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleNext = () => {
        if (step === 0 && canProceedStep0) setStep(1);
        else if (step === 1 && canProceedStep1) submitToWaitlist();
    };

    const handleBack = () => {
        if (step > 0 && step < 2) {
            setStep(step - 1);
            setSubmitError("");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const target = e.target as HTMLInputElement;
            const form = target.closest(".space-y-5");
            if (form) {
                const inputs = Array.from(form.querySelectorAll("input"));
                const idx = inputs.indexOf(target);
                if (idx < inputs.length - 1) {
                    inputs[idx + 1].focus();
                    return;
                }
            }
            handleNext();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[200] flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black/70 backdrop-blur-xl"
                        onClick={close}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    {/* Modal Card */}
                    <motion.div
                        className="relative z-10 w-full max-w-[480px]"
                        initial={{ opacity: 0, y: 30, scale: 0.95, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: 20, scale: 0.97, filter: "blur(6px)" }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Ambient glow */}
                        <div className="absolute -inset-6 rounded-3xl pointer-events-none"
                            style={{
                                background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.03) 0%, transparent 70%)",
                                filter: "blur(20px)",
                            }}
                        />

                        <div
                            className="relative rounded-2xl overflow-hidden"
                            style={{
                                background: "rgba(10, 10, 10, 0.85)",
                                backdropFilter: "blur(40px) saturate(1.3)",
                                WebkitBackdropFilter: "blur(40px) saturate(1.3)",
                                border: "1px solid rgba(255,255,255,0.07)",
                                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 20px 60px rgba(0,0,0,0.5)",
                            }}
                        >
                            {/* Header */}
                            <div className="px-7 pt-7 pb-0">
                                <div className="flex items-start justify-between mb-1">
                                    <div>
                                        <h3 className="text-[22px] font-semibold text-white tracking-tight font-[var(--font-heading)]">
                                            Join the Waitlist
                                        </h3>
                                        <p className="text-[13px] text-white/30 font-light mt-1">
                                            {step === 2
                                                ? "Welcome aboard."
                                                : "We're in early access. Sign up and we'll get back to you soon."}
                                        </p>
                                    </div>
                                    <button
                                        onClick={close}
                                        className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/[0.06] transition-colors duration-200 text-white/30 hover:text-white/60 shrink-0 mt-0.5"
                                    >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M18 6L6 18M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Progress bar */}
                                <div className="flex gap-2 mt-5 mb-6">
                                    {stepLabels.map((_, i) => (
                                        <div key={i} className="flex-1 h-[3px] rounded-full overflow-hidden bg-white/[0.06]">
                                            <motion.div
                                                className="h-full rounded-full"
                                                style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.5), rgba(255,255,255,0.8))" }}
                                                initial={{ width: "0%" }}
                                                animate={{ width: step >= i ? "100%" : "0%" }}
                                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Step Content */}
                            <div className="px-7 pb-7">
                                <AnimatePresence mode="wait">
                                    {step === 0 && (
                                        <motion.div
                                            key="step0"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                            className="space-y-5"
                                            onKeyDown={handleKeyDown}
                                        >
                                            {/* Name */}
                                            <div>
                                                <label className="block text-[11px] uppercase tracking-[0.12em] text-white/40 font-medium mb-2">
                                                    Name <span className="text-red-400/60">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    placeholder="Your name"
                                                    className="waitlist-input"
                                                    autoFocus
                                                />
                                            </div>

                                            {/* Email */}
                                            <div>
                                                <label className="block text-[11px] uppercase tracking-[0.12em] text-white/40 font-medium mb-2">
                                                    Email <span className="text-red-400/60">*</span>
                                                </label>
                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="you@company.com"
                                                    className="waitlist-input"
                                                />
                                            </div>

                                            {/* Phone */}
                                            <div>
                                                <label className="block text-[11px] uppercase tracking-[0.12em] text-white/40 font-medium mb-2">
                                                    Phone <span className="text-white/15 normal-case tracking-normal">(Optional)</span>
                                                </label>
                                                <input
                                                    type="tel"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    placeholder="+1 (555) 000-0000"
                                                    className="waitlist-input"
                                                />
                                            </div>
                                        </motion.div>
                                    )}

                                    {step === 1 && (
                                        <motion.div
                                            key="step1"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                        >
                                            <label className="block text-[11px] uppercase tracking-[0.12em] text-white/40 font-medium mb-4">
                                                I am a... <span className="text-red-400/60">*</span>
                                            </label>
                                            <div className="grid grid-cols-3 gap-2.5 mb-4">
                                                {roles.map((r) => (
                                                    <button
                                                        key={r.label}
                                                        onClick={() => setRole(r.label)}
                                                        className="relative flex flex-col items-center gap-1.5 py-4 px-3 rounded-xl transition-all duration-300"
                                                        style={{
                                                            background: role === r.label ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.02)",
                                                            border: `1px solid ${role === r.label ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.05)"}`,
                                                            boxShadow: role === r.label ? "0 0 14px rgba(255,255,255,0.04)" : "none",
                                                        }}
                                                    >
                                                        <span className="text-[20px]">{r.icon}</span>
                                                        <span className={`text-[12px] font-medium transition-colors duration-200 ${role === r.label ? "text-white/80" : "text-white/35"
                                                            }`}>
                                                            {r.label}
                                                        </span>
                                                    </button>
                                                ))}
                                            </div>

                                            {/* Other — custom input */}
                                            <AnimatePresence>
                                                {role === "Other" && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                                                        className="overflow-hidden"
                                                    >
                                                        <input
                                                            type="text"
                                                            value={otherRole}
                                                            onChange={(e) => setOtherRole(e.target.value)}
                                                            placeholder="Tell us your role..."
                                                            className="waitlist-input mt-1"
                                                            autoFocus
                                                        />
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                        </motion.div>
                                    )}

                                    {step === 2 && (
                                        <motion.div
                                            key="step2"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                            className="text-center py-8"
                                        >
                                            {/* Animated checkmark */}
                                            <motion.div
                                                initial={{ scale: 0, rotate: -180 }}
                                                animate={{ scale: 1, rotate: 0 }}
                                                transition={{ delay: 0.2, duration: 0.6, type: "spring", stiffness: 200 }}
                                                className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
                                                style={{
                                                    background: "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
                                                    border: "1px solid rgba(255,255,255,0.1)",
                                                    boxShadow: "0 0 30px rgba(255,255,255,0.05)",
                                                }}
                                            >
                                                <motion.svg
                                                    width="28"
                                                    height="28"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="white"
                                                    strokeWidth="2.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    initial={{ pathLength: 0 }}
                                                    animate={{ pathLength: 1 }}
                                                    transition={{ delay: 0.5, duration: 0.4 }}
                                                >
                                                    <motion.path
                                                        d="M20 6L9 17l-5-5"
                                                        initial={{ pathLength: 0 }}
                                                        animate={{ pathLength: 1 }}
                                                        transition={{ delay: 0.5, duration: 0.4 }}
                                                    />
                                                </motion.svg>
                                            </motion.div>

                                            <motion.h3
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.4 }}
                                                className="text-[20px] font-semibold text-white mb-2"
                                            >
                                                You&apos;re on the list!
                                            </motion.h3>
                                            <motion.p
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.5 }}
                                                className="text-[14px] text-white/35 font-light leading-relaxed max-w-[280px] mx-auto"
                                            >
                                                We&apos;ll reach out when your spot opens up.
                                                <br />
                                                Welcome to the future of building.
                                            </motion.p>

                                            {/* Sparkle dots — pre-computed positions */}
                                            {sparkleOffsets.map((offset, i) => (
                                                <motion.div
                                                    key={i}
                                                    className="absolute w-1 h-1 rounded-full bg-white/20"
                                                    initial={{
                                                        x: 0,
                                                        y: 0,
                                                        scale: 0,
                                                        opacity: 0,
                                                    }}
                                                    animate={{
                                                        x: offset.x,
                                                        y: offset.y,
                                                        scale: [0, 1, 0],
                                                        opacity: [0, 0.6, 0],
                                                    }}
                                                    transition={{
                                                        delay: 0.3 + i * 0.1,
                                                        duration: 1.2,
                                                        ease: "easeOut",
                                                    }}
                                                    style={{
                                                        left: "50%",
                                                        top: "30%",
                                                    }}
                                                />
                                            ))}
                                        </motion.div>
                                    )}

                                    {step === 3 && (
                                        <motion.div
                                            key="step3"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                            className="text-center py-8"
                                        >
                                            {/* Checkmark circle */}
                                            <motion.div
                                                initial={{ scale: 0, rotate: -180 }}
                                                animate={{ scale: 1, rotate: 0 }}
                                                transition={{ delay: 0.2, duration: 0.6, type: "spring", stiffness: 200 }}
                                                className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
                                                style={{
                                                    background: "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
                                                    border: "1px solid rgba(255,255,255,0.1)",
                                                    boxShadow: "0 0 30px rgba(255,255,255,0.05)",
                                                }}
                                            >
                                                <motion.svg
                                                    width="28"
                                                    height="28"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="white"
                                                    strokeWidth="2.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <motion.path
                                                        d="M20 6L9 17l-5-5"
                                                        initial={{ pathLength: 0 }}
                                                        animate={{ pathLength: 1 }}
                                                        transition={{ delay: 0.5, duration: 0.4 }}
                                                    />
                                                </motion.svg>
                                            </motion.div>

                                            <motion.h3
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.4 }}
                                                className="text-[20px] font-semibold text-white mb-2"
                                            >
                                                Already on the list!
                                            </motion.h3>
                                            <motion.p
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.5 }}
                                                className="text-[14px] text-white/35 font-light leading-relaxed max-w-[280px] mx-auto"
                                            >
                                                You&apos;ve already signed up for the waitlist.
                                                <br />
                                                We&apos;ll be in touch soon.
                                            </motion.p>

                                            <motion.button
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.7 }}
                                                onClick={close}
                                                className="mt-6 px-8 py-2.5 rounded-full text-[13px] font-semibold text-black bg-white hover:bg-white/90 transition-colors duration-200"
                                            >
                                                Got it
                                            </motion.button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Footer Buttons */}
                                {step < 2 && (
                                    <div className="flex items-center justify-between mt-6 pt-5 border-t border-white/[0.05]">
                                        <button
                                            onClick={handleBack}
                                            className={`text-[13px] font-medium text-white/30 hover:text-white/50 transition-colors duration-200 ${step === 0 ? "invisible" : ""
                                                }`}
                                        >
                                            ← Back
                                        </button>
                                        <button
                                            onClick={handleNext}
                                            disabled={(step === 0 ? !canProceedStep0 : !canProceedStep1) || isSubmitting}
                                            className="btn-gradient !py-2.5 !px-6 !text-[12px] disabled:opacity-30 disabled:pointer-events-none"
                                        >
                                            {isSubmitting ? (
                                                <span className="flex items-center gap-2">
                                                    <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                                                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeLinecap="round" />
                                                    </svg>
                                                    Joining...
                                                </span>
                                            ) : step === 0 ? (
                                                <>
                                                    Next
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                                    </svg>
                                                </>
                                            ) : (
                                                <>
                                                    Join Waitlist
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                                    </svg>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                )}

                                {step === 2 && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.8 }}
                                        className="mt-4 text-center"
                                    >
                                        <button
                                            onClick={close}
                                            className="text-[13px] font-medium text-white/25 hover:text-white/50 transition-colors duration-200"
                                        >
                                            Close
                                        </button>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
