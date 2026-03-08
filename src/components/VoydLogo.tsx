"use client";

/**
 * VØYD Logo Variations — Black Hole × Ø
 *
 * A: Event Horizon — ring with dark center + slash (accretion disk feel)
 * B: Gravitational Lens — thick outer ring, thin inner ring, slash warps through
 * C: Singularity — solid circle, dark void center hole, slash cuts through
 * D: Spiral Void — the slash curves/spirals into the center like matter falling in
 */

/* ─── A: Event Horizon ─── */
/* Thick outer ring (accretion disk) + dark empty center + diagonal slash */
export function LogoA({ size = 32, className = "" }: { size?: number; className?: string }) {
    const id = `a-${Math.random().toString(36).slice(2, 6)}`;
    return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
            <defs>
                <mask id={id}>
                    <rect width="40" height="40" fill="white" />
                    {/* Inner void (black hole center) */}
                    <circle cx="20" cy="20" r="6" fill="black" />
                    {/* Diagonal slash cut */}
                    <line x1="8" y1="32" x2="32" y2="8" stroke="black" strokeWidth="3.5" strokeLinecap="round" />
                </mask>
            </defs>
            <circle cx="20" cy="20" r="15" fill="currentColor" mask={`url(#${id})`} />
        </svg>
    );
}

/* ─── B: Gravitational Lens ─── */
/* Two concentric rings (like gravitational lensing) with the void slash */
export function LogoB({ size = 32, className = "" }: { size?: number; className?: string }) {
    const id = `b-${Math.random().toString(36).slice(2, 6)}`;
    return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
            <defs>
                <mask id={id}>
                    <rect width="40" height="40" fill="white" />
                    <line x1="8" y1="33" x2="33" y2="8" stroke="black" strokeWidth="3" strokeLinecap="round" />
                </mask>
            </defs>
            {/* Outer ring */}
            <circle cx="20" cy="20" r="15" stroke="currentColor" strokeWidth="3" mask={`url(#${id})`} />
            {/* Inner ring */}
            <circle cx="20" cy="20" r="8" stroke="currentColor" strokeWidth="2" mask={`url(#${id})`} />
        </svg>
    );
}

/* ─── C: Singularity ─── */
/* Solid filled disk with a perfect dark circle void in the center + slash */
export function LogoC({ size = 32, className = "" }: { size?: number; className?: string }) {
    const id = `c-${Math.random().toString(36).slice(2, 6)}`;
    return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
            <defs>
                <mask id={id}>
                    <rect width="40" height="40" fill="white" />
                    {/* Central singularity */}
                    <circle cx="20" cy="20" r="6.5" fill="black" />
                    {/* Void slash */}
                    <line x1="9" y1="33" x2="33" y2="9" stroke="black" strokeWidth="4" strokeLinecap="round" />
                </mask>
            </defs>
            <circle cx="20" cy="20" r="15" fill="currentColor" mask={`url(#${id})`} />
        </svg>
    );
}

/* ─── D: Orbit Void ─── */
/* Tilted ellipse (orbit ring) around a central void dot — like a planet/black hole with orbital ring */
export function LogoD({ size = 32, className = "" }: { size?: number; className?: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
            {/* Central void dot */}
            <circle cx="20" cy="20" r="5" fill="currentColor" />
            {/* Tilted orbital ring */}
            <ellipse
                cx="20"
                cy="20"
                rx="16"
                ry="7"
                stroke="currentColor"
                strokeWidth="2"
                transform="rotate(-35 20 20)"
            />
        </svg>
    );
}

/* ─── Default export (whichever gets chosen) ─── */
export function VoydLogo({ size = 24, className = "" }: { size?: number; className?: string }) {
    return <LogoC size={size} className={className} />;
}
