import React from "react";
import { Helmet } from "react-helmet-async";
import SectionLatestPosts from "./SectionLatestPosts";
import BgGlassmorphism from "../../../components/BgGlassmorphism/BgGlassmorphism";
import SectionPromo3 from "../../../components/SectionPromo3";
import EmailSubscribeSection from "../../../shared/EmailSubscribeSection/EmailSubscribeSection";
import BlogCard from "./BlogCard";
import MainCard from "./MainCard";
import { type Blog } from "../../../models/blog";
import useBlogs from "../../../hooks/useBlogs";
import { useNavigate } from "react-router-dom";
import Heading from "../../../shared/Heading/Heading";

const Blog: React.FC = () => {
  const { blogList } = useBlogs();
  const navigate = useNavigate();
  const routeToBlogDetailPage = (id: string) => {
    navigate(`/blog/${id}`);
  };

  const chunkBlogList = (blogList: Blog[], chunkSize: number = 5): Blog[][] => {
    const result: Blog[][] = [];
    for (let i = 0; i < blogList.length; i += chunkSize) {
      const chunk = blogList.slice(i, i + chunkSize);
      result.push(chunk);
    }
    return result;
  };

  const renderBlogSection = (blogs: Blog[], heading?: string) => {
    const [mainCard, ...list] = blogs;

    return (
      <>
        {heading && <Heading desc="">{heading}</Heading>}
        <div className="nc-SectionMagazine5">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
            {mainCard && (
              <MainCard
                blog={mainCard}
                onClick={() => routeToBlogDetailPage(mainCard.blog_id)}
              />
            )}
            <div className="grid gap-6 md:gap-8">
              {list.map((item, index) => (
                <BlogCard
                  key={index}
                  blog={item}
                  onClick={() => routeToBlogDetailPage(item.blog_id)}
                />
              ))}
            </div>
          </div>
        </div>
        <br />
      </>
    );
  };

  const blogListChunks = chunkBlogList(blogList);

  return (
    <div className="nc-BlogPage overflow-hidden relative">
      <Helmet>
        <title>Almaa</title>
      </Helmet>

      {/* ======== BG GLASS ======== */}
      {/* Place the BgGlassmorphism here to cover the entire blog list section */}
      <BgGlassmorphism className="absolute inset-0 z-0" />

      {/* ======== ALL SECTIONS ======== */}
      <div className="container relative z-10">
        {/* === SECTION 1 === */}
        <div className="pt-12 pb-16 lg:pb-28">
          {/* Blog list chunks rendered here */}
          {blogListChunks.map((chunk, chunkIndex) => {
            let heading = "";

            if (chunkIndex === 0) heading = "Latest Articles";
            else if (chunkIndex === 1) heading = "Other Articles";

            return (
              <div className="mb-20" key={chunkIndex}>
                {renderBlogSection(chunk, heading)}
              </div>
            );
          })}
        </div>

        {/* EMAIL SUBSCRIBE SECTION */}
        <EmailSubscribeSection />
      </div>
    </div>
  );
};

export default Blog;
