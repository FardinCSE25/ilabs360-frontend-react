import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import techData from "../../../../public/Json/TechData.json";
import "./tech.css";
import Title from "@/components/Title/Title";

const Tech = () => {
  const [selectedTech, setSelectedTech] = useState("Frontend");
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    setAnimationKey((prev) => prev + 1);
  }, [selectedTech]);

  useEffect(() => {
    Object.values(techData)
      .flat()
      .forEach((item) => {
        const img = new Image();
        img.src = item.image;
      });
  }, []);

  const calculateTotalWidth = (techArray) => techArray.length * (112 + 96);

  return (
    <section className="relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Title */}
        <div className="-mb-9">
          <Title name="Our Technologies" />
        </div>

        {/* Filter buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 p-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {Object.keys(techData).map((tech) => (
            <motion.button
              key={tech}
              onClick={() => setSelectedTech(tech)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className={`
                relative px-4 py-3 md:px-8 md:py-3
                rounded-full text-sm font-medium
                transition-all duration-300
                ${
                  selectedTech === tech
                    ? "text-white bg-secondary shadow-md"
                    : "text-secondary bg-primary/20 hover:bg-secondary hover:text-white"
                }
              `}
            >
              <span className="relative z-10">{tech}</span>

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

        {/* Marquee */}
        <div className="relative h-56 sm:h-64 md:h-96 overflow-hidden lg:hidden md:mb-20">
          <div className="absolute inset-0 overflow-hidden">
            <div className="flex items-center justify-center w-full h-full px-4 py-10">
              <motion.div
                key={animationKey}
                className="flex gap-4 items-center"
                animate={{
                  x: [
                    "0%",
                    `-${calculateTotalWidth(techData[selectedTech])}px`,
                  ],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    duration: 40,
                    ease: "linear",
                  },
                }}
              >
                {[...techData[selectedTech], ...techData[selectedTech]].map(
                  (item, index) => (
                    <motion.div
                      key={`${item.name}-${index}`}
                      className="flex flex-col items-center px-4"
                      whileHover={{ scale: 1.2, zIndex: 10 }}
                    >
                      <motion.div
                        className="w-28 h-28 rounded-2xl flex items-center justify-center shadow-xl"
                        style={{
                          backgroundColor: item.hexCode
                            ? `${item.hexCode}33`
                            : "#ffffff33",
                          boxShadow: `0 0 30px ${item.hexCode || "#ffffff"}`,
                        }}
                      >
                        <motion.img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-contain"
                          loading="lazy"
                        />
                      </motion.div>

                      <span
                        className="mt-4 font-semibold text-center"
                        style={{ color: item.hexCode || "inherit" }}
                      >
                        {item.name}
                      </span>
                    </motion.div>
                  ),
                )}
              </motion.div>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex mb-20 flex-wrap justify-center gap-y-10 gap-x-6 md:gap-x-8 max-w-7xl mx-auto">
          {techData[selectedTech].map((item, index) => (
            <motion.div
              key={`${item.name}-${index}`}
              className="flex flex-col items-center group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <motion.div
                className="tech-card w-24 h-24 md:w-28 md:h-28 flex items-center justify-center rounded-2xl shadow-lg bg-secondary/10 backdrop-blur-sm border border-white/5"
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

              <span
                className="mt-4 font-semibold tracking-wide text-center"
                style={{ color: item.hexCode || "inherit" }}
              >
                {item.name}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Tech;
