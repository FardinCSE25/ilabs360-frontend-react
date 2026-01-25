import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Title from "@/components/Title/Title";

const HomeBlogs = ({ blogs = [] }) => {

  // Utility: strip HTML & limit text
  const getExcerpt = (html, limit = 100) => {
    const text = html?.replace(/<[^>]+>/g, "");
    return text?.length > limit ? text.slice(0, limit) + "..." : text;
  };

  return (
    <section className="py-12 max-w-425 mx-auto">
      <Title name="Our Blogs"/>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {blogs.slice(0, 8).map((blog, index) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -6 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden group"
          >
            {/* Image Section */}
            <div className="relative overflow-hidden">
              <img
                src={blog.featured_image}
                alt={blog.title}
                className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Date Badge */}
              <span className="absolute bottom-3 left-3 bg-primary text-white text-xs px-3 py-1 rounded-full shadow">
                {new Date(blog.published_at).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col">
              <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                {blog.title}
              </h3>

              <p className="text-sm text-gray-600 mb-4">
                {getExcerpt(blog.content)}
              </p>

              <Link
                to={`/blogs/${blog.slug}`}
                className="mt-auto inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary/90"
              >
                Read Full Blog →
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HomeBlogs;
