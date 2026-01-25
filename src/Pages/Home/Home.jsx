import HomeBanner from "./HomeBanner/HomeBanner";
import HomeAbout from "./HomeAbout/HomeAbout";
import { useGetAboutQuery } from "@/redux/api/aboutApi";
import {
  useGetHomeMetricsQuery,
  useGetServiceQuery,
} from "@/redux/api/homeApi";
import HomeService from "./HomeService/HomeService";
import HomeAboutSkeleton from "@/components/skeletons/HomeAboutSkeleton";
import HomeServiceSkeleton from "@/components/skeletons/HomeServiceSkeleton";
import { useGetBlogsQuery } from "@/redux/api/blogApi";
import HomeBlogs from "./HomeBlogs/HomeBlogs";
import Tech from "./Tech/Tech";
import { useGetAllProjectsQuery } from "@/redux/api/projectApi";
import HomeProjects from "./HomeProjects/HomeProjects";
import { useGetTestimonialQuery } from "@/redux/api/testimonialApi";
import HomeTestimonial from "./HomeTestimonial/HomeTestimonial";

const Home = () => {
  const { data: aboutData, isLoading: aboutLoading } = useGetAboutQuery();
  const { data: homeMetricsData, isLoading: metricsLoading } =
    useGetHomeMetricsQuery();
  const { data: homeService, isLoading: homeServiceLoading } =
    useGetServiceQuery();
  const { data: blogsData, isLoading: blogsLoading } = useGetBlogsQuery();
  const { data: projectsData, isLoading: projectsLoading } =
    useGetAllProjectsQuery();
  const { data: testimonialData, isLoading: testimonialLoading } =
    useGetTestimonialQuery();

  // console.log(blogs);

  const about = aboutData?.data?.[0];
  const metrics = homeMetricsData?.data?.[0]?.metrics;
  const services = homeService?.data;
  const blogs = blogsData?.data;
  const projects = projectsData?.data;
  const testimonial = testimonialData?.data;

  return (
    <div>
      <HomeBanner />

      {aboutLoading || metricsLoading || !about || !metrics ? (
        <HomeAboutSkeleton />
      ) : (
        <HomeAbout
          loading={aboutLoading || metricsLoading}
          whoWeAre={about.who_we_are}
          banner={about.banner}
          metrics={metrics}
        />
      )}
      {homeServiceLoading || !services ? (
        <HomeServiceSkeleton />
      ) : (
        <HomeService services={services} />
      )}
      {blogsLoading || !blogs ? (
        // <HomeServiceSkeleton />
        <p>Loading......</p>
      ) : (
        <HomeBlogs blogs={blogs} />
      )}
      <Tech />
      {projectsLoading || !projects ? (
        // <HomeServiceSkeleton />
        <p>Loading......</p>
      ) : (
        <HomeProjects projects={projects} />
      )}
      {testimonialLoading || !testimonial ? (
        // <HomeServiceSkeleton />
        <p>Loading......</p>
      ) : (
        <HomeTestimonial testimonial={testimonial} />
      )}
    </div>
  );
};

export default Home;
