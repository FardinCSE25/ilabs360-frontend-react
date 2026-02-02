import React from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Layers,
  Database,
  Layout,
  Activity,
  ExternalLink,
  User,
  Code2,
  Sparkles,
  ArrowUpRight,
  Zap,
  Target,
  Award,
  Clock,
  Calendar,
  Users,
} from "lucide-react";

const AboutDetProject = ({ project }) => {
  if (!project) return null;

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const floatVariants = {
    initial: { y: 0 },
    float: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="relative max-w-7xl mx-auto py-32 px-6 overflow-hidden mt-16">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-start"
      >
        {/* Left: Interactive Image Banner with Enhanced Effects */}
        <motion.div variants={itemVariants} className="relative group">
          {/* Glow Effect */}
          <motion.div
            animate={{
              scale: [1, 1.02, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute -inset-4 bg-gradient-to-r from-primary/30 via-purple-500/20 to-blue-500/30 rounded-3xl blur-2xl"
          />

          {/* Main Image Container */}
          <motion.div
            whileHover={{
              scale: 1.02,
              rotateX: 2,
              rotateY: 2,
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 25,
            }}
            className="relative overflow-hidden rounded-2xl shadow-2xl border border-gray-100/50 bg-gradient-to-br from-white to-gray-50"
          >
            {/* Shine Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <img
              src={project.banner}
              alt={project.project_name}
              className="w-full h-[550px] object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Floating Badge */}
            <motion.div
              variants={floatVariants}
              animate="float"
              className="absolute top-6 right-6 bg-gradient-to-r from-primary to-blue-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg"
            >
              <Sparkles size={14} />
              <span className="text-sm font-bold">FEATURED</span>
            </motion.div>
          </motion.div>

          {/* Floating Tech Icons */}
          <motion.div
            variants={floatVariants}
            animate="float"
            className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-2xl border border-gray-100"
          >
            <Zap size={24} className="text-yellow-500" />
          </motion.div>

          <motion.div
            variants={floatVariants}
            animate="float"
            style={{ animationDelay: "1s" }}
            className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-2xl border border-gray-100"
          >
            <Target size={24} className="text-red-500" />
          </motion.div>
        </motion.div>

        {/* Right: Enhanced Project Details */}
        <div className="space-y-10">
          {/* Enhanced Header Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex items-center gap-4">
              <motion.span
                whileHover={{ scale: 1.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-blue-500/10 text-primary text-xs font-bold uppercase tracking-[0.2em]"
              >
                <Sparkles size={12} />
                Case Study
              </motion.span>

              {/* Status Badge with Animation */}
              <motion.span
                animate={{
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    "0 0 0 0 rgba(59, 130, 246, 0)",
                    "0 0 0 10px rgba(59, 130, 246, 0)",
                    "0 0 0 0 rgba(59, 130, 246, 0)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  project.status === "Completed"
                    ? "bg-green-500/10 text-green-600"
                    : project.status === "In Progress"
                      ? "bg-yellow-500/10 text-yellow-600"
                      : "bg-blue-500/10 text-blue-600"
                }`}
              >
                ● {project.status}
              </motion.span>
            </div>

            {/* Project Title with Gradient Highlight */}
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight tracking-tight">
              <span className="relative">
                <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
                  {project.project_name}
                </span>
                <motion.span
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 via-blue-500/20 to-primary/20 blur-xl opacity-70"
                />
              </span>
              <span className="text-primary animate-pulse">.</span>
            </h1>

            {/* Highlighted Short Description */}
            {project.short_description && (
              <motion.div variants={itemVariants} className="relative">
                <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 w-1 h-16 bg-gradient-to-b from-primary to-blue-500 rounded-full" />
                <p className="text-xl text-gray-600 leading-relaxed font-light pl-8 border-l-2 border-gray-100">
                  {project.short_description}
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Enhanced Tech/Meta Grid - Glassmorphism with Hover Effects */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-3 gap-6 p-8 bg-white/80 rounded-3xl border border-gray-100 backdrop-blur-sm shadow-xl"
          >
            <InfoItem
              icon={<Activity size={18} className="text-green-500" />}
              label="Status"
              value={project.status}
              highlight={project.status === "Completed"}
            />
            <InfoItem
              icon={<Layout size={18} className="text-purple-500" />}
              label="Type"
              value={project.project_type}
            />
            <InfoItem
              icon={<Layers size={18} className="text-orange-500" />}
              label="Category"
              value={project.project_category}
            />
            <InfoItem
              icon={<Code2 size={18} className="text-blue-500" />}
              label="Frontend"
              value={project.frontend_tech}
            />
            <InfoItem
              icon={<Database size={18} className="text-red-500" />}
              label="Backend"
              value={project.backend_tech}
            />
            <InfoItem
              icon={<Globe size={18} className="text-cyan-500" />}
              label="Database"
              value={project.database_tech}
            />

            {/* Additional Info Items */}
            {project.duration && (
              <InfoItem
                icon={<Clock size={18} className="text-yellow-500" />}
                label="Duration"
                value={project.duration}
              />
            )}
            {project.year && (
              <InfoItem
                icon={<Calendar size={18} className="text-pink-500" />}
                label="Year"
                value={project.year}
              />
            )}
            {project.team_size && (
              <InfoItem
                icon={<Users size={18} className="text-indigo-500" />}
                label="Team Size"
                value={project.team_size}
              />
            )}
          </motion.div>
        </div>
        {/* Enhanced HTML Description with Animation */}
        {project.description && (
          <motion.div
            variants={itemVariants}
            className="relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-primary to-blue-500 rounded-full" />
            <div className="pl-8">
              <div className="flex items-center gap-3 mb-6">
                <Award size={20} className="text-primary" />
                <h3 className="text-2xl font-bold text-gray-900">
                  Project Overview
                </h3>
              </div>
              <div
                className="prose prose-lg max-w-none text-gray-700 [&>p]:mb-6 [&>p]:leading-relaxed [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-gray-900 [&>h3]:mb-4 [&>ul]:space-y-3 [&>li]:flex [&>li]:items-start [&>li]:gap-3 [&>li>svg]:mt-1 [&>li>svg]:flex-shrink-0"
                dangerouslySetInnerHTML={{ __html: project.description }}
              />
            </div>
          </motion.div>
        )}

        {/* Enhanced Footer Actions */}
        <motion.div
          variants={itemVariants}
          className="pt-10 border-t border-gray-100/50"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            {/* Enhanced Client Info */}
            {(project.client_name || project.client_company) && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="group relative bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl border border-gray-100 shadow-lg cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />
                <div className="relative flex items-center gap-4">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="p-3 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-xl"
                  >
                    <User size={24} className="text-primary" />
                  </motion.div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                      Client
                    </p>
                    <p className="text-xl font-bold text-gray-800">
                      {project.client_name || project.client_company}
                    </p>
                    {project.client_role && (
                      <p className="text-sm text-gray-500 mt-1">
                        {project.client_role}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Enhanced CTA Button with Multiple Effects */}
            {project.live_url && (
              <motion.a
                href={project.live_url}
                target="_blank"
                rel="noreferrer"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white rounded-2xl font-bold overflow-hidden shadow-2xl"
              >
                {/* Animated Background */}
                <motion.div
                  animate={{
                    x: ["0%", "100%", "0%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                />

                {/* Pulse Effect */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-primary to-blue-500 rounded-2xl"
                />

                <span className="relative z-10 flex items-center gap-2">
                  Launch Project
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  >
                    <ExternalLink size={20} />
                  </motion.span>
                </span>

                {/* Arrow Animation */}
                <motion.div
                  initial={{ x: -10, opacity: 0 }}
                  whileHover={{ x: 0, opacity: 1 }}
                  className="relative z-10 ml-2"
                >
                  <ArrowUpRight size={20} />
                </motion.div>
              </motion.a>
            )}
          </div>
          {/* Additional Links/Info */}
          <div className="mt-10 pt-8 border-t border-gray-100/50">
            <div className="flex flex-wrap items-center justify-start gap-x-8 gap-y-4">
              {project.github_url && (
                <motion.a
                  href={project.github_url}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ x: 3 }}
                  className="group flex items-center gap-2.5 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-all duration-200"
                >
                  <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-indigo-50 transition-colors">
                    <Code2 size={18} />
                  </div>
                  <span>View Code</span>
                </motion.a>
              )}

              {project.documentation_url && (
                <motion.a
                  href={project.documentation_url}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ x: 3 }}
                  className="group flex items-center gap-2.5 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-all duration-200"
                >
                  <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-indigo-50 transition-colors">
                    <Layers size={18} />
                  </div>
                  <span>Documentation</span>
                </motion.a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

const InfoItem = ({ icon, label, value, highlight = false }) => {
  if (!value) return null;

  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        y: -5,
        transition: { type: "spring", stiffness: 300 },
      }}
      className="relative group cursor-pointer"
    >
      <div className="absolute -inset-2 bg-gradient-to-r from-transparent via-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative p-4 rounded-xl bg-white/50 border border-gray-100 group-hover:border-primary/20 transition-all duration-300">
        <div className="flex items-center gap-3 mb-3">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="p-2 rounded-lg bg-gradient-to-br from-white to-gray-50 shadow-sm"
          >
            {icon}
          </motion.div>
          <p className="text-xs uppercase font-bold tracking-widest text-gray-400">
            {label}
          </p>
        </div>
        <p
          className={`text-base font-bold ${
            highlight
              ? "text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600"
              : "text-gray-800"
          }`}
        >
          {value}
        </p>

        {/* Hover Line Effect */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
      </div>
    </motion.div>
  );
};

export default AboutDetProject;
