import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import techData from "../../../../public/Json/TechData.json";
import "./tech.css";
import Title from "@/components/Title/Title";

const Tech = () => {
  const [selectedTech, setSelectedTech] = useState("Frontend");
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    setAnimationKey((prevKey) => prevKey + 1);
  }, [selectedTech]);

  useEffect(() => {
    Object.values(techData)
      .flat()
      .forEach((item) => {
        const img = new Image();
        img.src = item.image;
      });
  }, []);

  const calculateTotalWidth = (techArray) => {
    return techArray.length * (112 + 96);
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      backgroundColor: "var(--color-secondary-30)",
    },
    tap: {
      scale: 0.95,
    },
    selected: {
      backgroundColor: "var(--color-secondary)",
      color: "var(--color-primary)",
    },
  };

  return (
    <section className="relative overflow-hidden min-h-screen">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0"></div>
        <div className="absolute inset-0 opacity-30">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-secondary"
              style={{
                width: `${Math.random() * 300 + 100}px`,
                height: `${Math.random() * 300 + 100}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.2 + 0.1,
                filter: "blur(40px)",
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-20 md:py-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Title name="Our Technologies" />

          <motion.div
            className="flex flex-wrap justify-center gap-3 p-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {Object.keys(techData).map((tech) => (
              <motion.button
                key={tech}
                className={`
        relative px-6 py-3 md:px-8 md:py-3 rounded-full font-medium
        transition-all duration-300
        ${
          selectedTech === tech
            ? "text-white bg-secondary shadow-md"
            : "text-secondary hover:text-white bg-primary/20 hover:bg-secondary"
        }
      `}
                onClick={() => setSelectedTech(tech)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">{tech}</span>

                {/* Active state subtle background animation */}
                {selectedTech === tech && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-secondary to-secondary/80"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>

          <div className="relative h-32 md:h-96 overflow-hidden md:mb-32">
            <div className="absolute top-0 left-0 h-full w-full overflow-hidden">
              <div className="flex justify-center w-full px-4 py-10">
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-y-10 gap-x-6 md:gap-x-8 justify-items-center max-w-7xl">
                  {techData[selectedTech].map((item, index) => (
                    <motion.div
                      key={`${item.name}-${index}`}
                      className="flex flex-col items-center group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <motion.div
                        className="tech-card w-24 h-24 md:w-28 md:h-28 flex items-center justify-center rounded-2xl shadow-lg bg-secondary/10 backdrop-blur-sm border border-white/5 relative"
                        style={{
                          boxShadow: `0 10px 30px -10px ${item.hexCode || "#ffffff"}50`,
                        }}
                        whileHover={{
                          scale: 1.1,
                          boxShadow: `0 0 40px ${item.hexCode || "#ffffff"}60`,
                          zIndex: 10,
                        }}
                      >
                        <motion.img
                          src={item.image}
                          alt={item.name}
                          loading="lazy"
                          className="tech-logo w-12 h-12 md:w-16 md:h-16 object-contain"
                          whileHover={{ rotate: 10 }}
                        />
                      </motion.div>

                      {/* Permanent Name Label */}
                      <span
                        className="mt-4 text-sm font-semibold tracking-wide text-center"
                        style={{ color: item.hexCode || "inherit" }}
                      >
                        {item.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Tech;
