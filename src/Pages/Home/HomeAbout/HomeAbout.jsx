import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Globe, ShieldCheck, Headphones, Award, Rocket, Users, Code, Clock, Star, TrendingUp, ChevronRight } from "lucide-react";

const HomeAbout = ({ banner, metrics, whoWeAre }) => {
  // Enhanced metrics with specific icons
  const enhancedMetrics = metrics?.map((item, index) => ({
    ...item,
    icon: [Users, Code, Clock, Star, TrendingUp][index % 5],
  })) || [];

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
      gradient: "from-emerald-500 to-green-500",
    },
    {
      icon: <Award className="w-5 h-5" />,
      title: "Quality Guaranteed",
      description: "100% satisfaction guarantee on all our digital services.",
      gradient: "from-amber-500 to-orange-500",
    },
  ];

  return (
    <section className="relative min-h-screen py-20 lg:py-32 overflow-hidden bg-background">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- HEADER --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 lg:mb-24"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6 border border-primary/20">
            <Heart className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-xs font-bold text-primary uppercase tracking-[0.2em]">Innovation Labs 360</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-black tracking-tighter text-foreground mb-6 uppercase">
            Empowering Your <br />
            <span className="text-primary">Digital Evolution</span>
          </h2>
        </motion.div>

        {/* --- MAIN GRID: IMAGE LEFT, CONTENT RIGHT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* LEFT COLUMN: Image + Fixed Stats Layer */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Main Image Container */}
              <div className="relative h-[400px] md:h-[550px] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                <img
                  src={banner || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80"}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000"
                  alt="About Us"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Floating "Exporting" Badge */}
                <div className="absolute top-6 right-6 bg-primary text-primary-foreground p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-white/20">
                    <Rocket className="w-6 h-6" />
                    <div className="leading-none">
                        <p className="text-[10px] uppercase font-bold opacity-80">Exporting to</p>
                        <p className="text-xl font-black">3+ Nations</p>
                    </div>
                </div>
              </div>

              {/* STATS OVERLAY: Fixed at the bottom of the image container */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                viewport={{ once: true }}
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[90%] md:w-[95%] z-20"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 bg-white dark:bg-zinc-900 p-4 md:p-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-border">
                  {enhancedMetrics.slice(0, 4).map((metric, idx) => {
                    const Icon = metric.icon;
                    return (
                      <div key={idx} className="flex flex-col items-center text-center p-2 border-r last:border-0 border-border">
                        <Icon className="w-5 h-5 text-primary mb-2 opacity-70" />
                        <span className="text-xl md:text-2xl font-black text-foreground">{metric.value}</span>
                        <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-tighter">{metric.name}</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Content & Features */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col space-y-8 lg:pt-4"
          >
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                InnovationLabs360 is the perfect choice if you are looking for a reliable and experienced IT partner.
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {whoWeAre}
              </p>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-5 p-5 rounded-2xl bg-primary border border-border hover:border-primary/50 transition-all group"
                >
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg`}>
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-foreground text-lg">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground leading-snug">{feature.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-6">
              <button className="group relative w-full lg:w-max bg-primary text-primary-foreground px-10 py-5 rounded-xl font-bold uppercase tracking-widest overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(var(--primary),0.4)]">
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <Headphones className="w-5 h-5" />
                  Get Premium Support
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HomeAbout;