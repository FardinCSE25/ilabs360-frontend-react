import React from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Globe,
  ShieldCheck,
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

/* =======================
   Section Title
======================= */
const SectionTitle = ({ title, subtitle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mb-16 lg:mb-24 text-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-primary/5 px-4 py-2 rounded-full mb-6 border border-primary/20"
      >
        <Heart className="w-4 h-4 text-primary" />
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">
          {title}
        </span>
      </motion.div>

      <div className="-mb-10">
        <Title name="About Us" />
      </div>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto mt-6"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

/* =======================
        Metric Card
======================= */
const MetricCard = ({ metric, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      className="flex flex-col p-4"
    >
      <span className="text-xs uppercase tracking-wide text-muted-foreground">
        {metric.name}
      </span>

      <span className="text-3xl lg:text-4xl font-bold text-foreground mt-2">
        {metric.value}
      </span>
    </motion.div>
  );
};

/* =======================
   Feature Card
======================= */
const FeatureCard = ({ feature, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ x: 6 }}
      className="flex items-center gap-5 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-primary/30 transition"
    >
      <div
        className={`p-3 rounded-xl bg-gradient-to-br ${feature.gradient} text-white`}
      >
        {feature.icon}
      </div>

      <div className="flex-1">
        <h4 className="font-bold text-lg text-foreground">{feature.title}</h4>
        <p className="text-sm text-muted-foreground">{feature.description}</p>
      </div>

      <ChevronRight className="w-5 h-5 text-muted-foreground" />
    </motion.div>
  );
};

/* =======================
   Home About Component
======================= */
const HomeAbout = ({ title, subtitle, description, image, metrics }) => {
  const enhancedMetrics =
    metrics?.map((item, index) => ({
      ...item,
      icon: [Users, Code, Clock, Star, TrendingUp][index % 5],
    })) || [];

  const getCountriesCount = () => {
    const found = enhancedMetrics.find((m) =>
      m.name?.toLowerCase().includes("country"),
    );
    return found?.value || "1+";
  };

  const features = [
    {
      icon: <Globe className="w-5 h-5" />,
      title: "Global Reach",
      description: "Delivering solutions across international markets.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      title: "Trusted Partner",
      description: "Reliable solutions for enterprise and government.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Award className="w-5 h-5" />,
      title: "Quality Assured",
      description: "Focused on performance, security, and scalability.",
      gradient: "from-blue-500 to-cyan-500",
    },
  ];

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-background">
      {/* Background blur */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title={title} subtitle={subtitle} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative pt-16"
          >
            <div className="relative h-[450px] md:h-[550px] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            {/* Export badge */}
            <div className="absolute top-0 right-0 lg:-right-6">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary to-primary/80 flex flex-col items-center justify-center shadow-xl border-4 border-white">
                <Rocket className="w-7 h-7 text-white mb-1" />
                <span className="text-xs text-white uppercase">
                  Exporting to
                </span>
                <span className="text-2xl font-bold text-white">
                  {getCountriesCount()}
                </span>
                <span className="text-xs text-white uppercase">Countries</span>
              </div>
            </div>

            {/* Metrics */}
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[95%]">
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow border">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {enhancedMetrics.slice(0, 4).map((metric, idx) => (
                    <MetricCard key={idx} metric={metric} index={idx} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT */}
          <div className="flex flex-col space-y-8 lg:pt-12">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
              Building digital solutions that drive real business value.
            </h3>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {description}
            </p>

            <div className="grid gap-4">
              {features.map((feature, index) => (
                <FeatureCard key={index} feature={feature} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeAbout;
