import { useEffect, useRef, useState } from "react";
import {
  Activity,
  Shield,
  HardHat,
  Zap,
  ArrowRight,
  Box,
  Truck,
  Code,
  CheckCircle,
  Rocket,
  Factory,
  Microchip,
  Handshake,
  RefreshCcw,
  MessageSquare,
  BarChart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Progress } from "@/components/ui/progress";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { useScrollHijack } from "@/hooks/useScrollHijack";

const Features = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const hijackSectionRef = useRef<HTMLDivElement>(null);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [progressValue, setProgressValue] = useState(0);
  const [currentSprint, setCurrentSprint] = useState(1);
  const totalSprints = 3;
  const isMobile = useIsMobile();
const features = [
  {
    icon: (
      <BarChart className="w-10 h-10 text-white transition-transform duration-300 transform" />
    ),
    title: "Construction Dashboard & Reporting",
    description:
      "Visualize manpower & progress trends, identify bottlenecks instantly, and track KPIs with precision.",
    image: "/uploads/48e540e5-6a25-44e4-b3f7-80f3bfc2777a.png",
  },
  {
    icon: (
      <Activity className="w-10 h-10 text-white transition-transform duration-300 transform" />
    ),
    title: "RTLS & RFID Tracking Systems",
    description:
      "Bluetooth RTLS & RFID integration, QR-code access logs, and indoor/outdoor positioning.",
    image: "/uploads/48ecf6e2-5a98-4a9d-af6f-ae2265cd4098.png",
  },
  {
    icon: (
      <Rocket className="w-10 h-10 text-white transition-transform duration-300 transform" />
    ),
    title: "Productivity Forecast & Proposal Support",
    description:
      "Predictive analytics, timeline estimation, and resource modeling for accurate project planning.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    icon: (
      <BarChart className="w-10 h-10 text-white transition-transform duration-300 transform" />
    ),
    title: "Smart Resource Allocation",
    description:
      "Optimize workforce deployment and material usage with intelligent allocation insights to reduce waste and improve efficiency.",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxzZWFyY2h8OHx8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D",
  },
];



  const { isHijacked, currentIndex } = useScrollHijack(
    hijackSectionRef,
    features.length
  );

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact-info");
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slide-in");
            (entry.target as HTMLElement).style.opacity = "1";
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );
    if (featuresRef.current) {
      const elements = featuresRef.current.querySelectorAll(".feature-item");
      elements.forEach((el) => {
        if (!el.classList.contains("animate-slide-in")) {
          (el as HTMLElement).style.opacity = "0";
          observer.observe(el);
        }
      });
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    const animateProgress = () => {
      setProgressValue(0);
      interval = setInterval(() => {
        setProgressValue((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setCurrentSprint((prev) => (prev < totalSprints ? prev + 1 : 1));
              animateProgress();
            }, 500);
            return 100;
          }
          return prev + 2;
        });
      }, 100);
    };
    animateProgress();
    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  const stepFlowItems = [
    {
      icon: <Microchip className="h-10 w-10 text-gray-700" />,
      title: "Data Collection Systems",
      description:
        "RTLS, RFID, QR-codes, and Excel integration for comprehensive tracking",
    },
    {
      icon: <Factory className="h-10 w-10 text-gray-700" />,
      title: "Analytics & Dashboards",
      description:
        "Power BI visualizations with custom KPIs and predictive insights",
    },
    {
      icon: <Handshake className="h-10 w-10 text-gray-700" />,
      title: "Ongoing Support & Training",
      description: "24/7 technical support and continuous system optimization",
    },
  ];
  const sprintPhases = [
    {
      name: "Planning",
      icon: <CheckCircle className="h-4 w-4" />,
    },
    {
      name: "Development",
      icon: <Code className="h-4 w-4" />,
    },
    {
      name: "Testing",
      icon: <Box className="h-4 w-4" />,
    },
    {
      name: "Review",
      icon: <RefreshCcw className="h-4 w-4" />,
    },
  ];

  return (
    <>
      <section
        id="services"
        className="relative bg-white overflow-hidden py-10 md:py-[50px] w-full"
      >
        <div className="w-full px-4 sm:px-6 lg:px-8" ref={featuresRef}>
          <div className="text-center mb-10 max-w-3xl mx-auto feature-item">
            <div className="inline-block mb-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
              Our Services
            </div>
            <p className="text-gray-600 mt-4">
              Transform your construction projects with real-time data insights,
              advanced tracking systems, and predictive analytics that reduce
              delays and optimize performance.
            </p>
          </div>

          {/* Scroll-hijacked features section */}
          <div
            ref={hijackSectionRef}
            className={cn(
              "relative transition-all duration-500",
              isHijacked
                ? "fixed inset-0 z-50 bg-black"
                : "grid grid-cols-1 md:grid-cols-2 gap-5"
            )}
            style={{ height: isHijacked ? "100vh" : "auto" }}
          >
            {isHijacked && (
              <div className="absolute top-4 right-4 z-10 text-white text-sm opacity-70">
                {currentIndex + 1} / {features.length}
              </div>
            )}

            {features.map((feature, index) => (
              <div
                key={index}
                className={cn(
                  "feature-item rounded-xl overflow-hidden transform transition-all duration-500 relative shadow-lg",
                  isHijacked
                    ? cn(
                        "absolute inset-0 w-full h-full",
                        index === currentIndex
                          ? "opacity-100 translate-x-0"
                          : index < currentIndex
                          ? "opacity-0 -translate-x-full"
                          : "opacity-0 translate-x-full"
                      )
                    : "hover:-translate-y-1 h-[280px]"
                )}
                style={{
                  transitionDelay: isHijacked ? "0ms" : `${index * 100}ms`,
                }}
                onMouseEnter={() => !isHijacked && setHoveredFeature(index)}
                onMouseLeave={() => !isHijacked && setHoveredFeature(null)}
              >
                <div className="absolute inset-0 w-full h-full">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className={cn(
                      "w-full h-full object-cover transition-all duration-300",
                      isHijacked ? "grayscale-0" : "grayscale"
                    )}
                  />
                  <div
                    className={cn(
                      "absolute inset-0 transition-opacity duration-300",
                      isHijacked
                        ? "bg-primary/40"
                        : hoveredFeature === index
                        ? "bg-primary/50"
                        : "bg-primary/70"
                    )}
                  ></div>
                </div>

                <div
                  className={cn(
                    "relative z-10 flex flex-col justify-center",
                    isHijacked
                      ? "p-16 h-full text-center items-center"
                      : "p-6 h-full justify-between"
                  )}
                >
                  <div className={isHijacked ? "space-y-8" : ""}>
                    <div
                      className={cn(
                        "inline-block p-3 bg-gray-800/40 backdrop-blur-sm rounded-lg transition-all duration-300 transform",
                        isHijacked
                          ? "mb-6 scale-150"
                          : hoveredFeature === index
                          ? "mb-4 hover:scale-110"
                          : "mb-4"
                      )}
                    >
                      <div
                        className={`transform transition-transform duration-300 ${
                          !isHijacked && hoveredFeature === index
                            ? "rotate-12"
                            : ""
                        }`}
                      >
                        {feature.icon}
                      </div>
                    </div>
                    <h3
                      className={cn(
                        "font-semibold text-white",
                        isHijacked ? "text-4xl mb-6" : "text-xl mb-2"
                      )}
                    >
                      {feature.title}
                    </h3>
                    <p
                      className={cn(
                        "text-white/90",
                        isHijacked ? "text-lg max-w-2xl" : "text-sm"
                      )}
                    >
                      {feature.description}
                    </p>
                  </div>
                  {!isHijacked && (
                    <div
                      className={`h-0.5 bg-white/70 mt-3 transition-all duration-500 ${
                        hoveredFeature === index ? "w-full" : "w-0"
                      }`}
                    ></div>
                  )}
                </div>
              </div>
            ))}

            {isHijacked && (
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center">
                <div className="flex space-x-2 mb-4">
                  {features.map((_, index) => (
                    <div
                      key={index}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all duration-300",
                        index === currentIndex ? "bg-white w-8" : "bg-white/50"
                      )}
                    />
                  ))}
                </div>
                <p className="text-sm opacity-70">
                  {isMobile ? "Swipe" : "Scroll"} to continue • Press ESC to
                  exit
                </p>
              </div>
            )}
          </div>

          <div className="mt-16 mb-8 feature-item">
            <div className="text-center mb-8">
              <div className="inline-block mb-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                Ready to Transform Your Projects?
              </div>
              <h3 className="text-2xl font-bold">
                Digitally Transform Your Construction Projects
              </h3>
              <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
                Let us show you how to reduce delays, optimize crews, and plan
                better with real data. Get a comprehensive dashboard
                walkthrough, site performance review, and ROI forecast.
              </p>
            </div>

            <div className="rounded-xl overflow-hidden bg-white p-4 feature-item">
              <div className="text-center">
                <h4 className="text-xl font-bold mb-4">
                  What's Included in Your Demo
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h5 className="font-semibold mb-2">
                      Dashboard Walkthrough
                    </h5>
                    <p className="text-sm text-gray-600">
                      See your construction data come to life with real-time
                      visualizations and insights.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h5 className="font-semibold mb-2">
                      Site Performance Review
                    </h5>
                    <p className="text-sm text-gray-600">
                      Analyze your current project data and identify
                      optimization opportunities.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h5 className="font-semibold mb-2">ROI Forecast</h5>
                    <p className="text-sm text-gray-600">
                      Understand the potential cost savings and efficiency gains
                      for your projects.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-12 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button
            onClick={scrollToContact}
            className="inline-flex items-center px-4 sm:px-6 py-3 bg-gray-700 hover:bg-gray-800 text-white rounded-lg shadow-md hover:shadow-lg transition-all group w-full sm:w-auto"
          >
            Book a Free Demo
            <MessageSquare className="ml-2 w-4 h-4 group-hover:animate-pulse" />
          </Button>

          <button
            onClick={() => {
              const processSection = document.getElementById("process");
              processSection?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center px-4 sm:px-6 py-3 bg-white text-gray-700 rounded-lg border border-gray-200 hover:bg-gray-50 hover:shadow-md transition-all group w-full sm:w-auto"
          >
            See Our Process
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      <section id="technology" className="bg-gray-50 py-10 md:py-16">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
              Our Technology Stack
            </div>
            <h2 className="text-3xl font-bold mb-4">
              How our construction analytics work
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              CO Consultants integrates multiple data sources and tracking
              technologies with powerful analytics, allowing us to deliver
              complete construction intelligence solutions with minimal risk and
              maximum impact.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 mb-10 transition-all duration-300 hover:shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {stepFlowItems.map((item, index) => (
                <HoverCard key={index}>
                  <HoverCardTrigger asChild>
                    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 h-full cursor-pointer">
                      <div className="flex flex-col items-center text-center">
                        <div className="bg-gray-50 rounded-full p-4 mb-4">
                          {item.icon}
                        </div>
                        <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-600">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80 shadow-lg">
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">{item.title}</h4>
                      <p className="text-sm">{item.description}</p>
                      {index === 0 && (
                        <p className="text-xs text-gray-500">
                          Integrate all your construction data sources into one
                          comprehensive tracking system.
                        </p>
                      )}
                      {index === 1 && (
                        <p className="text-xs text-gray-500">
                          Transform raw data into actionable insights with
                          intelligent dashboards and forecasting.
                        </p>
                      )}
                      {index === 2 && (
                        <p className="text-xs text-gray-500">
                          Ensure successful adoption with comprehensive training
                          and round-the-clock support.
                        </p>
                      )}
                    </div>
                  </HoverCardContent>
                </HoverCard>
              ))}
            </div>

            <div className="relative h-16 mb-10">
              <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-gray-300 to-gray-400"></div>
              <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-full -mt-3">
                <div className="bg-gray-400 rounded-full p-1">
                  <ArrowRight className="w-5 h-5 text-white rotate-90" />
                </div>
              </div>

              <div className="md:hidden flex justify-center items-center h-full">
                <div className="w-1/3 h-0.5 bg-gray-300"></div>
                <div className="bg-gray-400 rounded-full p-1 mx-2">
                  <ArrowRight className="w-5 h-5 text-white" />
                </div>
                <div className="w-1/3 h-0.5 bg-gray-300"></div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-6 mb-10 shadow-md">
              <div className="max-w-3xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
                  <div className="flex items-center">
                    <h3 className="text-xl font-bold">Adaptation Project</h3>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-2">
                      Iterative Development
                    </span>
                    <RefreshCcw className="h-5 w-5 text-gray-600 animate-rotate-slow" />
                  </div>
                </div>

                <p className="text-gray-600 mb-4">
                  Working iteratively with customers to tailor solutions to
                  their needs
                </p>

                <div className="relative mb-2">
                  <Progress value={progressValue} className="h-3 bg-gray-200" />
                </div>

                <div
                  className={cn(
                    "grid gap-1 mt-4",
                    isMobile ? "grid-cols-2 gap-y-2" : "grid-cols-4"
                  )}
                >
                  {sprintPhases.map((phase, index) => (
                    <div
                      key={index}
                      className={cn(
                        "text-center p-2 rounded transition-all",
                        progressValue >= (index / sprintPhases.length) * 100 &&
                          progressValue <
                            ((index + 1) / sprintPhases.length) * 100
                          ? "bg-blue-50 border border-blue-100"
                          : "bg-gray-50"
                      )}
                    >
                      <div className="flex flex-col items-center">
                        <div
                          className={cn(
                            "rounded-full p-1 mb-1",
                            progressValue >= (index / sprintPhases.length) * 100
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-500"
                          )}
                        >
                          {phase.icon}
                        </div>
                        <span className="text-xs font-medium">
                          {phase.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 gap-2">
                  <div className="flex items-center">
                    <div className="bg-green-100 rounded-full p-1 mr-2 shrink-0">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-sm text-gray-600">
                      Customer feedback integrated at every stage
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 flex items-center mt-2 sm:mt-0">
                    <span className="mr-2">Continuous improvement</span>
                    <div className="flex space-x-1">
                      <span className="inline-block w-2 h-2 bg-gray-300 rounded-full animate-pulse"></span>
                      <span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-pulse animation-delay-200"></span>
                      <span className="inline-block w-2 h-2 bg-gray-500 rounded-full animate-pulse animation-delay-400"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-16 mb-10">
              <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-gray-300 to-gray-400"></div>
              <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-full -mt-3">
                <div className="bg-gray-400 rounded-full p-1">
                  <ArrowRight className="w-5 h-5 text-white rotate-90" />
                </div>
              </div>

              <div className="md:hidden flex justify-center items-center h-full">
                <div className="w-1/3 h-0.5 bg-gray-300"></div>
                <div className="bg-gray-400 rounded-full p-1 mx-2">
                  <ArrowRight className="w-5 h-5 text-white" />
                </div>
                <div className="w-1/3 h-0.5 bg-gray-300"></div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-100 via-white to-gray-100 rounded-lg p-8 max-w-xl mx-auto text-center shadow-md hover:shadow-lg transition-all duration-300">
              <div className="relative inline-block mb-4">
                <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse-slow"></div>
                <div className="relative bg-white rounded-full p-4 border border-gray-200 shadow-md">
                  <Rocket className="h-10 w-10 text-gray-700" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Hitting the Market</h3>
              <p className="text-gray-700">
                Ready to scale, produce, and launch
              </p>
              <div className="flex justify-center mt-4 space-x-2">
                <span className="inline-block w-3 h-3 rounded-full bg-gray-300 animate-pulse"></span>
                <span className="inline-block w-3 h-3 rounded-full bg-gray-500 animate-pulse animation-delay-200"></span>
                <span className="inline-block w-3 h-3 rounded-full bg-gray-700 animate-pulse animation-delay-400"></span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <button
                onClick={() => {
                  const contactSection = document.getElementById("contact");
                  contactSection?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center px-4 sm:px-6 bg-white text-gray-700 rounded-lg border border-gray-200 hover:bg-gray-50 hover:shadow-md transition-all group py-3 w-full sm:w-auto justify-center"
              >
                Learn More About Our Technology
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <Button
                onClick={scrollToContact}
                className="inline-flex items-center px-4 sm:px-6 py-3 bg-gray-700 hover:bg-gray-800 text-white rounded-lg shadow-md hover:shadow-lg transition-all group w-full sm:w-auto justify-center"
              >
                Contact Our Experts
                <MessageSquare className="ml-2 w-4 h-4 group-hover:scale-110 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
