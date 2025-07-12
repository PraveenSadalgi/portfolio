
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const ContactSection = () => {
  // Toast notification hook
  const { toast } = useToast();
  
  // Form data state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  
  // Submission state for loading indication
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form input change handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission with timeout
    // In production, replace this with actual API call
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      // Reset form after submission
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 1500);
  };

  // Contact information to display
  const contactInfo = [
    {
      icon: "📱", // Can be replaced with actual icon component
      title: "Phone",
      value: "+91 8310125397",
      link: "tel:+918310125397",
    },
    {
      icon: "📧", // Can be replaced with actual icon component
      title: "Email",
      value: "praveensadalgi@gmail.com",
      link: "mailto:praveensadalgi@gmail.com",
    },
    {
      icon: "📍", // Can be replaced with actual icon component
      title: "Address",
      value: "Basav Nagar, Gokak, Karnataka",
      link: "https://maps.google.com/?q=Basav+Nagar+Gokak+Karnataka",
    },
    {
      icon: "🔗", // Can be replaced with actual icon component
      title: "GitHub",
      value: "github.com/PraveenSadalgi",
      link: "https://github.com/PraveenSadalgi",
    },
    {
      icon: "💼", // Can be replaced with actual icon component
      title: "LinkedIn",
      value: "LinkedIn Profile",
      link: "https://linkedin.com/in/praveensadalgi",
    },
  ];

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        {/* Section header with animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="section-heading mx-auto">Get In Touch</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
            Have a project in mind or want to explore collaboration opportunities? Reach out using any of these channels.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <Card className="border-none shadow-lg h-full">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  {/* Contact info items */}
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex items-start">
                      {/* Icon container */}
                      <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xl mr-4 flex-shrink-0">
                        {item.icon}
                      </div>
                      {/* Contact details */}
                      <div>
                        <h4 className="font-medium text-lg">{item.title}</h4>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary"
                        >
                          {item.value}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <Card className="border-none shadow-lg h-full">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
                {/* Contact form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                    />
                  </div>
                  
                  {/* Email field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Your Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  {/* Message field */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Your Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="How can I help you?"
                      rows={5}
                    />
                  </div>
                  
                  {/* Submit button */}
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
