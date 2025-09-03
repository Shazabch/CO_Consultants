import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ProjectsSection = () => {
  const projects = [
    {
      title: "FireCat Project",
      description: "Fire safety and emergency response system with real-time monitoring and automated alerts for construction sites.",
      image: "/lovable-uploads/4187f423-ba69-4043-be76-c43098488348.png",
      tags: ["Safety", "Emergency Response", "Real-time"],
      status: "Active"
    },
    {
      title: "Sport Retail Analytics",
      description: "Comprehensive retail analytics platform for sports equipment with inventory tracking and sales forecasting.",
      image: "/lovable-uploads/48e540e5-6a25-44e4-b3f7-80f3bfc2777a.png",
      tags: ["Retail", "Analytics", "Forecasting"],
      status: "Completed"
    },
    {
      title: "Workwear Solutions",
      description: "Professional workwear management system with RFID tracking and compliance monitoring.",
      image: "/lovable-uploads/cf8966e3-de0d-445f-9fbd-ee6c48daa7ff.png",
      tags: ["RFID", "Compliance", "Management"],
      status: "Active"
    },
    {
      title: "Hockey Analytics",
      description: "Advanced hockey analytics platform with player tracking and performance insights using machine learning.",
      image: "/lovable-uploads/48ecf6e2-5a98-4a9d-af6f-ae2265cd4098.png",
      tags: ["Sports", "ML", "Tracking"],
      status: "Development"
    },
    {
      title: "Pet Tracker System",
      description: "IoT-based pet tracking and monitoring system with GPS location and health metrics.",
      image: "/lovable-uploads/39605e90-8478-4fee-b1b9-cee41df66f10.png",
      tags: ["IoT", "GPS", "Health"],
      status: "Completed"
    }
  ];

  return (
    <section id="projects" className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium shadow-lg">
            Our Projects
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Real Solutions for Real Challenges
          </h2>
          <p className="text-gray-700 text-xl max-w-3xl mx-auto leading-relaxed">
            Explore our portfolio of successful construction data analytics implementations that have transformed operations and delivered measurable results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border-primary/10">
                <div className="relative">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge 
                      variant={project.status === 'Active' ? 'default' : project.status === 'Completed' ? 'secondary' : 'outline'}
                      className={project.status === 'Active' ? 'bg-green-500' : ''}
                    >
                      {project.status}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;