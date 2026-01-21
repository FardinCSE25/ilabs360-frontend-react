import React from "react";
import { motion } from "framer-motion";
import {
  faCode,
  faMobileScreenButton,
  faBullhorn,
  faBrain,
  faPenNib,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HomeService = ({ services }) => {
  // Helper to assign icons based on title keywords
  const getServiceIcon = (title) => {
    const t = title?.toLowerCase() || "";
    if (t.includes("web")) return faCode;
    if (t.includes("app") || t.includes("mobile")) return faMobileScreenButton;
    if (t.includes("marketing") || t.includes("digital")) return faBullhorn;
    if (t.includes("ai") || t.includes("intelligence")) return faBrain;
    if (t.includes("ui") || t.includes("ux") || t.includes("design"))
      return faPenNib;
    return faLightbulb; // Fallback icon
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "backOut" },
    },
  };

  return (
    <section className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Our <span className="text-primary">Services</span>
          </h2>
          <div className="h-1.5 w-24 bg-primary mx-auto rounded-full" />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services?.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover={{
                scale: 1.03,
                backgroundColor: "rgba(var(--primary-rgb), 0.1)",
              }}
              className="group flex flex-col items-center justify-center p-10 bg-white/5 border border-white/10 rounded-2xl transition-colors duration-300"
            >
              {/* Icon Container */}
              <div className="mb-6 relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full group-hover:bg-primary/40 transition-colors" />
                <div className="relative w-20 h-20 flex items-center justify-center bg-secondary-foreground/5 rounded-2xl border border-primary/30 group-hover:border-primary transition-all duration-300">
                  <FontAwesomeIcon
                    icon={getServiceIcon(service.title)}
                    className="text-3xl text-primary group-hover:scale-110 transition-transform"
                  />
                </div>
              </div>

              {/* Static Title */}
              <h3 className="text-xl font-bold text-white text-center group-hover:text-primary transition-colors">
                {service.title || "Innovation Lab"}
              </h3>

              {/* Subtle subtitle or ID tracker */}
              <span className="mt-2 text-xs uppercase tracking-widest text-white/30 group-hover:text-white/60">
                Service 0{service.position}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HomeService;
