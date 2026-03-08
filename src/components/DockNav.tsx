"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { VoydLogo } from "@/components/VoydLogo";

const navItems = [
    { label: "Home", href: "/" },
    { label: "Vision", href: "/#vision" },
    { label: "Summary", href: "/#summary" },
    { label: "Contact", href: "/#contact" },
];

export default function DockNav() {
    const [isVisible, setIsVisible] = useState(true);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [mouseX, setMouseX] = useState(0);
    const navRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const lastScrollY = useRef(0);
    const { scrollY } = useScroll();

    // Hide on scroll down, show on scroll up
    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 500 && latest > lastScrollY.current) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
        lastScrollY.current = latest;
    });

    // Show when mouse near bottom
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (e.clientY > window.innerHeight - 60) {
                setIsVisible(true);
            }
            // Track mouse X for glow effect
            if (navRef.current) {
                const rect = navRef.current.getBoundingClientRect();
                setMouseX(e.clientX - rect.left);
            }
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.nav
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 80, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 25 }}
                    className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[100]"
                >
                    <div
                        ref={navRef}
                        className="relative flex items-center gap-0 rounded-2xl overflow-hidden"
                        style={{
                            background: "rgba(12, 12, 12, 0.6)",
                            backdropFilter: "blur(40px) saturate(1.6)",
                            WebkitBackdropFilter: "blur(40px) saturate(1.6)",
                            border: "1px solid rgba(255, 255, 255, 0.07)",
                            boxShadow: `
                                0 16px 64px rgba(0, 0, 0, 0.6),
                                inset 0 1px 0 rgba(255, 255, 255, 0.05),
                                inset 0 -1px 0 rgba(255, 255, 255, 0.02)
                            `,
                        }}
                    >
                        {/* Magnetic glow that follows mouse */}
                        <div
                            className="absolute inset-0 pointer-events-none opacity-30 transition-opacity duration-300"
                            style={{
                                background: `radial-gradient(120px circle at ${mouseX}px 50%, rgba(255, 255, 255, 0.08), transparent 70%)`,
                            }}
                        />

                        {/* Logo */}
                        <Link
                            href="/"
                            className="relative z-10 flex items-center justify-center h-full px-4 py-3 border-r border-white/[0.06] group"
                        >
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="text-white/60 group-hover:text-white transition-colors duration-200"
                            >
                                <VoydLogo size={18} />
                            </motion.div>
                        </Link>

                        {/* Nav items */}
                        <div className="relative z-10 flex items-center">
                            {navItems.map((item, i) => {
                                const isActive =
                                    pathname === item.href ||
                                    (item.href !== "/" && pathname.startsWith(item.href.split("#")[0]) && item.href.split("#")[0] !== "/");

                                const handleClick = (e: React.MouseEvent) => {
                                    e.preventDefault();
                                    const hash = item.href.includes("#") ? item.href.split("#")[1] : null;
                                    if (!hash || item.href === "/") {
                                        window.scrollTo({ top: 0, behavior: "smooth" });
                                        return;
                                    }
                                    const el = document.getElementById(hash);
                                    if (el) {
                                        el.scrollIntoView({ behavior: "smooth", block: "start" });
                                    }
                                };

                                return (
                                    <button
                                        key={item.label}
                                        onClick={handleClick}
                                        onMouseEnter={() => setHoveredIndex(i)}
                                        onMouseLeave={() => setHoveredIndex(null)}
                                        className="relative"
                                    >
                                        <motion.div
                                            className={`
                                                relative px-4 py-3 text-[13px] font-medium transition-colors duration-200
                                                ${isActive
                                                    ? "text-white"
                                                    : "text-white/35 hover:text-white/70"
                                                }
                                            `}
                                        >
                                            {item.label}

                                            {/* Active indicator — subtle glow line under text */}
                                            {isActive && (
                                                <motion.div
                                                    layoutId="nav-active"
                                                    className="absolute bottom-1 left-3 right-3 h-[2px] rounded-full"
                                                    style={{
                                                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
                                                    }}
                                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                                />
                                            )}

                                            {/* Hover background */}
                                            {hoveredIndex === i && !isActive && (
                                                <motion.div
                                                    layoutId="nav-hover"
                                                    className="absolute inset-1 rounded-lg bg-white/[0.05]"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.15 }}
                                                    style={{ zIndex: -1 }}
                                                />
                                            )}
                                        </motion.div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Separator */}
                        <div className="w-px h-5 bg-white/[0.06] mx-0.5" />

                        {/* CTA — Liquid Chrome gradient */}
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }}
                            className="btn-gradient relative z-10 mx-2 my-1.5 !px-4 !py-2 !text-[11px] !gap-1.5"
                        >
                            Get In Touch
                            <svg
                                width="11"
                                height="11"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                            >
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </motion.nav>
            )}
        </AnimatePresence>
    );
}
