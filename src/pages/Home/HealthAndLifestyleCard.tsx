import { useState } from "react";
import ReactPlayer from "react-player";
import { IVideo } from "../../services/video-service";
import NcImage from "../../shared/NcImage/NcImage";
import { FaPlay } from "react-icons/fa";

interface Props {
  video: IVideo;
}

const HealthAndLifestyleCard = ({ video }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="grid grid-cols-1 gap-3 w-full">
      <div className="flex flex-col bg-white shadow-lg rounded-lg p-4 h-full min-h-[300px]">
        <div className="relative w-full pb-[56.25%]">
          {isPlaying ? (
            <ReactPlayer
              url={video.video_url}
              playing={isPlaying}
              controls
              width="100%"
              height="100%"
              className="absolute top-0 left-0 rounded-[30px]"
            />
          ) : (
            <>
              <NcImage
                className="absolute top-0 left-0 rounded-[30px] object-cover w-full h-full"
                src={video.thumbnail_url}
                alt={video.title}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  className="bg-black bg-opacity-50 text-white rounded-full p-4"
                  aria-label="Play video"
                  onClick={() => setIsPlaying(true)}
                >
                  <FaPlay className="w-6 h-6" />
                </button>
              </div>
            </>
          )}
        </div>

        <div className="flex-grow-0 mt-3">
          <h2 className="px-2 w-full font-semibold text-[17px] line-clamp-2">
            {video.title}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default HealthAndLifestyleCard;
