import NcImage from "../../../shared/NcImage/NcImage";
import sindhanaiSiddharImg from "../../../assets/01-About/2- Founder/Who is Sindhanai Siddhar.jpg";
import SectionFounder, { People } from "../../Library/SectionFounder";
import EmailSubscribeSection from "../../../shared/EmailSubscribeSection/EmailSubscribeSection";
import SEO from "../../../shared/SEO/SEO";
import environmentConferenceImg from "../../../assets/01-About/2- Founder/Environment Conference.jpg";
import coimbatoreConferenceImg from "../../../assets/01-About/2- Founder/Coimbatore.jpg";
import malaysiaConferenceImg from "../../../assets/01-About/2- Founder/Malaysia.jpg";
import ilamvambadiConferenceImg from "../../../assets/01-About/2- Founder/Elavambadi.jpg";
import maduraiConferenceImg from "../../../assets/01-About/2- Founder/Madurai.jpg";
import velloreConferenceImg from "../../../assets/01-About/2- Founder/Vellore.jpg";
import chennaiConferenceImg from "../../../assets/01-About/2- Founder/Chennai Conference.jpg";
import siddharThiruvizhaImg from "../../../assets/01-About/2- Founder/Siddhar Thiruvizha.jpg";
import subscribeImg from "../../../assets/01-About/2- Founder/14-subscribe-CiUj4EyT.png";

const FOUNDER_DEMO: People[] = [
  {
    id: "1",
    name: `Environment awareness seminar for students on the occasion of World Ozone Day`,
    job: "(Chennai - 2024)",
    avatar: environmentConferenceImg,
  },
  {
    id: "2",
    name: `Luxury Travel Show - 1st Edition`,
    job: "(Coimbatore - 2024)",
    avatar: coimbatoreConferenceImg,
  },
  {
    id: "3",
    name: `National Occupational Skills Standard (NOSS)`,
    job: "(Cyberjaya, Malaysia - 2024)",
    avatar: malaysiaConferenceImg,
  },
  {
    id: "4",
    name: `Vela Siddha Wellness Village Resorts`,
    job: "(Ilamvambadi - 2024)",
    avatar: ilamvambadiConferenceImg,
  },
  {
    id: "5",
    name: `Madurai Conference`,
    job: "(Madurai - 2016)",
    avatar: maduraiConferenceImg,
  },
  {
    id: "6",
    name: `Vellore Conference`,
    job: "(Vellore - 2016)",
    avatar: velloreConferenceImg,
  },
  {
    id: "7",
    name: `Chennai Conference`,
    job: "(Chennai – 2018)",
    avatar: chennaiConferenceImg,
  },
  {
    id: "8",
    name: `Siddhar Thiruvizha`,
    job: "(Madurai - 2023)",
    avatar: siddharThiruvizhaImg,
  },
];

