import { hideLoader, showLoader } from "../../../features/loader/loaderSlice";
import { useAppDispatch } from "../../../hooks/hooks";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import newsEventsService, {
  INewsAndEvents,
} from "../../../services/news-events-service";
import { CanceledError } from "axios";

const NewsAndEventsDetail = () => {
  const { state } = useLocation();
  const dispatch = useAppDispatch();
  const [eventDetil, setEventDetail] = useState<INewsAndEvents>(null);

  function fetchEventsDetail() {
    const { request, cancel } = newsEventsService.get<
      INewsAndEvents,
      { gofor: string; event_id: string }
    >({
      gofor: "getevent",
      event_id: state.eventsDetail.event_id,
    });

    dispatch(showLoader());

    request
      .then((res) => {
        dispatch(hideLoader());
        setEventDetail(res.data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;

        dispatch(hideLoader());
      });

    return cancel;
  }

  useEffect(() => {
    const cancelGetCaseStudyDetail = fetchEventsDetail();

    return () => cancelGetCaseStudyDetail();
  }, [state.eventsDetail.event_id]);

  const renderSectionContent = () => {
    return (
      <div className="space-y-7 2xl:space-y-8">
        <div className="w-full max-w bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col pl-5 pb-5 mt-5">
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white pb-2">
              {eventDetil.title}
            </h5>
            <span
              className="text-md text-gray-500 dark:text-gray-400 pb-2"
              dangerouslySetInnerHTML={{
                __html: eventDetil.description,
              }}
            ></span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-ProductDetailPage`}>
      {/* Main */}
      {eventDetil && (
        <main className="container mt-5 lg:mt-11">
          <div className="lg:flex">
            {/* CONTENT */}
            <div className="w-full lg:w-[55%] ">
              {/* HEADING */}
              <div className="relative">
                <div className="aspect-w-16 aspect-h-16">
                  <img
                    src={eventDetil.image_url}
                    className="w-full rounded-2xl object-cover"
                    alt={eventDetil.title}
                  />
                </div>
              </div>
            </div>

            {/* SIDEBAR */}
            <div className="w-full lg:w-[45%] pt-10 lg:pt-0 lg:pl-7 xl:pl-9 2xl:pl-10">
              {renderSectionContent()}
            </div>
          </div>

          {/* DETAIL AND REVIEW */}
          <div className="mt-12 sm:mt-16 space-y-10 sm:space-y-16">
            <div className="block xl:hidden">{/* <Policy /> */}</div>
          </div>
        </main>
      )}
    </div>
  );
};

export default NewsAndEventsDetail;
