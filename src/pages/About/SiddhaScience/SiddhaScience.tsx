import { ABOUTS } from "../../../data/home";
import siddhargalImg from "../../../assets/01-About/5-Siddha Science/Siddhargal & Siddha medicine.png";
import whyAlmaaImg from "../../../assets/HOME PAGE/10-why-section.jpg";
import NcImage from "../../../shared/NcImage/NcImage";
import siddhaHistoryImg from "../../../assets/01-About/5-Siddha Science/History of Siddha.jpg";
import Heading from "../../../components/Heading/Heading";
import AccordionInfo from "../../../containers/ProductDetailPage/AccordionInfo";
import EmailSubscribeSection from "../../../shared/EmailSubscribeSection/EmailSubscribeSection";
import { SIDDHA_SCIENCE } from "./SIDDHA_SCIENCE";

const SiddhaScience = () => {
  return (
    <>
      {/* HISTORY OF SIDDHA SECTION */}
      <section className="container mt-10 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 place-content-center">
          <div>
            <h2 className="text-2xl xl:text-3xl font-semibold">
              History of Siddha - Oldest Known Medical Practice
            </h2>
            <p className="mt-1 text-slate-400 leading-7 tracking-wide text-sm md:text-md xl:text-lg text-justify">
              Siddha medicine is as old as the Tamil language, dating back to
              12,000 years B.C. to the Lemuria continent, south of the
              Kanyakumari district. It is a part of the lifestyle followed by
              the most advanced civilization - the Tamizh people. It is a simple
              yet complex strategy that engages life with the surrounding
              atmosphere extending up to the effects of planets on the physical
              body.  The history that is available in writings from the 18
              siddhargal lineages almost contributes to less than 5% of the
              total history of the Siddha medicine system. Siddha Has come a
              long way from Lemuria to today where we can get Siddha medicine
              online from the comfort of our home. Siddha doctors Available
              online can diagnose and prescribe from remote places to every nook
              & corner of the country.  Concepts like Kaya-Kalpam, Varmam, Vaasi
              & Muppu are not only unique to Siddha but curious idea pages for
              the modern medical system.
            </p>
          </div>
          <div>
            <NcImage
              className="w-full h-full object-contain lg:object-cover rounded-xl"
              src={siddhaHistoryImg}
              alt="about almaa"
            />
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-10">
          {ABOUTS.map((about) => (
            <div className="p-4 bg-slate-100 rounded-lg" key={about.id}>
              <h4 className="text-lg font-semibold mb-1">{about.label}</h4>
              <p className="text-xs md:text-sm text-gray-400">
                {about.descripiton}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SIDDHARGAL SECTION */}
      <section className="container mb-40">
        <div className={`nc-SectionPromo2`}>
          <div className="relative flex flex-col justify-center lg:flex-row lg:justify-end bg-slate-50 dark:bg-slate-800 rounded-2xl sm:rounded-[40px] p-4 pb-0 sm:p-5 sm:pb-0 lg:p-24">
            <div className="lg:w-[55%] max-w-lg relative lg:top-14">
              <h2 className="text-2xl tracking-normal font-medium">
                Let's Understand
              </h2>
              <h3 className="font-semibold text-3xl sm:text-4xl xl:text-5xl 2xl:text-6xl mt-2 sm:mt-2 !leading-[1.13] tracking-tight">
                Siddhargal &<br />
                Siddha Medicine
              </h3>
              <div className="block mt-6">
                <h4 className="font-semibold mb-3 text-2xl sm:text-2xl mt-2 sm:mt-2 !leading-[1.13] tracking-tight">
                  Siddhargal
                </h4>
                <ul className="pl-5 leading-relaxed dashed list-inside leading-7 text-md text-slate-500 dark:text-slate-400">
                  <li>
                    The term Siddhar often misunderstood or mostly
                    misinterpreted, actually means one who perfected the art of
                    attaining enlightenment. There are a total of 18 siddhargal
                    who are prime devotees of the supreme body.
                  </li>
                  <li>
                    The one who attained siddhi through proper life and who will
                    take rebirth is the ultimate goal one can reach and the 18
                    siddhars have told us the ways to achieve this state and
                    have shown us the path by doing it themselves.{" "}
                  </li>
                  <li>
                    Palm Leaves, copper plate, stone inscriptions, and the
                    knowledge transfer through gurukulams by the siddhars are
                    the primary sources of existence of the most advanced
                    ethnicity - the Tamil people through which we are today
                    enjoying the fruits of the trees planted by our ancestors
                    thousands of year ago!..
                  </li>
                </ul>
              </div>
            </div>

            <NcImage
              containerClassName="relative block lg:absolute lg:left-0 lg:bottom-10 mt-10 lg:mt-0 max-w-xl lg:max-w-[calc(50%-40px)]"
              src={siddhargalImg}
              alt="Almaa Groups Founder"
            />
          </div>
        </div>
      </section>

      {/* WHY SIDDHA MEDICINE SECTION */}
      <section className="container mb-40">
        <Heading
          className="mb-8"
          rightDescText="Medicine?"
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
            <AccordionInfo data={SIDDHA_SCIENCE.accordionData} />
          </div>
        </div>
      </section>

      {/* EMAIL SUBSCRIBE SECTION */}
      <section className="container">
        <EmailSubscribeSection />
      </section>
    </>
  );
};

export default SiddhaScience;
