import React from "react";
import { motion } from "framer-motion";
import {
  faCode,
  faMobileScreenButton,
  faBullhorn,
  faBrain,
  faPenNib,
  faLightbulb,
  faBuilding,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Title from "@/components/Title/Title";

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
    if (
      t.includes("real estate") ||
      t.includes("property") ||
      t.includes("building")
    )
      return faBuilding;
    if (t.includes("home") || t.includes("house")) return faHome;
    return faLightbulb; // Fallback icon
  };

  // Sort services by position before rendering
  const sortedServices = services
    ? [...services].sort((a, b) => (a.position || 0) - (b.position || 0))
    : [];

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
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6 mb-14">
         <div className="mb-16">
        <Title name="Our Services"/>
      </div>
        

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {sortedServices.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover={{
                scale: 1.03,
                backgroundColor: "rgba(var(--primary-rgb), 0.1)",
              }}
              className="group flex flex-col items-center justify-center p-10 bg-gray-50 border border-gray-200 md:rounded-2xl rounded-md transition-colors duration-300 hover:border-primary/50"
            >
              {/* Icon Container */}
              <div className="mb-6 relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full group-hover:bg-primary/40 transition-colors" />
                <div className="relative w-20 h-20 flex items-center justify-center bg-white md:rounded-2xl rounded-md border border-primary/30 group-hover:border-primary transition-all duration-300 shadow-sm">
                  <FontAwesomeIcon
                    icon={getServiceIcon(service.title)}
                    className="text-3xl text-primary group-hover:scale-110 transition-transform"
                  />
                </div>
              </div>

              {/* Service Title */}
              <h3 className="text-xl font-bold text-gray-800 text-center group-hover:text-primary transition-colors">
                {service.title || "Innovation Lab"}
              </h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HomeService;
