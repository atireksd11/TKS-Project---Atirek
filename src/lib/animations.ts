import { Variants } from "framer-motion";

/* ─── Core easing ─── */
export const ease = [0.25, 0.46, 0.45, 0.94] as const;
export const easeBounce = [0.34, 1.56, 0.64, 1] as const;

/* ─── Stagger container ─── */
export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.1,
        },
    },
};

export const staggerContainerSlow: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.15,
        },
    },
};

/* ─── Fade variants ─── */
export const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease },
    },
};

export const fadeDown: Variants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease },
    },
};

export const fadeLeft: Variants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.7, ease },
    },
};

export const fadeRight: Variants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.7, ease },
    },
};

export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.8, ease },
    },
};

/* ─── Scale variants ─── */
export const scaleUp: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6, ease },
    },
};

export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.7, ease: easeBounce },
    },
};

/* ─── Hover variants ─── */
export const cardHover: Variants = {
    rest: { scale: 1, y: 0 },
    hover: {
        scale: 1.02,
        y: -4,
        transition: { duration: 0.3, ease },
    },
};

export const ctaHover: Variants = {
    rest: { scale: 1 },
    hover: { scale: 1.04, transition: { duration: 0.25, ease } },
    tap: { scale: 0.97, transition: { duration: 0.1 } },
};

/* ─── Page transition ─── */
export const pageTransition: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease },
    },
    exit: {
        opacity: 0,
        y: -10,
        transition: { duration: 0.3, ease },
    },
};

/* ─── Line draw ─── */
export const drawLine: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
        pathLength: 1,
        opacity: 1,
        transition: { duration: 1.5, ease },
    },
};

/* ─── Blur in ─── */
export const blurIn: Variants = {
    hidden: { opacity: 0, filter: "blur(12px)" },
    visible: {
        opacity: 1,
        filter: "blur(0px)",
        transition: { duration: 0.8, ease },
    },
};
