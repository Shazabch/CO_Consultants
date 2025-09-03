
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, ChevronDown, Building2, Users, Briefcase, FileText, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useLocation } from 'react-router-dom';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <motion.nav className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full", isScrolled ? "bg-white shadow-sm" : "bg-black")} initial={{
      opacity: 1,
      y: 0
    }} animate={{
      opacity: 1,
      y: 0
    }}>
      <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="flex items-center">
              <img src="/lovable-uploads/280712c4-e019-49c4-a570-ff9f00229887.png" alt="CO Consultants Logo" className="h-8 w-auto" />
            </button>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            {isHomePage ? (
              <NavigationMenu>
                <NavigationMenuList className="space-x-6">
                  <NavigationMenuItem>
                    <button 
                      onClick={() => scrollToSection('services')} 
                      className={cn("hover:underline transition-colors", isScrolled ? "text-gray-700 hover:text-gray-900" : "text-gray-100 hover:text-white")}
                    >
                      Services
                    </button>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className={cn(isScrolled ? "text-gray-700 hover:text-gray-900" : "text-gray-100 hover:text-white", "bg-transparent hover:bg-transparent")}>
                      Projects
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid gap-3 p-6 w-[400px] lg:w-[500px] lg:grid-cols-2">
                        <Link to="/projects/firecat" className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">FireCat Project</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">Fire safety and emergency response system</p>
                        </Link>
                        <Link to="/projects/sport-retail" className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Sport Retail</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">Sports equipment retail solutions</p>
                        </Link>
                        <Link to="/projects/workwear" className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Workwear</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">Professional workwear solutions</p>
                        </Link>
                        <Link to="/projects/hockey" className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Hockey Project</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">Hockey analytics and tracking</p>
                        </Link>
                        <Link to="/projects/pet-tracker" className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Pet Tracker</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">Pet tracking and monitoring system</p>
                        </Link>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger className={cn(isScrolled ? "text-gray-700 hover:text-gray-900" : "text-gray-100 hover:text-white", "bg-transparent hover:bg-transparent")}>
                      Company
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid gap-3 p-6 w-[400px]">
                        <Link to="/about" className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none flex items-center">
                            <Building2 className="mr-2 h-4 w-4" />
                            About Us
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">Learn about our mission and values</p>
                        </Link>
                        <Link to="/careers" className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none flex items-center">
                            <Users className="mr-2 h-4 w-4" />
                            Careers
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">Join our growing team</p>
                        </Link>
                        <Link to="/tech-details" className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none flex items-center">
                            <Briefcase className="mr-2 h-4 w-4" />
                            Tech Details
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">Technical specifications and details</p>
                        </Link>
                        <Link to="/blog" className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none flex items-center">
                            <FileText className="mr-2 h-4 w-4" />
                            Blog
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">Latest insights and updates</p>
                        </Link>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <button 
                      onClick={() => scrollToSection('why-construction')} 
                      className={cn("hover:underline transition-colors", isScrolled ? "text-gray-700 hover:text-gray-900" : "text-gray-100 hover:text-white")}
                    >
                      Why Construction Data
                    </button>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <button 
                      onClick={() => scrollToSection('process')} 
                      className={cn("hover:underline transition-colors", isScrolled ? "text-gray-700 hover:text-gray-900" : "text-gray-100 hover:text-white")}
                    >
                      How We Work
                    </button>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <button 
                      onClick={() => scrollToSection('contact')} 
                      className={cn("px-4 py-2 rounded-md transition-colors bg-primary text-primary-foreground hover:bg-primary/80")}
                    >
                      Contact Us
                    </button>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            ) : (
              <div className="flex items-center space-x-8">
                <Link to="/" className={cn("hover:underline transition-colors", isScrolled ? "text-gray-700 hover:text-gray-900" : "text-gray-100 hover:text-white")}>
                  Home
                </Link>
                <Link to="/about" className={cn("hover:underline transition-colors", isScrolled ? "text-gray-700 hover:text-gray-900" : "text-gray-100 hover:text-white")}>
                  About
                </Link>
                <Link to="/blog" className={cn("hover:underline transition-colors", isScrolled ? "text-gray-700 hover:text-gray-900" : "text-gray-100 hover:text-white")}>
                  Blog
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className={cn("focus:outline-none", isScrolled ? "text-gray-700" : "text-white")}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu - Reduced height and simplified */}
      <div className={cn("md:hidden transition-all duration-300 overflow-hidden w-full", isMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0")}>
        <div className={cn("px-3 pt-2 pb-3 space-y-1 shadow-sm overflow-y-auto max-h-80", isScrolled ? "bg-white" : "bg-black")}>
          <button onClick={() => {
            scrollToSection('services');
            setIsMenuOpen(false);
          }} className={cn("block w-full text-left px-3 py-1.5 rounded-md text-sm", isScrolled ? "text-gray-700 hover:bg-gray-50" : "text-gray-200 hover:bg-gray-900")}>
            Services
          </button>
          
          <button onClick={() => {
            scrollToSection('why-construction');
            setIsMenuOpen(false);
          }} className={cn("block w-full text-left px-3 py-1.5 rounded-md text-sm", isScrolled ? "text-gray-700 hover:bg-gray-50" : "text-gray-200 hover:bg-gray-900")}>
            Why Construction Data
          </button>
          
          <button onClick={() => {
            scrollToSection('process');
            setIsMenuOpen(false);
          }} className={cn("block w-full text-left px-3 py-1.5 rounded-md text-sm", isScrolled ? "text-gray-700 hover:bg-gray-50" : "text-gray-200 hover:bg-gray-900")}>
            How We Work
          </button>
          
          <button onClick={() => {
            scrollToSection('contact');
            setIsMenuOpen(false);
          }} className={cn("block w-full text-left px-3 py-1.5 rounded-md text-sm", isScrolled ? "text-gray-700 bg-secondary hover:bg-secondary/80 text-white" : "text-white bg-secondary hover:bg-secondary/80")}>
            Contact Us
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
