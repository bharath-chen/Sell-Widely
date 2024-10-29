import React, { FC } from "react";
import Card12 from "./Card12";
import Card13 from "./Card13";
import { featuredImgs } from "../../contains/fakeData";

export interface SectionMagazine5Props {}

const SectionMagazine5: FC<SectionMagazine5Props> = () => {
  return (
    <div className="nc-SectionMagazine5">
      <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
        <Card12 />
        <div className="grid gap-6 md:gap-8">
          {featuredImgs.map((item, index) => (
            <Card13 key={index} src={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionMagazine5;
