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
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const professions = [
  {
    id: 1,
    name: "Plumber",
    icon: <Wrench className="h-8 w-8" />,
    description: "Water systems, pipes, and drainage experts",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    image: "/assets/worker-plumber-1.jpg"
  },
  {
    id: 2,
    name: "Electrician", 
    icon: <Zap className="h-8 w-8" />,
    description: "Electrical installations and repairs",
    color: "from-yellow-500 to-orange-500",
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-700",
    image: "/assets/worker-electrician-1.jpg"
  },
  {
    id: 3,
    name: "Carpenter",
    icon: <Hammer className="h-8 w-8" />,
    description: "Wood working and furniture specialists",
    color: "from-amber-600 to-orange-600", 
    bgColor: "bg-amber-50",
    textColor: "text-amber-700",
    image: "/assets/hero-workers.jpg"
  },
  {
    id: 4,
    name: "Tailor",
    icon: <Scissors className="h-8 w-8" />,
    description: "Custom clothing and alterations",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50", 
    textColor: "text-purple-700",
    image: "/assets/worker-tailor-1.jpg"
  },
  {
    id: 5,
    name: "Mechanic",
    icon: <Car className="h-8 w-8" />,
    description: "Vehicle maintenance and repair services",
    color: "from-gray-600 to-gray-700",
    bgColor: "bg-gray-50",
    textColor: "text-gray-700",
    image: "/assets/worker-plumber-2.jpg"
  },
  {
    id: 6,
    name: "Painter",
    icon: <Paintbrush className="h-8 w-8" />,
    description: "Interior and exterior painting experts",
    color: "from-green-500 to-teal-500",
    bgColor: "bg-green-50",
    textColor: "text-green-700",
    image: "/assets/hero-workers.jpg"
  }
];

export default function ProfessionCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-slide every 4 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(professions.length / 3));
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(professions.length / itemsPerSlide);

  const goToSlide = (slide: number) => {
    setCurrentSlide(slide);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000); // Resume auto-play after 8 seconds
  };

  const goToPrevious = () => {
    const newSlide = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
    goToSlide(newSlide);
  };

  const goToNext = () => {
    const newSlide = (currentSlide + 1) % totalSlides;
    goToSlide(newSlide);
  };

  const getCurrentItems = () => {
    const startIndex = currentSlide * itemsPerSlide;
    return professions.slice(startIndex, startIndex + itemsPerSlide);
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

          {/* Slides */}
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
                    {professions
                      .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                      .map((profession) => (
                        <Card key={profession.id} className="group hover-lift cursor-pointer card-hover bg-white/80 backdrop-blur-sm border-0 shadow-md">
                          <CardContent className="p-0">
                            {/* Image */}
                            <div className="relative overflow-hidden rounded-t-lg h-48">
                              <img
                                src={profession.image}
                                alt={profession.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                              <div className="absolute bottom-4 left-4">
                                <div className={`p-2 rounded-lg bg-gradient-to-r ${profession.color}`}>
                                  <div className="text-white">
                                    {profession.icon}
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Content */}
                            <div className="p-6">
                              <div className="flex items-center justify-between mb-3">
                                <h3 className="text-xl font-bold text-gray-900">{profession.name}</h3>
                                <Badge className={`${profession.bgColor} ${profession.textColor} border-0`}>
                                  Available
                                </Badge>
                              </div>
                              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                                {profession.description}
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <HardHat className="h-4 w-4 text-gray-500" />
                                  <span className="text-sm text-gray-500">50+ Workers</span>
                                </div>
                                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                  View All →
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                    ))}
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