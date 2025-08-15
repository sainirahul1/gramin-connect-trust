import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
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
  ArrowRight,
  User,
  Briefcase,
  Award,
  ChevronRight
} from "lucide-react";

// Map profession to icons for dynamic workers
const professionIcons: { [key: string]: any } = {
  "Plumbing": Wrench,
  "Electrical": Zap,
  "Tailoring": Scissors,
  "plumber": Wrench,
  "electrician": Zap,
  "tailor": Scissors,
  default: User
};

const FeaturedWorkersSection = () => {
  const { data: workers = [], isLoading } = useQuery({
    queryKey: ["/api/workers"],
    refetchInterval: 30000, // Refetch every 30 seconds to show new workers
  });

  // Sample workers data to always show content
  const sampleWorkers = [
    {
      id: 'sample-1',
      name: 'Ahmed Hassan',
      profession: 'Plumbing',
      location: 'Dhaka',
      hourlyRate: '500',
      rating: '4.9',
      description: 'Expert plumber with 10+ years experience',
      skills: ['Water Systems', 'Pipe Installation', 'Drainage'],
      isAvailable: true,
      phoneNumber: '01700000000'
    },
    {
      id: 'sample-2', 
      name: 'Fatima Ali',
      profession: 'Electrical',
      location: 'Chittagong',
      hourlyRate: '600',
      rating: '4.8',
      description: 'Licensed electrician specializing in home wiring',
      skills: ['Wiring', 'Electrical Installation', 'Repairs'],
      isAvailable: true,
      phoneNumber: '01800000000'
    },
    {
      id: 'sample-3',
      name: 'Mohammad Rahman',
      profession: 'Tailoring', 
      location: 'Sylhet',
      hourlyRate: '300',
      rating: '4.7',
      description: 'Custom clothing and alterations specialist',
      skills: ['Custom Suits', 'Alterations', 'Embroidery'],
      isAvailable: false,
      phoneNumber: '01900000000'
    },
    {
      id: 'sample-4',
      name: 'Rashida Begum',
      profession: 'Plumbing',
      location: 'Rajshahi', 
      hourlyRate: '450',
      rating: '4.9',
      description: 'Reliable plumber for residential services',
      skills: ['Bathroom Fitting', 'Leak Repair', 'Maintenance'],
      isAvailable: true,
      phoneNumber: '01600000000'
    }
  ];

  // Combine real workers with samples, prioritizing real workers
  const displayWorkers = [...(workers || []), ...sampleWorkers].slice(0, 8);


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
          {displayWorkers.map((worker) => {
            const IconComponent = professionIcons[worker.profession] || professionIcons.default;
            return (
              <Card key={worker.id} className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-0">
                  {/* Worker Header - No image for now */}
                  <div className="relative bg-gradient-to-br from-primary/10 to-primary/5 h-48 flex items-center justify-center">
                    {/* Availability Badge */}
                    <Badge 
                      className={`absolute top-3 right-3 ${
                        worker.isAvailable 
                          ? "bg-accent text-accent-foreground" 
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      <Clock className="w-3 h-3 mr-1" />
                      {worker.isAvailable ? "Available Now" : "Busy"}
                    </Badge>

                    {/* Verification Badge - all registered workers are verified */}
                    <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                      <Shield className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>

                    {/* Category Icon */}
                    <div className="w-20 h-20 rounded-full bg-gradient-hero flex items-center justify-center shadow-elegant">
                      <IconComponent className="w-10 h-10 text-primary-foreground" />
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
                        <p className="text-sm text-muted-foreground">{worker.profession} Specialist</p>
                      </div>

                      {/* Rating & Location */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{worker.rating || "5.0"}</span>
                          <span className="text-sm text-muted-foreground">(New)</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          Professional
                        </Badge>
                      </div>

                      {/* Location & Price */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span>{worker.location}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-primary">{worker.hourlyRate}/hour</span>
                          <span className="text-xs text-muted-foreground">Ready to work</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {worker.description || `Experienced ${worker.profession.toLowerCase()} ready to help with your projects.`}
                      </p>

                      {/* Skills */}
                      {worker.skills && worker.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {worker.skills.slice(0, 3).map((skill: string, index: number) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {worker.skills.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{worker.skills.length - 3} more
                            </Badge>
                          )}
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2">
                        <Button variant="hero" size="sm" className="flex-1">
                          <MessageCircle className="w-3 h-3 mr-1" />
                          Contact
                        </Button>
                        {worker.phoneNumber && (
                          <Button variant="outline" size="sm" className="flex-1">
                            <Phone className="w-3 h-3 mr-1" />
                            Call
                          </Button>
                        )}
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