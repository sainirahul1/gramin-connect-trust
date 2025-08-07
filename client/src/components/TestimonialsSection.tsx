import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Quote,
  Star,
  MapPin,
  Calendar,
  CheckCircle
} from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Homeowner",
    location: "Bangalore",
    rating: 5,
    content: "Found an amazing carpenter through GrameenWork. Rajesh completed my kitchen renovation perfectly and on time. The platform made it so easy to find trusted workers!",
    service: "Carpentry",
    date: "2 weeks ago"
  },
  {
    name: "Mohammad Ali",
    role: "Skilled Worker",
    location: "Mumbai",
    rating: 5,
    content: "GrameenWork changed my life! I've tripled my income in 6 months. The verification process gave customers confidence to hire me, and now I have regular clients.",
    service: "Plumbing",
    date: "1 month ago"
  },
  {
    name: "Sneha Patel",
    role: "Small Business Owner",
    location: "Pune",
    rating: 5,
    content: "Needed electrical work for my shop urgently. Found a verified electrician within 30 minutes who completed the job same day. Excellent service and fair pricing!",
    service: "Electrical",
    date: "3 weeks ago"
  }
];

const stats = [
  { number: "10,000+", label: "Verified Workers" },
  { number: "50,000+", label: "Jobs Completed" },
  { number: "4.8/5", label: "Average Rating" },
  { number: "100+", label: "Cities Covered" }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
            <Star className="w-3 h-3 mr-1" />
            Success Stories
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by
            <span className="bg-gradient-accent bg-clip-text text-transparent"> Thousands</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories from workers who've built their businesses and customers who've found trusted help.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="group hover:shadow-warm transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Quote Icon */}
                  <div className="w-10 h-10 rounded-full bg-gradient-accent flex items-center justify-center">
                    <Quote className="w-5 h-5 text-accent-foreground" />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-muted-foreground leading-relaxed">
                    "{testimonial.content}"
                  </p>

                  {/* Service Badge */}
                  <Badge variant="outline" className="w-fit">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {testimonial.service}
                  </Badge>

                  {/* User Info */}
                  <div className="pt-4 border-t border-border/50">
                    <div className="font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {testimonial.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {testimonial.date}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;