import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, Mail, User, MessageSquare, Phone, Building2, Calendar, DollarSign, Clock, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import emailjs from 'emailjs-com';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  company: z.string().min(2, 'Company name must be at least 2 characters'),
  projectType: z.string().min(1, 'Please select a project type'),
  budget: z.string().min(1, 'Please select a budget range'),
  timeline: z.string().min(1, 'Please select a timeline'),
  teamSize: z.string().min(1, 'Please select team size'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  honeypot: z.string().max(0, 'Bot detected'),
  timestamp: z.number()
});

type FormValues = z.infer<typeof formSchema>;

const EMAILJS_SERVICE_ID = "service_i3h66xg";
const EMAILJS_TEMPLATE_ID = "template_fgq53nh";
const EMAILJS_PUBLIC_KEY = "wQmcZvoOqTAhGnRZ3";

const EnhancedContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStartTime] = useState<number>(Date.now());
  
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      projectType: '',
      budget: '',
      timeline: '',
      teamSize: '',
      message: '',
      honeypot: '',
      timestamp: formStartTime
    }
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      if (data.honeypot) {
        toast({
          title: "Error",
          description: "There was a problem with your submission. Please try again.",
          variant: "destructive"
        });
        return;
      }
      
      const timeDiff = Date.now() - data.timestamp;
      if (timeDiff < 3000) {
        toast({
          title: "Error",
          description: "Please take a moment to review your message before submitting.",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }
      
      const { honeypot, timestamp, ...emailData } = data;
      
      const templateParams = {
        from_name: emailData.name,
        from_email: emailData.email,
        phone: emailData.phone,
        company: emailData.company,
        project_type: emailData.projectType,
        budget: emailData.budget,
        timeline: emailData.timeline,
        team_size: emailData.teamSize,
        message: emailData.message,
        to_name: 'CO Consultants Team',
        reply_to: emailData.email
      };
      
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      
      toast({
        title: "Message sent!",
        description: "We've received your detailed inquiry and will get back to you soon.",
        variant: "default"
      });

      form.reset({
        name: '',
        email: '',
        phone: '',
        company: '',
        projectType: '',
        budget: '',
        timeline: '',
        teamSize: '',
        message: '',
        honeypot: '',
        timestamp: Date.now()
      });
    } catch (error) {
      console.error('Error sending email:', error);
      
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-gradient-to-b from-white via-primary/5 to-primary/10 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium shadow-lg">
            Get In Touch
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Ready to Transform Your Construction Data?
          </h2>
          <p className="text-gray-700 text-xl max-w-3xl mx-auto leading-relaxed">
            Tell us about your project and let's discuss how our construction analytics platform can deliver real-time insights and predictive analytics for your operations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Enhanced Contact Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-2xl p-8 border border-primary/10 hover:shadow-3xl transition-all duration-300">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Project Details</h3>
              <p className="text-gray-600">Help us understand your construction data needs better.</p>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-semibold">Full Name *</FormLabel>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 h-5 w-5 text-primary" />
                        <FormControl>
                          <Input placeholder="John Doe" className="pl-10 border-primary/20 focus:border-primary" {...field} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )} />
                  
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-semibold">Email Address *</FormLabel>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-primary" />
                        <FormControl>
                          <Input type="email" placeholder="john@company.com" className="pl-10 border-primary/20 focus:border-primary" {...field} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-semibold">Phone Number *</FormLabel>
                      <div className="relative">
                        <Phone className="absolute left-3 top-2.5 h-5 w-5 text-primary" />
                        <FormControl>
                          <Input type="tel" placeholder="+1 (555) 123-4567" className="pl-10 border-primary/20 focus:border-primary" {...field} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )} />
                  
                  <FormField control={form.control} name="company" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-semibold">Company Name *</FormLabel>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-2.5 h-5 w-5 text-primary" />
                        <FormControl>
                          <Input placeholder="Construction Company Inc." className="pl-10 border-primary/20 focus:border-primary" {...field} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                {/* Project Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="projectType" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-semibold">Project Type *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="border-primary/20 focus:border-primary">
                          <SelectValue placeholder="Select project type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dashboard-setup">Dashboard Setup</SelectItem>
                          <SelectItem value="rtls-tracking">RTLS Tracking Implementation</SelectItem>
                          <SelectItem value="data-integration">Data Integration</SelectItem>
                          <SelectItem value="analytics-platform">Complete Analytics Platform</SelectItem>
                          <SelectItem value="consulting">Construction Data Consulting</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  
                  <FormField control={form.control} name="budget" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-semibold">Budget Range *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="border-primary/20 focus:border-primary">
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-25k">Under $25,000</SelectItem>
                          <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                          <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                          <SelectItem value="100k-250k">$100,000 - $250,000</SelectItem>
                          <SelectItem value="over-250k">Over $250,000</SelectItem>
                          <SelectItem value="discuss">Prefer to discuss</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="timeline" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-semibold">Project Timeline *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="border-primary/20 focus:border-primary">
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="asap">ASAP</SelectItem>
                          <SelectItem value="1-3months">1-3 months</SelectItem>
                          <SelectItem value="3-6months">3-6 months</SelectItem>
                          <SelectItem value="6-12months">6-12 months</SelectItem>
                          <SelectItem value="over-year">Over a year</SelectItem>
                          <SelectItem value="flexible">Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  
                  <FormField control={form.control} name="teamSize" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-semibold">Team Size *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="border-primary/20 focus:border-primary">
                          <SelectValue placeholder="Select team size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10 people</SelectItem>
                          <SelectItem value="11-50">11-50 people</SelectItem>
                          <SelectItem value="51-200">51-200 people</SelectItem>
                          <SelectItem value="201-500">201-500 people</SelectItem>
                          <SelectItem value="over-500">Over 500 people</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                
                <FormField control={form.control} name="message" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-semibold">Project Details *</FormLabel>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-primary" />
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us more about your construction data needs. What specific challenges are you facing? What kind of insights are you looking for?" 
                          className="min-h-[120px] pl-10 resize-none border-primary/20 focus:border-primary" 
                          {...field} 
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )} />
                
                {/* Honeypot field */}
                <FormField control={form.control} name="honeypot" render={({ field }) => (
                  <FormItem className="hidden">
                    <FormLabel>Leave this empty</FormLabel>
                    <FormControl>
                      <Input {...field} tabIndex={-1} />
                    </FormControl>
                  </FormItem>
                )} />
                
                {/* Hidden timestamp field */}
                <FormField control={form.control} name="timestamp" render={({ field }) => (
                  <FormItem className="hidden">
                    <FormControl>
                      <Input type="hidden" {...field} />
                    </FormControl>
                  </FormItem>
                )} />
                
                <button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-4 px-8 rounded-lg transition-all duration-300 flex items-center justify-center disabled:opacity-70 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-2"></div>
                      Sending...
                    </div>
                  ) : (
                    <>
                      Send Project Inquiry
                      <Send className="ml-2 h-5 w-5" />
                    </>
                  )}
                </button>
              </form>
            </Form>
          </div>
          
          {/* Contact Information & Features */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-primary/10">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground mb-6 shadow-lg">
                <Mail className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Direct Contact</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600 mb-2">Email us directly:</p>
                  <a href="mailto:hello@coconsultants.com" className="text-primary hover:text-primary/80 font-semibold text-lg transition-colors">
                    hello@coconsultants.com
                  </a>
                </div>
                <div>
                  <p className="text-gray-600 mb-2">Call us:</p>
                  <a href="tel:+1234567890" className="text-primary hover:text-primary/80 font-semibold text-lg transition-colors">
                    +1 (234) 567-8900
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-8 rounded-2xl border border-primary/20">
              <h3 className="text-xl font-semibold mb-6 text-gray-900">What to Expect</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground mr-3 text-sm font-semibold">
                    1
                  </div>
                  <span className="text-gray-700">Response within 24 hours</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground mr-3 text-sm font-semibold">
                    2
                  </div>
                  <span className="text-gray-700">Discovery call to understand your needs</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground mr-3 text-sm font-semibold">
                    3
                  </div>
                  <span className="text-gray-700">Custom proposal with timeline & pricing</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground mr-3 text-sm font-semibold">
                    4
                  </div>
                  <span className="text-gray-700">Project kickoff & implementation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedContactForm;