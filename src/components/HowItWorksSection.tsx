import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  UserCheck, 
  MessageCircle, 
  CreditCard,
  Star,
  Shield,
  Clock,
  MapPin
} from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Search,
    title: "Find Workers",
    description: "Search by skill, location, and ratings. Browse verified profiles with photos and reviews.",
    features: ["Location-based search", "Skill verification", "Real reviews"]
  },
  {
    step: "02",
    icon: MessageCircle,
    title: "Connect & Discuss",
    description: "Chat directly with workers. Discuss your project, timeline, and budget securely.",
    features: ["Private messaging", "Voice calls", "Project quotes"]
  },
  {
    step: "03",
    icon: UserCheck,
    title: "Hire & Track",
    description: "Confirm booking and track progress. Get real-time updates and photos of work.",
    features: ["Live tracking", "Progress photos", "Timeline updates"]
  },
  {
    step: "04",
    icon: CreditCard,
    title: "Pay & Review",
    description: "Secure payment on completion. Rate your experience to help others in the community.",
    features: ["Secure payments", "UPI integration", "Rating system"]
  }
];

const forWorkers = [
  {
    icon: Shield,
    title: "Get Verified",
    description: "Complete your profile with skills, photos, and documents for trust badges."
  },
  {
    icon: MapPin,
    title: "Set Your Area",
    description: "Define your service area and receive job notifications nearby."
  },
  {
    icon: Clock,
    title: "Manage Jobs",
    description: "Accept jobs that fit your schedule and track your earnings."
  },
  {
    icon: Star,
    title: "Build Reputation",
    description: "Deliver quality work and earn 5-star reviews for more opportunities."
  }
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        {/* For Customers */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <Search className="w-3 h-3 mr-1" />
              For Customers
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How to Find
              <span className="bg-gradient-hero bg-clip-text text-transparent"> Trusted Workers</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get quality work done by verified local professionals in just a few simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <Card key={step.step} className="relative group hover:shadow-elegant transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-full bg-gradient-hero flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div className="text-4xl font-bold text-primary/20 group-hover:text-primary/40 transition-colors">
                          {step.step}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-lg mb-2">
                          {step.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {step.description}
                        </p>
                      </div>

                      <div className="space-y-2">
                        {step.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>

                  {/* Connection Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-primary/50 to-primary/20 transform -translate-y-1/2"></div>
                  )}
                </Card>
              );
            })}
          </div>

          <div className="text-center">
            <Button variant="hero" size="lg">
              Start Finding Workers
            </Button>
          </div>
        </div>

        {/* For Workers */}
        <div className="bg-gradient-to-br from-secondary/10 to-accent/5 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-secondary/20 text-secondary border-secondary/30">
              For Workers
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Build Your
              <span className="bg-gradient-secondary bg-clip-text text-transparent"> Digital Business</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of skilled workers earning more through our platform. 
              Get discovered, build trust, and grow your income.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {forWorkers.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={item.title} className="text-center group">
                  <div className="w-16 h-16 rounded-full bg-gradient-secondary mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <IconComponent className="w-8 h-8 text-secondary-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Button variant="secondary" size="lg">
              Join as Worker
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;