import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ProjectsSection = () => {
const projects = [
  {
    title: "SecureDocs Cloud",
    description:
      "Cloud-based document storage with role-based access control and end-to-end encryption for enterprises.",
    image: "https://plus.unsplash.com/premium_photo-1681399975135-252eab5fd2db?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D",
    tags: ["Cloud", "Encryption", "Access Control"],
    status: "Active",
  },
  {
    title: "FileSync Pro",
    description:
      "Real-time file synchronization across devices with version history and smart conflict resolution.",
    image: "https://plus.unsplash.com/premium_photo-1661963874418-df1110ee39c1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D",
    tags: ["Sync", "Collaboration", "Versioning"],
    status: "Completed",
  },
  {
    title: "WorkDrive Compliance",
    description:
      "Enterprise-grade file compliance monitoring with automated retention policies and audit-ready reports.",
    image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D",
    tags: ["Compliance", "Monitoring", "Automation"],
    status: "Active",
  },
  {
    title: "CloudCollab Suite",
    description:
      "Collaboration platform with shared workspaces, document co-editing, and team communication tools.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D",
    tags: ["Collaboration", "Teams", "Productivity"],
    status: "Development",
  },
  {
    title: "TrackMyFiles",
    description:
      "File tracking and monitoring system with access logs, user analytics, and anomaly detection.",
    image: "https://plus.unsplash.com/premium_photo-1683120972279-87efe2ba252f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D",
    tags: ["Tracking", "Analytics", "Security"],
    status: "Completed",
  },
  {
    title: "CloudVault Backup",
    description:
      "Automated cloud backup solution with disaster recovery, multi-region replication, and instant restore options.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D",
    tags: ["Backup", "Recovery", "Cloud"],
    status: "Active",
  },
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
            Explore our portfolio of successful construction data analytics
            implementations that have transformed operations and delivered
            measurable results.
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
                      variant={
                        project.status === "Active"
                          ? "default"
                          : project.status === "Completed"
                          ? "secondary"
                          : "outline"
                      }
                      className={
                        project.status === "Active" ? "bg-green-500" : ""
                      }
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
                      <Badge
                        key={tagIndex}
                        variant="outline"
                        className="text-xs"
                      >
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
