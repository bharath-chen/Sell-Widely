import Heading from "../../components/Heading/Heading";
import NcImage from "../../shared/NcImage/NcImage";
import AccordionInfo from "../../containers/ProductDetailPage/AccordionInfo";
import SectionFounder, { People } from "../Library/SectionFounder";
import EmailSubscribeSection from "../../shared/EmailSubscribeSection/EmailSubscribeSection";
import SEO from "../../shared/SEO/SEO";
import { WELLNESS_CENTER } from "../../data/WELLNESS_CENTER";
import wellnessCenterImg from "../../assets/03-Wellness Center/Wellness Center.jpg";
import SectionHero from "../../pages/Library/SectionHero";
import rightImg from "../../assets/06-Library/About.png";

interface WellnessCenterProps {
  className?: string;
}

const FOUNDER_DEMO: People[] = [
  {
    id: "1",
    name: `Niamh O'Shea`,
    job: "Co-founder and Chief Executive",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "4",
    name: `Danien Jame`,
    job: "Co-founder and Chief Executive",
    avatar:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "3",
    name: `Orla Dwyer`,
    job: "Co-founder, Chairman",
    avatar:
      "https://images.unsplash.com/photo-1560365163-3e8d64e762ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "2",
    name: `Dara Frazier`,
    job: "Co-Founder, Chief Strategy Officer",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "5",
    name: `Niamh O'Shea`,
    job: "Co-founder and Chief Executive",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "6",
    name: `Danien Jame`,
    job: "Co-founder and Chief Executive",
    avatar:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "7",
    name: `Orla Dwyer`,
    job: "Co-founder, Chairman",
    avatar:
      "https://images.unsplash.com/photo-1560365163-3e8d64e762ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "8",
    name: `Dara Frazier`,
    job: "Co-Founder, Chief Strategy Officer",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
  },
];

