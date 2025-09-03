import {
  ArrowRight,
  Code,
  Cpu,
  Layers,
  MessageSquare,
  Play,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const EnhancedHero = () => {
  const isMobile = useIsMobile();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      y: 30,
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const floatVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      className="relative w-full bg-gradient-to-br from-white via-gray-50 to-blue-50/30 overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full blur-3xl"
          variants={floatVariants}
          animate="animate"
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-100/50 to-purple-100/30 rounded-full blur-3xl"
          variants={floatVariants}
          animate="animate"
          transition={{ delay: 1 }}
        />
      </div>

      <div className="banner-container relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
          {/* Content Section */}
          <motion.div className="space-y-8 z-10" variants={itemVariants}>
            <div className="space-y-6">
              <motion.div
                className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full border border-primary/20"
                variants={itemVariants}
              >
                <div className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></div>
                <span className="text-sm font-medium text-primary">
                  Construction Technology Leaders
                </span>
              </motion.div>

              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight"
                variants={itemVariants}
              >
                Construction{" "}
                <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  Organised
                </span>
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl"
                variants={itemVariants}
              >
                Transform your construction projects with{" "}
                <span className="font-semibold text-foreground">
                  real-time insights
                </span>
                , advanced tracking systems, and predictive analytics that
                reduce delays and optimize performance.
              </motion.p>
            </div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold group shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={scrollToProjects}
              >
                Book Free Demo
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-2 border-primary/20 hover:border-primary hover:bg-primary/5 px-8 py-4 text-lg font-semibold group transition-all duration-300"
                onClick={scrollToContact}
              >
                See Results
                <MessageSquare className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200"
              variants={itemVariants}
            >
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">
                  95%
                </div>
                <div className="text-sm text-muted-foreground">
                  Accuracy Rate
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">
                  50+
                </div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">
                  24/7
                </div>
                <div className="text-sm text-muted-foreground">Monitoring</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual Section */}
          <motion.div
            className="relative lg:justify-self-end"
            variants={itemVariants}
          >
            <div className="relative">
              {/* Video Container */}
              <motion.div
                className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <video
                  autoPlay={isVideoPlaying}
                  loop
                  muted
                  playsInline
                  className="w-full h-[400px] object-cover"
                  poster="/uploads/4bfa0d71-3ed2-4693-90b6-35142468907f.png"
                  onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                >
                  <source
                    src="/uploads/video_1751292840840_1751292842546.mp4"
                    type="video/mp4"
                  />
                </video>

                {!isVideoPlaying && (
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <Button
                      size="lg"
                      className="bg-white/90 hover:bg-white text-gray-900 rounded-full p-4"
                      onClick={() => setIsVideoPlaying(true)}
                    >
                      <Play className="w-8 h-8" />
                    </Button>
                  </div>
                )}
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-6 -right-6 bg-white rounded-xl p-4 shadow-lg border"
                variants={floatVariants}
                animate="animate"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Live Tracking</span>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground rounded-xl p-4 shadow-lg"
                variants={floatVariants}
                animate="animate"
                transition={{ delay: 0.5 }}
              >
                <div className="text-sm font-medium">Real-time Analytics</div>
                <div className="text-xs opacity-90">99.9% Uptime</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 -mt-20">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            {
              icon: Cpu,
              title: "Real-Time Tracking",
              desc: "RTLS, RFID, and QR-code systems for accurate monitoring",
            },
            {
              icon: Code,
              title: "Smart Dashboards",
              desc: "Visual reporting via Power BI with predictive analytics",
            },
            {
              icon: Layers,
              title: "Productivity Insights",
              desc: "Forecast timelines and optimize resource allocation",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 group"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EnhancedHero;
