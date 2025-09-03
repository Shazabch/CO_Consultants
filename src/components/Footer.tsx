import { ArrowRight, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import emailjs from "emailjs-com";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // EmailJS configuration
      const EMAILJS_SERVICE_ID = "service_i3h66xg";
      const EMAILJS_TEMPLATE_ID = "template_fgq53nh";
      const EMAILJS_PUBLIC_KEY = "wQmcZvoOqTAhGnRZ3";

      const templateParams = {
        from_name: "Website Subscriber",
        from_email: email,
        message: `New subscription request from the website footer.`,
        to_name: "CO Consultants Team",
        reply_to: email,
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      toast({
        title: "Success!",
        description: "Thank you for subscribing to our newsletter.",
        variant: "default",
      });

      setEmail("");
    } catch (error) {
      console.error("Error sending subscription:", error);

      toast({
        title: "Error",
        description: "There was a problem subscribing. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer
      id="contact"
      className="bg-gradient-to-b from-white to-[#5ba9b2]  text-black pt-16 pb-8 w-full"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 pb-10 border-b border-white/20">
          <div className="lg:col-span-2">
            <img
              src="/Assets/horizontallogo.png"
              alt="CO Consultants Logo"
              className="h-20 w-auto mb-6"
            />
            <p className=" text-black/80 mb-6">
              CO Consultants provides comprehensive construction data analytics
              and tracking solutions, giving you complete visibility into
              project performance while we handle the complete technological
              implementation.
            </p>
            <p className=" text-black/80 mb-6">
              1234 Construction Drive
              <br />
              Suite 567
              <br />
              Manchester, UK M1 1AA
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/co-consultants/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center  text-black hover:bg-white/30 transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-black">Company</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() =>
                    document.getElementById("about")?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                  className=" text-black/80 hover: text-black transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    document.getElementById("contact")?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                  className=" text-black/80 hover: text-black transition-colors"
                >
                  Careers
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    document.getElementById("contact")?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                  className=" text-black/80 hover: text-black transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-black">Get in Touch</h3>
            <form className="space-y-4" onSubmit={handleSubscribe}>
              <div>
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5ba9b2]  text-black placeholder-white/70"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-[#5ba9b2]  text-black rounded-md hover:bg-[#4a929b] transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Subscribing..."
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className=" text-black/70 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} CO Consultants. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <button
              onClick={() =>
                document.getElementById("contact")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              className="text-sm  text-black/70 hover: text-black transition-colors"
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
