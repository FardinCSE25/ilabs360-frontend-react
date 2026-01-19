import React from "react";
import HomeBanner from "./HomeBanner/HomeBanner";
import { useGetHomeMetricsQuery } from "../../redux/api/homeApi";

const Home = () => {
  const { data: homeMetrics, isLoading, isError } = useGetHomeMetricsQuery();
  console.log("Home Metrics", homeMetrics);
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;

  return (
    <div>
      <HomeBanner homeMetrics={homeMetrics} />
    </div>
  );
};

export default Home;
