
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const Navbar = () => {
  // State to track scroll position for navbar style changes
  const [isScrolled, setIsScrolled] = useState(false);
  // State to track mobile menu open/closed status
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Effect to detect scroll position and update isScrolled state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);
    
    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Navigation items for both desktop and mobile menus
  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Achievements", href: "#achievements" },
    { name: "Projects", href: "#projects" },
    { name: "Gallery", href: "#gallery" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        // Conditionally apply styles based on scroll position
        isScrolled
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container flex justify-between items-center">
        {/* Logo/Brand with animation */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold"
        >
          <a href="#home" className="text-primary hover:text-primary/80">
            Praveen<span className="text-secondary">.dev</span>
          </a>
        </motion.div>

        {/* Desktop Navigation - hidden on mobile */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-medium"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {item.name}
            </motion.a>
          ))}
        </nav>

        {/* Mobile Menu Button - visible only on mobile */}
        <button
          className="md:hidden text-gray-700 dark:text-gray-300 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMobileMenuOpen ? (
              // X icon when menu is open
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              // Hamburger icon when menu is closed
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Mobile Menu - animated dropdown visible only on mobile */}
        <motion.div
          className={cn(
            "fixed top-[60px] right-0 left-0 bg-white dark:bg-gray-900 shadow-lg md:hidden",
            isMobileMenuOpen ? "flex flex-col" : "hidden"
          )}
          initial={{ opacity: 0, y: -10 }}
          animate={{ 
            opacity: isMobileMenuOpen ? 1 : 0,
            y: isMobileMenuOpen ? 0 : -10
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Mobile menu items */}
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="px-5 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsMobileMenuOpen(false)} // Close menu when item is clicked
            >
              {item.name}
            </a>
          ))}
        </motion.div>
      </div>
    </header>
  );
};

export default Navbar;
