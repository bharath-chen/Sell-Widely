import React, { ReactNode } from "react";

interface Props {
  bgColor?: string;
  badgeText: string;
  title: ReactNode;
  buttonText: string;
  buttonLink?: string;
  imageSrc: string;
  imageAlt: string;
}

const CategoryCard: React.FC<Props> = ({
  bgColor = "#E3DBD2",
  badgeText,
  title,
  buttonText,
  buttonLink = "#",
  imageSrc,
  imageAlt,
}) => {
  return (
    <div
      style={{ backgroundColor: bgColor }}
      className="relative w-full px-4 mb-6"
    >
      <div className="relative h-48 sm:h-40 flex flex-col justify-center p-5">
        <div>
          <h3 className="text-sm font-semibold text-white mt-2">
            <span dangerouslySetInnerHTML={{ __html: badgeText }}></span>
          </h3>
          <h2 className="text-xl font-bold text-black">{title}</h2>
        </div>
        <a href={buttonLink}>
          <button className="mt-4 bg-white text-black font-semibold py-2 px-2 w-32 text-sm rounded-none inline-block hover:bg-lime-950 hover:text-white">
            {buttonText}
          </button>
        </a>
        <img
          src={imageSrc}
          alt={imageAlt}
          className="absolute right-0 bottom-0 h-32 w-24 sm:h-36 sm:w-28 md:h-40 md:w-32 object-contain"
        />
      </div>
    </div>
  );
};

export default CategoryCard;
