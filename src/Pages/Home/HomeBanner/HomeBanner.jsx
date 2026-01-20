import React from "react";
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Link } from "react-router-dom";

const BannerHome = () => {
  return (
    <div className="relative w-full min-h-screen bg-background overflow-hidden mt-20 md:mt-0 flex items-center">
      {/* --- BACKGROUND DESIGN: Circuit Lines --- */}
      <div className="absolute top-0 left-0 w-1/3 h-full pointer-events-none opacity-40">
        <svg viewBox="0 0 400 800" className="w-full h-full">
          <path
            d="M0 200 H100 L150 250 H250"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-primary/40"
          />
          <path
            d="M0 400 H150 L200 350 H300"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-primary/60"
          />
          <circle cx="250" cy="250" r="4" className="fill-primary" />
          <circle cx="300" cy="350" r="3" className="fill-primary/50" />
        </svg>
      </div>

      <div className="absolute top-0 right-0 w-1/3 h-full pointer-events-none opacity-40">
        <svg viewBox="0 0 400 800" className="w-full h-full">
          <path
            d="M400 300 H300 L250 350 H150"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-primary/40"
          />
          <path
            d="M400 500 H250 L200 450 H100"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-primary/60"
          />
          <circle cx="150" cy="350" r="4" className="fill-primary" />
        </svg>
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center z-10">
        {/* --- LEFT SIDE: Animated iLabs360 Text Logo --- */}
        <div className="relative md:flex hidden justify-center items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative w-72 h-72 md:w-[500px] md:h-[500px] flex items-center justify-center"
          >
            {/* Animated Background Glow */}
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/5 to-primary/10 blur-3xl"
            />

            {/* Hexagon Container */}
            <div className="absolute inset-0 bg-secondary/5 clip-hexagon border-2 border-primary/30 flex items-center justify-center overflow-hidden">
              {/* Animated Circuit Lines Inside */}
              <svg className="absolute inset-0 w-full h-full opacity-20">
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  d="M50,100 C150,50 250,150 350,100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-primary"
                />
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 0.5,
                  }}
                  d="M100,200 C200,150 300,250 350,200"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-primary"
                />
              </svg>

              {/* Animated Dots */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute w-4 h-4 rounded-full bg-primary/50"
                style={{ top: "20%", left: "20%" }}
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute w-3 h-3 rounded-full bg-primary/30"
                style={{ bottom: "30%", right: "25%" }}
              />
            </div>

            {/* iLabs360 Text Design */}
            {/* Alternative iLabs360 Text Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative"
            >
              {/* Glowing Background Effect */}
              <motion.div
                animate={{
                  background: [
                    "radial-gradient(circle at center, rgba(var(--primary)/0.2) 0%, transparent 70%)",
                    "radial-gradient(circle at center, rgba(var(--primary)/0.3) 0%, transparent 70%)",
                    "radial-gradient(circle at center, rgba(var(--primary)/0.2) 0%, transparent 70%)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 -z-10"
              />

              <div className="relative">
                {/* Main Text with Gradient */}
                <div className="text-center">
                  <div className="relative inline-block">
                    <motion.span
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-4xl md:text-6xl font-bold text-primary"
                    >
                      i
                    </motion.span>

                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="text-5xl md:text-8xl font-black text-primary bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent tracking-tight"
                    >
                      Labs
                    </motion.span>

                    <motion.span
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        delay: 0.4,
                      }}
                      className="text-3xl md:text-6xl font-black text-secondary ml-2"
                    >
                      360
                    </motion.span>
                  </div>
                </div>

                {/* Animated Subtitle */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-center mt-4"
                >
                  <span className="text-muted-foreground font-mono text-sm tracking-wider">
                    THINK OUT OF THE BOX
                  </span>
                  <motion.div
                    animate={{ width: ["0%", "100%", "0%"] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-2"
                  />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* --- RIGHT SIDE: Static Content --- */}
        <div className="flex flex-col text-left space-y-6">
          <div className="space-y-2">
            <p className="text-muted-foreground font-mono text-sm md:text-base flex items-center gap-2">
              <span className="text-primary font-bold">//</span> Functional,
              Usability & Performance
            </p>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-foreground uppercase leading-[0.9]">
              SOFTWARE <br />
              <span className="text-primary">DEVELOPMENT</span>
            </h1>
          </div>

          <div className="max-w-md">
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
              We transform businesses of most major sectors with powerful and
              adaptable digital solutions that satisfy the needs of today.
            </p>
          </div>

          {/* Typewriter Effect & Video Button */}
          <div className="flex flex-col md:flex-row md:items-center gap-8 pt-6">
            <button className="group flex items-center gap-4 font-bold uppercase tracking-[0.2em] text-xs">
              <div className="w-14 h-14 rounded-full border border-primary/30 bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <Play size={24} fill="currentColor" />
              </div>
              VIDEO SHOWCASE
            </button>

            <div className="text-primary font-mono text-xl md:text-2xl font-semibold border-l-2 border-primary/20 pl-6">
              <Typewriter
                options={{
                  strings: [
                    "Web Application",
                    "Mobile Application",
                    "IT Consultancy",
                    "Managed Services",
                  ],
                  autoStart: true,
                  loop: true,
                  wrapperClassName: "text-primary",
                  cursorClassName: "text-primary animate-pulse",
                }}
              />
            </div>
          </div>

          {/* Let's Talk Button */}
          <div className="pt-8">
            <Link to="/contact">
              <button className="bg-primary text-white px-10 py-5 font-bold uppercase tracking-widest hover:translate-x-2 transition-transform duration-300 shadow-xl shadow-primary/30">
                Let's Talk
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerHome;
