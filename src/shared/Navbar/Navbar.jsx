import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useMatch } from "react-router-dom";
import {
  Phone,
  X,
  ArrowRight,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Menu,
  Mail,
  MapPin,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SupportModal from "@/components/supportModal/supportModal";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Projects", path: "/projects" },
  { label: "Testimonial", path: "/testimonial" },
  { label: "Contact", path: "/contact" },
  { label: "Blogs", path: "/blogs" },
];

const platformIcons = {
  instagram: <Instagram size={18} />,
  facebook: <Facebook size={18} />,
  twitter: <Twitter size={18} />,
  linkedin: <Linkedin size={18} />,
  youtube: <Youtube size={18} />,
  whatsapp: <Phone size={18} />,
};

const Navbar = ({ socialLinks = [], settingData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [callOpen, setCallOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);

  const location = useLocation();
  const projectMatch = useMatch("/projects/*");
  const blogMatch = useMatch("/blogs/*");
  const getPlatformIcon = (platform) => {
    const key = platform?.toLowerCase();
    return platformIcons[key] || <div className="w-4 h-4" />;
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

      if (currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <SupportModal
        isOpen={callOpen}
        onClose={() => setCallOpen(false)}
        phoneNumber={settingData?.primary_phone || "01309176398"}
      />

      {/* Animated Top Bar with Particle Effect */}
      <motion.div
        initial={{ y: -40 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 w-full z-[100] bg-gradient-to-r from-primary/10 via-background to-primary/10 backdrop-blur-sm border-b border-primary/10"
      >
        <div className="max-w-[1800px] mx-auto px-6 py-2">
          <div className="flex items-center justify-between text-sm">
            {/* Left - Contact Info with Animation */}
            <div className="flex items-center gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 group"
              >
                <div className="p-1.5 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                  <Phone size={14} className="text-primary" />
                </div>
                <a
                  href="tel:+8801670988233"
                  className="text-foreground/80 hover:text-primary transition-colors"
                >
                  +88‭01521-498303‬
                </a>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 group"
              >
                <div className="p-1.5 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                  <Mail size={14} className="text-primary" />
                </div>
                <a
                  href="mailto:support@electron-bd.com"
                  className="text-foreground/80 hover:text-primary transition-colors"
                >
                  ilabs360@gmail.com
                </a>
              </motion.div>
            </div>

            {/* Right - Social & Tagline */}
            <div className="flex items-center gap-4">
              <motion.p
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-xs font-medium text-foreground/60 hidden md:block"
              >
                <Sparkles size={12} className="inline mr-2 text-primary" />
                Innovative Solutions for Tomorrow
              </motion.p>
              <div className="h-4 w-px bg-primary/20" />
              <div className="flex gap-3">
                {socialLinks.slice(0, 4).map((social, index) => (
                  <motion.a
                    key={social.id}
                    href={social.url}
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="p-1.5 rounded-full bg-primary/5 hover:bg-primary/10 text-foreground/60 hover:text-primary transition-all"
                  >
                    {getPlatformIcon(social.platform)}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Navbar with Animated iLabs360 Logo */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{
          duration: 0.6,
          ease: [0.23, 1, 0.32, 1],
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
        className={`fixed top-10 left-0 right-0 z-[90] transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md md:shadow-2xl shadow-primary/10 py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-[1700px] mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Animated iLabs360 Logo */}
            <motion.div whileHover={{ scale: 1.05 }} className="relative group">
              <NavLink to="/" className="relative block">
                {/* Glow Effect */}
                <motion.div
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -inset-4 bg-primary/10 blur-xl md:rounded-2xl rounded-md -z-10"
                />

                {/* Logo Container */}
                <div className="relative flex items-center gap-3">
                  {/* Animated 'i' Character */}
                  <motion.div
                    animate={{
                      y: [0, -4, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                      <span className="text-primary-foreground font-black text-lg">
                        i
                      </span>
                    </div>
                    <motion.div
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5,
                      }}
                      className="absolute top-0 right-0 w-2 h-2 rounded-full bg-primary blur-sm"
                    />
                  </motion.div>

                  {/* 'Labs' Text */}
                  <div className="relative">
                    <motion.span
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-3xl md:text-4xl font-black tracking-tighter bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent"
                    >
                      Labs
                    </motion.span>

                    {/* Animated Underline */}
                    <motion.div
                      animate={{ width: ["0%", "100%", "0%"] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-primary"
                    />
                  </div>

                  {/* '360' Badge */}
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="relative"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-primary/30 flex items-center justify-center border border-primary/20">
                      <span className="text-lg font-black text-primary">
                        360°
                      </span>
                    </div>
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-0 rounded-full border border-primary/30 border-dashed"
                    />
                  </motion.div>
                </div>
              </NavLink>
            </motion.div>

            {/* Desktop Navigation with Hover Effects */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item, index) => {
                const isActive =
                  location.pathname === item.path ||
                  (item.path === "/projects" && projectMatch) ||
                  (item.path === "/blogs" && blogMatch);
                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onMouseEnter={() => setHoveredNav(index)}
                    onMouseLeave={() => setHoveredNav(null)}
                    className="relative"
                  >
                    <NavLink
                      to={item.path}
                      className={`
                        relative px-4 py-2 text-sm font-semibold uppercase tracking-wider transition-all duration-300
                        ${
                          isActive
                            ? "text-primary"
                            : isScrolled
                              ? "text-foreground/70 hover:text-primary"
                              : "text-foreground/80 hover:text-primary"
                        }
                      `}
                    >
                      {item.label}

                      {/* Hover/Active Indicator */}
                      <motion.div
                        initial={false}
                        animate={{
                          width:
                            hoveredNav === index || isActive ? "100%" : "0%",
                          opacity: hoveredNav === index || isActive ? 1 : 0,
                        }}
                        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
                      />

                      {/* Glowing Dot for Active */}
                      {isActive && (
                        <motion.div
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                          className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary blur-sm"
                        />
                      )}
                    </NavLink>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA Button with Animation  */}
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCallOpen(true)}
                className={`
                  hidden lg:flex items-center gap-2 px-6 py-3 rounded-full font-bold 
                  transition-all duration-300 relative overflow-hidden group
                  ${
                    isScrolled
                      ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30"
                      : "bg-gradient-to-r from-primary/90 to-secondary/90 text-white shadow-xl shadow-primary/40"
                  }
                `}
              >
                {/* Button Shine Effect */}
                <motion.div
                  initial={{ x: "-100%", y: "-100%" }}
                  whileHover={{ x: "100%", y: "100%" }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />

                <Phone size={18} className="relative z-10" />
                <span className="relative z-10 text-sm uppercase tracking-wider">
                  Get Quote
                </span>

                {/* Pulsing Animation */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="absolute inset-0 rounded-full border-2 border-primary/30"
                />
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(true)}
                className={`
                  lg:hidden p-3 rounded-xl transition-all duration-300 relative overflow-hidden
                  ${
                    isScrolled
                      ? "bg-primary/10 text-primary"
                      : "bg-primary/20 text-primary"
                  }
                `}
              >
                <Menu size={24} />
                {/* Dot Indicator */}
                <motion.div
                  animate={{ scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute top-1 right-1 w-2 h-2 rounded-full bg-secondary"
                />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Enhanced Mobile Sidebar Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop with Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0  z-[95] backdrop-blur-md"
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 200,
                mass: 0.8,
              }}
              className="fixed top-0 right-0 h-screen w-[90%] max-w-md bg-gradient-to-b from-background via-background to-primary/5 z-[100] p-8 flex flex-col md:shadow-2xl shadow-primary/20"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-12 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <span className="text-primary-foreground font-black text-xl">
                      i
                    </span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      iLabs360
                    </h2>
                    <p className="text-xs text-foreground/60">Navigation</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                >
                  <X size={28} />
                </motion.button>
              </div>

              {/* Navigation Links with Animation */}
              <nav className="flex flex-col gap-2 flex-1">
                {navItems.map((item, index) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <motion.div
                      key={item.path}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <NavLink
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`
                          flex items-center justify-between p-4 rounded-xl transition-all duration-300 group
                          ${
                            isActive
                              ? "bg-gradient-to-r from-primary/10 to-secondary/10 border-l-4 border-primary"
                              : "hover:bg-primary/5"
                          }
                        `}
                      >
                        <div className="flex items-center gap-4">
                          <motion.div
                            animate={{
                              rotate: isActive ? 360 : 0,
                              scale: isActive ? 1.2 : 1,
                            }}
                            className={`p-2 rounded-lg ${isActive ? "bg-primary text-white" : "bg-primary/10 text-primary"}`}
                          >
                            <ChevronRight size={18} />
                          </motion.div>
                          <span
                            className={`text-xl font-semibold ${isActive ? "text-primary" : "text-foreground"}`}
                          >
                            {item.label}
                          </span>
                        </div>
                        {isActive && (
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-2 h-2 rounded-full bg-secondary"
                          />
                        )}
                      </NavLink>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Contact Section */}
              <div className="mt-6 space-y-6">
                {/* Contact Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setIsOpen(false);
                    setCallOpen(true);
                  }}
                  className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-xl flex items-center justify-center gap-3 font-bold relative overflow-hidden group"
                >
                  {/* Shine Effect */}
                  <motion.div
                    initial={{ x: "-100%", y: "-100%" }}
                    whileHover={{ x: "100%", y: "100%" }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  />
                  <Phone size={22} className="relative z-10" />
                  <span className="relative z-10">GET IMMEDIATE SUPPORT</span>
                </motion.button>

                {/* Social Links */}
                <div className="flex justify-center gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.id}
                      href={social.url}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      className="p-3 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 text-foreground hover:text-primary transition-all"
                    >
                      {getPlatformIcon(social.platform)}
                    </motion.a>
                  ))}
                </div>

                {/* Quick Contact Info */}
                <div className="text-center text-sm text-foreground/60 space-y-2">
                  <p>Available 24/7 for your projects</p>
                  <p className="text-xs">Call: +88‭01521-498303‬</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Contact Button for Mobile */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={() => setCallOpen(true)}
        className="fixed bottom-6 right-6 lg:hidden z-[85] p-4 bg-gradient-to-r from-primary to-secondary rounded-full md:shadow-2xl shadow-primary/40"
      >
        <Phone size={24} className="text-white" />
        <motion.div
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full border-2 border-white/30"
        />
      </motion.button>
    </>
  );
};

export default Navbar;
