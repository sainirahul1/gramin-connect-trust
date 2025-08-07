import { Button } from "@/components/ui/button";
import { 
  Users, 
  Phone, 
  Mail, 
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-foreground to-primary text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-secondary flex items-center justify-center">
                <Users className="w-6 h-6 text-secondary-foreground" />
              </div>
              <div>
                <div className="font-bold text-xl">GrameenWork</div>
                <div className="text-sm text-background/80">Local Skills Marketplace</div>
              </div>
            </div>
            <p className="text-background/80 text-sm leading-relaxed">
              Empowering skilled workers and connecting communities through technology. 
              Building trust, transparency, and opportunities for everyone.
            </p>
            <div className="flex gap-3">
              <Button variant="ghost" size="icon" className="text-background hover:bg-background/10">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background hover:bg-background/10">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background hover:bg-background/10">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background hover:bg-background/10">
                <Linkedin className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* For Workers */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">For Workers</h3>
            <div className="space-y-2">
              <a href="#" className="block text-background/80 hover:text-background transition-colors text-sm">
                Join as Worker
              </a>
              <a href="#" className="block text-background/80 hover:text-background transition-colors text-sm">
                Verification Process
              </a>
              <a href="#" className="block text-background/80 hover:text-background transition-colors text-sm">
                Earnings & Payouts
              </a>
              <a href="#" className="block text-background/80 hover:text-background transition-colors text-sm">
                Worker Support
              </a>
              <a href="#" className="block text-background/80 hover:text-background transition-colors text-sm">
                Success Stories
              </a>
            </div>
          </div>

          {/* For Customers */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">For Customers</h3>
            <div className="space-y-2">
              <a href="#" className="block text-background/80 hover:text-background transition-colors text-sm">
                Find Workers
              </a>
              <a href="#" className="block text-background/80 hover:text-background transition-colors text-sm">
                Service Categories
              </a>
              <a href="#" className="block text-background/80 hover:text-background transition-colors text-sm">
                How It Works
              </a>
              <a href="#" className="block text-background/80 hover:text-background transition-colors text-sm">
                Safety & Trust
              </a>
              <a href="#" className="block text-background/80 hover:text-background transition-colors text-sm">
                Customer Support
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-background/80" />
                <span className="text-sm text-background/80">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-background/80" />
                <span className="text-sm text-background/80">support@grameenwork.com</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-background/80 mt-0.5" />
                <span className="text-sm text-background/80">
                  123 Tech Park, Innovation District,<br />
                  Bangalore, Karnataka 560001
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-background/80">
              © 2024 GrameenWork. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-background/80 hover:text-background transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-background/80 hover:text-background transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-background/80 hover:text-background transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;