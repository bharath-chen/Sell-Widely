import { useState } from "react";
import AudioPlayerPopup from "../../components/Audio/AudioPlayerPopup";
import SharePopup from "../../components/SharePopup/SharePopup"; // Adjust the import path accordingly

interface Props {
  audioUrl?: string;
  onClick?: (liked: boolean) => void;
}

const LikeSaveBtns = ({ audioUrl = "", onClick }: Props) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);

  const handleLike = () => {
    const likeState = !isLiked;
    setIsLiked(likeState);
    onClick && onClick(likeState);
  };

  const handleAudioClick = () => {
    setShowAudioPlayer(true); // Show the audio popup
  };

  const handleCloseAudioPlayer = () => {
    setShowAudioPlayer(false); // Close the audio popup
  };

  const handleShareClick = () => {
    setShowSharePopup(true); // Show the share popup
  };

  const handleCloseSharePopup = () => {
    setShowSharePopup(false); // Close the share popup
  };

  return (
    <div className="flow-root">
      <div className="flex text-neutral-700 dark:text-neutral-300 text-sm -mx-3 -my-1.5">
        <div onClick={handleAudioClick}>
          <span className="py-1.5 px-3 flex rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
              />
            </svg>
            <span className="hidden sm:block ml-2">Audio</span>
          </span>
        </div>
        <span
          className="py-1.5 px-3 flex rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
          onClick={handleShareClick} // Attach share functionality
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
          <span className="hidden sm:block ml-2">Share</span>
        </span>
        <span
          className={`py-1.5 px-3 flex rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer `}
          onClick={handleLike}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 ${isLiked ? "text-red-500" : ""}`}
            fill={isLiked ? "currentColor" : `none`}
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <span className="hidden sm:block ml-2">Save</span>
        </span>
      </div>

      {/* Conditionally render audio popup */}
      {showAudioPlayer && (
        <AudioPlayerPopup
          audioUrl={audioUrl}
          onClose={handleCloseAudioPlayer}
        />
      )}

      {/* Conditionally render share popup */}
      {showSharePopup && <SharePopup onClose={handleCloseSharePopup} />}
    </div>
  );
};

export default LikeSaveBtns;
