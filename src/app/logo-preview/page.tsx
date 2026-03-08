"use client";

import { LogoA, LogoB, LogoC, LogoD } from "@/components/VoydLogo";

export default function LogoPreview() {
    const logos = [
        { name: "A — Event Horizon", desc: "Solid disk with dark center hole + slash", Component: LogoA },
        { name: "B — Gravitational Lens", desc: "Double concentric rings + slash", Component: LogoB },
        { name: "C — Singularity", desc: "Solid disk, dark center dot, slash cuts through", Component: LogoC },
        { name: "D — Orbit Void", desc: "Central dot with tilted orbital ring", Component: LogoD },
    ];

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-16 p-12">
            <h1 className="text-3xl font-bold tracking-tight">VØYD Logo — Black Hole Concepts</h1>
            <p className="text-white/40 text-sm -mt-10">The Ø as a void / black hole — pick your favorite</p>

            <div className="grid grid-cols-2 gap-16">
                {logos.map(({ name, desc, Component }) => (
                    <div key={name} className="flex flex-col items-center gap-6">
                        {/* Large preview */}
                        <div className="w-44 h-44 rounded-2xl border border-white/10 flex items-center justify-center bg-white/[0.02]">
                            <Component size={90} className="text-white" />
                        </div>

                        {/* Size scale */}
                        <div className="flex items-center gap-5">
                            <Component size={40} className="text-white" />
                            <Component size={24} className="text-white" />
                            <Component size={16} className="text-white" />
                        </div>

                        {/* Wordmark */}
                        <div className="flex items-center gap-2.5">
                            <Component size={20} className="text-white/80" />
                            <span className="text-[15px] font-bold tracking-[-0.02em]">VØYD</span>
                        </div>

                        <div className="text-center">
                            <p className="text-xs text-white/50 font-medium">{name}</p>
                            <p className="text-[10px] text-white/25 mt-1">{desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
