import Title from "@/components/Title/Title";
import React from "react";

const HomeProjects = ({ projects }) => {
  return (
    <section className="py-10 px-5 max-w-425 mx-auto">
      <Title name="Our Projects" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
        {projects?.map((project) => (
          <div
            key={project.id}
            className="group bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300"
          >
            {/* Banner Image */}
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={project.banner}
                alt={project.project_name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <span
                  className={`px-3 py-1 text-xs font-bold uppercase rounded-full shadow-sm ${
                    project.status === "completed"
                      ? "bg-green-100 text-green-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {project.status}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2 capitalize">
                {project.project_name}
              </h3>

              {/* Technology Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.frontend_tech && (
                  <span className="bg-purple-50 text-purple-600 text-[10px] px-2 py-1 rounded border border-purple-100">
                    {project.frontend_tech}
                  </span>
                )}
                {project.backend_tech && (
                  <span className="bg-orange-50 text-orange-600 text-[10px] px-2 py-1 rounded border border-orange-100">
                    {project.backend_tech}
                  </span>
                )}
                {project.database_tech && (
                  <span className="bg-blue-50 text-blue-600 text-[10px] px-2 py-1 rounded border border-blue-100">
                    {project.database_tech}
                  </span>
                )}
              </div>

              <p className="text-gray-600 text-sm line-clamp-2 mb-6">
                {project.short_description}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <a
                  href={project.project_video || "#"}
                  className={`flex-1 text-center py-2 rounded-lg text-sm font-semibold transition-colors ${
                    project.project_video
                      ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      : "bg-gray-50 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Video Link
                </a>
                <a
                  href={project.live_url || "#"}
                  className={`flex-1 text-center py-2 rounded-lg text-sm font-semibold transition-colors ${
                    project.live_url
                      ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Live Link
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeProjects;
