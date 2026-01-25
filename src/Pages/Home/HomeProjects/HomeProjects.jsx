import Title from "@/components/Title/Title";
import React from "react";
import { motion } from "framer-motion";

const HomeProjects = ({ projects }) => {
  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  // Card animation variants
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        mass: 0.5,
      },
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
    tap: {
      scale: 0.98,
    },
  };

  // Image animation variants
  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // Badge animation variants
  const badgeVariants = {
    hidden: { scale: 0, rotate: -90 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        delay: 0.3,
      },
    },
  };

  // Technology badge stagger animation
  const techContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.4,
      },
    },
  };

  const techItemVariants = {
    hidden: {
      opacity: 0,
      y: 10,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
      },
    },
    hover: {
      y: -2,
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
  };

  // Button animation variants
  const buttonVariants = {
    hover: {
      y: -2,
      boxShadow:
        "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    tap: {
      y: 0,
      scale: 0.98,
    },
  };

  // Live link button specific animation
  const liveButtonVariants = {
    ...buttonVariants,
    hover: {
      ...buttonVariants.hover,
      backgroundColor: "oklch(0.72 0.14 235.5)", // Darker primary
      boxShadow:
        "0 10px 25px -5px rgba(var(--primary-rgb, 95, 201, 243), 0.3), 0 10px 10px -5px rgba(var(--primary-rgb, 95, 201, 243), 0.2)",
    },
  };

  // Tech badge colors based on your theme
  const getTechColorClasses = (techType) => {
    switch (techType) {
      case "frontend":
        return {
          bg: "bg-primary/15 dark:bg-primary/20",
          text: "text-primary dark:text-primary/90",
          border: "border-primary/20 dark:border-primary/30",
          shadow: "shadow-sm shadow-primary/10 dark:shadow-primary/20",
        };
      case "backend":
        return {
          bg: "bg-secondary/15 dark:bg-secondary/25",
          text: "text-secondary dark:text-secondary/90",
          border: "border-secondary/20 dark:border-secondary/30",
          shadow: "shadow-sm shadow-secondary/10 dark:shadow-secondary/20",
        };
      case "database":
        return {
          bg: "bg-accent/15 dark:bg-accent/20",
          text: "text-accent dark:text-accent/90",
          border: "border-accent/20 dark:border-accent/30",
          shadow: "shadow-sm shadow-accent/10 dark:shadow-accent/20",
        };
      case "other":
        return {
          bg: "bg-muted/80 dark:bg-muted",
          text: "text-muted-foreground dark:text-muted-foreground/90",
          border: "border-border dark:border-border/80",
          shadow: "shadow-sm shadow-muted/10 dark:shadow-muted/20",
        };
      default:
        return {
          bg: "bg-muted/80",
          text: "text-muted-foreground",
          border: "border-border",
          shadow: "shadow-sm shadow-muted/10",
        };
    }
  };

  return (
    <section className="py-10 px-5 max-w-425 mx-auto">
      <Title name="Our Projects" />

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {projects?.map((project, index) => (
          <motion.div
            key={project.id}
            className="group bg-card text-card-foreground rounded-xl shadow-lg overflow-hidden border border-border hover:shadow-2xl transition-shadow duration-300 dark:shadow-primary/5 dark:hover:shadow-primary/10"
            variants={cardVariants}
            whileHover="hover"
            whileTap="tap"
            custom={index}
          >
            {/* Banner Image */}
            <div className="relative h-48 w-full overflow-hidden">
              <motion.div
                className="w-full h-full"
                variants={imageVariants}
                whileHover="hover"
              >
                <img
                  src={project.banner}
                  alt={project.project_name}
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>

              {/* Status Badge */}
              <motion.div
                className="absolute top-4 right-4"
                variants={badgeVariants}
              >
                <span
                  className={`px-3 py-1 text-xs font-bold uppercase rounded-full shadow-md ${
                    project.status === "completed"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 dark:border dark:border-green-800/50"
                      : "bg-primary/20 text-primary-foreground dark:bg-primary/30 dark:text-primary-foreground dark:border dark:border-primary/50"
                  }`}
                >
                  {project.status}
                </span>
              </motion.div>
            </div>

            {/* Content */}
            <div className="p-6">
              <motion.h3
                className="text-xl font-bold text-foreground mb-2 capitalize"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {project.project_name}
              </motion.h3>

              {/* Technology Badges */}
              <motion.div
                className="flex flex-wrap gap-2 mb-4"
                variants={techContainerVariants}
                initial="hidden"
                animate="visible"
              >
                {project.frontend_tech &&
                  (() => {
                    const colors = getTechColorClasses("frontend");
                    return (
                      <motion.span
                        className={`${colors.bg} ${colors.text} ${colors.border} ${colors.shadow} text-[10px] px-2 py-1 rounded-md font-medium cursor-default`}
                        variants={techItemVariants}
                        whileHover="hover"
                      >
                        {project.frontend_tech}
                      </motion.span>
                    );
                  })()}

                {project.backend_tech &&
                  (() => {
                    const colors = getTechColorClasses("backend");
                    return (
                      <motion.span
                        className={`${colors.bg} ${colors.text} ${colors.border} ${colors.shadow} text-[10px] px-2 py-1 rounded-md font-medium cursor-default`}
                        variants={techItemVariants}
                        whileHover="hover"
                      >
                        {project.backend_tech}
                      </motion.span>
                    );
                  })()}

                {project.database_tech &&
                  (() => {
                    const colors = getTechColorClasses("database");
                    return (
                      <motion.span
                        className={`${colors.bg} ${colors.text} ${colors.border} ${colors.shadow} text-[10px] px-2 py-1 rounded-md font-medium cursor-default`}
                        variants={techItemVariants}
                        whileHover="hover"
                      >
                        {project.database_tech}
                      </motion.span>
                    );
                  })()}

                {/* Additional tech badges if needed */}
                {project.other_tech &&
                  (() => {
                    const colors = getTechColorClasses("other");
                    return (
                      <motion.span
                        className={`${colors.bg} ${colors.text} ${colors.border} ${colors.shadow} text-[10px] px-2 py-1 rounded-md font-medium cursor-default`}
                        variants={techItemVariants}
                        whileHover="hover"
                      >
                        {project.other_tech}
                      </motion.span>
                    );
                  })()}
              </motion.div>

              <motion.p
                className="text-muted-foreground text-sm line-clamp-2 mb-6 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {project.short_description}
              </motion.p>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <motion.a
                  href={project.project_video || "#"}
                  className={`flex-1 text-center py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    project.project_video
                      ? "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted/80"
                      : "bg-muted/50 text-muted-foreground/50 cursor-not-allowed"
                  }`}
                  variants={buttonVariants}
                  whileHover={project.project_video ? "hover" : ""}
                  whileTap={project.project_video ? "tap" : ""}
                >
                  Video Link
                </motion.a>
                <motion.a
                  href={project.live_url || "#"}
                  className={`flex-1 text-center py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    project.live_url
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20 dark:shadow-primary/30"
                      : "bg-muted/50 text-muted-foreground/50 cursor-not-allowed"
                  }`}
                  variants={liveButtonVariants}
                  whileHover={project.live_url ? "hover" : ""}
                  whileTap={project.live_url ? "tap" : ""}
                >
                  Live Link
                </motion.a>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default HomeProjects;
