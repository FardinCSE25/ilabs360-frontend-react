import HomeBanner from "./HomeBanner/HomeBanner";
import HomeAbout from "./HomeAbout/HomeAbout";
import { useGetAboutQuery } from "@/redux/api/aboutApi";
import { useGetHomeMetricsQuery, useGetServiceQuery } from "@/redux/api/homeApi";
import HomeService from "./HomeService/HomeService";
import HomeAboutSkeleton from "@/components/skeletons/HomeAboutSkeleton";
import HomeServiceSkeleton from "@/components/skeletons/HomeServiceSkeleton";
import Tech from "./Tech/Tech";
import { useGetAllProjectsQuery } from "@/redux/api/projectApi";
import HomeProjects from "./HomeProjects/HomeProjects";
import { useGetTestimonialQuery } from "@/redux/api/testimonialApi";
import HomeProjectsSkeleton from "@/components/skeletons/HomeProjectsSkeleton";
import HomeTestimonialSkeleton from "@/components/skeletons/HomeTestimonialSkeleton";
import HomeTestimonial from "./HomeTestimonial/HomeTestimonial";
import HomeClients from "./HomeClients/HomeClients";

const Home = () => {
  const { data: homeSectionData, isLoading: homeSectionLoading } =
    useGetHomeMetricsQuery();

  const { data: homeService, isLoading: homeServiceLoading } =
    useGetServiceQuery();

  const { data: projectsData, isLoading: projectsLoading } =
    useGetAllProjectsQuery();

  const { data: testimonialData, isLoading: testimonialLoading } =
    useGetTestimonialQuery();

  // ✅ Home section main object
  const homeSection = homeSectionData?.data?.[0];

  return (
    <div>
      <HomeBanner />

      {/* ABOUT SECTION */}
      {homeSectionLoading || !homeSection ? (
        <HomeAboutSkeleton />
      ) : (
        <HomeAbout
          title={homeSection.title}
          subtitle={homeSection.subtitle}
          description={homeSection.description}
          image={homeSection.image}
          metrics={homeSection.metrics}
        />
      )}

      {/* SERVICES */}
      {homeServiceLoading || !homeService?.data ? (
        <HomeServiceSkeleton />
      ) : (
        <HomeService services={homeService.data} />
      )}

      <Tech />

      {/* PROJECTS */}
      {projectsLoading || !projectsData?.data ? (
        <HomeProjectsSkeleton />
      ) : (
        <HomeProjects projects={projectsData.data} />
      )}

      {/* TESTIMONIAL */}
      {testimonialLoading || !testimonialData?.data ? (
        <HomeTestimonialSkeleton />
      ) : (
        <>
        <HomeTestimonial testimonial={testimonialData.data} />
        <HomeClients testimonial={testimonialData.data}/>
        </>
      )}
    </div>
  );
};

export default Home;
