import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import Title from "@/components/Title/Title";
import {
  FaPlayCircle,
  FaExternalLinkAlt,
  FaCode,
  FaGithub,
  FaGlobe,
  FaCalendarAlt,
  FaTag,
  FaDatabase,
  FaServer,
  FaDesktop,
} from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import CumButton from "@/components/CumButton/CumButton";

const ProjectsCard = ({ projects }) => {
  const location = useLocation();
  const [selectedProject, setSelectedProject] = useState(null);
  const isHomePage = location.pathname === "/";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        duration: 0.6,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    hover: {
      y: -8,
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 25,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
  };

  const getTechColorClasses = (type) => {
    switch (type) {
      case "frontend":
        return "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800";
      case "backend":
        return "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800";
      case "database":
        return "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700";
    }
  };

  const handleCardClick = (project, e) => {
    if (isHomePage) {
      e.preventDefault();
      e.stopPropagation();
      setSelectedProject(project);
    }
    // If not home page, the Link component will handle navigation
  };

  const renderProjectCard = (project) => (
    <motion.div
      className="relative bg-white dark:bg-gray-900 md:rounded-2xl rounded-md overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-primary/50 transition-all duration-300 flex flex-col h-full group"
      variants={cardVariants}
      whileHover="hover"
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.banner}
          alt={project.project_name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        {/* Status Badge */}
        <span
          className={`absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full capitalize ${
            project.status === "completed"
              ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
              : "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300"
          }`}
        >
          {project.status}
        </span>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <FaCode className="text-primary" size={16} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">
              {project.project_name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {project.category || "Web Application"}
            </p>
          </div>
        </div>

        {/* Tech Stack Preview */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.frontend_tech && (
            <span className="text-xs px-2 py-1 rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300">
              {project.frontend_tech.split(",")[0]}
            </span>
          )}
          {project.backend_tech && (
            <span className="text-xs px-2 py-1 rounded-md bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-300">
              {project.backend_tech.split(",")[0]}
            </span>
          )}
          {project.database_tech && (
            <span className="text-xs px-2 py-1 rounded-md bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-300">
              {project.database_tech.split(",")[0]}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 leading-relaxed flex-grow mb-6">
          {project.short_description}
        </p>

        {/* View Details Button */}
        <div className="mt-auto">
          {isHomePage ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedProject(project);
              }}
              className="w-full px-4 py-2.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 group/btn"
            >
              <span>View Details</span>
              <IoSparkles className="opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
            </button>
          ) : (
            <Link
              to={`/projects/${project.id}`}
              className="block w-full px-4 py-2.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg font-medium transition-all duration-300 text-center"
            >
              View Details
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <section className="py-16 px-4 md:px-6 max-w-7xl mx-auto">
      <div className="mb-12">
        <Title name="Our Projects" />
        <p className="text-gray-600 dark:text-gray-400 mt-3 text-center max-w-2xl mx-auto">
          Explore our portfolio of innovative solutions delivered with
          excellence
        </p>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {(isHomePage ? projects?.slice(0, 6) : projects)?.map((project) => (
          <div key={project.id}>
            {isHomePage ? (
              <div
                className="cursor-pointer"
                onClick={(e) => handleCardClick(project, e)}
              >
                {renderProjectCard(project)}
              </div>
            ) : (
              <Link to={`/projects/${project.id}`}>
                {renderProjectCard(project)}
              </Link>
            )}
          </div>
        ))}
      </motion.div>

      {/* View More Button */}
      {isHomePage && (
        <div className="text-center mt-12">
          <CumButton path="/projects" title="View All Projects" />
        </div>
      )}

      {/* Project Details Modal (Only on Home Page) */}
      <AnimatePresence>
        {isHomePage && selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            />

            {/* Modal */}
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-gray-900 md:rounded-2xl rounded-md md:shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Modal Content */}
              <div className="overflow-y-auto flex-1">
                {/* Banner Image */}
                <div className="relative h-64 md:h-72">
                  <img
                    src={selectedProject.banner}
                    alt={selectedProject.project_name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                        <FaCode className="text-white" size={20} />
                      </div>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white">
                          {selectedProject.project_name}
                        </h2>
                        <div className="flex items-center gap-4 mt-2">
                          <span
                            className={`px-3 py-1 text-sm font-semibold rounded-full ${
                              selectedProject.status === "completed"
                                ? "bg-emerald-500/20 text-emerald-100"
                                : "bg-amber-500/20 text-amber-100"
                            }`}
                          >
                            {selectedProject.status}
                          </span>
                          <span className="text-white/80 text-sm flex items-center gap-2">
                            <FaCalendarAlt size={12} />
                            {selectedProject.year || new Date().getFullYear()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="p-6 md:p-8">
                  {/* Tech Stack */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <FaTag />
                      Technology Stack
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {selectedProject.frontend_tech && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-2">
                            <FaDesktop size={14} />
                            Frontend
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedProject.frontend_tech
                              .split(",")
                              .map((tech, idx) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1.5 text-sm rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                                >
                                  {tech.trim()}
                                </span>
                              ))}
                          </div>
                        </div>
                      )}

                      {selectedProject.backend_tech && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-2">
                            <FaServer size={14} />
                            Backend
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedProject.backend_tech
                              .split(",")
                              .map((tech, idx) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1.5 text-sm rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300"
                                >
                                  {tech.trim()}
                                </span>
                              ))}
                          </div>
                        </div>
                      )}

                      {selectedProject.database_tech && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-2">
                            <FaDatabase size={14} />
                            Database
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedProject.database_tech
                              .split(",")
                              .map((tech, idx) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1.5 text-sm rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300"
                                >
                                  {tech.trim()}
                                </span>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Project Overview
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {selectedProject.long_description ||
                        selectedProject.short_description}
                    </p>
                  </div>

                  {/* Links & Actions */}
                  <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
                    <div className="flex flex-wrap gap-4">
                      {selectedProject.live_url && (
                        <a
                          href={selectedProject.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                        >
                          <FaGlobe />
                          Visit Live Site
                        </a>
                      )}

                      {selectedProject.github_url && (
                        <a
                          href={selectedProject.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-5 py-2.5 bg-gray-800 dark:bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors"
                        >
                          <FaGithub />
                          View Code
                        </a>
                      )}
                      {/* //TODO: Here when Click in Demo then a video modal should be opened */}
                      {/* 
                      {selectedProject.project_video && (
                        <a
                          href={selectedProject.project_video}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-5 py-2.5 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
                        >
                          <FaPlayCircle />
                          Watch Demo
                        </a>
                      )} */}

                      <Link
                        to={`/projects/${selectedProject.id}`}
                        className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <FaExternalLinkAlt />
                        View Full Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsCard;
