import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import ProblemSection from "@/components/home/ProblemSection";
import CTOPreview from "@/components/home/CTOPreview";
import CapabilitiesSection from "@/components/home/CapabilitiesSection";
import HowItWorks from "@/components/home/HowItWorks";
import FounderSection from "@/components/home/FounderSection";
import SummarySection from "@/components/home/SummarySection";

function Divider() {
    return <div className="gradient-divider" />;
}

export default function HomePage() {
    return (
        <>
            <main>
                <HeroSection />
                <Divider />
                <ProblemSection />
                <Divider />
                <CTOPreview />
                <Divider />
                <CapabilitiesSection />
                <Divider />
                <HowItWorks />
                <Divider />
                <FounderSection />
                <Divider />
                <SummarySection />
                <Footer />
            </main>
        </>
    );
}
