import ReactPlayer from "react-player/youtube";
import "./VideoPopup.css";
interface VideoPopupProps {
  url: string;
  isOpen: boolean;
  closeModal: () => void;
  backdropClick: () => void;
  width?: string;
  height?: string;
}

const VideoPopup = ({
  url,
  isOpen,
  width = "100%",
  height = "100%",
  closeModal,
  backdropClick,
}: VideoPopupProps) => {
  return (
    <>
      {isOpen && (
        <div
          id="backdrop"
          className="fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center bg-black bg-opacity-70 z-50"
          onClick={backdropClick}
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                className="absolute top-2 right-2 text-gray-600"
                onClick={closeModal}
              >
                <svg
                  className="w-6 h-6 text-gray-800 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <div className="player-wrapper">
                <ReactPlayer
                  url={url}
                  className="react-player"
                  width={width}
                  height={height}
                  playing
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoPopup;
