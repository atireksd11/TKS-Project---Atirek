import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

import CustomCursor from "@/components/CustomCursor";
import PageTransition from "@/components/PageTransition";
import SmoothScroll from "@/components/SmoothScroll";
import Vignette, { VignetteProvider } from "@/components/Vignette";
import WaitlistModal from "@/components/WaitlistModal";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});

const outfit = Outfit({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-display",
    weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
    metadataBase: new URL("https://voyd.xyz"),
    title: {
        default: "Project Aether",
        template: "%s | Project Aether",
    },
    description:
        "A blueprint for the future of Intelligence, Energy, and Compute. Scaling AGI through physical infrastructure.",
    openGraph: {
        title: "Project Aether",
        description:
            "A blueprint for the future of Intelligence, Energy, and Compute. Scaling AGI through physical infrastructure.",
        siteName: "Project Aether",
        locale: "en_CA",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Project Aether",
        description:
            "A blueprint for the future of Intelligence, Energy, and Compute. Scaling AGI through physical infrastructure.",
    },
    robots: { index: true, follow: true },
    icons: {
        icon: "/logos/2_large.png",
        apple: "/logos/2_large.png",
    },
};

import DockNav from "@/components/DockNav";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en-CA" className={`${inter.variable} ${outfit.variable}`}>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Organization",
                            name: "Project Aether",
                            url: "https://voyd.xyz",
                            description:
                                "A blueprint for the future of Intelligence, Energy, and Compute. Scaling AGI through physical infrastructure.",
                            parentOrganization: {
                                "@type": "Organization",
                                name: "Project Aether",
                            },
                        }),
                    }}
                />
            </head>
            <body className="antialiased noise-overlay">
                <VignetteProvider>
                    <CustomCursor />
                    <Vignette />
                    <SmoothScroll>
                        <PageTransition>
                            {children}
                        </PageTransition>
                    </SmoothScroll>
                    <DockNav />
                    <WaitlistModal />
                </VignetteProvider>
            </body>
        </html>
    );
}
