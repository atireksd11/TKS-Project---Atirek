"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import BookDemoButton from "@/components/BookDemoButton";
import GradientDivider from "@/components/GradientDivider";

export default function InvestorContact() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <section className="section-spacing relative aurora-bg" ref={ref}>
            <GradientDivider className="absolute top-0 left-0 right-0" />

            <div className="orb orb-teal w-[500px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ opacity: 0.06 }} />

            <div className="section-container text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
                    animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="mb-6 text-gradient-accent" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
                        Interested in VØYD?
                    </h2>
                    <p className="text-lg md:text-xl text-[var(--fg-muted)] mb-14 max-w-md mx-auto leading-relaxed font-light">
                        We&apos;re building the next chapter of software development. Let&apos;s talk.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                        <div className="glow-pulse rounded-full">
                            <BookDemoButton size="large" variant="primary">
                                Contact Us
                            </BookDemoButton>
                        </div>
                        <BookDemoButton size="large" variant="secondary">
                            Book a Demo
                        </BookDemoButton>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