const Founder = () => {
  return (
    <>
      {/* WHO IS SINDHANAI SIDDHAR SECTION */}
      {/* <section className="container mb-40">
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
                <ul className="pl-5 leading-relaxed dashed list-inside leading-7 text-xl text-slate-500 dark:text-slate-400">
                  <li>2000 Years Tradition</li>
                  <li>100% Scientific</li>
                  <li>Solutions for 4448 diseases</li>
                  <li>Completely written in Tamil literature</li>
                </ul>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 sm:gap-5 md:gap-5 my-5">
                <Button className="bg-primary-900 text-white sm:text-white sm:bg-primary-900 sm:hover:bg-white sm:hover:text-primary-900 shadow-xl dark:bg-slate-200 dark:text-slate-900 mb-3 md:m-0">
                  Watch Video{" "}
                  <span className="ml-3 p-1 bg-green-400 rounded-full">
                    <svg
                      className="w-5 h-5 text-primary-900 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.6 5.2A1 1 0 0 0 7 6v12a1 1 0 0 0 1.6.8l8-6a1 1 0 0 0 0-1.6l-8-6Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </Button>
                <Button className="bg-primary-900 text-white sm:text-white sm:bg-primary-900 sm:hover:bg-white sm:hover:text-primary-900 shadow-xl dark:bg-slate-200 dark:text-slate-900">
                  Listen Audio
                  <span className="ml-3 p-1 bg-green-400 rounded-full">
                    <svg
                      className="w-5 h-5 text-primary-900 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13 6a2 2 0 0 0-3.3-1.5l-4 3.4H4a2 2 0 0 0-2 2V14c0 1.2.9 2 2 2h1.6l4.1 3.5A2 2 0 0 0 13 18V6Z" />
                      <path
                        fillRule="evenodd"
                        d="M14.8 7.7a1 1 0 0 1 1.4 0 6.1 6.1 0 0 1 0 8.6 1 1 0 0 1-1.3 0 1 1 0 0 1 0-1.5 4 4 0 0 0-.1-5.7 1 1 0 0 1 0-1.4Z"
                        clipRule="evenodd"
                      />
                      <path
                        fillRule="evenodd"
                        d="M17.7 4.8a1 1 0 0 1 1.4 0 10.2 10.2 0 0 1 0 14.4 1 1 0 0 1-1.4 0 1 1 0 0 1 0-1.4 8.2 8.2 0 0 0 0-11.6 1 1 0 0 1 0-1.4Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </Button>
              </div>
              <div className="pl-3">
                <h3 className="font-bold text-xl sm:text-3xl mt-2 sm:mt-2 !leading-[1.13] tracking-tight">
                  Almaa Velayudham
                </h3>
                <p className="text-slate-600 font-medium">Founder & Chairman</p>
                <p className="text-slate-600 font-medium">Almaa Groups</p>
              </div>
            </div>

            <NcImage
              containerClassName="relative block lg:absolute lg:left-0 lg:bottom-0 mt-10 lg:mt-0 max-w-xl lg:max-w-[calc(55%-40px)]"
              src={mdSectionImg}
              alt="Almaa Groups Founder"
            />
          </div>
        </div>
      </section> */}
      {/* SEO */}
      <SEO
        title="About Us - Unveiling the Siddha Wisdom: The Almaa Journey"
        description="Embark on the journey of Siddha wisdom with Almaa, your trusted source for holistic healing online."
        keywords="siddha doctor online, siddha medicine online, siddha products online"
        canonical="/about-us"
        robots="INDEX, FOLLOW"
      />
      {/* MISSION AND VISION SECTION */}
      <section className="container mt-40 mb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 place-content-center">
          <div>
            <h3 className="text-2xl xl:text-3xl font-semibold mb-4">
              Who is Sindhanai Siddhar?
              {/* Take Care of you <span className="text-slate-400">in a</span>{" "}
              <br />
              <span className="my-2 text-slate-400">Herbal Way ...</span> */}
            </h3>
            <p className="mt-1 text-slate-400 leading-7 tracking-wide text-sm md:text-md xl:text-lg text-justify">
              As the name indicates, Sindhanai Siddhar is a profound thinker and
              tamizh enthusiast. His profound understanding of the relationship
              between Body, Mind, Food, Lifestyle & diseases made him stand out
              in the health fraternity. This hardworking 53-year-old young man
              has single-handedly created a huge impact on the traditional
              medicines sector.  Sindhanai Siddhar's work focused on the
              fundamental aspects of nature, body and the application of the
              above to relieve people from their health issues. His
              groundbreaking research revolutionized our understanding of the
              Siddha system of medicine.
            </p>
          </div>
          <div>
            <NcImage
              className="w-full h-full object-contain lg:object-cover"
              src={sindhanaiSiddharImg}
              alt="about almaa"
            />
          </div>
        </div>

        {/* <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-10">
          {ABOUTS.map((about) => (
            <div className="p-4 bg-slate-100 rounded-lg" key={about.id}>
              <h4 className="text-lg font-semibold mb-1">{about.label}</h4>
              <p className="text-xs md:text-sm text-gray-400">
                {about.descripiton}
              </p>
            </div>
          ))}
        </div> */}
      </section>
      {/* NATURE AND SINDHANAI SIDDHAR SECTION */}
      <section className="container mb-40">
        <SectionFounder
          heading="	Nature & Sindhanai Siddhar"
          desc={`Health for All with Affordable Siddha Medicines" is the primary vision of our founder Sindhanai Siddhar Thiru.Velayudham avargal.`}
          founders={FOUNDER_DEMO}
        />
      </section>
      {/* MEET SINDHANAI SIDDHAR SECTION */}
      <section className="container mb-40"></section>
      {/* EMAIL SUBSCRIBE SECTION */}
      <EmailSubscribeSection />
    </>
  );
};

export default Founder;
