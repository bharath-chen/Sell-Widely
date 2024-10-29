import React from "react";
import Audio from "./Audio";

interface AudioPlayerPopupProps {
  audioUrl: string;
  onClose: () => void;
}

const AudioPlayerPopup: React.FC<AudioPlayerPopupProps> = ({
  audioUrl,
  onClose,
}) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg shadow-lg relative w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 focus:outline-none"
          style={{ zIndex: 20 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <div className="mt-8">
          <Audio audioUrl={audioUrl} controls />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayerPopup;
