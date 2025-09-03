
import NewNavbar from '@/components/NewNavbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import WhyWrlds from '@/components/WhyWrlds';
import Process from '@/components/Process';
import DynamicContactForm from '@/components/DynamicContactForm';
import ProjectsSection from '@/components/ProjectsSection';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { useEffect } from 'react';

const Index = () => {
  // Fix any ID conflicts when the page loads
  useEffect(() => {
    const contactElements = document.querySelectorAll('[id="contact"]');
    if (contactElements.length > 1) {
      // If there are multiple elements with id="contact", rename one
      contactElements[1].id = 'contact-footer';
    }
  }, []);

  return (
    <div className="smooth-scroll">
      <SEO 
        title="CO Consultants - Advanced Construction Analytics & Management Solutions" 
        description="Transform construction projects with professional-grade real-time tracking, smart dashboards, and predictive analytics. Reduce delays, optimize resources, and maximize productivity with our proven construction technology platform."
        imageUrl="/lovable-uploads/280712c4-e019-49c4-a570-ff9f00229887.png"
        keywords={['construction analytics', 'construction management software', 'real-time tracking construction', 'construction dashboards', 'RTLS construction', 'construction productivity', 'construction technology solutions', 'project management construction', 'construction data analytics', 'predictive analytics construction']}
      />
      <NewNavbar />
      <Hero />
      <Features />
      <ProjectsSection />
      <WhyWrlds />
      <Process />
      <AboutSection />
      <DynamicContactForm />
      <Footer />
    </div>
  );
};

export default Index;
