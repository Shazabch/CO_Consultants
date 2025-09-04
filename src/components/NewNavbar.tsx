import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";

const NewNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  // const projects = [
  //   { title: "FireCat Project", description: "Fire safety and emergency response system" },
  //   { title: "Sport Retail", description: "Sports equipment retail solutions" },
  //   { title: "Workwear", description: "Professional workwear solutions" },
  //   { title: "Hockey Project", description: "Hockey analytics and tracking" },
  //   { title: "Pet Tracker", description: "Pet tracking and monitoring system" }
  // ];

  const company = [
    { title: "About Us", description: "Learn about our mission and values" },
    { title: "Tech Details", description: "Technical specifications and details" },
    { title: "Careers", description: "Join our growing team" },
    { title: "Blog", description: "Latest insights and updates" }
  ];

  return (
    <motion.nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full bg-white shadow-sm"
      )}
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
              className="flex items-center"
            >
              <img 
                src="/Assets/horizontallogo.png" 
                alt="CO Consultants Logo" 
                className="h-8 w-auto" 
              />
            </button>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <NavigationMenu>
              <NavigationMenuList className="space-x-6">
                <NavigationMenuItem>
                  <button 
                    onClick={() => scrollToSection('services')} 
                    className="hover:underline transition-colors px-3 py-2 text-gray-700 hover:text-gray-900"
                  >
                    Services
                  </button>
                </NavigationMenuItem>
                
                {/* <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    className="bg-transparent hover:bg-transparent px-3 py-2 hover:underline transition-colors text-gray-700 hover:text-gray-900"
                  >
                    Projects
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-[400px] lg:w-[500px] lg:grid-cols-2">
                      {projects.map((project, index) => (
                        <button
                          key={index}
                          onClick={() => scrollToSection('projects')}
                          className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100 text-left"
                        >
                          <div className="text-sm font-medium leading-none">{project.title}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                            {project.description}
                          </p>
                        </button>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem> */}

                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    className="bg-transparent hover:bg-transparent px-3 py-2 hover:underline transition-colors text-gray-700 hover:text-gray-900"
                  >
                    Company
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-[400px]">
                      {company.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => scrollToSection('about')}
                          className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100 text-left"
                        >
                          <div className="text-sm font-medium leading-none">{item.title}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                            {item.description}
                          </p>
                        </button>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <button 
                    onClick={() => scrollToSection('why-construction')} 
                    className="hover:underline transition-colors px-3 py-2 text-gray-700 hover:text-gray-900"
                  >
                    Why Construction Data
                  </button>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <button 
                    onClick={() => scrollToSection('process')} 
                    className="hover:underline transition-colors px-3 py-2 text-gray-700 hover:text-gray-900"
                  >
                    How We Work
                  </button>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          
          {/* Contact Button */}
          <div className="hidden md:block">
            <button 
              onClick={() => scrollToSection('contact')} 
              className="px-4 py-2 rounded-md transition-colors bg-primary text-white hover:bg-gray-800"
            >
              Contact Us
            </button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="focus:outline-none text-gray-700 hover:text-gray-900 transition-colors p-2 rounded-md"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={cn(
        "md:hidden transition-all duration-300 overflow-hidden w-full",
        isMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="px-3 pt-2 pb-3 space-y-1 shadow-sm overflow-y-auto max-h-80 bg-white">
          <button 
            onClick={() => scrollToSection('services')} 
            className="block w-full text-left px-3 py-1.5 rounded-md text-sm text-gray-700 hover:bg-gray-50"
          >
            Services
          </button>
          
          <button 
            onClick={() => scrollToSection('projects')} 
            className="block w-full text-left px-3 py-1.5 rounded-md text-sm text-gray-700 hover:bg-gray-50"
          >
            Projects
          </button>
          
          <button 
            onClick={() => scrollToSection('why-construction')} 
            className="block w-full text-left px-3 py-1.5 rounded-md text-sm text-gray-700 hover:bg-gray-50"
          >
            Why Construction Data
          </button>
          
          <button 
            onClick={() => scrollToSection('process')} 
            className="block w-full text-left px-3 py-1.5 rounded-md text-sm text-gray-700 hover:bg-gray-50"
          >
            How We Work
          </button>
          
          <button 
            onClick={() => scrollToSection('contact')} 
            className="block w-full text-left px-3 py-1.5 rounded-md text-sm text-white bg-primary/20 hover:bg-primary/30"
          >
            Contact Us
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default NewNavbar;
