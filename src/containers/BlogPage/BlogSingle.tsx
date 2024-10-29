import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Avatar from "../../shared/Avatar/Avatar";
import NcImage from "../../shared/NcImage/NcImage";
import SocialsList from "../../shared/SocialsList/SocialsList";
import { Helmet } from "react-helmet-async";
import { BlogDetail } from "../../models/blogDetail";
import blogDetailService from "../../services/blog-detail-service";
import { useAppDispatch } from "../../hooks/hooks";
import { hideLoader, showLoader } from "../../features/loader/loaderSlice";
import { CanceledError } from "axios";
import { getFormattedDate } from "../../utils/date-utils";

const BlogSingle = () => {
  const params = useParams();
  const [blogDetail, setBlogDetail] = useState<BlogDetail>();
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    const { request, cancel } = blogDetailService.get<
      BlogDetail,
      { blog_id: string }
    >({ blog_id: params.id });

    dispatch(showLoader());

    request
      .then((res) => {
        setBlogDetail(res.data);
        dispatch(hideLoader());
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;

        dispatch(hideLoader());
        setError(err.message);
      });

    return () => cancel();
  }, []);

  const renderHeader = () => {
    return (
      <header className="container rounded-xl">
        <div className="max-w-screen-md mx-auto space-y-5">
          <h1
            className=" text-neutral-900 font-semibold text-3xl md:text-4xl md:!leading-[120%] lg:text-4xl dark:text-neutral-100 max-w-4xl "
            title="Quiet ingenuity: 120,000 lunches and counting"
          >
            {blogDetail?.title}
          </h1>

          <div className="w-full border-b border-neutral-100 dark:border-neutral-800"></div>
          <div className="flex flex-col items-center sm:flex-row sm:justify-between">
            <div className="nc-PostMeta2 flex items-center flex-wrap text-neutral-700 text-left dark:text-neutral-200 text-sm leading-none flex-shrink-0">
              <Avatar
                containerClassName="flex-shrink-0"
                sizeClass="w-8 h-8 sm:h-11 sm:w-11 "
              />
              <div className="ml-3">
                <div className="flex items-center">
                  <a className="block font-semibold" href="##">
                    {blogDetail?.author}
                  </a>
                </div>
                <div className="text-xs mt-[6px]">
                  <span className="text-neutral-700 dark:text-neutral-300">
                    {getFormattedDate(blogDetail?.published_date)}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-3 sm:mt-1.5 sm:ml-3">
              <SocialsList />
            </div>
          </div>
        </div>
      </header>
    );
  };

  const renderContent = () => {
    return (
      <div
        id="single-entry-content"
        className="prose prose-sm !max-w-screen-md sm:prose lg:prose-lg mx-auto dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: blogDetail?.content }}
      ></div>
    );
  };

  return (
    <div className="nc-PageSingle pt-8 lg:pt-16 ">
      <Helmet>
        <title>Single Blog || Ciseco Ecommerce React Template</title>
      </Helmet>
      {renderHeader()}
      <div className="flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <NcImage
          className="w-full sm:w-[400px] md:w-[500px] lg:w-[650px] h-auto rounded-xl"
          containerClassName="my-0"
          src={blogDetail?.image_url}
        />
      </div>

      <div className="nc-SingleContent container space-y-10">
        {renderContent()}
        <div className="max-w-screen-md mx-auto border-b border-t border-neutral-100 dark:border-neutral-700"></div>
      </div>
    </div>
  );
};

export default BlogSingle;
