import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Wrench, 
  Zap, 
  Hammer, 
  Scissors, 
  Car, 
  Paintbrush,
  Settings,
  HardHat,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Star,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";

const professions = [
  {
    id: 1,
    name: "Plumber",
    icon: <Wrench className="h-8 w-8" />,
    description: "Expert water systems, pipes, and drainage solutions for your home and business",
    color: "from-blue-500 to-blue-700",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    image: "/assets/worker-plumber-1.jpg",
    stats: "200+ Projects",
    rating: "4.9/5",
    avgPrice: "$45/hr"
  },
  {
    id: 2,
    name: "Electrician", 
    icon: <Zap className="h-8 w-8" />,
    description: "Professional electrical installations, repairs, and safety inspections",
    color: "from-yellow-500 to-orange-600",
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-700",
    image: "/assets/worker-electrician-1.jpg",
    stats: "150+ Projects", 
    rating: "4.8/5",
    avgPrice: "$55/hr"
  },
  {
    id: 3,
    name: "Carpenter",
    icon: <Hammer className="h-8 w-8" />,
    description: "Custom woodworking, furniture making, and home renovation specialists",
    color: "from-amber-600 to-orange-700", 
    bgColor: "bg-amber-50",
    textColor: "text-amber-700",
    image: "/assets/hero-workers.jpg",
    stats: "300+ Projects",
    rating: "4.9/5", 
    avgPrice: "$40/hr"
  },
  {
    id: 4,
    name: "Tailor",
    icon: <Scissors className="h-8 w-8" />,
    description: "Custom clothing design, alterations, and traditional garment making",
    color: "from-purple-500 to-pink-600",
    bgColor: "bg-purple-50", 
    textColor: "text-purple-700",
    image: "/assets/worker-tailor-1.jpg",
    stats: "500+ Orders",
    rating: "4.7/5",
    avgPrice: "$25/hr"
  },
  {
    id: 5,
    name: "Mechanic",
    icon: <Car className="h-8 w-8" />,
    description: "Complete vehicle maintenance, repair services, and diagnostic solutions",
    color: "from-gray-600 to-gray-800",
    bgColor: "bg-gray-50",
    textColor: "text-gray-700",
    image: "/assets/worker-plumber-2.jpg",
    stats: "400+ Repairs",
    rating: "4.8/5",
    avgPrice: "$50/hr"
  },
  {
    id: 6,
    name: "Painter",
    icon: <Paintbrush className="h-8 w-8" />,
    description: "Interior and exterior painting with premium finishes and color consultation",
    color: "from-green-500 to-teal-600",
    bgColor: "bg-green-50",
    textColor: "text-green-700",
    image: "/assets/hero-workers.jpg",
    stats: "250+ Homes",
    rating: "4.9/5",
    avgPrice: "$35/hr"
  }
];

export default function ProfessionCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-slide every 4 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % professions.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const totalSlides = professions.length;

  const goToSlide = (slide: number) => {
    setCurrentSlide(slide);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const goToPrevious = () => {
    const newSlide = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
    goToSlide(newSlide);
  };

  const goToNext = () => {
    const newSlide = (currentSlide + 1) % totalSlides;
    goToSlide(newSlide);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-green-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-blue-500"></div>
        <div className="absolute top-32 right-20 w-16 h-16 rounded-full bg-green-500"></div>
        <div className="absolute bottom-20 left-1/3 w-12 h-12 rounded-full bg-yellow-500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-blue-100 to-green-100 text-blue-700 border-blue-200">
            <Settings className="w-3 h-3 mr-1" />
            Popular Services
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Find Local
            <span className="text-gradient-hero"> Skilled Workers</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connect with verified professionals in your area. From home repairs to custom services, 
            find the right expert for your needs.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="sm"
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-white shadow-lg rounded-full w-10 h-10 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-white shadow-lg rounded-full w-10 h-10 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Image Slider - Hero Style */}
          <div className="relative h-96 overflow-hidden rounded-3xl shadow-2xl">
            <div 
              className="flex transition-transform duration-1000 ease-in-out h-full"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {professions.map((profession) => (
                <div key={profession.id} className="w-full flex-shrink-0 relative">
                  <img
                    src={profession.image}
                    alt={profession.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex items-center">
                    <div className="container mx-auto px-8">
                      <div className="max-w-lg">
                        <div className="flex items-center gap-4 mb-4">
                          <div className={`p-3 rounded-2xl bg-gradient-to-r ${profession.color}`}>
                            <div className="text-white">
                              {profession.icon}
                            </div>
                          </div>
                          <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                            <HardHat className="w-3 h-3 mr-1" />
                            Professional Service
                          </Badge>
                        </div>
                        
                        <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
                          {profession.name}
                        </h3>
                        
                        <p className="text-lg text-white/90 mb-6 leading-relaxed">
                          {profession.description}
                        </p>
                        
                        {/* Stats Row */}
                        <div className="flex flex-wrap items-center gap-4 mb-6 text-white/90">
                          <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1">
                            <HardHat className="h-4 w-4" />
                            <span className="text-sm">{profession.stats}</span>
                          </div>
                          <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1">
                            <span className="text-yellow-400">⭐</span>
                            <span className="text-sm">{profession.rating}</span>
                          </div>
                          <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1">
                            <span className="text-green-400">💰</span>
                            <span className="text-sm">Starting {profession.avgPrice}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                          <Button className="bg-white text-gray-900 hover:bg-gray-100 font-semibold px-6 py-3">
                            Find {profession.name}s
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </Button>
                          <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-6 py-3">
                            View Portfolio
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-blue-600 w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Button className="btn-gradient-hero px-8 py-3">
            Browse All Services
          </Button>
        </div>
      </div>
    </section>
  );
}