import { useState } from "react";
import ButtonPrimary from "../../../shared/Button/ButtonPrimary";
import "../OurBranches/OurBranches.css";

interface Concept {
  image: string;
  title: string;
  description: string;
  contactInfo: string;
}

interface ConceptDetailPopupProps {
  concept: Concept;
  onClose: () => void;
}

const ConceptDetailPopup = ({ concept, onClose }: ConceptDetailPopupProps) => {
  const handleOutsideClick = (event) => {
    if (event.target.classList.contains("popup-overlay")) {
      onClose();
    }
  };

  const [enteredEmail, setEnteredEmail] = useState<string>("");
  const [enteredMessage, setEnteredMessage] = useState<string>("");

  const clearForm = () => {
    setEnteredEmail("");
    setEnteredMessage("");
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center popup-overlay z-[999]"
      onClick={handleOutsideClick}
    >
      <div className="bg-white h-[700px] rounded-lg overflow-y-auto max-w-md w-full m-4 sm:m-8 lg:m-12 relative">
        <button
          className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800 focus:outline-none"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="p-8">
          <img
            src={concept.image}
            alt="Concept"
            className="w-full h-auto mb-4 rounded-lg"
          />
          <h2 className="text-2xl font-bold text-center mb-4">
            {concept.title}
          </h2>
          <p className="text-gray-700 mb-6">{concept.description}</p>
          <form className="mb-6">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={enteredEmail}
                onChange={(e) => setEnteredEmail(e.target.value)}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                value={enteredMessage}
                onChange={(e) => setEnteredMessage(e.target.value)}
                rows={4}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <ButtonPrimary type="submit">Enquire Now</ButtonPrimary>
              <ButtonPrimary type="button" onClick={clearForm} className="ml-2">
                Clear
              </ButtonPrimary>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConceptDetailPopup;
