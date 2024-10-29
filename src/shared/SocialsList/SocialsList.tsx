import { FaFacebookSquare } from "react-icons/fa";
import {
  FaSquareInstagram,
  FaSquareYoutube,
  FaSquareXTwitter,
} from "react-icons/fa6";
import { SocialType } from "../../shared/SocialsShare/SocialsShare";
import { FC } from "react";

export interface SocialsListProps {
  className?: string;
  itemClass?: string;
  socials?: {
    name: string;
    icon: JSX.Element;
    href?: string;
  }[];
  onClick?: ({ name, icon }: { name: string; icon: JSX.Element }) => void;
}

const socialsDemo: {
  name: string;
  icon: JSX.Element;
  href: string;
}[] = [
  {
    name: "Facebook",
    icon: <FaFacebookSquare color="#1877F2" size={30} />,
    href: "https://www.facebook.com/almaherbal",
  },
  {
    name: "Instagram",
    icon: <FaSquareInstagram color="#E1306C" size={30} />,
    href: "https://www.instagram.com/almaaherbalnature/",
  },
  {
    name: "Youtube",
    icon: <FaSquareYoutube color="#FF0000" size={30} />,
    href: "https://www.youtube.com/@almaaherbalnature",
  },
  {
    name: "X",
    icon: <FaSquareXTwitter color="#000000" size={30} />,
    href: "https://x.com/almaaherbal_",
  },
];

const SocialsList: FC<SocialsListProps> = ({
  className = "",
  itemClass = "block w-8 h-8",
  socials = socialsDemo,
  onClick,
}) => {
  return (
    <nav
      className={`nc-SocialsList flex space-x-3 text-2xl text-neutral-6000 dark:text-neutral-300 cursor-pointer ${className}`}
      data-nc-id="SocialsList"
    >
      {socials.map((item, i) => {
        if (item.href) {
          return (
            <a
              key={i}
              className={`${itemClass}`}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              title={item.name}
            >
              {item.icon}
            </a>
          );
        }

        return (
          <a
            key={i}
            className={`${itemClass}`}
            onClick={() => onClick(item)}
            title={item.name}
          >
            {item.icon}
          </a>
        );
      })}
    </nav>
  );
};

export default SocialsList;
