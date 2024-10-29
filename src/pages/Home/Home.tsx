import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImg from "../../assets/HOME PAGE/1-slider-image.jpg";
import ButtonSecondary from "../../shared/Button/ButtonSecondary";
import aboutSectionImg from "../../assets/HOME PAGE/2-about-section.jpg";
import faqImg from "../../assets/images/FAQ.png";
import certificationsImg from "../../assets/00-Home/Certificate.jpg";
import Heading from "../../components/Heading/Heading";
import CardCategory3 from "../../components/CardCategories/CardCategory3";
import AccordionInfo from "../../containers/ProductDetailPage/AccordionInfo";
import NcImage from "../../shared/NcImage/NcImage";
import SectionClientSay from "../../components/SectionClientSay/SectionClientSay";
import BackgroundSection from "../../components/BackgroundSection/BackgroundSection";
import SectionSliderCategories, {
  CardCategoryData,
} from "../../components/SectionSliderCategories/SectionSliderCategories";
import SectionGridMoreExplore from "../../components/SectionGridMoreExplore/SectionGridMoreExplore";
import Button from "../../shared/Button/Button";
import siddhargalAndSiddhaMedicineImage from "../../assets/00-Home/Siddhargal & Siddha medicine.png";
import ProductCard from "../../components/ProductCard";
import AppSlider from "../../components/AppSlider/AppSlider";
import {
  ABOUTS,
  ACCORDION_INFO,
  TABS,
  EXPLORE_SECTION_DATA,
} from "../../data/home";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import EmailSubscribeSection from "../../shared/EmailSubscribeSection/EmailSubscribeSection";
import { CanceledError } from "axios";
import { useAppDispatch } from "../../hooks/hooks";
import homeService, {
  FeatureProductResponse,
} from "../../services/home-service";
import Nav from "../../shared/Nav/Nav";
import NavItem from "../../shared/NavItem/NavItem";

import client1Image from "../../assets/00-Home/Golden Words from our Customers/1.png";
import client2Image from "../../assets/00-Home/Golden Words from our Customers/2.png";
import client3Image from "../../assets/00-Home/Golden Words from our Customers/3.png";
import client4Image from "../../assets/00-Home/Golden Words from our Customers/4.png";
import client5Image from "../../assets/00-Home/Golden Words from our Customers/5.png";
import client6Image from "../../assets/00-Home/Golden Words from our Customers/6.png";
import client7Image from "../../assets/00-Home/Golden Words from our Customers/7.png";

import useCategory from "../../hooks/useCategory";
import useDoctors from "../../hooks/useDoctors";
import useBlogs from "../../hooks/useBlogs";
import MainCard from "../Resources/Blog/MainCard";
import BlogCard from "../Resources/Blog/BlogCard";
import { IVideo } from "../../services/video-service";
import HealthAndLifestyleCard from "./HealthAndLifestyleCard";
import useVideos from "../../hooks/useVideos";
import useNatProducts from "../../hooks/useNatProducts";
import useTestimonials from "../../hooks/useTestimonials";
import { Product } from "../../models/product";
import {
  addItemToWishlist,
  removeItemFromWishlist,
} from "../../features/wishlist/wishlistSlice";
import AudioPlayerPopup from "../../components/Audio/AudioPlayerPopup";
import VideoPopup from "../../pages/Resources/Videos/VideoPopup";
import Carousel from "../../components/Carousel/Carousel";
import ecoImg from "../../assets/eco.png";
import ProductTabs from "./ProductTabs";
import { ProductTab } from "../../models/productTab";
import featureProduct1Img from "../../assets/images/img1.jpg";
import featureProduct2Img from "../../assets/images/img2.jpg";
import featureProduct3Img from "../../assets/images/img3.jpg";
import featureProduct4Img from "../../assets/images/img4.jpg";
import recommendedProduct1Img from "../../assets/images/card1.png";
import recommendedProduct2Img from "../../assets/images/card2.png";
import recommendedProduct3Img from "../../assets/images/card3.png";
import recommendedProduct4Img from "../../assets/images/card4.png";
import productCategory1Img from "../../assets/images/product1-removebg-preview.png";
import productCategory2Img from "../../assets/images/product2.png";
import productCategory3Img from "../../assets/images/product3-removebg-preview.png";
import CategoryCard from "./CategoryCard";
import { ProductCategory } from "../../models/productCategory";
import GlobalSellerSection from "./GlobalSeller";
import SimpleSteps from "./SimpleSteps";
import ExploreSellWidelyCategories from "./ExploreSellWidelyCategories";

