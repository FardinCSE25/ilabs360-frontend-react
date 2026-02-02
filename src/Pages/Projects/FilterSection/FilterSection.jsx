import React from "react";

const FilterSection = ({ filters, setFilters, categories = [] }) => {
  const selectStyles =
    "w-full bg-gray-50 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-black rounded-none px-4 py-4 text-sm transition-all outline-none appearance-none cursor-pointer";

  return (
    <div className="relative z-30 -mt-24 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-8 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">

          {/* Status Filter */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
              Status
            </label>
            <select
              className={selectStyles}
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
            >
              <option value="">All</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
              Category
            </label>
            <select
              className={selectStyles}
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Filter */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
              Sort By
            </label>
            <select
              className={selectStyles}
              value={filters.sort}
              onChange={(e) =>
                setFilters({ ...filters, sort: e.target.value })
              }
            >
              <option value="latest">Latest Projects</option>
              <option value="oldest">Oldest Projects</option>
            </select>
          </div>

          {/* Reset Filters */}
          <button
            onClick={() =>
              setFilters({
                status: "",
                category: "",
                sort: "latest",
              })
            }
            className="h-[52px] bg-primary text-white text-xs uppercase tracking-widest font-bold hover:bg-primary/80 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
