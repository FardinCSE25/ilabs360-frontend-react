import React, { useState } from "react";
import Title from "@/components/Title/Title";
import { Star, Quote, User, Calendar, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import CumButton from "@/components/CumButton/CumButton";

const TestimonialSection = ({ testimonial }) => {
  const location = useLocation();
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  
  const isHomePage = location.pathname === "/";
  const displayedTestimonials = isHomePage ? testimonial?.slice(0, 4) : testimonial;

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.5 
      },
    },
    hover: {
      y: -8,
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.08)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 25,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: { duration: 0.2 },
    },
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={18}
        className={`${
          i < rating
            ? "fill-amber-400 text-amber-400"
            : "fill-gray-200 text-gray-200"
        }`}
      />
    ));
  };

  return (
    <section className={`${isHomePage ? 'py-16' : 'py-20'} bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <Title name="What Our Clients Say" />
          <p className="text-gray-600 dark:text-gray-400 mt-3 text-lg max-w-2xl mx-auto">
            Trusted feedback from businesses we've partnered with to drive their success
          </p>
        </div>

        {/* Stats Banner (Only on Home Page) */}
        {isHomePage && (
          <div className="mb-12">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 md:rounded-2xl rounded-md p-6 md:p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">98%</div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">Client Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">150+</div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">Projects Delivered</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">4.9</div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">Average Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">95%</div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">Repeat Business</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Testimonial Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className={`grid grid-cols-1 md:grid-cols-2 ${isHomePage ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-6`}
        >
          {displayedTestimonials?.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              whileHover="hover"
              onClick={() => isHomePage && setSelectedTestimonial(item)}
              className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-primary/30 transition-all duration-300 cursor-pointer ${isHomePage ? 'h-full' : ''}`}
            >
              <div className="p-6 h-full flex flex-col">
                {/* Header with Client Info */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="relative">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover border-2 border-primary/20"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                        <User className="w-8 h-8 text-primary" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                      {item.name}
                    </h3>
                    {item.company && (
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                        {item.company}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-500 dark:text-gray-400 text-xs">
                        {formatDate(item.created_at)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quote Icon */}
                <div className="mb-4">
                  <Quote className="w-8 h-8 text-primary/30" />
                </div>

                {/* Testimonial Content */}
                <div className="flex-1 mb-6">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm line-clamp-4">
                    {item.short_description}
                  </p>
                  
                  {/* Read More Indicator (Only for Home Page) */}
                  {isHomePage && item.long_description && (
                    <div className="mt-3">
                      <span className="inline-flex items-center text-primary text-sm font-medium">
                        Read more <ChevronRight className="w-4 h-4 ml-1" />
                      </span>
                    </div>
                  )}
                </div>

                {/* Rating and Actions */}
                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {renderStars(item.star || 5)}
                    </div>
                    {!isHomePage && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTestimonial(item);
                        }}
                        className="text-sm text-primary hover:text-primary/80 font-medium"
                      >
                        View Full
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button (Only on Home Page) */}
        {isHomePage && (
          <div className="text-center mt-12">
            <CumButton path="/testimonial" title="View All Testimonials"/>
          </div>
        )}
      </div>

      {/* Testimonial Detail Modal */}
      <AnimatePresence>
        {selectedTestimonial && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedTestimonial(null)}
            />

            {/* Modal */}
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-2xl bg-white dark:bg-gray-900 md:rounded-2xl rounded-md md:shadow-2xl overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedTestimonial(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Content */}
              <div className="p-8">
                {/* Client Header */}
                <div className="flex items-center gap-6 mb-8">
                  <div className="relative">
                    {selectedTestimonial.image ? (
                      <img
                        src={selectedTestimonial.image}
                        alt={selectedTestimonial.name}
                        className="w-20 h-20 rounded-xl object-cover border-3 border-primary/20"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                        <User className="w-10 h-10 text-primary" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedTestimonial.name}
                    </h2>
                    {selectedTestimonial.company && (
                      <p className="text-gray-600 dark:text-gray-400 text-lg mt-1">
                        {selectedTestimonial.company}
                      </p>
                    )}
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-2 text-amber-500">
                        {renderStars(selectedTestimonial.star || 5)}
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                        <Calendar className="w-4 h-4" />
                        {formatDate(selectedTestimonial.created_at)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <div className="relative mb-8">
                  <Quote className="absolute -left-2 -top-2 w-12 h-12 text-primary/20" />
                  <blockquote className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed pl-8 italic">
                    "{selectedTestimonial.long_description || selectedTestimonial.short_description}"
                  </blockquote>
                </div>

                {/* Additional Details */}
                {selectedTestimonial.additional_info && (
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Project Details
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedTestimonial.project_type && (
                        <div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">Project Type</span>
                          <p className="text-gray-900 dark:text-white font-medium">
                            {selectedTestimonial.project_type}
                          </p>
                        </div>
                      )}
                      {selectedTestimonial.duration && (
                        <div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">Duration</span>
                          <p className="text-gray-900 dark:text-white font-medium">
                            {selectedTestimonial.duration}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Outcome/Result */}
                {selectedTestimonial.results && (
                  <div className="bg-primary/5 rounded-xl p-6 mb-8">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Results Achieved
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {selectedTestimonial.results}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6 border-t border-gray-100 dark:border-gray-800">
                  <button
                    onClick={() => setSelectedTestimonial(null)}
                    className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    Close
                  </button>
                  {selectedTestimonial.website && (
                    <a
                      href={selectedTestimonial.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors text-center"
                    >
                      Visit Client Website
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TestimonialSection;