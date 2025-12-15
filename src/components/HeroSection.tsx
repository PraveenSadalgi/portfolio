
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { ArrowRight } from "lucide-react";
// Prism removed as per request
import premiumPhoto from "@/images/WhatsApp Image 2025-11-22 at 19.11.39_eceb784b.jpg";

// TypedText component for typing animation effect
const TypedText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return <span>{displayText}</span>;
};

const HeroSection = () => {
  // Prism removed — no background animation

  return (
    <section id="home" className="relative min-h-screen flex items-center">
      {/* Background gradient (behind prism) */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950 -z-20"></div>
      
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-20 right-10 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div 
        className="absolute bottom-10 left-10 w-64 h-64 bg-secondary/10 rounded-full filter blur-3xl"
        animate={{
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Prism background removed */}

      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <motion.div 
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-lg md:text-xl font-medium text-primary mb-2">
              <TypedText text="Hello, I'm" />
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-gray-900 dark:text-white">
              Praveen M Sadalgi
            </h1>
            <h2 className="text-xl md:text-2xl lg:text-3xl mb-6 text-gray-700 dark:text-gray-300">
              Full Stack Developer & <span className="text-primary font-semibold">Hackathon Champion</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-2xl">
              Building modern web applications with a focus on user experience, 
              performance and scalability. Let's create something amazing together.
            </p>
            <div className="flex flex-wrap gap-4">
              {/* View Projects button */}
              <motion.div
                className="perspective-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a href="#projects" className="inline-block">
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/100 transform transition-all duration-300 view-projects-button flex items-center gap-2"
                  >
                    View Projects <ArrowRight className="h-5 w-5 animate-bounce-right" />
                  </Button>
                </a>
              </motion.div>
              
              {/* Contact Me button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a href="#contact">
                  <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/100">
                    Contact Me
                  </Button>
                </a>
              </motion.div>
              
              {/* Hire Me button - Updated to link to contact section */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a href="#contact">
                  <Button size="lg" variant="secondary" className="bg-secondary hover:bg-secondary/90">
                    Hire Me
                  </Button>
                </a>
              </motion.div>
            </div>
          </motion.div>
          
          {/* 3D Prism Animation */}
          <motion.div 
            className="lg:col-span-5 hidden lg:flex items-center justify-center h-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-full h-96">
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.img
                  src={premiumPhoto}
                  alt="Praveen"
                  initial={{ scale: 0.98, opacity: 0.95 }}
                  animate={{ scale: [0.98, 1.02, 0.99], rotate: [0, 1.5, -1.5, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                />
              </div>
              <motion.div 
                className="absolute -bottom-4 -right-4 w-20 h-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg flex items-center justify-center"
                animate={{ 
                  rotateY: [0, 180, 360],
                  rotateX: [0, 180, 0]
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <span className="text-3xl">🚀</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
