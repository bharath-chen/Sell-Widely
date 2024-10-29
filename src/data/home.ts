import img1 from "../assets/HOME PAGE/3-carousal-1.png";
import img2 from "../assets/HOME PAGE/3-carousal-2.png";
import img3 from "../assets/HOME PAGE/3-carousal-3.png";
import img4 from "../assets/HOME PAGE/3-carousal-4.png";
import categoryImg1 from "../assets/HOME PAGE/8-carousal-1.png";
import categoryImg2 from "../assets/HOME PAGE/8-carousal-2.png";
import categoryImg3 from "../assets/HOME PAGE/8-carousal-3.png";
import categoryImg4 from "../assets/HOME PAGE/8-carousal-4.png";
import medicalConsultant1 from "../assets/HOME PAGE/7-doctor-1.jpg";
import medicalConsultant2 from "../assets/HOME PAGE/7-doctor-2.jpg";
import medicalConsultant3 from "../assets/HOME PAGE/7-doctor-3.jpg";
import medicalConsultant4 from "../assets/HOME PAGE/7-doctor-4.jpg";
import exploreImg1 from "../assets/HOME PAGE/6-explore-1.png";
import exploreImg2 from "../assets/HOME PAGE/6-explore-2.png";
import exploreImg3 from "../assets/HOME PAGE/6-explore-3.png";
import exploreImg4 from "../assets/HOME PAGE/6-explore-4.png";
import exploreImg5 from "../assets/HOME PAGE/6-explore-5.png";
import exploreImg6 from "../assets/HOME PAGE/6-explore-6.png";
import video1Img from "../assets/HOME PAGE/9-video-1.jpg";
import video2Img from "../assets/HOME PAGE/9-video-2.jpg";
import video3Img from "../assets/HOME PAGE/9-video-3.jpg";

const ABOUTS = [
  {
    id: 1,
    label: "25+ Doctors",
    descripiton: "Experienced and multispecialised doctors",
  },
  {
    id: 2,
    label: "500+ Products",
    descripiton: "100% natural products with herbal ingredients",
  },
  {
    id: 3,
    label: "15+ Years",
    descripiton: "Pioneer in siddha industry with expretise in products",
  },
];

const MEDIC_SLIDERS = [
  {
    name: "Enhance your",
    desc: "Respiratory <br/> Wellbeing",
    featuredImage: img1,
    color: "bg-pink-50",
  },
  {
    name: "Take care of",
    desc: "Digestive <br /> Wellbeing",
    featuredImage: img2,
    color: "bg-red-50",
  },
  {
    name: "Enhance your",
    desc: "Reproductive <br /> Wellbeing",
    featuredImage: img3,
    color: "bg-green-50",
  },
  {
    name: "Enhance your",
    desc: "Blood Pressure <br /> Wellbeing",
    featuredImage: img4,
    color: "bg-orange-50",
  },
];

const CATEGORY_SLIDERS = [
  {
    name: "Best in class",
    desc: "Herbal <br/> Powders",
    featuredImage: categoryImg1,
    color: "bg-slate-50",
  },
  {
    name: "Pure & Quality",
    desc: "Chooranams",
    featuredImage: categoryImg2,
    color: "bg-slate-50",
  },
  {
    name: "Thick & Consistent",
    desc: "Syrup",
    featuredImage: categoryImg3,
    color: "bg-slate-50",
  },
  {
    name: "Tablets",
    desc: "Herbal Tablets",
    featuredImage: categoryImg4,
    color: "bg-slate-50",
  },
];

const ACCORDION_INFO = [
  {
    id: "a1",
    name: "How to become a seller? ",
    content:
      "Just talk to our expert team @0123456789 or mail to seller@ourportal.com. You will receive a confirmation email. By clicking that, You can become a seller.",
  },
  {
    id: "a2",
    name: "How can I subscribe to Premium Membership?",
    content: `Certainly Not, If Taken as prescribed by the doctor, the chances of having side effects are very low `,
  },
  {
    id: "a3",
    name: "What are the benefits of becoming a Continuous Customer?",
    content:
      "Yes. Allopathy & Siddha medicine can be taken together under medical supervision ",
  },
  {
    id: "a4",
    name: "How can i cancel or return the products? What to be done to get the refund?",
    content: `Commonly Vegetables like Brinjal, Bitter Gourd, and Tamarind are contraindicated. A specific  diet will be prescribed by the doctor for individuals based on their body type, season & health condition`,
  },
  {
    id: "a5",
    name: "When can i receive refund amount if I cancel the order?",
    content: `Almost every health condition can be effectively managed and cured by Siddha medicine.`,
  },
];

