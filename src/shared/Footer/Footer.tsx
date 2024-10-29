import sellerBackgroundImg from "../../assets/images/2.jpg";
import affiliateBackgroundImg from "../../assets/images/1.jpg";
import sellWidleyImg from "../../assets/images/logo_white.png";
import facebookLogo from "../../assets/images/facebook.png";
import youtubeLogo from "../../assets/images/youtube.png";
import telegramLogo from "../../assets/images/telegram.png";
import xLogo from "../../assets/images/x.png";
import { Link } from "react-router-dom";

const footerLinks = [
  {
    id: 1,
    mainTitle: "Getting Started",
    childLinks: [
      {
        id: 1,
        linkName: "Release Notes",
        linkurl: "#",
      },
      {
        id: 2,
        linkName: "Upgrade Guide",
        linkurl: "#",
      },
      {
        id: 3,
        linkName: "Browse Support",
        linkurl: "#",
      },
      {
        id: 4,
        linkName: "Dark Mode",
        linkurl: "#",
      },
    ],
  },
  {
    id: 2,
    mainTitle: "Explore",
    childLinks: [
      {
        id: 1,
        linkName: "Prototyping",
        linkurl: "#",
      },
      {
        id: 2,
        linkName: "Design Systems",
        linkurl: "#",
      },
      {
        id: 3,
        linkName: "Pricing",
        linkurl: "#",
      },
      {
        id: 4,
        linkName: "Security",
        linkurl: "#",
      },
    ],
  },
  {
    id: 3,
    mainTitle: "Resources",
    childLinks: [
      {
        id: 1,
        linkName: "Best Practices",
        linkurl: "#",
      },
      {
        id: 2,
        linkName: "Support",
        linkurl: "#",
      },
      {
        id: 3,
        linkName: "Developers",
        linkurl: "#",
      },
      {
        id: 4,
        linkName: "Learn Design",
        linkurl: "#",
      },
    ],
  },
  {
    id: 4,
    mainTitle: "Community",
    childLinks: [
      {
        id: 1,
        linkName: "Discussion Fourms",
        linkurl: "#",
      },
      {
        id: 2,
        linkName: "Code of Conduct",
        linkurl: "#",
      },
      {
        id: 3,
        linkName: "Contributing",
        linkurl: "#",
      },
      {
        id: 4,
        linkName: "API Reference",
        linkurl: "#",
      },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="mt-10 bg-[#344a33] px-4 sm:px-10 lg:px-40 w-full py-10">
      <section className="pt-4 pb-4">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          {/* First Half with Image 1 as Background */}
          <div
            style={{ backgroundImage: `url(${sellerBackgroundImg})` }}
            className={`bg-center bg-cover md:w-1/2 p-6 relative w-full flex justify-end items-center`}
          >
            <div className="text-left">
              <h1 className="text-lg md:text-4xl font-semibold text-[#fff]">
                Become a Seller
                <br />
              </h1>
              <p className="text-[#fff] md:text-xl">
                Start selling your products @ zero <br />
                cost and explore the globe.
              </p>
              <button className="mt-6 bg-[#334a33] text-white md:text-lg font-bold py-2 px-6 rounded-none hover:bg-stone-600">
                Join Now
              </button>
            </div>
          </div>
          {/* Second Half with Image 2 as Background */}
          <div
            style={{ backgroundImage: `url(${affiliateBackgroundImg})` }}
            className={`bg-center bg-cover md:w-1/2 p-6 relative w-full flex justify-end items-center`}
          >
            <div className="text-left">
              <h1 className="text-lg md:text-4xl font-semibold text-[#fff]">
                Become an Affiliate
                <br />
              </h1>
              <p className="text-[#fff] md:text-xl">
                Share, Promote & Earn from the
                <br />
                wide range of products @ Sellwidely.
              </p>
              <button className="mt-6 bg-[#334a33] text-white md:text-lg font-bold py-2 px-6 rounded-none hover:bg-stone-600">
                Join Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer content */}
      <div className="container mx-auto flex flex-col lg:flex-row justify-between mt-8 pl-0 pr-0">
        <div className="flex flex-col items-start space-y-4 mb-6 lg:mb-0 lg:w-1/4">
          <div className="flex items-center">
            <img
              src={sellWidleyImg}
              alt="Shopee"
              className="w-[150px] h-[50px]"
            />
          </div>
          <div className="hidden lg:block space-y-4">
            <div className="flex items-center space-x-4">
              <img src={facebookLogo} alt="Facebook" />
              <a
                href="#"
                className="text-lg text-[#ffffff] hover:text-[#c7af97]"
              >
                Facebook
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <img src={youtubeLogo} alt="YouTube" />
              <a
                href="#"
                className="text-lg text-[#ffffff] hover:text-[#c7af97]"
              >
                YouTube
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <img src={telegramLogo} alt="Telegram" />
              <a
                href="#"
                className="text-lg text-[#ffffff] hover:text-[#c7af97]"
              >
                Telegram
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <img src={xLogo} alt="Twitter" className="w-6 h-6" />
              <a
                href="#"
                className="text-lg text-[#ffffff] hover:text-[#c7af97]"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-6 lg:gap-x-8 lg:space-y-0 lg:w-3/4">
          {footerLinks.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:items-start space-y-4"
            >
              <h3 className="text-lg font-semibold text-white">
                {item.mainTitle}
              </h3>
              <ul className="space-y-4">
                {item.childLinks.map((link) => (
                  <li key={link.id}>
                    <Link
                      to={link.linkurl}
                      className="text-[#ffffff] hover:text-[#c7af97]"
                    >
                      {link.linkName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Social Icons for Mobile */}
      <div className="block lg:hidden mt-4">
        <div className="flex justify-center space-x-6">
          <a href="#">
            <img src={facebookLogo} alt="Facebook" />
          </a>
          <a href="#">
            <img src={youtubeLogo} alt="YouTube" />
          </a>
          <a href="#">
            <img src={telegramLogo} alt="Telegram" />
          </a>
          <a href="#">
            <img src={xLogo} alt="Twitter" />
          </a>
        </div>
      </div>

      {/* Copyright Footer */}
      <header className="bg-[#344a33] mt-20 text-white">
        <div className="container mx-auto flex justify-center items-center py-4">
          <div className="text-center text-sm">
            <p>
              <b>Copyrights @ 2024 Reserved Sell Widely</b>
            </p>
          </div>
        </div>
      </header>
    </footer>
  );
};

export default Footer;
