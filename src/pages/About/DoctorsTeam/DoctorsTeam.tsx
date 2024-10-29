import { Helmet } from "react-helmet-async";
import BgGlassmorphism from "../../../components/BgGlassmorphism/BgGlassmorphism";
import SectionHero from "../../Library/SectionHero";
import rightImg from "../../../assets/01-About/3-Doctors Team/About Us.png";
import { useNavigate } from "react-router-dom";
import subscribeImg from "../../../assets/01-About/3-Doctors Team/14-subscribe-CiUj4EyT.png";
import EmailSubscribeSection from "../../../shared/EmailSubscribeSection/EmailSubscribeSection";
import { IDoctor } from "../../../services/doctors-service";
import Doctors from "./Doctors";
import Heading from "../../../shared/Heading/Heading";
import useDoctors from "../../../hooks/useDoctors";

interface DoctorsTeamProps {
  className?: string;
}

const DoctorsTeam = ({ className = "" }: DoctorsTeamProps) => {
  const { doctors, error } = useDoctors();
  const navigate = useNavigate();

  const routeToDoctorDetail = (doctor: IDoctor) => {
    console.log(doctor);
    navigate("/doctor-detail", { state: { doctor } });
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

      <div className="container py-16">
        <SectionHero
          rightImg={rightImg}
          heading="Our Doctors"
          btnText=""
          subHeading="Our Esteemed Expert Panel consists of Senior Most Doctors in the field of Siddha combined with young & Dynamic doctors. Our Senior Doctors are masters of traditional healing, who have successfully treated countless patients using Unique remedies. Our young Siddha doctors bring innovative thinking and a modern approach to traditional healing practices."
        />

        <section className="my-20">
          <Heading desc={null}>
            Meet Our Team: Guardians of Indigenous Knowledge
          </Heading>

          <ul className="list-disc list-inside leading-7 mt-5 mb-10">
            <li>
              Our doctor's compassion for both the service and the profession
              ensures that every patient's journey to health is a smooth
              passage.
            </li>
            <li>
              Our Quality & experience with unmatched professionalism carry us
              forward 
            </li>
          </ul>

          <Doctors doctors={doctors} onClick={routeToDoctorDetail} />
        </section>

        <section className="pt-20">
          {/* EMAIL SUBSCRIBE SECTION */}
          <EmailSubscribeSection />
        </section>
      </div>
    </div>
  );
};

export default DoctorsTeam;