const MEDICAL_CONSULTANTS = [
  {
    name: "Dr.Manikandan B.A.M.S",
    desc: "Ortho Specialist",
    img: medicalConsultant1,
    color: "",
  },
  {
    name: "Dr.Sowmya B.A.M.S",
    desc: "Varma Specialist",
    img: medicalConsultant2,
    color: "",
  },
  {
    name: "Dr.Kumaravel M.D(s).",
    desc: "Senior Consultant (General)",
    img: medicalConsultant3,
    color: "",
  },
  {
    name: "Dr.Sankar Anand M.D(s)",
    desc: "Doctor, General Medicine",
    img: medicalConsultant4,
    color: "",
  },
];

const EXPLORE_SECTION_DATA = [
  {
    id: 1,
    name: "Talk to Doctor",
    desc: "Free Consulting",
    image: exploreImg1,
    svgBg: "",
    color: "bg-indigo-50",
    btnLabel: "Explore Doctors",
    quantityText: "25 Doctors",
    href: "/doctors-team",
  },
  {
    id: 2,
    name: "Wellness theraphy",
    desc: "Varma Treatments",
    image: exploreImg2,
    svgBg: "",
    color: "bg-slate-100/80",
    btnLabel: "Explore Now",
    quantityText: "35 Therapies",
    href: "/wellness-center",
  },
  {
    id: 3,
    name: "Library",
    desc: "Books & Resource materials",
    image: exploreImg3,
    svgBg: "",
    color: "bg-violet-50",
    btnLabel: "Explore Now",
    quantityText: "15 Books",
    href: "/library",
  },
  {
    id: 4,
    name: "Siddhar Pooja",
    desc: "Amavasai & Pournami",
    image: exploreImg4,
    svgBg: "",
    color: "bg-orange-50",
    btnLabel: "Explore Now",
    quantityText: "2 Locations",
    href: "/wellness-center",
  },
  {
    id: 5,
    name: "Production Unit",
    desc: "We Manufacture We Serve",
    image: exploreImg5,
    svgBg: "",
    color: "bg-blue-50",
    btnLabel: "Explore Now",
    quantityText: "200 Products",
    href: "/production-unit",
  },
  {
    id: 6,
    name: "For Your Health",
    desc: "Awarness & Social Responsibility",
    image: exploreImg6,
    svgBg: "",
    color: "bg-orange-50",
    btnLabel: "Explore Now",
    quantityText: "500 Resources",
    href: "/blog",
  },
];

const LIFE_STYLE_CARDS = [
  {
    id: 1,
    src: video1Img,
    heading: "How to enhance your lifestyle in a healthy way ?",
    categoryType: "LifeStyle",
    dateAdded: "04<sup>th</sup> Feb 2024",
  },
  {
    id: 2,
    src: video2Img,
    heading: "Healthy life using natural & organic ingredients",
    categoryType: "Food Practice",
    dateAdded: "02<sup>nd</sup> Feb 2024",
  },
  {
    id: 3,
    src: video3Img,
    heading: "Let's elevate your life! Participate in Pournami Pooja...",
    categoryType: "LifeStyle",
    dateAdded: "05<sup>th</sup> Feb 2024",
  },
];

const TABS = [
  { id: "t1", name: "Best Sellers", key: "bestprodGet" },
  { id: "t2", name: "Offers", key: "offerprodGet" },
  { id: "t3", name: "Newly Launched", key: "newprodGet" },
  { id: "t4", name: "Favorites", key: "favprodGet" },
];

export {
  ABOUTS,
  MEDIC_SLIDERS,
  CATEGORY_SLIDERS,
  ACCORDION_INFO,
  MEDICAL_CONSULTANTS,
  TABS,
  LIFE_STYLE_CARDS,
  EXPLORE_SECTION_DATA,
};
