import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Title from "@/components/Title/Title";
import { ChevronRight, Calendar, X } from "lucide-react";

const BlogsCard = ({ blogs = [] }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  // Utility: strip HTML & limit text
  const getExcerpt = (html, limit = 100) => {
    if (!html) return "";
    const text = html.replace(/<[^>]+>/g, "");
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  // Handle blog click
  const handleBlogClick = (blog) => {
    if (isHomePage) {
      setSelectedBlog(blog);
      setShowModal(true);
      document.body.style.overflow = "hidden";
    }
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedBlog(null);
    document.body.style.overflow = "auto";
  };

  // Determine which blogs to display
  const displayedBlogs = isHomePage ? blogs.slice(0, 6) : blogs;

  return (
    <>
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <Title name="Our Blogs" />
          {isHomePage && (
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors mt-4 md:mt-0"
            >
              View All Blogs
              <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {displayedBlogs.map((blog, index) => (
            <motion.article
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              onClick={() => handleBlogClick(blog)}
              className={`bg-white md:rounded-2xl rounded-md shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer ${
                isHomePage ? "cursor-pointer" : ""
              }`}
            >
              {/* Image Section */}
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={blog.featured_image}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                
                {/* Date Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <Calendar className="w-3 h-3 text-primary" />
                  <span className="text-xs font-medium">
                    {formatDate(blog.published_at)}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                    {blog.category?.name || "Uncategorized"}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-primary transition-colors">
                  {blog.title}
                </h3>

                <div
                  className="text-gray-600 text-sm mb-4 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: getExcerpt(blog.content || blog.summary, 120) }}
                />

                <div className="flex items-center justify-between mt-6">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isHomePage) {
                        handleBlogClick(blog);
                      } else {
                        window.location.href = `/blogs/${blog.slug}`;
                      }
                    }}
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium text-sm transition-colors group"
                  >
                    Read {isHomePage ? "Preview" : "Full Blog"}
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                  
                  {!isHomePage && (
                    <Link
                      to={`/blogs/${blog.slug}`}
                      className="text-xs text-gray-500 hover:text-gray-700"
                    >
                      Permalink →
                    </Link>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {isHomePage && blogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No blogs available at the moment.</p>
          </div>
        )}
      </section>

      {/* Blog Preview Modal */}
      <AnimatePresence>
        {showModal && selectedBlog && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div 
                className="bg-white md:rounded-2xl rounded-md max-w-4xl w-full max-h-[90vh] overflow-hidden md:shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                  <div>
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-2">
                      {selectedBlog.category?.name || "Uncategorized"}
                    </span>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {selectedBlog.title}
                    </h2>
                    <p className="text-gray-500 text-sm mt-1 flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      {formatDate(selectedBlog.published_at)}
                    </p>
                  </div>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="overflow-y-auto max-h-[calc(90vh-140px)] p-6">
                  {/* Featured Image */}
                  <div className="mb-8 rounded-xl overflow-hidden">
                    <img
                      src={selectedBlog.featured_image}
                      alt={selectedBlog.title}
                      className="w-full h-auto max-h-[400px] object-cover"
                    />
                  </div>

                  {/* Blog Content */}
                  <div className="prose prose-lg max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: selectedBlog.content || selectedBlog.summary }} />
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex justify-between items-center">
                  <button
                    onClick={closeModal}
                    className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Close Preview
                  </button>
                  <Link
                    to={`/blogs/${selectedBlog.slug}`}
                    onClick={closeModal}
                    className="px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
                  >
                    Read Full Article
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default BlogsCard;