import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "wouter";
import { 
  Menu, 
  X, 
  Users, 
  Shield, 
  Phone,
  MapPin
} from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-hero flex items-center justify-center">
              <Users className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <div className="font-bold text-xl text-primary">GrameenWork</div>
              <div className="text-xs text-muted-foreground">Local Skills Marketplace</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-foreground hover:text-primary transition-colors">
              Services
            </a>
            <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors">
              How It Works
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">
              About
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">
              Support
            </a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-muted-foreground">
                  Welcome, {user?.email}
                </span>
                <Link href="/dashboard">
                  <Button variant="ghost" className="text-primary hover:text-primary hover:bg-primary/10">
                    Dashboard
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.location.href = "/api/logout"}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  className="text-primary hover:text-primary hover:bg-primary/10"
                  onClick={() => window.location.href = "/api/login"}
                >
                  Login
                </Button>
                <Button 
                  variant="hero" 
                  size="sm"
                  onClick={() => window.location.href = "/api/login"}
                >
                  Join as Worker
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <div className="space-y-3">
              <a href="#services" className="block py-2 text-foreground hover:text-primary transition-colors">
                Services
              </a>
              <a href="#how-it-works" className="block py-2 text-foreground hover:text-primary transition-colors">
                How It Works
              </a>
              <a href="#about" className="block py-2 text-foreground hover:text-primary transition-colors">
                About
              </a>
              <a href="#contact" className="block py-2 text-foreground hover:text-primary transition-colors">
                Support
              </a>
              <div className="pt-4 space-y-3">
                <Button variant="ghost" className="w-full justify-start text-primary hover:text-primary hover:bg-primary/10">
                  Login
                </Button>
                <Button variant="hero" className="w-full">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Trust Indicators Bar */}
      <div className="bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border/30">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-3 h-3 text-accent" />
              <span>100% Verified Workers</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3 text-secondary" />
              <span>Local Service Available</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3 h-3 text-primary" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;