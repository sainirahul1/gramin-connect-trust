import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import AssistantWidget from "@/components/AssistantWidget";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <div id="services">
          <ServicesSection />
        </div>
        <div id="how-it-works">
          <HowItWorksSection />
        </div>
        <TestimonialsSection />
      </main>
      <Footer />
      <AssistantWidget />
    </div>
  );
};

export default Index;