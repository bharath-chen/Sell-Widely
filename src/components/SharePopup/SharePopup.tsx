import React, { useState } from "react";
import styles from "./SharePopup.module.css";
import SocialsList from "../../shared/SocialsList/SocialsList";
import { FaFacebookSquare, FaWhatsappSquare } from "react-icons/fa";
import {
  FaSquareInstagram,
  FaSquareYoutube,
  FaSquareXTwitter,
} from "react-icons/fa6";

interface SharePopupProps {
  onClose: () => void;
}

const socialIcons = [
  {
    name: "Facebook",
    icon: <FaFacebookSquare color="#1877F2" size={30} />,
  },
  //   {
  //     name: "Instagram",
  //     icon: <FaSquareInstagram color="#E1306C" size={30} />,
  //   },
  //   {
  //     name: "Youtube",
  //     icon: <FaSquareYoutube color="#FF0000" size={30} />,
  //   },
  {
    name: "X",
    icon: <FaSquareXTwitter color="#000000" size={30} />,
  },
  {
    name: "WhatsApp",
    icon: <FaWhatsappSquare color="#25D366" size={30} />,
  },
];

const SharePopup: React.FC<SharePopupProps> = ({ onClose }) => {
  const [notificationVisible, setNotificationVisible] = useState(false);
  const pageUrl = window.location.href;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(pageUrl).then(() => {
      setNotificationVisible(true);
      setTimeout(() => {
        setNotificationVisible(false);
      }, 2000);
    });
  };

  const handleShare = (platform: string) => {
    let shareUrl = "";
    const text = "Check out this page!";

    console.log(platform);

    switch (platform) {
      case "Facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          pageUrl
        )}`;
        break;
      case "X":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          pageUrl
        )}&text=${encodeURIComponent(text)}`;
        break;
      //   case "Instagram":
      //     shareUrl = `https://instagram.com/sharer/sharer.php?u=${encodeURIComponent(
      //       pageUrl
      //     )}`;
      //     break;
      //   case "Youtube":
      //     shareUrl = `https://youtube.com`;
      //     break;
      case "WhatsApp":
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
          text
        )}`;
        break;
      default:
        break;
    }

    if (shareUrl) {
      console.log(shareUrl);
      window.open(shareUrl, "_blank");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative">
        <button onClick={onClose} className="absolute top-2 right-2">
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
        <h2 className="text-lg font-semibold mb-4">Share</h2>
        <div
          className={`${styles.notification} ${
            notificationVisible ? styles.fadeIn : styles.fadeOut
          }`}
        >
          Copied!
        </div>
        <div className="flex space-x-4">
          <svg
            onClick={handleCopyLink}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-7 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
            />
          </svg>

          <SocialsList
            socials={socialIcons}
            onClick={({ name }) => handleShare(name)}
          />
        </div>
      </div>
    </div>
  );
};

export default SharePopup;
