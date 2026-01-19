import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useMatch } from "react-router-dom";
import {
  Phone,
  X,
  ArrowRight,
  ExternalLink,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Menu,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/Downtown LTD Logo.png";
import SupportModal from "@/components/supportModal/supportModal";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Projects", path: "/projects" },
  { label: "Gallery", path: "/gallery" },
  { label: "Testimonial", path: "/testimonial" },
  { label: "Contact", path: "/contact" },
];

const platformIcons = {
  instagram: <Instagram size={20} />,
  facebook: <Facebook size={20} />,
  twitter: <Twitter size={20} />,
  linkedin: <Linkedin size={20} />,
  youtube: <Youtube size={20} />,
  whatsapp: <Phone size={20} />,
  default: <ExternalLink size={20} />,
};

const Navbar = ({ socialLinks = [], settingData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [callOpen, setCallOpen] = useState(false);

  const location = useLocation();
  const projectMatch = useMatch("/project/:id");
  const isHome = location.pathname === "/";

  const getPlatformIcon = (platform) => {
    const key = platform?.toLowerCase();
    return platformIcons[key] || platformIcons.default;
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 80);

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
        phoneNumber={settingData?.data[0].primary_phone || "01872175065"}
      />

      <div className="fixed hidden lg:block top-0 left-0 w-full z-50 bg-background shadow-md">
  {/* Top Info Bar */}
  <div className="w-full hidden md:flex justify-between items-center bg-secondary shadow-sm">
    {/* Invisible Developer Credit (Kept as per your original structure) */}
    <div className="text-secondary text-[2px] select-none pointer-events-none">
      This website is developed by Eshrak
    </div>

    {/* Content Container */}
    <div className="text-white px-6 py-2 flex justify-between items-center w-480 mx-auto">
      <div className="flex gap-8 font-semibold">
        {/* Contact Info */}
        <p className="text-sm flex items-center gap-2">
          <span className="opacity-80 font-normal">Contact:</span>{" "}
          <a 
            href="tel:+8801670988233" 
            className="hover:text-primary transition-colors duration-200"
          >
            +88‭01670988233‬
          </a>
        </p>

        {/* Email Info */}
        <p className="text-sm flex items-center gap-2">
          <span className="opacity-80 font-normal">Email:</span>{" "}
          <a
            href="mailto:support@electron-bd.com"
            className="hover:text-primary transition-colors duration-200"
          >
            support@electron-bd.com
          </a>
        </p>
      </div>

      {/* Social Icons */}
      <div className="flex gap-5 pl-6">
        <p className="border-r pr-5 font-extralight border-white">
          We are creative, ambitious and ready for challenges!
        </p>
        <a
          href="https://www.facebook.com/share/1FW5KgrJBQ/"
          aria-label="Facebook"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-primary transition-all duration-200 hover:scale-110"
        >
          <Facebook/>
        </a>
        <a
          href="https://www.linkedin.com/company/eepsbd"
          aria-label="LinkedIn"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-primary transition-all duration-200 hover:scale-110"
        >
          <Linkedin/>
        </a>
      </div>
    </div>
  </div>

  {/* Main Navbar section will follow here */}
</div>

      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className={`fixed top-0 left-0 right-0 z-[70] mt-6 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-[1900px] mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
          
          {/* 1. LOGO (Left) */}
          <div className="flex-shrink-0 w-40">
            <NavLink to="/">
              <img
                src={logo}
                alt="Logo"
                className={`h-10 md:h-14 w-auto transition-all ${
                  isScrolled ? "brightness-100" : "drop-shadow-md"
                }`}
              />
            </NavLink>
          </div>

          {/* 2. DESKTOP NAV (Center) - Hidden on Mobile */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => {
               const isActive = location.pathname === item.path || (item.path === "/projects" && projectMatch);
               return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`text-sm uppercase tracking-widest font-bold transition-colors ${
                    isActive 
                      ? "text-primary border-b-2 border-primary" 
                      : isScrolled ? "text-secondary hover:text-primary" : "text-secondary"
                  }`}
                >
                  {item.label}
                </NavLink>
               )
            })}
          </div>

          {/* 3. RIGHT SECTION (Call Button or Hamburger) */}
          <div className="flex items-center justify-end w-40">
            {/* Desktop Call Button - Hidden on Mobile */}
            <button
              onClick={() => setCallOpen(true)}
              className={`hidden lg:flex btn items-center gap-2 px-4 py-4 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95 ${
                isScrolled ? "bg-primary text-white" : "bg-primary text-primary"
              }`}
            >
              <Phone size={16} className="text-white" />
              <span className="text-xs text-white uppercase">Call Now</span>
            </button>

            {/* Mobile Hamburger - Hidden on Desktop */}
            <button
              onClick={() => setIsOpen(true)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isScrolled ? "text-primary bg-gray-100" : "text-white bg-white/10"
              }`}
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE SIDEBAR MENU */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-[80] backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen w-[85%] max-w-[400px] bg-white z-[90] p-8 flex flex-col shadow-2xl"
            >
              <div className="flex justify-between items-center mb-10">
                <span className="text-primary font-black uppercase tracking-widest">Menu</span>
                <button onClick={() => setIsOpen(false)} className="p-2 text-secondary">
                  <X size={30} />
                </button>
              </div>

              <nav className="flex flex-col gap-4">
                {navItems.map((item, index) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) => `
                      text-3xl font-light tracking-tight flex justify-between items-center py-2
                      ${isActive ? "text-primary font-bold" : "text-secondary/70"}
                    `}
                  >
                    {item.label}
                    <ArrowRight size={20} className="text-primary opacity-50" />
                  </NavLink>
                ))}
              </nav>

              <div className="mt-auto">
                <button
                  onClick={() => {setIsOpen(false); setCallOpen(true);}}
                  className="w-full bg-primary text-white py-4 rounded-xl flex items-center justify-center gap-3 font-bold mb-6"
                >
                  <Phone size={20} /> CONTACT SUPPORT
                </button>
                <div className="flex justify-center gap-4">
                  {socialLinks.map((social) => (
                    <a key={social.id} href={social.url} className="p-2 bg-secondary/10 rounded-lg text-secondary">
                      {getPlatformIcon(social.platform)}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;