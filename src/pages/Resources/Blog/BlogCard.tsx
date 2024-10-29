import { FC } from "react";
import NcImage from "../../../shared/NcImage/NcImage";
import { Link } from "react-router-dom";
import { _getImgRd, _getTitleRd } from "../../../contains/fakeData";
import PostCardMeta from "../../../components/PostCardMeta/PostCardMeta";
import { Blog } from "../../../models/blog";

export interface BlogCardProps {
  className?: string;
  src?: string;
  onClick?: () => void;
  blog?: Blog;
}

const BlogCard: FC<BlogCardProps> = ({
  className = "",
  src,
  blog,
  onClick,
}) => {
  return (
    <div
      className={`nc-Card13 relative flex cursor-pointer ${className}`}
      data-nc-id="Card13"
      onClick={onClick}
    >
      <div className="flex flex-col h-full py-2 px-4 order-last">
        <h2 className={`nc-card-title block font-semibold text-base`}>
          <div className="line-clamp-2 capitalize" title={"title"}>
            {blog.title}
          </div>
        </h2>
        <span className="hidden sm:block my-3 text-slate-500 dark:text-slate-400 ">
          <span
            className="line-clamp-2"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          ></span>
        </span>
        <span className="mt-4 block sm:hidden text-sm text-slate-500 ">
          {blog.published_date} . 2 min read
        </span>
        <div className="mt-auto hidden sm:block">
          <PostCardMeta
            authorName={blog.author}
            published_date={blog.published_date}
          />
        </div>
      </div>

      <div
        className={`block relative h-full flex-shrink-0 w-2/5 sm:w-1/3 ml-3 sm:ml-5`}
      >
        <NcImage
          src={blog.image_url}
          containerClassName="absolute inset-0 "
          className="object-cover w-full h-full rounded-xl sm:rounded-3xl"
        />
      </div>
    </div>
  );
};

export default BlogCard;