const WellnessCenter = ({ className = "" }: WellnessCenterProps) => {
  const renderHealthAndLifestyleCard = (item: {
    id: number;
    src: string;
    heading: string;
  }) => {
    return (
      <div className="grid grid-cols-1 gap-3 w-full">
        <div className="flex flex-col">
          <NcImage
            className="rounded-[30px] object-contain w-full h-auto"
            src={item.src}
            alt={item.heading}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="nc-PageHome2 relative overflow-hidden">
      <div
        className={`nc-PageAbout overflow-hidden relative ${className}`}
        data-nc-id="PageAbout"
      >
        {/*SEO*/}
        <SEO
          title="Vela Siddha Village Resort | Rejuvenation Resort & Therapy"
          description="Embrace the Serenity of Siddha Medicine and Modern Wellness | Wellness Treatments and Retreats | Luxurious Accommodations | Siddha Medical Treatments "
          keywords="vela siddha village resort, heritage village resort & spa, rejuvenation therapy, rejuvenation resort"
          canonical="/wellness-centre"
          robots="INDEX, FOLLOW"
        />

        {/* NATURE AND SINDHANAI SIDDHAR SECTION */}
        <section className="container mt-40 mb-40">
          <SectionHero
            rightImg={rightImg}
            heading="Vela Siddha Village Resorts "
            btnText=""
            subHeading="Epitome Of Preventive Health - Integrated Preventive Health care with the Amalgamation of Classical Siddha Principles, traditional architecture and One noble cause of “Health for All”"
          />

          {/* <SectionFounder
            heading="Vela Siddha Village Resorts - Epitome Of Preventive Health"
            desc="Integrated Preventive Health care with the Amalgamation of Classical Siddha Principles, traditional architecture and One noble cause of “Health for All” "
            // founders={FOUNDER_DEMO}
          /> */}
        </section>

        {/* MD SECTION */}
        <section className="container mb-40">
          <div className={`nc-SectionPromo2`}>
            <div className="relative flex flex-col justify-center lg:flex-row lg:justify-end bg-slate-50 dark:bg-slate-800 rounded-2xl sm:rounded-[40px] p-4 pb-0 sm:p-5 sm:pb-0 lg:p-24">
              <div className="lg:w-[55%] max-w-lg relative lg:top-14">
                <h2 className="text-2xl tracking-normal font-bold">
                  Sindhanai Sitthar Almaa Velayudham
                </h2>
                <div className="block mt-6">
                  <ul className="pl-5 leading-relaxed dashed list-inside leading-7 text-md text-slate-500 dark:text-slate-400">
                    <li>
                      Spanning over an area of 11 acres, with the Javadhu Malai
                      foothills as its natural boundary Vela Siddha Village
                      Resort is truly a Magnanimous Site for Health &
                      rejuvenation. The smell of the fresh air with the breeze
                      makes this place a divine destination for holistic health
                      Care.
                    </li>
                    <li>
                      Not a Treatment but a lifestyle - Health starts from
                      within ourselves. The ability to tackle our lethargy and
                      make ours is a trick that we can easily learn from here.
                      The Rejuvenation mind helps the body and the rejuvenation
                      of the body helps the mind. The relatability of the
                      Mind-body's health axis and the alignment are the prime
                      factors responsible for health & Vela Siddha Villag
                      Resorts Makes sure that it is taken care of.
                    </li>
                    <li>
                      Food thy Medicine; உணவே மருந்து - From Thiruvalluvar to
                      agathiyar and even the father of modern medicine
                      Hippocrates himself has agreed on to the Importance of
                      Quality and nutrient food for the sustenance of life. You
                      cannot feast but can essentially learn what to cook when
                      to cook & how to cook to be disease-free from Vela Siddha
                      village resorts.
                    </li>
                  </ul>
                </div>
              </div>

              <NcImage
                containerClassName="relative block lg:absolute lg:left-0 lg:bottom-10 mt-10 lg:mt-0 max-w-xl lg:max-w-[calc(50%-35px)]"
                src={wellnessCenterImg}
                alt="Almaa Groups Founder"
              />
            </div>
          </div>
        </section>

        {/* ======== BG GLASS ======== */}
        {/* <BgGlassmorphism /> */}

        {/* <div className="container py-16 lg:py-28 space-y-16 lg:space-y-28">
          <SectionHero
            rightImg={rightImg}
            heading="About Us."
            btnText=""
            subHeading="We’re impartial and independent, and every day we create distinctive, world-class programmes and content which inform, educate and entertain millions of people in the around the world."
          />
        </div> */}

        {/* HEALTHY AND LIFESTYLE VIDEOS SECTION */}
        {/* <section className="container mb-40">
          <AppSlider
            data={IMAGE_SCROLL_VIDEOS}
            className="glidejs_rb_ flow-root glide--swipeable glide--ltr glide--slider"
            glideClassName="glide__track"
            renderChildren={renderHealthAndLifestyleCard}
            glideOptions={{
              perView: 3,
              gap: 32,
              bound: true,
              breakpoints: {
                1280: {
                  perView: 3,
                },
                1024: {
                  gap: 20,
                  perView: 3,
                },
                768: {
                  gap: 20,
                  perView: 2,
                },
                640: {
                  gap: 20,
                  perView: 1,
                },
                500: {
                  gap: 20,
                  perView: 1,
                },
              },
            }}
            itemWrapperClassName="w-full"
          >
            <Heading
              className="mb-8"
              fontClass="text-2xl md:text-4xl font-bold"
              rightDescText="Videos"
              hasNextPrev
            >
              Health & Lifestyle
            </Heading>
          </AppSlider>
        </section> */}

        {/* FAQ */}
        <section className="container mb-40">
          <Heading className="mb-8" fontClass="text-2xl md:text-4xl font-bold">
            FAQ
          </Heading>
          <div className="grid grid-cols-1 gap-4 place-content-center">
            <div>
              <AccordionInfo data={WELLNESS_CENTER.faq} />
            </div>
          </div>
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

export default WellnessCenter;
