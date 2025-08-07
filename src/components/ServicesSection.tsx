import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Hammer, 
  Wrench, 
  Zap, 
  Paintbrush, 
  Home, 
  Car,
  Scissors,
  Users
} from "lucide-react";

const services = [
  {
    icon: Hammer,
    title: "Carpentry",
    description: "Furniture making, repairs, custom woodwork",
    workers: "1,200+",
    color: "text-orange-600",
    bgColor: "bg-orange-50"
  },
  {
    icon: Home,
    title: "Masonry",
    description: "Construction, brickwork, tiling, plastering",
    workers: "800+",
    color: "text-amber-600",
    bgColor: "bg-amber-50"
  },
  {
    icon: Wrench,
    title: "Plumbing",
    description: "Pipe repairs, installations, maintenance",
    workers: "600+",
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    icon: Zap,
    title: "Electrical",
    description: "Wiring, repairs, appliance installation",
    workers: "500+",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50"
  },
  {
    icon: Scissors,
    title: "Tailoring",
    description: "Clothing alterations, custom stitching",
    workers: "400+",
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  },
  {
    icon: Paintbrush,
    title: "Painting",
    description: "Interior, exterior, decorative painting",
    workers: "350+",
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    icon: Car,
    title: "Automotive",
    description: "Vehicle repairs, maintenance, servicing",
    workers: "300+",
    color: "text-red-600",
    bgColor: "bg-red-50"
  },
  {
    icon: Users,
    title: "General Help",
    description: "Moving, cleaning, handyman services",
    workers: "250+",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50"
  }
];

const ServicesSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/20">
            <Users className="w-3 h-3 mr-1" />
            Available Services
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Find Skilled Workers for
            <span className="bg-gradient-secondary bg-clip-text text-transparent"> Every Need</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From home repairs to custom projects, our verified workers are ready to help
            with quality service and fair pricing.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={service.title} 
                className="group hover:shadow-warm transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className={`w-12 h-12 rounded-lg ${service.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <IconComponent className={`w-6 h-6 ${service.color}`} />
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {service.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {service.workers} workers
                      </Badge>
                      <div className="text-xs text-muted-foreground group-hover:text-accent transition-colors">
                        Available now →
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;