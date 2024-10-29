import { FC } from "react";
import NcImage from "../../../shared/NcImage/NcImage";
import SocialsShare from "../../../shared/SocialsShare/SocialsShare";
import { _getTitleRd } from "../../../contains/fakeData";
import articles1Img from "../../../assets/HOME PAGE/13-articles-1.jpg";
import PostCardMeta from "../../../components/PostCardMeta/PostCardMeta";
import { type Blog } from "../../../models/blog";

export interface MainCardProps {
  src?: string;
  className?: string;
  onClick?: () => void;
  blog?: Blog;
}

const MainCard: FC<MainCardProps> = ({
  className = "h-full",
  onClick,
  src,
  blog,
}) => {
  return (
    <div
      className={`nc-Card12 group relative flex flex-col cursor-pointer ${className}`}
      data-nc-id="Card12"
      onClick={onClick}
    >
      <div className="block flex-shrink-0 flex-grow relative w-full h-0 aspect-w-4 aspect-h-3 rounded-3xl overflow-hidden">
        <NcImage
          src={blog.image_url || articles1Img}
          containerClassName="absolute inset-0"
          alt={"title"}
        />
      </div>

      {/* <SocialsShare className="absolute hidden md:grid gap-[5px] right-4 top-4 opacity-0 z-[-1] group-hover:z-10 group-hover:opacity-100 transition-all duration-300" /> */}

      <div className=" mt-8 pr-10 flex flex-col">
        <h2
          className={`nc-card-title block font-semibold text-neutral-900 dark:text-neutral-100 transition-colors text-lg sm:text-2xl`}
        >
          <div className="line-clamp-2 capitalize" title={"title"}>
            {/* {_getTitleRd()} */}
            {blog?.title}
          </div>
        </h2>
        <span className="hidden sm:block mt-4 text-neutral-500 dark:text-neutral-400">
          <span
            className="line-clamp-2"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          >
            {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
            vero perspiciatis ullam ea? Nihil accusamus similique debitis
            tempore mollitia? Aperiam. */}
            {/* {blog.content} */}
          </span>
        </span>
        <PostCardMeta
          authorName={blog.author}
          published_date={blog.published_date}
          className="mt-5"
        />
      </div>
    </div>
  );
};

export default MainCard;
