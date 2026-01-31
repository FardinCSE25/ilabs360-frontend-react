import Title from "@/components/Title/Title";

const TeamLeaders = ({ profiles = [] }) => {
  return (
    <div className="my-20 md:my-32 px-4 max-w-425 mx-auto">
      <Title name="Meet Our Team" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {profiles.map((profile, index) => {
          // Skills handling
          const skills = Array.isArray(profile?.skills)
            ? profile.skills
            : typeof profile?.skills === "string"
              ? profile.skills.split(",")
              : [];

          const displayName =
            profile?.name || profile?.user?.name || "Name not found";

          return (
            <div
              key={profile?.id || index}
              className="relative group p-[2px] rounded-2xl bg-gradient-to-tr from-primary via-secondary to-primary transition-all duration-500"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-3">
                {/* Header */}
                <div className="relative h-60 bg-gradient-to-br from-primary via-secondary to-primary flex items-center justify-center overflow-hidden">
                  {profile?.image ? (
                    <div className="relative w-full h-full">
                      <img
                        src={profile.image}
                        alt={displayName}
                        className="absolute inset-0 w-full h-full object-cover opacity-30"
                      />
                      <img
                        src={profile.image}
                        alt={displayName}
                        className="w-40 h-40 rounded-full border-[6px] border-white object-cover absolute -bottom-10 left-1/2 -translate-x-1/2 shadow-xl"
                      />
                    </div>
                  ) : (
                    <div className="w-40 h-40 rounded-full bg-secondary flex items-center justify-center text-xl font-bold text-white border-[6px] border-white absolute -bottom-10 left-1/2 -translate-x-1/2 shadow-xl">
                      {displayName.split(" ").slice(0, 2).join(" ")}
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="pt-7 pb-8 px-6 h-[321px]">
                  <h3 className="text-base md:text-lg 2xl:text-2xl font-bold text-center text-secondary mb-2">
                    {displayName}
                  </h3>

                  {/* Designation */}
                  <p className="text-sm text-primary text-center font-medium mb-6">
                    {profile?.designation || "Designation not specified"}
                  </p>

                  {/* Experience & Skills */}
                  <div className="flex justify-between mb-6">
                    <div className="text-center">
                      <span className="block text-3xl font-bold text-secondary">
                        {profile?.years_in_company
                          ? `${profile.years_in_company}+`
                          : "N/A"}
                      </span>
                      <span className="text-xs text-gray-500">
                        Years in Company
                      </span>
                    </div>

                    <div className="text-center max-w-[120px]">
                      <span className="block text-xs font-semibold text-secondary uppercase">
                        Skills
                      </span>
                      <span className="text-xs text-gray-500">
                        {skills.length
                          ? skills.slice(0, 2).join(", ")
                          : "Skills not found"}
                      </span>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-gray-600 mb-6 line-clamp-3">
                    {profile?.bio ||
                      profile?.description ||
                      "No biography available"}
                  </p>

                  {/* Social Links */}
                  {/* Social Links */}
                  {(profile?.linkedin_url ||
                    profile?.github_url ||
                    profile?.portfolio_url) && (
                    <div className="flex justify-center space-x-6 pt-6 border-t border-gray-100">
                      {/* LinkedIn */}
                      {profile?.linkedin_url && (
                        <a
                          href={profile.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-primary transition-transform transform hover:scale-125"
                          aria-label="LinkedIn"
                        >
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 24h4V7h-4v17zM9 7h3.5v2.2h.1c.5-.9 1.7-2.2 3.5-2.2 3.7 0 4.4 2.4 4.4 5.5V24h-4v-8.2c0-2-.04-4.6-2.8-4.6s-3.2 2.2-3.2 4.5V24H9V7z" />
                          </svg>
                        </a>
                      )}

                      {/* GitHub */}
                      {profile?.github_url && (
                        <a
                          href={profile.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-secondary transition-transform transform hover:scale-125"
                          aria-label="GitHub"
                        >
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.07-.02-2.1-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.83 1.24 1.83 1.24 1.07 1.83 2.8 1.3 3.48.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.23a11.4 11.4 0 0 1 6 0C17.99 4.3 19 4.62 19 4.62c.66 1.64.25 2.86.12 3.16.77.84 1.24 1.91 1.24 3.22 0 4.62-2.81 5.65-5.48 5.95.43.37.81 1.1.81 2.22 0 1.6-.01 2.89-.01 3.28 0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                          </svg>
                        </a>
                      )}

                      {/* Portfolio */}
                      {profile?.portfolio_url && (
                        <a
                          href={profile.portfolio_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-primary transition-transform transform hover:scale-125"
                          aria-label="Portfolio"
                        >
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2C6.477 2 2 6.478 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10S17.523 2 12 2zm0 2a8 8 0 100 16 8 8 0 000-16zm-1 4h2v6h-2zm0 8h2v2h-2z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TeamLeaders;
