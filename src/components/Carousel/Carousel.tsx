import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // Import Swiper styles
import "swiper/css/navigation"; // Import Navigation styles
import "swiper/css/pagination"; // Import Pagination styles
import { Navigation, Pagination } from "swiper/modules"; // Import the modules
import { Link } from "react-router-dom";

interface Slide {
  id: number;
  imageSrc: string;
  altText: string;
  title: string;
  discount: string;
  subTitle: string;
  link: string;
  buttonText: string;
  bgColor: string;
  textColor: string;
  highlightColor: string;
  btnBg: string;
  btnHoverBg: string;
}

interface Props {
  slides: Slide[];
}

const Carousel = ({ slides }: Props) => {
  return (
    <section>
      {slides && slides.length > 0 && (
        <Swiper
          modules={[Navigation, Pagination]} // Register modules here
          navigation // Enable navigation
          pagination={{ clickable: true }} // Enable pagination
          className="mySwiper"
          autoplay={true}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div
                className="py-8 lg:py-16 px-4 lg:px-8"
                style={{ backgroundColor: slide.bgColor }}
              >
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center">
                  {/* Image Container */}
                  <div className="w-full lg:w-1/2 mb-8 lg:mb-0 flex justify-center lg:justify-start lg:pl-60">
                    <img
                      src={slide.imageSrc}
                      alt={slide.altText}
                      className="w-40 md:w-52 lg:w-80 rounded-none shadow-none"
                    />
                  </div>

                  {/* Text and CTA Container */}
                  <div className="w-full lg:w-1/2 text-center lg:text-left lg:pl-12">
                    <p
                      className="mt-2 text-xl md:text-2xl font-semibold"
                      style={{ color: slide.textColor }}
                    >
                      {slide.title}
                      <br />
                      <span
                        className="font-bold"
                        style={{ color: slide.highlightColor }}
                      >
                        {slide.discount}
                      </span>{" "}
                      <span
                        dangerouslySetInnerHTML={{ __html: slide.subTitle }}
                      ></span>
                    </p>
                    <div className="mt-6">
                      <Link
                        to={slide.link}
                        className={`hover:bg-${slide.btnHoverBg} ${slide.btnBg}  inline-flex items-center justify-center px-4 py-2 md:px-5 md:py-3 border border-transparent text-sm md:text-base font-medium rounded-none text-white`}
                      >
                        {slide.buttonText}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
};

export default Carousel;
