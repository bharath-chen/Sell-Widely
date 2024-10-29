import { SocialType } from "../../shared/SocialsShare/SocialsShare";
import { FC } from "react";
import facebook from "../../images/socials/facebook.svg";
import twitter from "../../images/socials/twitter.svg";
import telegram from "../../images/socials/telegram.svg";
import youtube from "../../images/socials/youtube.svg";

export interface SocialsList1Props {
  className?: string;
}

const socials: SocialType[] = [
  { name: "Facebook", icon: facebook, href: "#" },
  { name: "Youtube", icon: youtube, href: "#" },
  { name: "Telegram", icon: telegram, href: "#" },
  { name: "Twitter", icon: twitter, href: "#" },
];

const SocialsList1: FC<SocialsList1Props> = ({ className = "space-y-3" }) => {
  const renderItem = (item: SocialType, index: number) => {
    return (
      <div
        className="inline-block items-center text-2xl text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white leading-none space-x-2 group mx-2"
        key={index}
      >
        <div className="flex-shrink-0 w-5 ">
          <a href={item.href}>
            <img src={item.icon} alt="" />
          </a>
        </div>
        {/* <span className="hidden lg:block text-sm">{item.name}</span> */}
      </div>
    );
  };

  return (
    <div
      className={`nc-SocialsList1 flex flex-row ${className}`}
      data-nc-id="SocialsList1"
    >
      {socials.map(renderItem)}
    </div>
  );
};

export default SocialsList1;
