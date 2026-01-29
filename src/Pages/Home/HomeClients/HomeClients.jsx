import Title from "@/components/Title/Title";
import React, { useState } from "react";

const HomeClients = ({ testimonial }) => {
  // State to manage how many items are visible
  const [visibleCount, setVisibleCount] = useState(8);

  const showMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  const showLess = () => {
    setVisibleCount(8);
  };

  return (
    <section className="py-12">
      <Title name="Our Clients" />
      <div className="container mx-auto px-4">
        {/* 8-Column Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
          {testimonial?.slice(0, visibleCount).map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center text-center group"
            >
              {/* Company Logo Container - Minimal with original logo size */}
              <div className="flex items-center justify-center min-h-[120px] group-hover:opacity-90 transition-opacity duration-300">
                {item.company_image ? (
                  <img
                    src={`${import.meta.env.VITE_API_BASE_URL}/storage/${item.company_image}`}
                    alt={item.company_name || "Company"}
                    className="max-w-full max-h-[120px] object-contain"
                    style={{ width: "auto", height: "auto" }}
                  />
                ) : (
                  // Fallback text if no logo
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary">
                      {item.company_name?.charAt(0) || item.name?.charAt(0)}
                    </div>
                  </div>
                )}
              </div>

              {/* Company Name */}
              <p className="mt-4 text-sm font-semibold text-primary truncate w-full">
                {item.company_name || "Independent"}
              </p>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-12 flex justify-center gap-4">
          {visibleCount < testimonial?.length && (
            <button
              onClick={showMore}
              className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-all font-medium"
            >
              Show More
            </button>
          )}

          {visibleCount > 8 && (
            <button
              onClick={showLess}
              className="px-6 py-2 border-2 border-primary text-primary rounded-md hover:bg-primary hover:text-white transition-all font-medium"
            >
              Show Less
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomeClients;
