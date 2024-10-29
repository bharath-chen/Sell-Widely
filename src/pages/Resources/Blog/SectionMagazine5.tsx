import { FC } from "react";
import MainCard from "./MainCard";
import BlogCard from "./BlogCard";
import { featuredImgs } from "../../../contains/fakeData";
import { useNavigate } from "react-router-dom";

export interface SectionMagazine5Props {}

const SectionMagazine5: FC<SectionMagazine5Props> = () => {
  const navigate = useNavigate();

  const routeToBlogDetailPage = () => {
    navigate("/blog-single");
  };

  return (
    <div className="nc-SectionMagazine5">
      <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
        <MainCard onClick={routeToBlogDetailPage} />
        <div className="grid gap-6 md:gap-8">
          {featuredImgs.map((item, index) => (
            <BlogCard key={index} src={item} onClick={routeToBlogDetailPage} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionMagazine5;
