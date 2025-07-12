
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface Service {
  icon: string;
  title: string;
  description: string;
}

const ServicesSection = () => {
  const services: Service[] = [
    {
      icon: "💻",
      title: "Website & Web App Development",
      description: "Custom websites and web applications built with modern technologies to meet your specific needs."
    },
    {
      icon: "🚀",
      title: "Portfolio & Resume Website Building",
      description: "Professional portfolio websites to showcase your skills, projects, and achievements."
    },
    {
      icon: "👨‍💼",
      title: "Interview Prep & Mentorship",
      description: "Personalized guidance and preparation for technical interviews and career advancement."
    },
    {
      icon: "⚛️",
      title: "Full Stack App Development",
      description: "End-to-end application development with both frontend and backend expertise."
    },
    {
      icon: "🗄️",
      title: "Database Design (MongoDB / MySQL)",
      description: "Efficient and scalable database solutions designed for optimal performance."
    },
    {
      icon: "🔧",
      title: "Job-Prep Tools & Dashboards",
      description: "Custom tools and dashboards to help you prepare and track your job search progress."
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="services" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="section-heading mx-auto">Services I Offer</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
            Professional services tailored to meet your development needs and help you achieve your digital goals.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={item}>
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mt-12"
        >
          <a 
            href="#contact" 
            className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Discuss Your Project
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const ServiceCard = ({ service }: { service: Service }) => {
  return (
    <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center text-3xl mb-4">
          {service.icon}
        </div>
        <h3 className="text-xl font-bold mb-3">{service.title}</h3>
        <p className="text-gray-600 dark:text-gray-400">
          {service.description}
        </p>
      </CardContent>
    </Card>
  );
};

export default ServicesSection;
