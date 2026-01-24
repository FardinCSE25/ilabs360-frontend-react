import React from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Globe,
  ShieldCheck,
  Headphones,
  Award,
  Rocket,
  Users,
  Code,
  Clock,
  Star,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import Title from "@/components/Title/Title";

// Section Title Component
const SectionTitle = ({
  subtitle,
  badgeText = "Innovation Labs 360",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8 }}
      className="mb-16 lg:mb-24 text-center"
    >
      {badgeText && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-primary/5 px-4 py-2 rounded-full mb-6 border border-primary/20 shadow-sm"
        >
          <Heart className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold text-primary uppercase tracking-[0.15em]">
            {badgeText}
          </span>
        </motion.div>
      )}

      <div className="-mb-11 mt-4">
        <Title name="About Us" />
      </div>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

// Metric Card Component
const MetricCard = ({ metric, index }) => {
  const Icon = metric.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{
        y: -5,
        transition: { duration: 0.2 },
      }}
      className="relative group"
    >
      <div className="flex flex-col p-4">
        <div className="flex items-start gap-4 mb-3">
          {/* <motion.div
            className="shrink-0 p-2.5 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300"
            whileHover={{ rotate: 5, scale: 1.05 }}
          >
            <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
          </motion.div> */}

          <div className="flex-1">
            <span className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400 tracking-wide uppercase">
              {metric.name}
            </span>
          </div>
        </div>

        <div className="">
          <motion.span
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white block"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
          >
            {metric.value}
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
};

// Feature Card Component
const FeatureCard = ({ feature, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{
        x: 8,
        backgroundColor: "rgba(var(--primary), 0.05)",
        transition: { duration: 0.3 },
      }}
      className="flex items-center gap-5 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-primary/30 transition-all duration-300 group cursor-pointer shadow-sm hover:shadow-md"
    >
      <motion.div
        className={`p-3 rounded-xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg`}
        whileHover={{ rotate: 5, scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        {feature.icon}
      </motion.div>

      <div className="flex-1 space-y-1">
        <h4 className="font-bold text-foreground text-lg group-hover:text-primary transition-colors">
          {feature.title}
        </h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {feature.description}
        </p>
      </div>

      <motion.div
        initial={{ x: 0 }}
        whileHover={{ x: 5 }}
        transition={{ duration: 0.2 }}
      >
        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
      </motion.div>
    </motion.div>
  );
};

const HomeAbout = ({ banner, metrics, whoWeAre }) => {
  // Enhanced metrics with specific icons
  const enhancedMetrics =
    metrics?.map((item, index) => ({
      ...item,
      icon: [Users, Code, Clock, Star, TrendingUp][index % 5],
    })) || [];

  // Find the "Nations" or "Countries" metric dynamically
  const getNationsCount = () => {
    const nationsMetric = enhancedMetrics.find(
      (metric) =>
        metric.name?.toLowerCase().includes("nations") ||
        metric.name?.toLowerCase().includes("countries") ||
        metric.name?.toLowerCase().includes("global"),
    );
    return nationsMetric?.value || "3+";
  };

  const features = [
    {
      icon: <Globe className="w-5 h-5" />,
      title: "Global Reach",
      description: "Exporting software to 3+ countries including Bangladesh.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      title: "Trusted Partner",
      description: "Working with Govt, Multinational, and Private sectors.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Award className="w-5 h-5" />,
      title: "Quality Guaranteed",
      description: "100% satisfaction guarantee on all our digital services.",
      gradient: "from-blue-500 to-cyan-500",
    },
  ];

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

  return (
    <section className="relative min-h-screen py-20 lg:py-32 overflow-hidden bg-background">
      {/* Enhanced Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 -right-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="Leading digital transformation with innovative solutions"
          badgeText="Innovation Labs 360"
        />
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column: Image with Stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-50px" }}
            className="relative pt-16 lg:pt-20"
          >
            {/* Main Image Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-[450px] md:h-[550px] rounded-3xl overflow-hidden shadow-2xl"
            >
              <motion.img
                src={
                  banner ||
                  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80"
                }
                className="w-full h-full object-cover"
                alt="About Us"
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                viewport={{ once: true }}
              />
              <motion.div
                className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </motion.div>

            {/* Floating Export Badge */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.3,
              }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                rotate: 5,
                transition: { type: "spring", stiffness: 300 },
              }}
              className="absolute top-0 right-0 lg:-right-6 z-20"
            >
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-linear-to-br from-primary to-primary/80 flex flex-col items-center justify-center shadow-2xl border-4 border-white dark:border-gray-900">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <Rocket className="w-7 h-7 md:w-8 md:h-8 text-white mb-1" />
                </motion.div>
                <div className="text-center">
                  <p className="text-[8px] md:text-[9px] font-semibold text-white/90 uppercase tracking-wider">
                    Exporting to
                  </p>
                  <p className="text-xl md:text-2xl font-black text-white leading-none">
                    {getNationsCount()}
                  </p>
                  <p className="text-[8px] md:text-[9px] font-semibold text-white/90 uppercase tracking-wider mt-0.5">
                    Nations
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Stats Overlay */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="absolute -bottom-16  left-1/2  -translate-x-1/2 w-[95%] lg:w-full z-20"
            >
              <div className="relative group">
                {/* Subtle Outer Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition duration-500" />

                <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl p-6 md:px-10 md:py-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/20 dark:border-gray-800">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-gray-100 dark:divide-gray-800">
                    {enhancedMetrics.slice(0, 4).map((metric, idx) => (
                      <MetricCard key={idx} metric={metric} index={idx} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Content & Features */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col space-y-8 lg:pt-8"
          >
            {/* Introduction Text */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="space-y-6"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                InnovationLabs360 is the perfect choice if you are looking for a
                reliable and experienced IT partner.
              </h3>
              <motion.p
                className="text-muted-foreground text-lg leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                {whoWeAre}
              </motion.p>
            </motion.div>

            {/* Feature Cards */}
            <motion.div className="grid gap-4" variants={containerVariants}>
              {features.map((feature, index) => (
                <FeatureCard key={index} feature={feature} index={index} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeAbout;
