import CumButton from "@/components/CumButton/CumButton";
import Title from "@/components/Title/Title";
import { useEffect, useState } from "react";

const Management = () => {
  const [managementData, setManagementData] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    fetch("/Json/Management.json")
      .then((res) => res.json())
      .then((data) => {
        setManagementData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load management data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center my-20">Loading team...</p>;
  }

  return (
    <>
      <div className="my-20 max-w-425 mx-auto md:my-60">
        <Title name="Our Core Team" />
        <div className="md:-ml-44 md:mr-5">
          <div className="flex justify-start items-start">
            <div className="z-10 text-lg md:text-5xl font-bold hidden md:inline-block px-10 py-10 rounded-lg transition-all duration-300 text-white transform -rotate-90 mt-52 -mr-40 ml-5">
              <CumButton title="InnovationLabs360" />
            </div>
            <div className="w-full animated-border-2 card-hover-glow grid grid-cols-1 md:grid-cols-2 md:gap-x-6">
              {managementData?.map((team, index) => (
                <div
                  key={index}
                  className="p-6 m-3 rounded-xl bg-white dark:bg-[#1f1f2e] shadow-md transform hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-primary hover:shadow-xl"
                >
                  <div className="text-4xl font-bold mb-2 text-success">
                    {team.number < 10 ? `${team.number}` : team.number}
                  </div>
                  <div className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">
                    {team.name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Team
                  </div>
                  <hr className="my-4 border border-primary dark:border-gray-600" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Management;
