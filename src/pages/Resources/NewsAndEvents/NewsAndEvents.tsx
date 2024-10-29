import EmailSubscribeSection from "../../../shared/EmailSubscribeSection/EmailSubscribeSection";
import { useEffect, useState } from "react";
import newsEventsService, {
  INewsAndEvents,
} from "../../../services/news-events-service";
import { CanceledError } from "axios";
import NewsAndEventCard from "./NewsAndEventCard";
import { hideLoader, showLoader } from "../../../features/loader/loaderSlice";
import { useAppDispatch } from "../../../hooks/hooks";
import Heading from "../../../shared/Heading/Heading";

const NewsAndEvents = () => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState("");
  const [newsAndEvents, setNewsAndEvents] = useState<INewsAndEvents[]>([]);

  useEffect(() => {
    const { request, cancel } = newsEventsService.getAll<
      INewsAndEvents,
      { gofor: string }
    >({ gofor: "newseventslist" });

    dispatch(showLoader());

    request
      .then((res) => {
        dispatch(hideLoader());
        setNewsAndEvents(res.data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        dispatch(hideLoader());
        setError(err.message);
      });

    return () => cancel();
  }, []);

  return (
    <section className="container my-20">
      <Heading
        className="mb-5 md:mb-5 text-neutral-900 dark:text-neutral-50"
        desc={null}
      >
        News & Events
      </Heading>
      <div className="pt-5 pb-16 lg:pb-28">
        <div className="nc-SectionMagazine5">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
            {newsAndEvents.map((data) => (
              <NewsAndEventCard key={data.event_id} newsAndEvent={data} />
            ))}
          </div>
        </div>
      </div>

      {/* EMAIL SUBSCRIBE SECTION */}
      <section className="mt-40">
        <EmailSubscribeSection />
      </section>
    </section>
  );
};

export default NewsAndEvents;
