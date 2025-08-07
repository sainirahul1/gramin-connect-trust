import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import Footer from "@/components/Footer";

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
      </main>
      <Footer />
    </div>
  );
};

export default Index;