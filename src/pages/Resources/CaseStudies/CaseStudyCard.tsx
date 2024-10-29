import PostCardMeta from "../../../components/PostCardMeta/PostCardMeta";
import { _getTitleRd } from "../../../contains/fakeData";
import { ICaseStudy } from "../../../services/case-study-service";
import NcImage from "../../../shared/NcImage/NcImage";
import SocialsShare from "../../../shared/SocialsShare/SocialsShare";

interface Props {
  caseStudy: ICaseStudy;
  className?: string;
  onClick: () => void;
}

const CaseStudyCard = ({ caseStudy, className, onClick }: Props) => {
  return (
    <div
      className={`nc-Card12 group relative flex flex-col cursor-pointer ${className}`}
      data-nc-id="Card12"
    >
      <div className="block flex-shrink-0 flex-grow relative w-full h-0 aspect-w-4 aspect-h-3 rounded-3xl overflow-hidden">
        <NcImage
          src={caseStudy.image_url}
          containerClassName="absolute inset-0"
          alt={"title"}
        />
      </div>

      <div className=" mt-8 pr-10 flex flex-col">
        <h2
          className={`nc-card-title block font-semibold text-neutral-900 dark:text-neutral-100 transition-colors text-lg sm:text-2xl`}
        >
          <div
            className="line-clamp-2 capitalize"
            title={caseStudy.title}
            onClick={onClick}
          >
            {caseStudy.title}
          </div>
        </h2>
        <span className="hidden sm:block mt-4 text-neutral-500 dark:text-neutral-400">
          <span
            className="line-clamp-2"
            dangerouslySetInnerHTML={{ __html: caseStudy.description }}
          ></span>
        </span>
        <div
          className={`nc-PostCardMeta inline-flex items-center fledx-wrap text-neutral-800 dark:text-neutral-200 text-sm ${className}`}
          data-nc-id="PostCardMeta"
        >
          {/* <Link
            to={"#"}
            className="flex-shrink-0 relative flex items-center space-x-2"
          >
            {!hiddenAvatar && (
              <Avatar radius="rounded-full" sizeClass={"h-7 w-7 text-sm"} />
            )}
            <span className="block text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium">
              {_getPersonNameRd()}
            </span>
          </Link> */}
          <>
            {/* <span className="text-neutral-500 dark:text-neutral-400 mx-[6px] font-medium">
              ·
            </span>
            <span className="text-neutral-500 dark:text-neutral-400 font-normal line-clamp-1">
              {caseStudy.date}
            </span> */}
          </>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyCard;
