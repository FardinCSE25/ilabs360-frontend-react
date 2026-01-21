import HomeBanner from "./HomeBanner/HomeBanner";
import HomeAbout from "./HomeAbout/HomeAbout";
import { useGetAboutQuery } from "@/redux/api/aboutApi";
import {
  useGetHomeMetricsQuery,
  useGetServiceQuery,
} from "@/redux/api/homeApi";
import HomeService from "./HomeService/HomeService";

const Home = () => {
  const { data: aboutData, isLoading: aboutLoading } = useGetAboutQuery();
  const { data: homeMetricsData, isLoading: metricsLoading } =
    useGetHomeMetricsQuery();
  const { data: homeService, isLoading: homeServiceLoading } =
    useGetServiceQuery();
  // console.log(homeService);

  const about = aboutData?.data?.[0];
  const metrics = homeMetricsData?.data?.[0]?.metrics;
  const services = homeService?.data;
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
      <HomeService services={services} />
    </div>
  );
};

export default Home;
