
import { motion, useAnimation } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useEffect, useRef } from "react";
import { Cuboid } from "lucide-react";

const AboutSection = () => {
  const techStack = [
    "HTML",
    "CSS",
    "JavaScript",
    "ReactJS",
    "NextJS",
    "NodeJS",
    "MongoDB",
    "MySQL",
  ];
  
  const cubeRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  
  useEffect(() => {
    const handleScroll = () => {
      if (!cubeRef.current) return;
      
      const rect = cubeRef.current.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isVisible) {
        const scrollPosition = window.scrollY;
        const rotation = scrollPosition * 0.1;
        
        if (cubeRef.current) {
          cubeRef.current.style.transform = `rotateY(${rotation}deg) rotateX(${rotation/2}deg)`;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="section-heading mx-auto">About Me</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-6"
          >
            <div 
              ref={cubeRef}
              className="relative w-full h-80 rounded-xl overflow-hidden shadow-xl perspective-3d"
              style={{ 
                perspective: '1000px',
                transformStyle: 'preserve-3d',
                transition: 'transform 0.5s ease-out'
              }}
            >
              {/* 3D Cube */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary flex items-center justify-center transform-gpu">
                <motion.div
                  animate={{ 
                    rotateY: [0, 360],
                    rotateX: [0, 360]
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="text-white text-8xl"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <Cuboid className="w-32 h-32" />
                </motion.div>
                <motion.span 
                  className="absolute text-white text-8xl font-bold"
                  animate={{ 
                    opacity: [0.2, 0.8, 0.2],
                    scale: [0.8, 1.2, 0.8]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  PS
                </motion.span>
              </div>

              {/* Interactive elements */}
              <motion.div
                className="absolute bottom-4 right-4 w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center"
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <span className="text-xl">🚀</span>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-bold">Praveen M Sadalgi</h3>
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="px-3 py-1 text-sm font-medium">
                BCA Student
              </Badge>
              <Badge variant="outline" className="px-3 py-1 text-sm font-medium">
                Full Stack Developer
              </Badge>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              I'm a passionate Full Stack Developer and BCA student with a proven track record 
              of success in hackathons and web development competitions. I love tackling complex 
              problems and turning ideas into reality through clean, efficient code and 
              intuitive user experiences.
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              My journey in technology is driven by continuous learning and a desire to create 
              impactful digital solutions that make a difference.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <h4 className="text-xl font-semibold mb-3">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech, index) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1, rotate: 3 }}
                  >
                    <Badge
                      variant="secondary"
                      className="px-3 py-1 text-sm font-medium"
                    >
                      {tech}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <div className="pt-4">
              <motion.a 
                href="#contact" 
                className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                Let's Connect
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
