import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

const ProfessionalNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const projects = [
    { title: "FireCat Project", description: "Fire safety and emergency response system", category: "Safety" },
    { title: "Sport Retail", description: "Sports equipment retail solutions", category: "Retail" },
    { title: "Workwear", description: "Professional workwear solutions", category: "Industrial" },
    { title: "Hockey Project", description: "Hockey analytics and tracking", category: "Sports" },
    { title: "Pet Tracker", description: "Pet tracking and monitoring system", category: "Consumer" }
  ];

  const company = [
    { title: "About Us", description: "Learn about our mission and values", href: "#about" },
    { title: "Tech Details", description: "Technical specifications and details", href: "#tech" },
    { title: "Careers", description: "Join our growing team", href: "#careers" },
    { title: "Blog", description: "Latest insights and updates", href: "#blog" }
  ];

  return (
    <motion.nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 w-full",
        isScrolled 
          ? "bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-100" 
          : "bg-transparent"
      )}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <motion.div 
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
              className="flex items-center group"
            >
              <img 
                src="/lovable-uploads/280712c4-e019-49c4-a570-ff9f00229887.png" 
                alt="CO Consultants Logo" 
                className="h-10 w-auto transition-transform group-hover:scale-105" 
              />
            </button>
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            <NavigationMenu>
              <NavigationMenuList className="space-x-2">
                
                <NavigationMenuItem>
                  <button 
                    onClick={() => scrollToSection('services')} 
                    className={cn(
                      "px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-gray-100/80",
                      isScrolled ? "text-gray-700 hover:text-primary" : "text-white hover:text-primary hover:bg-white/10"
                    )}
                  >
                    Services
                  </button>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    className={cn(
                      "bg-transparent hover:bg-gray-100/80 px-4 py-2 rounded-lg font-medium transition-all duration-300",
                      isScrolled ? "text-gray-700 hover:text-primary" : "text-white hover:text-primary hover:bg-white/10"
                    )}
                  >
                    Projects
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[500px] p-6">
                      <div className="grid gap-3">
                        <div className="mb-4">
                          <h4 className="text-lg font-semibold text-foreground mb-2">Our Projects</h4>
                          <p className="text-sm text-muted-foreground">Explore our innovative solutions across different industries</p>
                        </div>
                        {projects.map((project, index) => (
                          <button
                            key={index}
                            onClick={() => scrollToSection('projects')}
                            className="group flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                          >
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 group-hover:scale-125 transition-transform"></div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <div className="font-medium text-foreground group-hover:text-primary transition-colors">{project.title}</div>
                                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{project.category}</span>
                              </div>
                              <p className="text-sm text-muted-foreground">{project.description}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    className={cn(
                      "bg-transparent hover:bg-gray-100/80 px-4 py-2 rounded-lg font-medium transition-all duration-300",
                      isScrolled ? "text-gray-700 hover:text-primary" : "text-white hover:text-primary hover:bg-white/10"
                    )}
                  >
                    Company
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[400px] p-6">
                      <div className="grid gap-3">
                        <div className="mb-4">
                          <h4 className="text-lg font-semibold text-foreground mb-2">About Us</h4>
                          <p className="text-sm text-muted-foreground">Learn more about our company and vision</p>
                        </div>
                        {company.map((item, index) => (
                          <button
                            key={index}
                            onClick={() => scrollToSection('about')}
                            className="group flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                          >
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 group-hover:scale-125 transition-transform"></div>
                            <div className="flex-1">
                              <div className="font-medium text-foreground group-hover:text-primary transition-colors mb-1">{item.title}</div>
                              <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <button 
                    onClick={() => scrollToSection('why-construction')} 
                    className={cn(
                      "px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-gray-100/80",
                      isScrolled ? "text-gray-700 hover:text-primary" : "text-white hover:text-primary hover:bg-white/10"
                    )}
                  >
                    Why Construction Data
                  </button>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <button 
                    onClick={() => scrollToSection('process')} 
                    className={cn(
                      "px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-gray-100/80",
                      isScrolled ? "text-gray-700 hover:text-primary" : "text-white hover:text-primary hover:bg-white/10"
                    )}
                  >
                    How We Work
                  </button>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          
          {/* Contact Button - Desktop */}
          <div className="hidden lg:block">
            <Button 
              onClick={() => scrollToSection('contact')} 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Contact Us
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className={cn(
                "p-2 rounded-lg transition-colors", 
                isScrolled ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/10"
              )}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-4 py-6 space-y-4 max-h-[80vh] overflow-y-auto">
              {[
                { label: "Services", action: () => scrollToSection('services') },
                { label: "Projects", action: () => scrollToSection('projects') },
                { label: "Why Construction Data", action: () => scrollToSection('why-construction') },
                { label: "How We Work", action: () => scrollToSection('process') },
                { label: "About", action: () => scrollToSection('about') }
              ].map((item, index) => (
                <motion.button
                  key={index}
                  onClick={item.action}
                  className="block w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors font-medium"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.label}
                </motion.button>
              ))}
              
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="pt-4 border-t border-gray-200"
              >
                <Button 
                  onClick={() => scrollToSection('contact')} 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-lg font-medium shadow-lg"
                >
                  Contact Us
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default ProfessionalNavbar;