
import { motion } from "framer-motion";

const Footer = () => {
  // Social media links for the footer
  const socialLinks = [
    { name: "GitHub", url: "https://github.com/PraveenSadalgi", icon: "github" },
    { name: "LinkedIn", url: "https://linkedin.com/in/praveensadalgi", icon: "linkedin" },
    { name: "Email", url: "mailto:praveensadalgi@gmail.com", icon: "mail" },
  ];

  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4">
        {/* Main footer content */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright text */}
          <div className="text-center md:text-left mb-6 md:mb-0">
            <p>© {new Date().getFullYear()} Praveen M Sadalgi. Built with React & Tailwind CSS.</p>
          </div>
          
          {/* Social media links */}
          <div className="flex space-x-6">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                whileHover={{ scale: 1.2 }}
                aria-label={link.name}
              >
                {/* Screen reader text */}
                <span className="sr-only">{link.name}</span>
                {/* Icon representation - can be replaced with actual icon components */}
                <span className="w-6 h-6 flex items-center justify-center">
                  {link.icon.charAt(0).toUpperCase()}
                </span>
              </motion.a>
            ))}
          </div>
        </div>
        
        {/* Back to top link */}
        <div className="mt-8 text-center">
          <a 
            href="#home" 
            className="inline-flex items-center text-gray-300 hover:text-white"
            aria-label="Back to top"
          >
            <span>Back to Top</span>
            {/* Up arrow icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
