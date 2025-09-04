import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Award, Lightbulb } from "lucide-react";

const AboutSection = () => {
  const values = [
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: "Precision",
      description:
        "We deliver accurate, real-time data insights that drive informed decision-making.",
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Collaboration",
      description:
        "Working closely with construction teams to understand their unique challenges.",
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-primary" />,
      title: "Innovation",
      description:
        "Pioneering new technologies to solve complex construction data problems.",
    },
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      title: "Excellence",
      description:
        "Committed to delivering exceptional results that exceed expectations.",
    },
  ];

  const stats = [
    { number: "50+", label: "Projects Completed" },
    { number: "95%", label: "Client Satisfaction" },
    { number: "24/7", label: "Support Available" },
    { number: "5+", label: "Years Experience" },
  ];

  return (
    <section id="about" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium shadow-lg">
            About Us
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Transforming Construction Through Data
          </h2>
          <p className="text-gray-700 text-xl max-w-3xl mx-auto leading-relaxed">
            CO Consultants specializes in construction data analytics, helping
            companies make smarter decisions through real-time insights and
            predictive analytics.
          </p>
        </div>

        {/* Company Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold mb-6 text-gray-900">Our Story</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Founded with a mission to revolutionize the construction industry
              through data-driven insights, CO Consultants emerged from the
              recognition that construction projects were drowning in data but
              starving for actionable intelligence.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Our team combines deep construction industry expertise with
              cutting-edge technology to deliver solutions that actually work in
              the field. We understand the unique challenges of construction
              environments and design our systems accordingly.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Today, we're proud to partner with construction companies of all
              sizes, from local contractors to multinational firms, helping them
              optimize operations and deliver projects more efficiently.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fHRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D"
              alt="Construction team working with data analytics"
              className="rounded-lg shadow-xl"
            />
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Values */}
        <div>
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Our Values
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full hover:shadow-lg transition-shadow border-primary/10">
                  <CardContent className="p-6">
                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      {value.icon}
                    </div>
                    <h4 className="text-xl font-bold mb-3 text-gray-900">
                      {value.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
