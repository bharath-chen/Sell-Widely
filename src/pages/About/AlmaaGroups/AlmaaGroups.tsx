import { Helmet } from "react-helmet-async";
import BackgroundSection from "../../../components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "../../../components/BgGlassmorphism/BgGlassmorphism";
import SectionHero from "../../Library/SectionHero";
import rightImg from "../../../images/hero-right1.png";
import SectionSliderCategories from "../../../components/SectionSliderCategories/SectionSliderCategories";
import { ACCORDION_INFO, MEDICAL_CONSULTANTS } from "../../../data/home";
import SectionGridMoreExplore from "../../../components/SectionGridMoreExplore/SectionGridMoreExplore";
import Heading from "../../../components/Heading/Heading";
import NcImage from "../../../shared/NcImage/NcImage";
import AccordionInfo from "../../../containers/ProductDetailPage/AccordionInfo";
import whyAlmaaImg from "../../../assets/HOME PAGE/10-why-section.jpg";
import EmailSubscribeSection from "../../../shared/EmailSubscribeSection/EmailSubscribeSection";
import SEO from "../../../shared/SEO/SEO";
import { ALMAA_GROUP } from "./ALMAA_GROUP";
import almaHerbalImg from "../../../assets/01-About/1-Almaa Groups/Our Companies/Almaa Herbal.png";
import almaHospitalImg from "../../../assets/01-About/1-Almaa Groups/Our Companies/Almaa hospital.png";
import siddhaFoodTechImg from "../../../assets/01-About/1-Almaa Groups/Our Companies/Siddha Food Tech.png";
import almaaTherapyCenter from "../../../assets/01-About/1-Almaa Groups/Our Companies/Almaa Therapy Center.png";
import drsSiddhaImg from "../../../assets/01-About/1-Almaa Groups/Our Companies/DRS Siddha.png";
import velaSiddhaVillageResortImg from "../../../assets/01-About/1-Almaa Groups/Our Companies/Vela Siddha Village Resort.png";
import award1 from "../../../assets/01-About/1-Almaa Groups/Awards/YT Button.jpg";
import award2 from "../../../assets/01-About/1-Almaa Groups/Awards/Award 1.jpg";
import award3 from "../../../assets/01-About/1-Almaa Groups/Awards/Award 2.jpg";
import award4 from "../../../assets/01-About/1-Almaa Groups/Awards/Award 3.jpg";
import mdSectionImg from "../../../assets/HOME PAGE/5-md-section.png";
import subscribeImg from "../../../assets/01-About/1-Almaa Groups/14-subscribe-CiUj4EyT.png";

interface AlmaaGroupProps {
  className?: string;
}

const EXPLORE_SECTION_DATA = [
  {
    id: 1,
    name: "Almaa Herbal",
    desc: "",
    image: almaHerbalImg,
    svgBg: "",
    color: "bg-indigo-50",
    btnLabel: "Explore Now",
    quantityText: "",
    href: "/products",
  },
  {
    id: 2,
    name: "Almaa Hospital",
    desc: "",
    image: almaHospitalImg,
    svgBg: "",
    color: "bg-slate-100/80",
    btnLabel: "Explore Now",
    quantityText: "",
    href: "https://www.almahospital.com",
    asExternalUrl: true,
  },
  {
    id: 3,
    name: "Siddha Food Tech",
    desc: "",
    image: siddhaFoodTechImg,
    svgBg: "",
    color: "bg-violet-50",
    btnLabel: "Explore Now",
    quantityText: "",
    href: "https://www.siddhafoodstech.com",
    asExternalUrl: true,
  },
  {
    id: 4,
    name: "Almaa Therapy Center",
    desc: "",
    image: almaaTherapyCenter,
    svgBg: "",
    color: "bg-orange-50",
    btnLabel: "Explore Now",
    quantityText: "",
    href: "/wellness-center",
  },
  {
    id: 5,
    name: "DR'S Siddha",
    desc: "",
    image: drsSiddhaImg,
    svgBg: "",
    color: "bg-blue-50",
    btnLabel: "Explore Now",
    quantityText: "",
    href: "http://drsiddha.com/",
    asExternalUrl: true,
  },
  {
    id: 6,
    name: "Vela Siddha Village Resort",
    desc: "",
    image: velaSiddhaVillageResortImg,
    svgBg: "",
    color: "bg-orange-50",
    btnLabel: "Explore Now",
    quantityText: "",
    href: "https://www.velasiddhavillageresorts.com",
    asExternalUrl: true,
  },
];

const AWARDS_AND_ACCOLADES = [
  {
    name: "YouTube Silver Play Button",
    desc: "",
    img: award1,
    color: "",
  },
  {
    name: "Arogyam Health & Fitness.",
    desc: "",
    img: award2,
    color: "",
  },
  {
    name: "21st Century Millennium Award for Art & Culture.",
    desc: "",
    img: award3,
    color: "",
  },
  {
    name: "International Ayush Natural Award.",
    desc: "",
    img: award4,
    color: "",
  },
];

