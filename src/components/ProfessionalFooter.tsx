import { ArrowRight, Linkedin, Mail, Phone, MapPin, Clock, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ProfessionalFooter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Success!",
      description: "Thank you for subscribing to our newsletter.",
    });
    
    setEmail("");
    setIsSubmitting(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const quickLinks = [
    { name: "About Us", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "Careers", href: "#careers" },
    { name: "Blog", href: "#blog" },
    { name: "Contact", href: "#contact" }
  ];

  const services = [
    "Real-Time Tracking",
    "Smart Dashboards", 
    "Productivity Analytics",
    "Project Management",
    "Consulting Services",
    "Technical Support"
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative">
        {/* Newsletter Section */}
        <motion.div 
          className="bg-primary/10 backdrop-blur-sm border-y border-primary/20 py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div variants={itemVariants}>
                <h3 className="text-3xl md:text-4xl font-display font-bold mb-4">
                  Stay Updated with Construction Innovation
                </h3>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Get the latest insights on construction technology, project management tips, and industry trends delivered to your inbox.
                </p>
              </motion.div>

              <motion.form 
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
                variants={itemVariants}
              >
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
                  required
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-2 font-semibold whitespace-nowrap"
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </motion.form>
            </div>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <motion.div 
          className="py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              
              {/* Company Info */}
              <motion.div className="lg:col-span-1" variants={itemVariants}>
                <div className="mb-6">
                  <img 
                    src="/lovable-uploads/280712c4-e019-49c4-a570-ff9f00229887.png" 
                    alt="CO Consultants" 
                    className="h-12 w-auto mb-4" 
                  />
                  <h4 className="text-xl font-semibold mb-3">Construction Organised</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Pioneering smart construction solutions with real-time data insights, 
                    advanced tracking systems, and predictive analytics.
                  </p>
                </div>

                {/* Social Links */}
                <div className="flex space-x-4">
                  <a 
                    href="#" 
                    className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center hover:bg-primary/30 transition-colors group"
                  >
                    <Linkedin className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                  </a>
                  <a 
                    href="#" 
                    className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center hover:bg-primary/30 transition-colors group"
                  >
                    <Mail className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                  </a>
                </div>
              </motion.div>

              {/* Quick Links */}
              <motion.div variants={itemVariants}>
                <h4 className="text-lg font-semibold mb-6 text-primary">Quick Links</h4>
                <ul className="space-y-3">
                  {quickLinks.map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.href}
                        className="text-gray-300 hover:text-primary transition-colors flex items-center group"
                      >
                        <ChevronRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Services */}
              <motion.div variants={itemVariants}>
                <h4 className="text-lg font-semibold mb-6 text-primary">Our Services</h4>
                <ul className="space-y-3">
                  {services.map((service, index) => (
                    <li key={index} className="text-gray-300 flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                      {service}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Contact Info */}
              <motion.div variants={itemVariants}>
                <h4 className="text-lg font-semibold mb-6 text-primary">Get in Touch</h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-gray-300">123 Construction Ave</p>
                      <p className="text-gray-300">Innovation District, ID 12345</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                    <a href="tel:+1234567890" className="text-gray-300 hover:text-primary transition-colors">
                      +1 (234) 567-890
                    </a>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                    <a href="mailto:info@coconsultants.com" className="text-gray-300 hover:text-primary transition-colors">
                      info@coconsultants.com
                    </a>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-gray-300">Mon - Fri: 9:00 AM - 6:00 PM</p>
                      <p className="text-gray-300">24/7 Emergency Support</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          className="border-t border-gray-700/50 py-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm">
                © 2024 Construction Organised. All rights reserved.
              </p>
              <div className="flex space-x-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default ProfessionalFooter;