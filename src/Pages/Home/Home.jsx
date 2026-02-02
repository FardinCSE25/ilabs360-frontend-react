import HomeBanner from "./HomeBanner/HomeBanner";
import HomeAbout from "./HomeAbout/HomeAbout";
import { useGetProfilesQuery } from "@/redux/api/aboutApi";
import { useGetHomeMetricsQuery, useGetServiceQuery } from "@/redux/api/homeApi";
import HomeService from "./HomeService/HomeService";
import HomeAboutSkeleton from "@/components/skeletons/HomeAboutSkeleton";
import HomeServiceSkeleton from "@/components/skeletons/HomeServiceSkeleton";
import Tech from "./Tech/Tech";
import { useGetAllProjectsQuery } from "@/redux/api/projectApi";
import { useGetTestimonialQuery } from "@/redux/api/testimonialApi";
import HomeProjectsSkeleton from "@/components/skeletons/HomeProjectsSkeleton";
import HomeTestimonialSkeleton from "@/components/skeletons/HomeTestimonialSkeleton";
import HomeClients from "./HomeClients/HomeClients";
import TeamLeaders from "../About/TeamLeaders/TeamLeaders";
import ProjectsCard from "@/components/ProjectsCard/ProjectsCard";
import TestimonialSection from "./HomeTestimonial/TestimonialSection";
import HomeBlogs from "../Blogs/BlogsCard/BlogsCard";
import { useGetBlogsQuery } from "@/redux/api/blogApi";
import BlogsCard from "../Blogs/BlogsCard/BlogsCard";

const Home = () => {
  const { data: homeSectionData, isLoading: homeSectionLoading } =
    useGetHomeMetricsQuery();

  const { data: homeService, isLoading: homeServiceLoading } =
    useGetServiceQuery();

  const { data: projectsData, isLoading: projectsLoading } =
    useGetAllProjectsQuery();

  const { data: testimonialData, isLoading: testimonialLoading } =
    useGetTestimonialQuery();

  const { data: profilesData, isLoading: profilesLoading } =
    useGetProfilesQuery();

  const { data: blogsData, isLoading: blogLoading } =
    useGetBlogsQuery();

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
        
        <ProjectsCard projects={projectsData.data} />
      )}

      {/* TESTIMONIAL */}
      {testimonialLoading || !testimonialData?.data ? (
        <HomeTestimonialSkeleton />
      ) : (
        <>
        <TestimonialSection testimonial={testimonialData.data} />
        <HomeClients testimonial={testimonialData.data}/>
        </>
      )}
       {profilesLoading || !profilesData?.data ? (
        <HomeProjectsSkeleton />
      ) : (
        
        <TeamLeaders profiles={profilesData.data} />
      )}
       {blogLoading || !blogsData?.data ? (
        <HomeProjectsSkeleton />
      ) : (
        
        <BlogsCard blogs={blogsData.data} />
      )}
    </div>
  );
};

export default Home;