export const pageAnimation = {
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 0 },
};

const audioUrl = "https://www.almaherbal.top/App/assets/audio/md-general.mp3";
const videoUrl = "https://youtu.be/n58PFwrmxsg";

const slidesData = [
  {
    id: 1,
    imageSrc: ecoImg,
    altText: "Eco-Friendly Products",
    title: "Great Deals 2024!",
    discount: "Get 25% off",
    subTitle: "on Specific <br /> Eco-Friendly Products",
    link: "#",
    buttonText: "Explore Now",
    bgColor: "#E4DBD2",
    textColor: "#655A4D",
    highlightColor: "#384935",
    btnBg: "bg-darkMossGreen-900",
    btnHoverBg: "stone-600",
  },
  {
    id: 2,
    imageSrc: ecoImg,
    altText: "New Products",
    title: "New Arrivals 2024!",
    discount: "Get 15% off",
    subTitle: "on Latest <br/> Eco-Friendly Products",
    link: "#",
    buttonText: "Shop Now",
    bgColor: "#F5F5F5",
    textColor: "#6B6B6B",
    highlightColor: "#383838",
    btnBg: "bg-dimGray-900",
    btnHoverBg: "gray-600",
  },
  {
    id: 3,
    imageSrc: ecoImg,
    altText: "Sustainable Living",
    title: "Sustainable Living!",
    discount: "Get 20% off",
    subTitle: "on Green <br/> Products & Supplies",
    link: "#",
    buttonText: "Buy Now",
    bgColor: "light-gray",
    textColor: "#5A7D5A",
    highlightColor: "#334935",
    btnBg: "bg-desaturatedGreen-900",
    btnHoverBg: "green-600",
  },
];

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState<ProductTab[]>([
    {
      id: "1",
      tabname: "Eco-Friendly Products",
      selected: true,
      products: [
        {
          product_id: "1",
          product_name: "Paper Based Organic Gift Wrapping",
          suitablefor: "Organic & Paper Based",
          product_image1: featureProduct1Img,
          user_ratings: "4.9",
          product_mrp: "2899",
          selling_price: "899",
        },
        {
          product_id: "2",
          product_name: "Wooden Cutlery with Cutting Board",
          suitablefor: "Sets of board , 100% Organic",
          product_image1: featureProduct2Img,
          user_ratings: "4.9",
          product_mrp: "3999",
          selling_price: "2999",
        },
        {
          product_id: "3",
          product_name: "Tissue Paper Holder",
          suitablefor: "Bamboo Base, Home Decar",
          product_image1: featureProduct3Img,
          user_ratings: "4.9",
          product_mrp: "599",
          selling_price: "499",
        },
        {
          product_id: "4",
          product_name: "Toddler Hanging Toys-100% Wooden & Organic",
          suitablefor: "Baby Friendly, Pure Wood",
          product_image1: featureProduct4Img,
          user_ratings: "4.9",
          product_mrp: "2999",
          selling_price: "1199",
        },
      ],
    },
    {
      id: "2",
      tabname: "Health Care & Wellness",
      selected: false,
      products: [
        {
          product_id: "1",
          product_name: "Paper Based Organic Gift Wrapping",
          suitablefor: "Organic & Paper Based",
          product_image1: featureProduct1Img,
          user_ratings: "4.9",
          product_mrp: "2899",
          selling_price: "899",
        },
        {
          product_id: "2",
          product_name: "Wooden Cutlery with Cutting Board",
          suitablefor: "Sets of board , 100% Organic",
          product_image1: featureProduct2Img,
          user_ratings: "4.9",
          product_mrp: "3999",
          selling_price: "2999",
        },
        {
          product_id: "3",
          product_name: "Tissue Paper Holder",
          suitablefor: "Bamboo Base, Home Decar",
          product_image1: featureProduct3Img,
          user_ratings: "4.9",
          product_mrp: "599",
          selling_price: "499",
        },
        {
          product_id: "4",
          product_name: "Toddler Hanging Toys-100% Wooden & Organic",
          suitablefor: "Baby Friendly, Pure Wood",
          product_image1: featureProduct4Img,
          user_ratings: "4.9",
          product_mrp: "2999",
          selling_price: "1199",
        },
      ],
    },
    {
      id: "3",
      tabname: "Personalised & Personal Care",
      selected: false,
      products: [
        {
          product_id: "1",
          product_name: "Paper Based Organic Gift Wrapping",
          suitablefor: "Organic & Paper Based",
          product_image1: featureProduct1Img,
          user_ratings: "4.9",
          product_mrp: "2899",
          selling_price: "899",
        },
        {
          product_id: "2",
          product_name: "Wooden Cutlery with Cutting Board",
          suitablefor: "Sets of board , 100% Organic",
          product_image1: featureProduct2Img,
          user_ratings: "4.9",
          product_mrp: "3999",
          selling_price: "2999",
        },
        {
          product_id: "3",
          product_name: "Tissue Paper Holder",
          suitablefor: "Bamboo Base, Home Decar",
          product_image1: featureProduct3Img,
          user_ratings: "4.9",
          product_mrp: "599",
          selling_price: "499",
        },
        {
          product_id: "4",
          product_name: "Toddler Hanging Toys-100% Wooden & Organic",
          suitablefor: "Baby Friendly, Pure Wood",
          product_image1: featureProduct4Img,
          user_ratings: "4.9",
          product_mrp: "2999",
          selling_price: "1199",
        },
      ],
    },
  ]);

  const [recommendedProducts, setRecommendedProducts] = useState<ProductTab[]>([
    {
      id: "1",
      tabname: "Recently Viewed",
      selected: true,
      products: [
        {
          product_id: "1",
          product_name: "Ecofriendly Bathcare Kit",
          suitablefor: "100% organic & Baby care",
          product_image1: recommendedProduct1Img,
          user_ratings: "4.9",
          product_mrp: "2899",
          selling_price: "899",
        },
        {
          product_id: "2",
          product_name: "Himalaya Aswagandha Capsules",
          suitablefor: "Ayurvedhic & Health Care",
          product_image1: recommendedProduct2Img,
          user_ratings: "4.9",
          product_mrp: "3999",
          selling_price: "2999",
        },
        {
          product_id: "3",
          product_name: "Organic Bag - XL",
          suitablefor: "Cotton Blend & Jute",
          product_image1: recommendedProduct3Img,
          user_ratings: "4.9",
          product_mrp: "599",
          selling_price: "499",
        },
        {
          product_id: "4",
          product_name: "Herbal Apricot 3 in 1 Shower Gel",
          suitablefor: "For body, face and hair",
          product_image1: recommendedProduct4Img,
          user_ratings: "4.9",
          product_mrp: "2999",
          selling_price: "1199",
        },
      ],
    },
    {
      id: "2",
      tabname: "Wishlisted",
      selected: false,
      products: [
        {
          product_id: "1",
          product_name: "Ecofriendly Bathcare Kit",
          suitablefor: "100% organic & Baby care",
          product_image1: recommendedProduct1Img,
          user_ratings: "4.9",
          product_mrp: "2899",
          selling_price: "899",
        },
        {
          product_id: "2",
          product_name: "Himalaya Aswagandha Capsules",
          suitablefor: "Ayurvedhic & Health Care",
          product_image1: recommendedProduct2Img,
          user_ratings: "4.9",
          product_mrp: "3999",
          selling_price: "2999",
        },
        {
          product_id: "3",
          product_name: "Organic Bag - XL",
          suitablefor: "Cotton Blend & Jute",
          product_image1: recommendedProduct3Img,
          user_ratings: "4.9",
          product_mrp: "599",
          selling_price: "499",
        },
        {
          product_id: "4",
          product_name: "Herbal Apricot 3 in 1 Shower Gel",
          suitablefor: "For body, face and hair",
          product_image1: recommendedProduct4Img,
          user_ratings: "4.9",
          product_mrp: "2999",
          selling_price: "1199",
        },
      ],
    },
    {
      id: "3",
      tabname: "Suggested",
      selected: false,
      products: [
        {
          product_id: "1",
          product_name: "Ecofriendly Bathcare Kit",
          suitablefor: "100% organic & Baby care",
          product_image1: recommendedProduct1Img,
          user_ratings: "4.9",
          product_mrp: "2899",
          selling_price: "899",
        },
        {
          product_id: "2",
          product_name: "Himalaya Aswagandha Capsules",
          suitablefor: "Ayurvedhic & Health Care",
          product_image1: recommendedProduct2Img,
          user_ratings: "4.9",
          product_mrp: "3999",
          selling_price: "2999",
        },
        {
          product_id: "3",
          product_name: "Organic Bag - XL",
          suitablefor: "Cotton Blend & Jute",
          product_image1: recommendedProduct3Img,
          user_ratings: "4.9",
          product_mrp: "599",
          selling_price: "499",
        },
        {
          product_id: "4",
          product_name: "Herbal Apricot 3 in 1 Shower Gel",
          suitablefor: "For body, face and hair",
          product_image1: recommendedProduct4Img,
          user_ratings: "4.9",
          product_mrp: "2999",
          selling_price: "1199",
        },
      ],
    },
  ]);

  const [productCategories, setProductCategories] = useState<ProductCategory[]>(
    [
      {
        id: "p1",
        badgeText: "100% Organic",
        title: (
          <span>
            Eco-Friendly
            <br />
            Products
          </span>
        ),
        buttonText: "View Products",
        buttonLink: "#",
        bgColor: "#E3DBD2",
        imageSrc: productCategory1Img,
        imageAlt: "Eco-Friendly Products",
      },
      {
        id: "p2",
        badgeText: "Ayurvedhic & Herbal",
        title: (
          <span>
            Health Care & <br />
            Wellness
          </span>
        ),
        buttonText: "View Products",
        buttonLink: "#",
        bgColor: "#C2AF99",
        imageSrc: productCategory2Img,
        imageAlt: "Health Care & Wellness",
      },
      {
        id: "p3",
        badgeText: "Natural & Organic",
        title: (
          <span>
            Personalised & <br />
            Personal Care
          </span>
        ),
        buttonText: "View Products",
        buttonLink: "#",
        bgColor: "#808671",
        imageSrc: productCategory3Img,
        imageAlt: "Personalised & Personal Care",
      },
    ]
  );

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const { categories } = useCategory();
  // const { doctors } = useDoctors();
  // const { blogList } = useBlogs();
  // const { videos } = useVideos();
  // const { natProducts } = useNatProducts();
  // const { testimonials } = useTestimonials();
  // const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  // const [showVideoPopup, setShowVideoPopup] = useState(false);

  // const handleSliderCardClick = (item: CardCategoryData) => {
  //   const selectedDoctor = doctors.find((doc) => doc.doctor_id === item.id);

  //   navigate("/doctor-detail", {
  //     state: {
  //       doctor: selectedDoctor,
  //     },
  //   });
  // };

  const routeToBlogDetailPage = (blogId: string) => {
    navigate(`/blog/${blogId}`);
  };

  const renderCategoryCard = (item: ProductCategory) => {
    return (
      <CategoryCard
        badgeText={item.badgeText}
        title={item.title}
        buttonText={item.buttonText}
        imageSrc={item.imageSrc}
        imageAlt={item.imageAlt}
        bgColor={item.bgColor}
      />
    );
  };

  const renderHealthAndLifestyleCard = (item: IVideo) => {
    return <HealthAndLifestyleCard video={item} />;
  };

  const [tabActive, setTabActive] = useState(TABS[0]);

  // const [featuredProducts, setFeaturedProducts] =
  //   useState<FeatureProductResponse>();
  const images = [
    heroImg,
    heroImg,
    heroImg,
    // "https://via.placeholder.com/600x400/ff7f7f/333333?text=Slide+1",
    // "https://via.placeholder.com/600x400/ffbf7f/333333?text=Slide+2",
    // "https://via.placeholder.com/600x400/ffff7f/333333?text=Slide+3",
    // "https://via.placeholder.com/600x400/7fff7f/333333?text=Slide+4",
    // "https://via.placeholder.com/600x400/7fbfff/333333?text=Slide+5",
  ];

  // useEffect(() => {
  //   const { request, cancel } = homeService.get<FeatureProductResponse>();

  //   request
  //     .then((res) => {
  //       setFeaturedProducts(res.data);
  //     })
  //     .catch((err) => {
  //       if (err instanceof CanceledError) return;

  //       console.log(err.message);
  //     });

  //   return () => cancel();
  // }, []);

  const handleLike = (id: string) => {
    const updatedProducts = featuredProducts[tabActive.key]
      .slice(0, 4)
      .map((p) =>
        p.product_id === id ? { ...p, isLiked: (p.isLiked = !p.isLiked) } : p
      );
    const product = updatedProducts.find((p) => p.product_id === id);

    if (product.isLiked) dispatch(addItemToWishlist(product.product_id));
    else dispatch(removeItemFromWishlist(product.product_id));

    // setFeaturedProducts({
    //   ...featuredProducts,
    //   [tabActive.key]: updatedProducts,
    // });
  };

  return (
    <motion.main
      className="relative overflow-hidden"
      initial="initial"
      animate="animate"
      variants={pageAnimation}
      transition={{
        ease: "linear",
        duration: 0.3,
        y: { duration: 0.3 },
        delay: 0.3,
      }}
    >
      {/* HERO SECTION */}
      <section className="container-fluid mb-40">
        <Carousel slides={slidesData} />
      </section>

      {/* Recommended products section */}
      <ProductTabs
        heading="Recommended"
        rightDescText="For You"
        productTabs={recommendedProducts}
        onTabClick={(item) =>
          setRecommendedProducts((prevItems) =>
            prevItems.map((p) => ({ ...p, selected: p.id === item.id }))
          )
        }
      />

      {/* EXPLORE PRODUCTS BY MEDICAL CONDITIONS SECTION */}
      <section className="mb-40">
        {productCategories && productCategories.length > 0 && (
          <AppSlider
            className="nc-DiscoverMoreSlider nc-p-l-container "
            // data={MEDIC_SLIDERS}
            data={productCategories}
            renderChildren={renderCategoryCard}
          >
            <Heading
              className="mb-12 lg:mb-14 text-neutral-900 dark:text-neutral-50 nc-p-r-container "
              rightDescText="Categories"
              fontClass="text-2xl md:text-4xl font-bold text-[#b58c69]"
              hasNextPrev
            >
              Product
            </Heading>
          </AppSlider>
        )}
      </section>

      {/* Global Seller Section */}
      <section className="container mb-40">
        <GlobalSellerSection />
      </section>

      {/* Featured prodcuts section */}
      <ProductTabs
        heading="Featured"
        rightDescText="Products"
        productTabs={featuredProducts}
        onTabClick={(item) =>
          setFeaturedProducts((prevItems) =>
            prevItems.map((p) => ({ ...p, selected: p.id === item.id }))
          )
        }
      />

      {/* Simple Steps */}
      <section className="container mb-30">
        <SimpleSteps />
      </section>

      {/* Explore SellWidelyCategories */}
      <ExploreSellWidelyCategories />

      {/* Frequently Asked Questions */}
      <section className="container mb-40">
        <Heading
          className="mb-8"
          rightDescText="Asked Questions"
          fontClass="text-2xl md:text-4xl font-bold text-[#b58c69]"
        >
          Frequently
        </Heading>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-[30%,70%] gap-6 place-content-center">
          {/* lg:pl-20  */}
          <div>
            <NcImage
              className="h-full w-full object-cover"
              src={faqImg}
              alt="Almaa Greatness"
            />
          </div>
          <div>
            <AccordionInfo data={ACCORDION_INFO} />
          </div>
        </div>
      </section>
    </motion.main>
  );
};

export default Home;
