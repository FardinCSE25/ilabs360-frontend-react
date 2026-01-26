import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Title from "@/components/Title/Title";

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

  // Image hover animation
  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // Status badge animation
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

  // Tech badge animations
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
    hidden: { opacity: 0, y: 10, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 200 },
    },
    hover: {
      y: -2,
      scale: 1.05,
      transition: { duration: 0.2 },
    },
  };

  // Button animations
  const buttonVariants = {
    hover: {
      y: -2,
      boxShadow:
        "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    },
    tap: { scale: 0.98 },
  };

  const liveButtonVariants = {
    ...buttonVariants,
    hover: {
      ...buttonVariants.hover,
      backgroundColor: "oklch(0.72 0.14 235.5)",
    },
  };

  // Tech color helper
  const getTechColorClasses = (type) => {
    switch (type) {
      case "frontend":
        return "bg-primary/15 text-primary border border-primary/20";
      case "backend":
        return "bg-secondary/15 text-secondary border border-secondary/20";
      case "database":
        return "bg-accent/15 text-accent border border-accent/20";
      default:
        return "bg-muted text-muted-foreground border border-border";
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
          <Link
            key={project.id}
            to={`/projects/${project.slug || project.id}`}
            className="block focus:outline-none"
          >
            <motion.div
              className="group bg-card text-card-foreground rounded-xl shadow-lg overflow-hidden border border-border hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
              variants={cardVariants}
              whileHover="hover"
              whileTap="tap"
              custom={index}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>

                {/* Status Badge */}
                <motion.div
                  className="absolute top-4 right-4"
                  variants={badgeVariants}
                >
                  <span
                    className={`px-3 py-1 text-xs font-bold rounded-full ${
                      project.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-primary/20 text-primary-foreground"
                    }`}
                  >
                    {project.status}
                  </span>
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 capitalize">
                  {project.project_name}
                </h3>

                {/* Tech */}
                <motion.div
                  className="flex flex-wrap gap-2 mb-4"
                  variants={techContainerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {project.frontend_tech && (
                    <motion.span
                      variants={techItemVariants}
                      whileHover="hover"
                      className={`text-[10px] px-2 py-1 rounded-md ${getTechColorClasses(
                        "frontend",
                      )}`}
                    >
                      {project.frontend_tech}
                    </motion.span>
                  )}

                  {project.backend_tech && (
                    <motion.span
                      variants={techItemVariants}
                      whileHover="hover"
                      className={`text-[10px] px-2 py-1 rounded-md ${getTechColorClasses(
                        "backend",
                      )}`}
                    >
                      {project.backend_tech}
                    </motion.span>
                  )}

                  {project.database_tech && (
                    <motion.span
                      variants={techItemVariants}
                      whileHover="hover"
                      className={`text-[10px] px-2 py-1 rounded-md ${getTechColorClasses(
                        "database",
                      )}`}
                    >
                      {project.database_tech}
                    </motion.span>
                  )}
                </motion.div>

                <p className="text-muted-foreground text-sm line-clamp-2 mb-6">
                  {project.short_description}
                </p>

                {/* Buttons */}
                <div className="flex gap-4">
                  <motion.a
                    href={project.project_video || "#"}
                    onClick={(e) => e.stopPropagation()}
                    variants={buttonVariants}
                    whileHover={project.project_video ? "hover" : ""}
                    whileTap={project.project_video ? "tap" : ""}
                    className={`flex-1 text-center py-2.5 rounded-lg text-sm font-semibold ${
                      project.project_video
                        ? "bg-muted hover:bg-muted/80"
                        : "bg-muted/50 cursor-not-allowed"
                    }`}
                  >
                    Video Link
                  </motion.a>

                  <motion.a
                    href={project.live_url || "#"}
                    onClick={(e) => e.stopPropagation()}
                    variants={liveButtonVariants}
                    whileHover={project.live_url ? "hover" : ""}
                    whileTap={project.live_url ? "tap" : ""}
                    className={`flex-1 text-center py-2.5 rounded-lg text-sm font-semibold ${
                      project.live_url
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted/50 cursor-not-allowed"
                    }`}
                  >
                    Live Link
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </section>
  );
};

export default HomeProjects;
