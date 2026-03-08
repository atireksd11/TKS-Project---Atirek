"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

const VignetteContext = createContext<{
    hidden: boolean;
    setHidden: (v: boolean) => void;
}>({ hidden: false, setHidden: () => { } });

export function useVignette() {
    return useContext(VignetteContext);
}

export function VignetteProvider({ children }: { children: ReactNode }) {
    const [hidden, setHidden] = useState(false);
    return (
        <VignetteContext.Provider value={{ hidden, setHidden }}>
            {children}
        </VignetteContext.Provider>
    );
}

export default function Vignette() {
    const { hidden } = useVignette();

    return (
        <AnimatePresence>
            {!hidden && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="vignette-overlay"
                    aria-hidden="true"
                />
            )}
        </AnimatePresence>
    );
}