const AlmaaGroups = ({ className = "" }: AlmaaGroupProps) => {
  return (
    <div
      className={`nc-PageAbout overflow-hidden relative ${className}`}
      data-nc-id="PageAbout"
    >
      {/* SEO */}
      <SEO
        title="About Us - Unveiling the Siddha Wisdom: The Almaa Journey"
        description="Embark on the journey of Siddha wisdom with Almaa, your trusted source for holistic healing online."
        keywords="siddha doctor online, siddha medicine online, siddha products online"
        canonical="/about-us"
        robots="INDEX, FOLLOW"
      />

      <section className="container mt-20 mb-40">
        <div className={`nc-SectionPromo2`}>
          <div className="relative flex flex-col justify-center lg:flex-row lg:justify-end bg-slate-50 dark:bg-slate-800 rounded-2xl sm:rounded-[40px] p-4 pb-0 sm:p-5 sm:pb-0 lg:p-24">
            <div className="lg:w-[55%] max-w-lg relative lg:top-14">
              <h2 className="text-2xl tracking-normal font-medium">
                Almaa Groups
              </h2>
              <div className="block mt-6">
                <ul className="pl-5 leading-relaxed dashed list-inside leading-7 text-md text-slate-500 dark:text-slate-400">
                  <li>
                    Founded by the esteemed Naturalist & Tamizh entrepreneur
                    Thiru.Sindhanai Sitthar Velayudham avargal.{" "}
                  </li>
                  <li>
                    Almaa is a pioneer in the traditional medicine sector. The
                    prime motto behind the organisation is to provide quality &
                    affordable indigenous medicines to the Tamil community &
                    world. The need for quality Siddha medicines, user-friendly
                    traditional medicines & most importantly side effect-free
                    natural medicines has helped us grow immensely.{" "}
                  </li>
                  <li>
                    The quality of care, quality of medicines & quality of
                    service to the people have created trust for us among the
                    masses.
                  </li>
                  <li>
                    Word-of-mouth advertisements from people have given us a
                    huge boost to start our branches all over Tamilnadu and soon
                    all over India.
                  </li>
                  <li>
                    The richness of our cultural heritage throughout Asia gave
                    us a successful & firm l foot in Malaysia, Singapore and
                    other countries.
                  </li>
                  <li>
                    Through almaa groups, you can experience the harmony of
                    body, mind, and spirit with our range of wellness solutions
                    inspired by ancient traditions & delivered through modern
                    technology.
                  </li>
                  <li>
                    We have a range of services starting from the Outpatient
                    Department, Inpatient Treatment Facility, Daycare therapy
                    centres & 5-star category Wellness resorts.
                  </li>
                </ul>
              </div>
            </div>

            <NcImage
              containerClassName="relative block lg:absolute lg:left-0 lg:bottom-0 mt-10 lg:mt-0 max-w-xl lg:max-w-[calc(55%-40px)]"
              src={mdSectionImg}
              alt="Almaa Groups Founder"
            />
          </div>
        </div>
      </section>
      {/* AWARDS & ACCOLADES SECTION */}
      <section className="container mb-40">
        <SectionSliderCategories
          heading="Awards"
          rightDescText="& Accolades"
          data={AWARDS_AND_ACCOLADES}
        />
        {/* <ButtonSecondary className="focus:ring-2 focus:ring-offset-2 focus:ring-transparent tracking-tight ml-3 mt-6 md:text-2xl sm:px-14 border sm:py-5 sm:text-dark sm:bg-white-900 sm:hover:bg-white sm:hover:text-primary-900 border border-slate-300 dark:border-slate-700">
          Visit all Doctors
        </ButtonSecondary> */}
      </section>
      {/* OUR COMPANIES SECTIONS */}
      <section className="container mb-40">
        <div className="relative py-24 lg:py-32">
          <BackgroundSection className="bg-neutral-100/70 dark:bg-black/20" />
          <Heading
            className="mb-12 lg:mb-14 text-neutral-900 dark:text-neutral-50"
            fontClass="text-3xl md:text-4xl 2xl:text-5xl font-semibold"
            isCenter
            desc=""
            rightDescText=""
          >
            Our Companies
          </Heading>
          <SectionGridMoreExplore
            data={EXPLORE_SECTION_DATA}
            // className="bg-neutral-100/70 dark:bg-black/20 rounded-2xl px-16 py-20"
          />
        </div>
      </section>
      {/* WHY ALMAA SECTION */}
      <section className="container mb-40">
        <Heading
          className="mb-8"
          rightDescText="Medicine"
          fontClass="text-2xl md:text-4xl font-bold"
        >
          Why Siddha
        </Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 place-content-center">
          <div className="lg:pl-20">
            <NcImage
              className="h-auto object-contain"
              src={whyAlmaaImg}
              alt="Almaa Greatness"
            />
          </div>
          <div>
            <AccordionInfo data={ALMAA_GROUP.accordionData} />
          </div>
        </div>
      </section>
      {/* EMAIL SUBSCRIBE SECTION */}
      <EmailSubscribeSection />
    </div>
  );
};

export default AlmaaGroups;
