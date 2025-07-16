import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Rotate3d } from "lucide-react";
import premiumPhoto from "@/images/IMG-20250623-WA0004.jpg";
import newImage from "@/images/IMG-20250623-WA0003.jpg";
import newImage2 from "@/images/IMG-20250623-WA0006.jpg";
import newImage3 from "@/images/IMG-20250623-WA0005.jpg"; 
import newImage4 from "@/images/WhatsApp Image 2025-06-22 at 20.39.09_a89ef5e0.jpg"; // New image added
interface GalleryImage {
  id: number;
  thumbnail: string;
  title: string;
  description: string;
  category: string;
}

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Sample gallery data - now includes the new image
  const galleryImages: GalleryImage[] = [
    {
      id: 1,
      thumbnail: newImage3, // Using the new imported image
      title: "KLE BCA Web Dev Winner",
      description: "Receiving the first place award at the KLE BCA Web Development competition, where our innovative approach to responsive design earned recognition.",
      category: "awards"
    },
    // CHANGED IMAGE - Replaced with new local image
    {
      id: 2,
      thumbnail: newImage4, // Using the new imported image
      title: "Winner KLE BCA Hackathon,Chikodi,Karnataka",
      description: "Winning the KLE BCA Hackathon with our team, where we developed a cutting-edge AI solution to enhance the way of learning for students.",
      category: "Education"
    },
    // OTHER IMAGES - Add/change images here following the same pattern
    {
      id: 3,
      thumbnail: newImage2,
      title: "Team Celebration",
      description: "Celebrating our victory with the team after winning the Technova competition with our AI-powered accessibility solution for visually impaired users.",
      category: "awards"
    },
    {
      id: 4,
      thumbnail: newImage3,
      title: "Award Ceremony",
      description: "Showcasing our project to the judges at Jain Engineering College Hackathon. We built a blockchain-based solution for secure digital credential verification.",
      category: "awards"
    },
    {
      id: 5,
      thumbnail: premiumPhoto,
      title: "Project Showcase",
      description: "Being recognized at the award ceremony of  Agadi College Hackathon for developing an innovative mobile application that helps connect local farmers to consumers.",
      category: "projects"
    },
    {
      id: 6,
      thumbnail:newImage,
      title: "Certificate Reception",
      description: "Receiving a certificate of achievement at the KLE BCA event for outstanding contributions to web development innovation and community service.",
      category: "awards"
    },
  ];

  // Filter categories for the gallery filter
  const categories = ["all", ...Array.from(new Set(galleryImages.map(img => img.category)))];
  
  // Animation variants for container
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  // Define the item animation variants here so it's accessible to both components
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };

  // Filter images based on active category
  const filteredImages = activeCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <section id="gallery" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="section-heading mx-auto">Gallery</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
            A visual journey through my achievements and experiences in tech competitions and events.
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {categories.map((category) => (
            <Button 
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Gallery grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {filteredImages.map((image) => (
            <GalleryItem 
              key={image.id} 
              image={image} 
              onClick={() => setSelectedImage(image)} 
              itemVariants={itemVariants}
            />
          ))}
        </motion.div>

        {/* Empty state message when no images match filter */}
        {filteredImages.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-lg text-gray-500">No gallery items found for this category.</p>
          </motion.div>
        )}
      </div>

      {/* Image Modal with 3D effect */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0, rotateX: -15 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.9, opacity: 0, rotateX: 15 }}
              transition={{ type: "spring", damping: 15 }}
            >
              {/* Modal image container */}
              <div className="relative aspect-video bg-gray-200 dark:bg-gray-700">
                <img 
                  src={`${selectedImage.thumbnail}`} 
                  alt={selectedImage.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "";
                    const parent = target.parentElement;
                    if (parent) {
                      const fallback = document.createElement('div');
                      fallback.className = "absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary to-secondary";
                      fallback.innerHTML = `
                        <div class="text-white text-7xl font-bold">${selectedImage.id}</div>
                      `;
                      parent.appendChild(fallback);
                    }
                  }}
                />
                {/* 3D effect layer */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 opacity-0 hover:opacity-100 transition-opacity">
                  <motion.div
                    animate={{ 
                      rotateY: [0, 360],
                      transition: { duration: 10, repeat: Infinity, ease: "linear" }
                    }}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <Rotate3d className="w-16 h-16 text-white opacity-70" />
                  </motion.div>
                </div>
              </div>
              
              {/* Modal content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{selectedImage.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {selectedImage.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm capitalize">
                    {selectedImage.category}
                  </span>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button onClick={() => setSelectedImage(null)}>Close</Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// 3D Gallery Item component
const GalleryItem = ({ 
  image, 
  onClick, 
  itemVariants 
}: { 
  image: GalleryImage, 
  onClick: () => void,
  itemVariants: any
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Motion values for 3D effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Transform values for rotation
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);
  
  // Handle mouse movement for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    x.set(mouseX);
    y.set(mouseY);
  };
  
  // Reset position on mouse leave
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  
  return (
    <motion.div 
      ref={ref}
      className="aspect-square relative rounded-lg overflow-hidden cursor-pointer shadow-lg"
      onClick={onClick}
      style={{ 
        perspective: '1200px',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      variants={itemVariants}
      whileHover={{ scale: 1.05, zIndex: 10 }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="w-full h-full"
      >
        {/* Image container */}
        <div className="absolute inset-0">
          <img 
            src={`${image.thumbnail}`} 
            alt={image.title}
            className="w-full h-full object-cover transition-transform duration-500 ease-out"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.className = "absolute inset-0 bg-gradient-to-br from-primary to-secondary flex items-center justify-center";
                const span = document.createElement('span');
                span.className = "text-white text-5xl";
                span.innerHTML = image.id.toString();
                parent.appendChild(span);
              }
            }}
          />
        </div>
        {/* Overlay with info */}
        <motion.div 
          className="absolute inset-0 bg-black bg-opacity-0 flex flex-col items-center justify-end p-4"
          whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <motion.div 
            className="text-white opacity-0 transform translate-y-4 text-center"
            whileHover={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="font-bold text-lg mb-1">{image.title}</h3>
            <p className="text-sm text-white/80 line-clamp-2">{image.description}</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default GallerySection;