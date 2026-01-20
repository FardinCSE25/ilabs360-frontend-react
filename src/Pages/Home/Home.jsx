import HomeBanner from "./HomeBanner/HomeBanner";
import HomeAbout from "./HomeAbout/HomeAbout";
import { useGetAboutQuery } from "@/redux/api/aboutApi";
import { useGetHomeMetricsQuery } from "@/redux/api/homeApi";

const Home = () => {
  const {
    data: aboutData,
    isLoading: aboutLoading,
  } = useGetAboutQuery();

  const {
    data: homeMetricsData,
    isLoading: metricsLoading,
  } = useGetHomeMetricsQuery();

  const about = aboutData?.data?.[0];
  const metrics = homeMetricsData?.data?.[0]?.metrics;

  return (
    <div>
      <HomeBanner />

      {aboutLoading || metricsLoading || !about || !metrics ? (
        // <HomeAboutSkeleton />
        <div>Loading................................</div>
      ) : (
        <HomeAbout
          loading={aboutLoading || metricsLoading}
          whoWeAre={about.who_we_are}
          banner={about.banner}
          metrics={metrics}
        />
      )}
    </div>
  );
};

export default Home;
