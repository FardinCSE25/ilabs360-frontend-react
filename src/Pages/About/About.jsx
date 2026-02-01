import React from "react";
import Banner from "./Banner/Banner";
import aboutBg from "@/assets/BannerImages/About.jpeg";
import { useGetAboutQuery } from "@/redux/api/aboutApi";
import Missions from "./Missions/Missions";
import Gallery from "./Gallery/Gallery";
import Management from "./Management/Management";

const About = () => {
  const { data: about, isLoading: aboutLoading } = useGetAboutQuery();
  return (
    <>
      <Banner
        backgroundImage={aboutBg}
        subtitle="Our Team"
        title="About Us"
        highlight="Excellence"
      />
      <Missions about={about?.data[0]} aboutLoading={aboutLoading} />
      <Gallery />
      <Management />
    </>
  );
};

export default About;
