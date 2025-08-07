import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Star, 
  MapPin, 
  Clock, 
  Shield, 
  Phone,
  MessageCircle,
  Wrench,
  Zap,
  Scissors,
  CheckCircle,
  Users,
  ArrowRight
} from "lucide-react";

// Import worker images
import plumber1 from "@/assets/worker-plumber-1.jpg";
import electrician1 from "@/assets/worker-electrician-1.jpg";
import tailor1 from "@/assets/worker-tailor-1.jpg";
import plumber2 from "@/assets/worker-plumber-2.jpg";

const featuredWorkers = [
  {
    id: 1,
    name: "Rajesh Kumar",
    category: "Plumbing",
    icon: Wrench,
    image: plumber1,
    rating: 4.9,
    reviews: 127,
    experience: "8 years",
    location: "Koramangala, Bangalore",
    price: "₹350/hour",
    services: ["Pipe Repair", "Bathroom Installation", "Water Heater Setup", "Drain Cleaning"],
    availability: "Available Now",
    verified: true,
    completedJobs: 450,
    description: "Expert in residential and commercial plumbing with specialization in modern pipe systems.",
    lastActive: "2 hours ago"
  },
  {
    id: 2,
    name: "Amit Sharma",
    category: "Electrical",
    icon: Zap,
    image: electrician1,
    rating: 4.8,
    reviews: 89,
    experience: "6 years",
    location: "Indiranagar, Bangalore",
    price: "₹400/hour",
    services: ["House Wiring", "Appliance Installation", "Switch Board Setup", "Fan Installation"],
    availability: "Available Tomorrow",
    verified: true,
    completedJobs: 320,
    description: "Licensed electrician with expertise in home automation and electrical safety systems.",
    lastActive: "1 hour ago"
  },
  {
    id: 3,
    name: "Sunita Devi",
    category: "Tailoring",
    icon: Scissors,
    image: tailor1,
    rating: 4.9,
    reviews: 156,
    experience: "12 years",
    location: "Jayanagar, Bangalore",
    price: "₹200/piece",
    services: ["Saree Blouse", "Salwar Kameez", "Alterations", "Wedding Outfits"],
    availability: "Available Now",
    verified: true,
    completedJobs: 890,
    description: "Specialized in traditional Indian wear and modern clothing alterations with precision fitting.",
    lastActive: "30 minutes ago"
  },
  {
    id: 4,
    name: "Mohan Lal",
    category: "Plumbing",
    icon: Wrench,
    image: plumber2,
    rating: 4.7,
    reviews: 203,
    experience: "15 years",
    location: "Whitefield, Bangalore",
    price: "₹320/hour",
    services: ["Pipeline Installation", "Leak Detection", "Tap Repair", "Geyser Service"],
    availability: "Available Now",
    verified: true,
    completedJobs: 780,
    description: "Senior plumber with extensive experience in complex residential and commercial projects.",
    lastActive: "4 hours ago"
  }
];

const FeaturedWorkersSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            <Users className="w-3 h-3 mr-1" />
            Featured Workers
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meet Our
            <span className="bg-gradient-hero bg-clip-text text-transparent"> Top Rated Workers</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Verified professionals ready to help with your projects. Browse profiles, 
            read reviews, and connect directly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredWorkers.map((worker) => {
            const IconComponent = worker.icon;
            return (
              <Card key={worker.id} className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-0">
                  {/* Worker Image */}
                  <div className="relative">
                    <img 
                      src={worker.image} 
                      alt={worker.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    
                    {/* Availability Badge */}
                    <Badge 
                      className={`absolute top-3 right-3 ${
                        worker.availability === "Available Now" 
                          ? "bg-accent text-accent-foreground" 
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      <Clock className="w-3 h-3 mr-1" />
                      {worker.availability}
                    </Badge>

                    {/* Verification Badge */}
                    {worker.verified && (
                      <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                        <Shield className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}

                    {/* Category Icon */}
                    <div className="absolute bottom-0 left-4 transform translate-y-1/2">
                      <div className="w-12 h-12 rounded-full bg-gradient-hero flex items-center justify-center shadow-elegant">
                        <IconComponent className="w-6 h-6 text-primary-foreground" />
                      </div>
                    </div>
                  </div>

                  {/* Worker Details */}
                  <div className="p-6 pt-8">
                    <div className="space-y-4">
                      {/* Header */}
                      <div>
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                          {worker.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">{worker.category} Specialist</p>
                      </div>

                      {/* Rating & Reviews */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{worker.rating}</span>
                          <span className="text-sm text-muted-foreground">({worker.reviews})</span>
                        </div>
                        <div className="text-sm text-muted-foreground">{worker.experience}</div>
                      </div>

                      {/* Location & Price */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          {worker.location}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-primary">{worker.price}</span>
                          <span className="text-sm text-muted-foreground">{worker.completedJobs} jobs</span>
                        </div>
                      </div>

                      {/* Services */}
                      <div>
                        <div className="text-sm font-medium mb-2">Services:</div>
                        <div className="flex flex-wrap gap-1">
                          {worker.services.slice(0, 2).map((service, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                          {worker.services.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{worker.services.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2">
                        <Button variant="hero" size="sm" className="flex-1">
                          <MessageCircle className="w-3 h-3 mr-1" />
                          Chat
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Phone className="w-3 h-3 mr-1" />
                          Call
                        </Button>
                      </div>

                      {/* Last Active */}
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-accent"></div>
                        Active {worker.lastActive}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button variant="outline" size="lg" className="group">
            View All Workers
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Category Stats */}
        <div className="grid grid-cols-3 gap-6 mt-16 p-8 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-hero mx-auto mb-3 flex items-center justify-center">
              <Wrench className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="text-2xl font-bold text-primary">250+</div>
            <div className="text-sm text-muted-foreground">Plumbers</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-secondary mx-auto mb-3 flex items-center justify-center">
              <Zap className="w-6 h-6 text-secondary-foreground" />
            </div>
            <div className="text-2xl font-bold text-secondary">180+</div>
            <div className="text-sm text-muted-foreground">Electricians</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-accent mx-auto mb-3 flex items-center justify-center">
              <Scissors className="w-6 h-6 text-accent-foreground" />
            </div>
            <div className="text-2xl font-bold text-accent">120+</div>
            <div className="text-sm text-muted-foreground">Tailors</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWorkersSection;