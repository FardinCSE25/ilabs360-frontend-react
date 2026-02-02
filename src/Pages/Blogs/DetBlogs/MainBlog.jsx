import React from "react";
import { useParams } from "react-router-dom";
import BlogBanner from "./BlogBanner";
import DetBlogs from "./DetBlogs";
import BlogPublisher from "./BlogPublisher";
import { useGetDetailBlogsQuery } from "@/redux/api/blogApi";

const MainBlog = () => {
  const { slug } = useParams();

  const { data: response, isLoading, isError } = useGetDetailBlogsQuery(slug, {
    skip: !slug,
  });

  const blog = response?.data; // ✅ extract the actual blog object

  if (isLoading) {
    return <div className="text-center py-20">Loading blog...</div>;
  }

  if (isError || !blog) {
    return <div className="text-center py-20">Blog not found</div>;
  }

  return (
    <>
      <BlogBanner blog={blog} />
      <DetBlogs blog={blog} />
      <BlogPublisher blog={blog} />
    </>
  );
};

export default MainBlog;
