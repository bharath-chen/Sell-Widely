import rightImg from "../../assets/06-Library/About.png";
import { FC } from "react";
import { Helmet } from "react-helmet-async";
import BgGlassmorphism from "../../components/BgGlassmorphism/BgGlassmorphism";
import SectionHero from "./SectionHero";
import Heading from "../../components/Heading/Heading";
import CardCategory3 from "../../components/CardCategories/CardCategory3";
import NcImage from "../../shared/NcImage/NcImage";
import uyirvazhiImg from "../../assets/06-Library/Uyirvazhi.png";
import SectionSliderCategories from "../../components/SectionSliderCategories/SectionSliderCategories";
import EmailSubscribeSection from "../../shared/EmailSubscribeSection/EmailSubscribeSection";
import unavumVazhvumImg from "../../assets/06-Library/Our Books/Unavum Vazhvum.jpg";
import keeraiIlaUnavuImg from "../../assets/06-Library/Our Books/Keerai illa Unavu.jpg";
import pillaiPeruImg from "../../assets/06-Library/Our CDs/Pillai Peru.jpg";
import sugarImg from "../../assets/06-Library/Our CDs/Sugar.jpg";
import unavaeUyirImg from "../../assets/06-Library/Our CDs/Unave Uyir.jpg";
import whyAlmaaImg from "../../assets/HOME PAGE/10-why-section.jpg";
import AccordionInfo from "../../containers/ProductDetailPage/AccordionInfo";

export interface PageAboutProps {
  className?: string;
}

const OUR_BOOKS = [
  {
    name: "Unavum Vazhvum",
    desc: "",
    img: unavumVazhvumImg,
    color: "",
  },
  {
    name: "Keerai illa Unavu",
    desc: "",
    img: keeraiIlaUnavuImg,
    color: "",
  },
];

const OUR_CDS = [
  {
    name: "Pillai Peru",
    desc: "",
    img: pillaiPeruImg,
    color: "",
  },
  {
    name: "Nlamudan Vaazha",
    desc: "",
    img: sugarImg,
    color: "",
  },
  {
    name: "Unave Uyir",
    desc: "",
    img: unavaeUyirImg,
    color: "",
  },
];

const OUR_LIBRARY = [
  {
    name: "Featured Articles",
    content: `In-depth essays on herbal medicine &amp; health. Renowned Siddha Doctors Featured
artilces o every aspect of health`,
  },
  {
    name: "Editorials",
    content: `Sindhanai Siththar Velayudhams special perspective on health & well being`,
  },
  {
    name: "News and Updates",
    content: `Current events or trends within the health&amp; siddha department`,
  },
];

const Library: FC<PageAboutProps> = ({ className = "" }) => {
  const renderCategoryCard = (item: {
    name: string;
    desc: string;
    featuredImage: string;
    color: string;
  }) => {
    return (
      <CardCategory3
        name={item.name}
        desc={item.desc}
        featuredImage={item.featuredImage}
        color={item.color}
        btnText="View Products"
        href="/products"
      />
    );
  };

  return (
    <div
      className={`nc-PageAbout overflow-hidden relative ${className}`}
      data-nc-id="PageAbout"
    >
      <Helmet>
        <title>Almaa</title>
      </Helmet>

      {/* ======== BG GLASS ======== */}
      <BgGlassmorphism />

      <div className="container py-16 lg:py-28 space-y-16 lg:space-y-28">
        <SectionHero
          rightImg={rightImg}
          heading="Library"
          btnText=""
          subHeading="Welcome to our comprehensive library, where we bring together a wealth of knowledge on holistic
health practices, traditional wisdom, and modern trends. Explore Siddha therapies, herbal remedies,
and medicinal innovations that merge ancient traditions with contemporary advancements. Stay
informed with the latest health news and emerging trends in wellness to make well-rounded,
informed decisions for your well-being.
"
        />
        {/* WHY SHOULD YOU BE WITH ALMA SECTION */}
        <section className="mb-40">
          <Heading
            className="mb-8"
            rightDescText=""
            fontClass="text-2xl md:text-4xl font-bold"
          >
            Our Resources
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
              <AccordionInfo data={OUR_LIBRARY} />
            </div>
          </div>
        </section>
      </div>

      {/* UYIRVAZHI MONTHLY MAGAZINE SECTION */}
      <section className="container mb-40">
        <div className={`nc-SectionPromo2`}>
          <div className="relative flex flex-col justify-center lg:flex-row lg:justify-end bg-slate-50 dark:bg-slate-800 rounded-2xl sm:rounded-[40px] p-4 pb-0 sm:p-5 sm:pb-0 lg:p-24">
            <div className="lg:w-[55%] max-w-lg relative lg:top-14">
              <h3 className="font-semibold text-3xl sm:text-4xl xl:text-5xl 2xl:text-6xl mt-2 sm:mt-2 !leading-[1.13] tracking-tight">
                Uyirvazhi
              </h3>
              <div className="block mt-6">
                <ul className="pl-5 leading-relaxed dashed list-inside leading-7 text-md text-slate-500 dark:text-slate-400">
                  <li>
                    Welcome to Uyrivazhi, your trusted source for holistic
                    health and wellness! Our magazine is dedicated to empowering
                    you with the latest insights on herbal remedies, natural
                    healing, and balanced living. Featuring expert advice from
                    seasoned doctors and health professionals, we aim to educate
                    and inspire readers to embrace a healthier lifestyle. From
                    ancient medicinal practices to cutting-edge wellness trends,
                    we bring you well-researched articles, practical tips, and
                    personal stories to support your journey toward optimal
                    well-being. Stay informed, stay healthy, and discover the
                    power of nature’s wisdom
                  </li>
                  <li>Yearly Subscription : Rs. 360</li>
                  <li>5 year Subscription : Rs. 1500</li>
                  <li>Life Time Subscription : Rs. 3000</li>
                </ul>
              </div>
            </div>

            <NcImage
              containerClassName="relative block lg:absolute lg:left-0 lg:bottom-0 mt-10 lg:mt-0 max-w-xl lg:max-w-[calc(50%-40px)]"
              src={uyirvazhiImg}
              alt="Almaa Groups Founder"
            />
          </div>
        </div>
      </section>

      {/* OUR BOOKS SECTION */}
      <section className="container mb-40">
        <SectionSliderCategories heading="Our Books" data={OUR_BOOKS} />
      </section>

      {/* OUR CDS SECTION */}
      <section className="container mb-40">
        <SectionSliderCategories heading="Our CDS" data={OUR_CDS} />
      </section>

      {/* EMAIL SUBSCRIBE SECTION */}
      <section className="mt-40">
        <EmailSubscribeSection />
      </section>
    </div>
  );
};

export default Library;
