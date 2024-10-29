import SectionHero from "../Library/SectionHero";
import rightImg from "../../assets/04-Production Unit/About Us.png";
import SectionSliderCategories from "../../components/SectionSliderCategories/SectionSliderCategories";
import EmailSubscribeSection from "../../shared/EmailSubscribeSection/EmailSubscribeSection";
import SEO from "../../shared/SEO/SEO";
import fssaiCertifiedImg from "../../assets/04-Production Unit/Certificate 2.jpg";
import gmpCertifiedImg from "../../assets/04-Production Unit/Certificate 1.jpg";
import twentyFirstCenturyMillenniumAwardImg from "../../assets/04-Production Unit/Award 1.jpg";
import internationalAyushNaturalAwardImg from "../../assets/04-Production Unit/Award 2.jpg";
import AccordionInfo from "../../containers/ProductDetailPage/AccordionInfo";

interface ProductionUnitProps {
  className?: string;
}

const PRODUCTION_UNIT_ACCORDION_DATA = [
  {
    id: "pu1",
    name: "Raw Drug Quality Analysis",
    content:
      "Each & every raw drug is procured from cruelty-free sources, non-GMO sources & farmers. Each & every Raw drug is carefully handpicked and screened by our expert team before starting the process of manufacturing. We are one of the best Siddha medicine manufacturers in Tamilnadu.",
  },
  {
    id: "pu2",
    name: "Good Manufacturing Process",
    content:
      "Our production unit is GMP-certified under State Licensing and strictly follows the guidelines prescribed by the government under GMP.",
  },
  {
    id: "pu3",
    name: "Packaging and Labeling",
    content:
      "We use eco-friendly medical-grade packaging materials and ensure that all labels provide clear, accurate information about the supplement's ingredients, benefits, and usage instructions. As the best herbal supplement manufacturer, we tend to provide full information about our products with transparency.",
  },
];

const AWARDS_AND_CERTIFICATIONS = [
  {
    name: "fssai Certified Company",
    desc: "",
    img: fssaiCertifiedImg,
    color: "",
  },
  {
    name: "GMP Certified Company.",
    desc: "",
    img: gmpCertifiedImg,
    color: "",
  },
  {
    name: "21st Century Millennium Award for Art & Culture.",
    desc: "",
    img: twentyFirstCenturyMillenniumAwardImg,
    color: "",
  },
  {
    name: "International Ayush Natural Award.",
    desc: "",
    img: internationalAyushNaturalAwardImg,
    color: "",
  },
];

const ProductionUnit = ({ className = "" }: ProductionUnitProps) => {
  return (
    <div className="nc-PageHome2 relative overflow-hidden">
      <div
        className={`nc-PageAbout overflow-hidden relative ${className}`}
        data-nc-id="PageAbout"
      >
        {/* SEO */}
        <SEO
          title="Best Siddha Medicine Manufacturers | Siddha Foods Tech & Almaa Herbal Nature"
          description=".With a focus on purity, sustainability, and innovation, we offer a wide range of herbal solutions that cater to various health and wellness needs. Trust Nature’s Essence for reliable and effective herbal products."
          keywords="best siddha medicine manufacturers in tamilnadu, siddha medicine manufacturers in tamilnadu, siddha medicine manufacturers, siddha drug manufacturers, best herbal supplement manufacturers, natural medicine manufacturers"
          canonical="/siddha-medicine-manufacturers"
          robots="INDEX, FOLLOW"
        />

        {/* ======== BG GLASS ======== */}

        <div className="container py-16 lg:py-28 space-y-16 lg:space-y-28">
          <SectionHero
            rightImg={rightImg}
            heading="Production Unit"
            btnText=""
            subHeading="
Our production unit is equipped with state-of-the-art manufacturing tools and large-scale and eco-friendly methodologies. The Production unit is built to preserve the traditional manufacturing process and to yield maximum output at the same time."
          />
          <AccordionInfo data={PRODUCTION_UNIT_ACCORDION_DATA} />
        </div>

        {/* AWARDS AND CERTIFICATIONS SECTION */}
        <section className="container mb-40">
          <SectionSliderCategories
            heading="Awards"
            rightDescText="& Certfications"
            data={AWARDS_AND_CERTIFICATIONS}
          />
        </section>

        {/* ENQUIRE NOW */}
        {/* <section className="container mb-40">
          <SectionPromo2 />
        </section> */}

        {/* EMAIL SUBSCRIBE SECTION */}
        <EmailSubscribeSection />
      </div>
    </div>
  );
};

export default ProductionUnit;
