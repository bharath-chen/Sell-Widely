import b1Img from "../../assets/images/b1.jpg";
import b2Img from "../../assets/images/b2.jpg";
import b3Img from "../../assets/images/b3.jpg";
import Heading from "../../components/Heading/Heading";

const Services = () => {
  return (
    <section className="p-10 mb-20 container mx-auto text center max-w-7xl">
      <Heading
        rightDescText="Best Services"
        fontClass="text-2xl md:text-4xl font-bold text-[#b58c69]"
      >
        Avail
      </Heading>
      <p className="mt-14 text-lg">
        {/* <span className="text-2xl font-bold text-[#b58c69]">Avail</span>
        <span className="text-2xl font-bold">Best Services</span> */}
        <button className="bg-[#fff] text-[#334a33] border border-[#000] md:text-lg font-semibold py-2 px-6 hover:bg-stone-600 float-right">
          View All Services
        </button>
      </p>

      <p className="text-gray-500 mt-2">
        We not only help you design exceptional products, but also make it easy
      </p>
      <p className="text-gray-500">
        for you to share your designs with more like-minded people.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 mt-6 mb-8  ">
        <div className=" flex-col items-center">
          <div className="bg-white shadow-lg overflow-hidden">
            <img src={b1Img} className="w-full" alt="Bath &amp; Body" />
          </div>
          <h2 className="text-lg font-bold text-gray-800 mt-2">
            Get Best Biriyani for Your Family function
          </h2>
          <p className="text-sm text-gray-500">Food &amp; Hospitality</p>
        </div>

        <div className=" flex-col items-center">
          <div className="bg-white shadow-lg overflow-hidden">
            <img src={b2Img} className="w-full" alt="Bag &amp; More" />
          </div>
          <h2 className="text-lg font-bold text-gray-800 mt-2">
            Event Mangement including Catering Ser...
          </h2>
          <p className="text-sm text-gray-500">Events Mangement</p>
        </div>

        <div className=" flex-col items-center">
          <div className="bg-white shadow-lg overflow-hidden">
            <img
              src={b3Img}
              className="w-full h-[148px]"
              alt="Accessories"
              width="276px"
              height="148px"
            />
          </div>
          <h2 className="text-lg font-bold text-gray-800 mt-2">
            Housekepping Services for your
          </h2>
          <p className="text-sm text-gray-500">Essential Services</p>
        </div>
      </div>
      <button className="mt-6 bg-[#334a33] text-white mr-60 md:text-lg font-semibold py-2 px-6 rounded-none hover:bg-stone-600">
        View All Services
      </button>
    </section>
  );
};

export default Services;
