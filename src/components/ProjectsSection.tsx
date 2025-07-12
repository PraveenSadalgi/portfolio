import { motion, useMotionValue, useTransform } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { Cuboid } from "lucide-react";

// NEW IMAGE IMPORTS ADDED HERE
import premiumPhoto from "@/images/shashank-hegade-Sw6rQoIf3gk-unsplash.jpg";
// import newImage from "@/images/runnyrem-LfqmND-hym8-unsplash.jpg";
import newImage2 from "@/images/premium_photo-1681293215038-2717d2b84c0d.avif";
import newImage3 from "@/images/premium_photo-1716999684556-f2f310f27e3a.avif";
import newImage4 from "@/images/vyacheslav-khaisarov-CkA9ZJ069ro-unsplash.jpg";
import newImage5 from "@/images/the-blowup-xBqM6cfgP4U-unsplash.jpg";
interface Project {
  title: string;
  description: string;
  image?: string; // Optional image property
  techStack: string[];
  github?: string;
  live?: string;
}

const ProjectsSection = () => {
  const projects: Project[] = [
    {
      title: "QR Code Generator",
      description: "A simple yet powerful QR code generator built with pure HTML, CSS, and JavaScript.",
      image: newImage2, // Using premiumPhoto image
      techStack: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/PraveenSadalgi/QR-code-generator/",
      live: "https://qr-code-generator-sigma-gray.vercel.app/",
    },
    {
      title: "Electric Bill Estimator",
      description: "Calculate and estimate electricity bills based on usage patterns and rates.",
      image: newImage3, // Using newImage image
      techStack: ["React", "JavaScript", "CSS"],
      github: "https://github.com/PraveenSadalgi/Electronic-Bill-Estimator",
      live: "https://electronic-bill-estimator.vercel.app/",
    },
    {
      title: "Future Ready Prep",
      description: "A platform to help students prepare for interviews and assessments.",
       image: newImage4,
      techStack: ["React", "Node.js", "MongoDB"],
      github: "https://github.com/PraveenSadalgi/future-ready-prep-23",
      live: "https://future-ready-prep-23.vercel.app/",
    },
    {
      title: "Agri-nexus-Northeast",
      description: "A solution connecting farmers with resources and markets in the Northeast.",
      image: premiumPhoto,
      techStack: ["Next.js", "Tailwind CSS", "Node.js"],
      github: "https://github.com/PraveenSadalgi/agri-bridge-northeast", 
      live: "https://agrobridge-northeast.vercel.app/",
    },
    {
      title: "OneShield",
      description: "A comprehensive security solution for digital assets (In Development).",
       image: newImage5,
      techStack: ["React", "TypeScript", "Express.js", "MongoDB"],
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="section-heading mx-auto">Projects</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
            Explore my portfolio of web applications and projects that showcase my technical skills and problem-solving abilities.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {projects.map((project, index) => (
            <motion.div key={index} variants={item}>
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    x.set(mouseX);
    y.set(mouseY);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  
  return (
    <motion.div 
      ref={cardRef}
      className="group project-card cursor-pointer h-full"
      style={{ 
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        translateZ: 10,
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.5, delay: index * 0.1 } 
      }}
      viewport={{ once: true }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.3s ease-out'
        }}
      >
        <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
          <div className="h-48 bg-gray-200 dark:bg-gray-800 relative overflow-hidden">
            {/* Project image or placeholder */}
            {project.image ? (
              // Show actual project image if available
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
            ) : (
              // Show placeholder if no image
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
                <motion.div
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="transform-gpu"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <Cuboid className="w-16 h-16 text-white opacity-70" />
                </motion.div>
                <motion.span 
                  className="absolute text-white text-4xl font-bold"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {project.title.charAt(0)}
                </motion.span>
              </div>
            )}
            
            {/* Overlay with buttons */}
            <div className="project-card-overlay absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-opacity-60 transition-all duration-300">
              <div className="flex gap-3">
                {project.github && (
                  <Button variant="outline" size="sm" asChild className="bg-white">
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      GitHub
                    </a>
                  </Button>
                )}
                {project.live && (
                  <Button size="sm" asChild>
                    <a href={project.live} target="_blank" rel="noopener noreferrer">
                      Live Demo
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
          <CardContent className="p-6 flex-grow">
            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.techStack.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -3, scale: 1.05 }}
                >
                  <Badge
                    variant="outline"
                    className="px-2 py-1 text-xs font-medium"
                  >
                    {tech}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="px-6 pb-6 pt-0">
            <div className="flex gap-3">
              {project.github && (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      GitHub
                    </a>
                  </Button>
                </motion.div>
              )}
              {project.live && (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="sm" asChild>
                    <a href={project.live} target="_blank" rel="noopener noreferrer">
                      Live Demo
                    </a>
                  </Button>
                </motion.div>
              )}
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default ProjectsSection;