import { ReactNode, useState } from "react";

interface Props {
  children?: ReactNode | string;
  maxCharsAllowed?: number;
  className?: string;
}

const AppText = ({ children, className = "", maxCharsAllowed = 60 }: Props) => {
  const [trimmed, setTrimmed] = useState(true);

  let content = children;

  if (trimmed) {
    content =
      children.toLocaleString().length < maxCharsAllowed
        ? children
        : children.toLocaleString().slice(0, maxCharsAllowed) + "...";
  }

  const handleTrim = (e: React.MouseEvent) => {
    e.preventDefault();
    setTrimmed((prevTrim) => !prevTrim);
  };

  return (
    <>
      <p className={`${className}`}>{content}</p>
      {/* <button
        type="button"
        className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3.5 py-1 text-center me-2 mt-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
        onClick={handleTrim}
      >
        {trimmed ? "Show More" : "Show Less"}
      </button> */}
    </>
  );
};

export default AppText;
