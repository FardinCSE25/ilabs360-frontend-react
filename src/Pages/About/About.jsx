import React from "react";
import Banner from "./Banner/Banner";
import aboutBg from "@/assets/BannerImages/About.jpeg";
import { useGetAboutQuery } from "@/redux/api/aboutApi";
import Missions from "./Missions/Missions";
import Gallery from "./Gallery/Gallery";
import Management from "./Management/Management";
import { useGetHomeMetricsQuery } from "@/redux/api/homeApi";
import MiniAboutSkeleton from "@/components/skeletons/MiniAboutSkeleton";
import MiniAbout from "./MiniAbout/MiniAbout";
import { useGetGalleryImageQuery } from "@/redux/api/galleryApi";

const About = () => {
  const { data: about, isLoading: aboutLoading } = useGetAboutQuery();
  const { data: homeSectionData, isLoading: homeSectionLoading } =
    useGetHomeMetricsQuery();
  const { data: galleryImageData } = useGetGalleryImageQuery();

  return (
    <>
      <Banner
        backgroundImage={aboutBg}
        subtitle="Our Team"
        title="About Us"
        highlight="Excellence"
      />
      {aboutLoading || homeSectionLoading || !about || !homeSectionData ? (
        <MiniAboutSkeleton />
      ) : (
        <MiniAbout
          about={about}
          metrics={homeSectionData?.data[0].metrics || []}
        />
      )}
      <Missions about={about?.data[0]} aboutLoading={aboutLoading} />
      <Gallery galleryImageData={galleryImageData} />
      <Management />
    </>
  );
};

export default About;
