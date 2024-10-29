import Glide from "@glidejs/glide";
import Heading from "../../components/Heading/Heading";
import { FC, useId } from "react";
import { useEffect } from "react";
import clientSayMain from "../../images/clientSayMain.png";
import clientSay1 from "../../images/clientSay1.png";
import clientSay2 from "../../images/clientSay2.png";
import clientSay3 from "../../images/clientSay3.png";
import clientSay4 from "../../images/clientSay4.png";
import clientSay5 from "../../images/clientSay5.png";
import clientSay6 from "../../images/clientSay6.png";
import quotationImg from "../../images/quotation.png";
import quotationImg2 from "../../images/quotation2.png";
import { StarIcon } from "@heroicons/react/24/solid";
import { Testimonial } from "../../models/testimonial";

export interface SectionClientSayProps {
  clientImages?: string[];
  className?: string;
  clients?: Testimonial[];
}

const DEMO_DATA = [
  {
    id: 1,
    clientName: "Mr.Ragavan",
    profession: "IAS Officer",
    content:
      "Great quality products, affordable prices, fast and friendly delivery. I very recommend.",
  },
  {
    id: 2,
    clientName: "Ms.Lennie Swiffan",
    profession: "Enterpruner",
    content:
      "Great quality products, affordable prices, fast and friendly delivery. I very recommend.",
  },
  {
    id: 3,
    clientName: "Ms.Berta Emili",
    profession: "Software Consultant",
    content:
      "Great quality products, affordable prices, fast and friendly delivery. I very recommend.",
  },
];

const SectionClientSay: FC<SectionClientSayProps> = ({
  clientImages = [],
  clients = [],
  className = "",
}) => {
  const id = useId();
  const UNIQUE_CLASS = "glidejs" + id.replace(/:/g, "_");

  const [c1, c2, c3, c4, c5, c6, c7] = clientImages;

  useEffect(() => {
    // @ts-ignore
    const OPTIONS: Glide.Options = {
      perView: 1,
    };

    const slider = new Glide(`.${UNIQUE_CLASS}`, OPTIONS);
    slider.mount();
    return () => {
      slider.destroy();
    };
  }, [UNIQUE_CLASS]);

  const renderBg = () => {
    return (
      <div className="hidden md:block">
        <img
          className="absolute top-9 -left-20"
          src={c1 || clientSay1}
          alt=""
        />
        <img
          className="absolute bottom-[100px] right-full mr-40"
          src={c2 || clientSay2}
          alt=""
        />
        <img
          className="absolute top-full left-[140px]"
          src={c3 || clientSay3}
          alt=""
        />
        <img
          className="absolute -bottom-10 right-[140px]"
          src={c4 || clientSay4}
          alt=""
        />
        <img
          className="absolute left-full ml-32 bottom-[80px]"
          src={c5 || clientSay5}
          alt=""
        />
        <img
          className="absolute -right-10 top-10 "
          src={c6 || clientSay6}
          alt=""
        />
      </div>
    );
  };

  return (
    <div
      className={`nc-SectionClientSay relative flow-root ${className} `}
      data-nc-id="SectionClientSay"
    >
      <Heading
        desc="Trust towards Almaa is our"
        rightDescText="from our Customers"
        isCenter
      >
        Golden Words
      </Heading>
      <div className="relative md:mb-16 max-w-2xl mx-auto">
        {renderBg()}

        <img className="mx-auto" src={clientSayMain} alt="" />
        <div className={`mt-12 lg:mt-16 relative ${UNIQUE_CLASS}`}>
          <img
            className="opacity-50 md:opacity-100 absolute -mr-16 lg:mr-3 right-full top-1"
            src={quotationImg}
            alt=""
          />
          <img
            className="opacity-50 md:opacity-100 absolute -ml-16 lg:ml-3 left-full top-1"
            src={quotationImg2}
            alt=""
          />
          <div className="glide__track " data-glide-el="track">
            <ul className="glide__slides ">
              {clients.map((item) => (
                <li
                  key={item.testimonial_id}
                  className="glide__slide flex flex-col items-center text-center"
                >
                  <span className="block text-2xl">{item.testimonial}</span>
                  <span className="block mt-8 text-2xl font-semibold">
                    {item.author}
                  </span>
                  {/* <span className="block mt-1 text-lg text-slate-400 font-semibold">
                    {item.profession}
                  </span> */}
                  <div className="flex items-center space-x-0.5 mt-3.5 text-yellow-500">
                    <StarIcon className="w-6 h-6" />
                    <StarIcon className="w-6 h-6" />
                    <StarIcon className="w-6 h-6" />
                    <StarIcon className="w-6 h-6" />
                    <StarIcon className="w-6 h-6" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div
            className="mt-10 glide__bullets flex items-center justify-center"
            data-glide-el="controls[nav]"
          >
            {clients.map((item, index) => (
              <button
                key={item.testimonial_id}
                className="glide__bullet w-2 h-2 rounded-full bg-neutral-300 mx-1 focus:outline-none"
                data-glide-dir={`=${index}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionClientSay;
