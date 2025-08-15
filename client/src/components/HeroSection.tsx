import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Shield, 
  MapPin, 
  Star, 
  Hammer, 
  Wrench,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import heroImage from "@/assets/hero-workers.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5 overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 animate-float">
          <div className="w-16 h-16 rounded-full bg-gradient-secondary opacity-20"></div>
        </div>
        <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '1s' }}>
          <div className="w-12 h-12 rounded-full bg-gradient-accent opacity-20"></div>
        </div>
        <div className="absolute bottom-32 left-1/4 animate-float" style={{ animationDelay: '2s' }}>
          <div className="w-20 h-20 rounded-full bg-gradient-hero opacity-15"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-16 pb-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-8rem)]">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                <Users className="w-3 h-3 mr-1" />
                Empowering Local Communities
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Your Trusted
                <span className="bg-gradient-hero bg-clip-text text-transparent block">
                  Local Skills
                </span>
                Marketplace
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-xl">
                Connecting skilled workers with local customers. Find trusted carpenters, 
                masons, plumbers, electricians, and more in your area. Build your business, 
                earn with dignity.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-accent" />
                Verified Workers
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-accent" />
                Secure Payments
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-accent" />
                24/7 Support
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button variant="hero" size="lg" className="group" asChild>
                <a href="#services">
                  Find Workers
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <a href="/worker-login">
                  Join as Worker
                </a>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">10K+</div>
                <div className="text-sm text-muted-foreground">Skilled Workers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">50K+</div>
                <div className="text-sm text-muted-foreground">Jobs Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">4.8★</div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <img 
                src={heroImage} 
                alt="Skilled workers including carpenter, mason, plumber, electrician, and tailor" 
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              
              {/* Floating Cards */}
              <Card className="absolute -top-4 -left-4 p-4 bg-card/95 backdrop-blur-sm shadow-warm animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-accent flex items-center justify-center">
                    <Shield className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Verified</div>
                    <div className="text-xs text-muted-foreground">100% Trusted</div>
                  </div>
                </div>
              </Card>

              <Card className="absolute -bottom-4 -right-4 p-4 bg-card/95 backdrop-blur-sm shadow-success animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-secondary flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-secondary-foreground" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Nearby</div>
                    <div className="text-xs text-muted-foreground">Local Service</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-trust opacity-10 rounded-2xl blur-xl scale-105"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;