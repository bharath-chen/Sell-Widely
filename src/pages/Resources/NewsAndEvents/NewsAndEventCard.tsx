import NcImage from "../../../shared/NcImage/NcImage";
import { Link, useNavigate } from "react-router-dom";
import { INewsAndEvents } from "../../../services/news-events-service";
import { getFormattedDate } from "../../../utils/date-utils";

interface Props {
  newsAndEvent: INewsAndEvents;
  className?: string;
}

const NewsAndEventCard = ({ newsAndEvent, className }: Props) => {
  const navigate = useNavigate();

  const routeToNewsAndEventsDetailPage = () => {
    navigate("/news-&-events-detail", {
      state: {
        eventsDetail: newsAndEvent,
      },
    });
  };

  return (
    <div
      className={`nc-Card12 group relative flex flex-col ${className}`}
      data-nc-id="Card12"
    >
      <span
        onClick={routeToNewsAndEventsDetailPage}
        className="block flex-shrink-0 flex-grow relative w-full h-0 aspect-w-4 aspect-h-3 rounded-3xl overflow-hidden cursor-pointer"
      >
        <NcImage
          src={newsAndEvent.image_url}
          containerClassName="absolute inset-0"
          alt={newsAndEvent.title}
        />
      </span>

      <div className=" mt-8 pr-10 flex flex-col">
        <div
          className={`nc-PostCardMeta inline-flex items-center fledx-wrap text-neutral-800 dark:text-neutral-200 text-sm mb-2 ${className}`}
          data-nc-id="PostCardMeta"
        >
          <span className="text-neutral-500 dark:text-neutral-400 font-normal line-clamp-1">
            <strong>Event Date:</strong>{" "}
            {getFormattedDate(newsAndEvent.event_date)}
          </span>
        </div>

        <h2
          className={`nc-card-title block font-semibold text-neutral-900 dark:text-neutral-100 transition-colors text-lg sm:text-2xl cursor-pointer`}
        >
          <span
            onClick={routeToNewsAndEventsDetailPage}
            className="line-clamp-2 capitalize"
            title={"title"}
          >
            {newsAndEvent.title}
          </span>
        </h2>
        <span className="hidden sm:block mt-4 text-neutral-500 dark:text-neutral-400">
          <span
            className="line-clamp-2"
            dangerouslySetInnerHTML={{ __html: newsAndEvent.description }}
          ></span>
        </span>
      </div>
    </div>
  );
};

export default NewsAndEventCard;
