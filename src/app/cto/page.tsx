import type { Metadata } from "next";
import Footer from "@/components/Footer";
import CTOHero from "@/components/cto/CTOHero";
import CapabilitiesGrid from "@/components/cto/CapabilitiesGrid";
import DemoCarousel from "@/components/cto/DemoCarousel";
import AgentsList from "@/components/cto/AgentsList";
import TechPartners from "@/components/cto/TechPartners";
import PricingTeaser from "@/components/cto/PricingTeaser";

export const metadata: Metadata = {
    title: "CTO",
    description:
        "AI agents that architect, build, deploy, and secure your product. Not a tool — a tech department.",
};

export default function CTOPage() {
    return (
        <>
            <main>
                <CTOHero />
                <CapabilitiesGrid />
                <DemoCarousel />
                <AgentsList />
                <TechPartners />
                <PricingTeaser />
            </main>
            <Footer />
        </>
    );
}
