import explore1Img from "../../assets/images/explore1.png";
import explore2Img from "../../assets/images/explore2.png";
import explore3Img from "../../assets/images/explore3.png";
import explore4Img from "../../assets/images/explore4.png";
import explore5Img from "../../assets/images/explore5.png";
import explore6Img from "../../assets/images/explore6.png";
import explore7Img from "../../assets/images/explore7.png";
import explore8Img from "../../assets/images/explore8.png";
import Heading from "../../components/Heading/Heading";

const ExploreSellWidelyCategories = () => {
  return (
    <section className="p-10 container mx-auto text center max-w-7xl">
      <Heading
        className="mt-12 mb-5 lg:mb-5 text-neutral-900 dark:text-neutral-50 nc-p-r-container "
        rightDescText="Sell Widely Categories"
        fontClass="text-2xl md:text-4xl font-bold text-[#b58c69]"
      >
        Explore
      </Heading>
      <p className="text-gray-500 mt-2">
        We not only help you design exceptional products, but also make it easy
      </p>
      <p className="text-gray-500">
        for you to share your designs with more like-minded people.
      </p>
      <div className="flex   mt-6 gap-6 mb-6  ">
        <button className="py-2 px-6 bg-[#334a33] rounded-full hover:bg-[#7f876f] text-white transition">
          Eco-Friendly Products
        </button>
        <button className="py-2 px-6 bg-[#7f876f] rounded-full hover:bg-[#334a33] text-white transition">
          Health Care &amp; Wellness
        </button>
        <button className="py-2 px-6 bg-[#7f876f] rounded-full hover:bg-[#334a33] text-white transition">
          Personalised &amp; Personal Care
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 mt-6 mb-8  ">
        <div className=" flex-col items-center">
          <div className="bg-white rounded shadow-lg overflow-hidden">
            <img src={explore1Img} className="w-full" alt="Bath &amp; Body" />
          </div>
          <h2 className="text-lg text-center  font-bold text-gray-800 mt-2">
            Bath &amp; Body
          </h2>
          <p className="text-sm text-center  text-gray-500">75 Products</p>
        </div>

        <div className=" flex-col items-center">
          <div className="bg-white rounded shadow-lg overflow-hidden">
            <img src={explore2Img} className="w-full" alt="Bag &amp; More" />
          </div>
          <h2 className="text-lg text-center  font-bold text-gray-800 mt-2">
            Bag &amp; More
          </h2>
          <p className="text-sm text-center  text-gray-500">250 Products</p>
        </div>

        <div className=" flex-col items-center">
          <div className="bg-white rounded shadow-lg overflow-hidden">
            <img src={explore3Img} className="w-full" alt="Accessories" />
          </div>
          <h2 className="text-lg text-center  font-bold text-gray-800 mt-2">
            Accessories
          </h2>
          <p className="text-sm text-center  text-gray-500">25 Products</p>
        </div>

        <div className=" flex-col items-center">
          <div className="bg-white rounded shadow-lg overflow-hidden">
            <img src={explore4Img} className="w-full" alt="Home Decor" />
          </div>
          <h2 className="text-lg text-center  font-bold text-gray-800 mt-2">
            Home Decor
          </h2>
          <p className="text-sm text-center  text-gray-500">105 Products</p>
        </div>

        <div className=" flex-col items-center">
          <div className="bg-white rounded shadow-lg overflow-hidden">
            <img src={explore5Img} className="w-full" alt="Kitchen Items" />
          </div>
          <h2 className="text-lg text-center  font-bold text-gray-800 mt-2">
            Kitchen Items
          </h2>
          <p className="text-sm text-center  text-gray-500">75 Products</p>
        </div>

        <div className=" flex-col items-center">
          <div className="bg-white rounded shadow-lg overflow-hidden">
            <img src={explore6Img} className="w-full" alt="Baby Products" />
          </div>
          <h2 className="text-lg text-center  font-bold text-gray-800 mt-2">
            Baby Products
          </h2>
          <p className="text-sm text-center  text-gray-500">15 Products</p>
        </div>

        <div className=" flex-col items-center">
          <div className="bg-white rounded shadow-lg overflow-hidden">
            <img src={explore7Img} className="w-full" alt="Handicrafts" />
          </div>
          <h2 className="text-lg font-bold text-center  text-gray-800 mt-2">
            Handicrafts
          </h2>
          <p className="text-sm text-center  text-gray-500">8 Products</p>
        </div>

        <div className=" flex-col items-center">
          <div className="bg-white rounded shadow-lg overflow-hidden">
            <img src={explore8Img} className="w-full" alt="Earthen Utensils" />
          </div>
          <h2 className="text-lg text-center font-bold text-gray-800 mt-2">
            Earthen Utensils
          </h2>
          <p className="text-sm text-center  text-gray-500">20 Products</p>
        </div>
      </div>
    </section>
  );
};

export default ExploreSellWidelyCategories;
