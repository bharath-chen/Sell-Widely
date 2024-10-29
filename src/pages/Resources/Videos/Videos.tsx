import Video from "./Video";
import EmailSubscribeSection from "../../../shared/EmailSubscribeSection/EmailSubscribeSection";
import useVideos from "../../../hooks/useVideos";
import Heading from "../../../shared/Heading/Heading";

const Videos = () => {
  const { videos } = useVideos();

  return (
    <div className="container my-20">
      <Heading
        className="mb-5 md:mb-5 text-neutral-900 dark:text-neutral-50"
        desc={null}
      >
        Videos
      </Heading>
      <div className="pt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {videos.map((video) => {
          return <Video key={video.video_id} video={video} />;
        })}
      </div>

      {/* EMAIL SUBSCRIBE SECTION */}
      <section className="mt-40">
        <EmailSubscribeSection />
      </section>
    </div>
  );
};

export default Videos;
