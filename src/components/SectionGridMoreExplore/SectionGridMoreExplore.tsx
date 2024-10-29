import CardCategory1 from "../../components/CardCategories/CardCategory1";
import CardCategory4 from "../../components/CardCategories/CardCategory4";
import React, { FC } from "react";
import explore1Svg from "../../images/collections/explore1.svg";
import explore2Svg from "../../images/collections/explore2.svg";
import explore3Svg from "../../images/collections/explore3.svg";
import explore4Svg from "../../images/collections/explore4.svg";
import explore5Svg from "../../images/collections/explore5.svg";
import explore6Svg from "../../images/collections/explore6.svg";
import explore7Svg from "../../images/collections/explore7.svg";
import explore8Svg from "../../images/collections/explore8.svg";
import explore9Svg from "../../images/collections/explore9.svg";
//
import explore1Png from "../../images/collections/explore1.png";
import explore2Png from "../../images/collections/explore2.png";
import explore3Png from "../../images/collections/explore3.png";
import explore4Png from "../../images/collections/explore4.png";
import explore5Png from "../../images/collections/explore5.png";
import explore6Png from "../../images/collections/explore6.png";
import explore7Png from "../../images/collections/explore7.png";
import explore8Png from "../../images/collections/explore8.png";
import explore9Png from "../../images/collections/explore9.png";
import CardCategory6 from "../../components/CardCategories/CardCategory6";

interface ExploreType {
  id: number;
  name: string;
  desc: string;
  image: string;
  svgBg: string;
  color?: string;
  btnLabel?: string;
  quantityText?: string;
  href?: string;
  asExternalUrl?: boolean;
}

export interface SectionGridMoreExploreProps {
  className?: string;
  gridClassName?: string;
  boxCard?: "box1" | "box4" | "box6";
  data?: ExploreType[];
  onCardClick?: (data: ExploreType) => void;
}

export const DEMO_MORE_EXPLORE_DATA = [
  {
    id: 1,
    name: "Backpack",
    desc: "Manufacturar",
    image: explore1Png,
    svgBg: explore1Svg,
    color: "bg-indigo-50",
  },
  {
    id: 2,
    name: "Shoes",
    desc: "Manufacturar",
    image: explore2Png,
    svgBg: explore2Svg,
    color: "bg-slate-100/80",
  },
  {
    id: 3,
    name: "Recycled Blanket",
    desc: "Manufacturar",
    image: explore3Png,
    svgBg: explore3Svg,
    color: "bg-violet-50",
  },
  {
    id: 4,
    name: "Cycling Shorts",
    desc: "Manufacturar",
    image: explore9Png,
    svgBg: explore9Svg,
    color: "bg-orange-50",
  },
  {
    id: 5,
    name: "Cycling Jersey",
    desc: "Manufacturar",
    image: explore5Png,
    svgBg: explore5Svg,
    color: "bg-blue-50",
  },
  {
    id: 6,
    name: "Car Coat",
    desc: "Manufacturar",
    image: explore6Png,
    svgBg: explore6Svg,
    color: "bg-orange-50",
  },
  {
    id: 7,
    name: "Sunglasses",
    desc: "Manufacturar",
    image: explore7Png,
    svgBg: explore7Svg,
    color: "bg-stone-100",
  },
  {
    id: 8,
    name: "kid hats",
    desc: "Manufacturar",
    image: explore8Png,
    svgBg: explore8Svg,
    color: "bg-blue-50",
  },
  {
    id: 9,
    name: "Wool Jacket",
    desc: "Manufacturar",
    image: explore4Png,
    svgBg: explore4Svg,
    color: "bg-slate-100/80",
  },
];

const SectionGridMoreExplore: FC<SectionGridMoreExploreProps> = ({
  className = "",
  boxCard = "box4",
  gridClassName = "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
  data = DEMO_MORE_EXPLORE_DATA.filter((_, i) => i < 6),
  onCardClick,
}) => {
  const [tabActive, setTabActive] = React.useState("Man");

  const renderCard = (item: ExploreType) => {
    switch (boxCard) {
      case "box1":
        return (
          <CardCategory1
            key={item.id}
            name={item.name}
            desc={item.desc}
            featuredImage={item.image}
          />
        );

      case "box4":
        return (
          <CardCategory4
            name={item.name}
            desc={item.desc}
            bgSVG={item.svgBg}
            featuredImage={item.image}
            key={item.id}
            color={item.color}
            btnLabel={item.btnLabel}
            quantityText={item.quantityText}
            href={item.href}
            asExternalUrl={item?.asExternalUrl}
          />
        );
      case "box6":
        return (
          <CardCategory6
            name={item.name}
            desc={item.desc}
            bgSVG={item.svgBg}
            featuredImage={item.image}
            key={item.id}
            color={item.color}
          />
        );

      default:
        return (
          <CardCategory4
            name={item.name}
            desc={item.desc}
            bgSVG={item.svgBg}
            featuredImage={item.image}
            key={item.id}
            color={item.color}
          />
        );
    }
  };

  return (
    <div
      className={`nc-SectionGridMoreExplore relative ${className}`}
      data-nc-id="SectionGridMoreExplore"
    >
      <div className={`grid gap-4 md:gap-7 ${gridClassName}`}>
        {data.map((item) => (
          <div key={item.id} onClick={() => onCardClick(item)}>
            {renderCard(item)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionGridMoreExplore;
