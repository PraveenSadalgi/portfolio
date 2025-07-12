
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useRef, useEffect } from "react";
import { Cuboid } from "lucide-react";

interface Achievement {
  title: string;
  event: string;
  description: string;
}

const AchievementsSection = () => {
  const achievements: Achievement[] = [
    {
      title: "Winner",
      event: "KLE BCA Web Dev (Gokak)",
      description: "Recognized for creating the most innovative and functional web application."
    },
    {
      title: "Winner",
      event: "KLE BCA Hackathon",
      description: "Led a team to victory with a cutting-edge solution to a real-world problem."
    },
    {
      title: "Winner",
      event: "Jain Engineering College Hackathon",
      description: "Developed a standout project that impressed judges and industry professionals."
    },
    {
      title: "Winner",
      event: "Agadi College Hackathon",
      description: "Created an innovative solution that addressed key challenges in the presented problem statement."
    },
    {
      title: "Winner",
      event: "Technova (KLE Cluster)",
      description: "Showcased technical excellence and creativity to win the prestigious tech competition."
    },
    {
      title: "Winner",
      event: "KLE BCA Chikodi Presentation",
      description: "Delivered an outstanding presentation that earned first place recognition."
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
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const section = sectionRef.current;
      const sectionTop = section.getBoundingClientRect().top;
      const scrollProgress = Math.max(0, Math.min(1, 1 - sectionTop / window.innerHeight * 0.8));
      
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        
        const delay = i * 0.1;
        const translateY = Math.max(0, 50 - scrollProgress * 100 - delay * 100);
        const opacity = Math.min(1, Math.max(0, scrollProgress * 2 - delay));
        
        card.style.transform = `translateY(${translateY}px)`;
        card.style.opacity = opacity.toString();
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="achievements" className="py-20" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="section-heading mx-auto">Achievements</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
            A track record of excellence in hackathons and tech competitions, showcasing problem-solving skills and innovation.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {achievements.map((achievement, index) => (
            <motion.div 
              key={index} 
              variants={item}
              ref={el => cardsRef.current[index] = el}
              style={{ 
                opacity: 0,
                transform: 'translateY(50px)',
                transition: 'transform 0.6s ease-out, opacity 0.6s ease-out'
              }}
            >
              <AchievementCard achievement={achievement} index={index} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mt-10"
        >
          <p className="text-gray-600 dark:text-gray-400 italic">And many more achievements...</p>
        </motion.div>
      </div>
    </section>
  );
};

const AchievementCard = ({ achievement, index }: { achievement: Achievement, index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      card.style.transform = `
        perspective(800px)
        rotateY(${x * 10}deg)
        rotateX(${-y * 10}deg)
        translateZ(10px)
      `;
    };
    
    const handleMouseLeave = () => {
      card.style.transform = `
        perspective(800px)
        rotateY(0deg)
        rotateX(0deg)
        translateZ(0)
      `;
    };
    
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  return (
    <div 
      ref={cardRef}
      style={{ 
        transition: 'transform 0.3s ease-out',
        transformStyle: 'preserve-3d'
      }}
    >
      <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
        <div className="h-2 bg-gradient-to-r from-primary to-secondary"></div>
        <CardContent className="p-6">
          <div className="relative mb-4">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
              {achievement.title}
            </span>
            <motion.div
              className="absolute -right-2 -top-2 text-primary/20"
              animate={{ 
                rotateY: [0, 360],
                rotateX: [0, 360]
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                delay: index * 0.5,
                ease: "linear"
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Cuboid className="w-6 h-6" />
            </motion.div>
          </div>
          <h3 className="text-xl font-bold mb-2">{achievement.event}</h3>
          <p className="text-gray-600 dark:text-gray-400">
            {achievement.description}
          </p>
          
          <motion.div 
            className="w-12 h-12 bg-primary/5 rounded-full absolute -bottom-6 -right-6 flex items-center justify-center opacity-40"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 360]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: index * 0.7,
              ease: "linear"
            }}
          >
            <span className="text-xl">🏆</span>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AchievementsSection;
