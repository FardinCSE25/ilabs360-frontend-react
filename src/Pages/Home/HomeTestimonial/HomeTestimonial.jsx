import React from "react";
import Title from "@/components/Title/Title";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const HomeTestimonial = ({ testimonial }) => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="py-20 bg-secondary/5 overflow-hidden">
      <Title name="What Our Clients Say" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-425 mx-auto grid grid-cols-1 gap-8 px-6 md:grid-cols-2 lg:grid-cols-4"
      >
        {testimonial?.slice(0, 4).map((item) => ( // <-- show only first 4
          <motion.div
            key={item.id}
            variants={cardVariants}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
            className="group relative flex flex-col rounded-3xl border border-gray-100 bg-white p-8 shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
          >
            {/* User Image & Info Header */}
            <div className="flex items-center gap-4 mb-6">
              {item.image ? (
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-primary/20 p-0.5"
                  />
                  <div className="absolute inset-0 rounded-full border border-primary/10 scale-125 opacity-0 group-hover:opacity-100 transition-all" />
                </div>
              ) : (
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                  {item.name.charAt(0)}
                </div>
              )}
              <div>
                <h4 className="font-bold text-gray-900 group-hover:text-primary transition-colors">
                  {item.name}
                </h4>
                <p className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">
                  {new Date(item.created_at).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Quote Icon at the center top of description */}
            <div className="relative flex justify-center mb-4">
              <Quote className="w-12 h-12 text-primary/20 group-hover:text-primary/30 transition-colors" />
            </div>

            {/* Testimonial Text */}
            <div className="relative flex-1 mb-6">
              <p className="text-gray-600 leading-relaxed font-medium text-center relative">
                <span className="absolute -left-2 -top-2 text-2xl text-primary/30 font-serif">
                  "
                </span>
                <span className="font-bold italic text-gray-700 px-2">
                  {item.short_description}
                </span>
                <span className="absolute -right-2 -bottom-2 text-2xl text-primary/30 font-serif">
                  "
                </span>
              </p>
            </div>

            {/* Rating stars */}
            <div className="flex items-center justify-center mt-auto pt-4 border-t border-gray-100">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={`${
                      i < item.star
                        ? "fill-primary text-primary"
                        : "fill-gray-100 text-gray-200"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default HomeTestimonial;
