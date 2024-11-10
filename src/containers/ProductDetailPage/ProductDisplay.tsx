import { useEffect, useState } from "react";
import { ProductDetail } from "../../services/product-detail-service";
import { StarIcon } from "@heroicons/react/24/solid";

interface Props {
  productDetail: ProductDetail;
}

const ProductDisplay = ({ productDetail }: Props) => {
  const [selectedImage, setSelectedImage] = useState<{
    id: number;
    image: string;
  }>(null);
  const [images, setImages] = useState<{ id: number; image: string }[]>([]);

  useEffect(() => {
    const {
      product_image1,
      product_image2,
      product_image3,
      product_image4,
      product_image5,
    } = productDetail.product_details[0];
    const imageList = [
      { id: 1, image: product_image1 },
      { id: 2, image: product_image2 },
      { id: 3, image: product_image3 },
      { id: 4, image: product_image4 },
      { id: 5, image: product_image5 },
    ];
    setImages(imageList);
    setSelectedImage(imageList[0]);
  }, [productDetail.product_details]);

  return (
    <div className="flex flex-col lg:flex-row items-start justify-center p-6 bg-gray-100">
      {/* Product Image Section */}
      <div className="w-full lg:w-1/2 flex flex-col items-center">
        {/* Main Product Image */}
        {selectedImage && (
          <img
            src={selectedImage.image}
            alt="Wooden Tissue Box"
            className="shadow-lg mb-4 w-3/4"
          />
        )}

        {/* Thumbnail Images */}
        <div className="flex overflow-x-auto p-3 space-x-8">
          {images.length > 0 &&
            images.map((item, index) => (
              <img
                key={index}
                src={item.image}
                alt={`Thumbnail ${index + 1}`}
                className={`w-20 h-20 border ${
                  selectedImage.id === item.id
                    ? "border-green-600"
                    : "border-gray-300"
                } cursor-pointer hover:border-green-500`}
                onClick={() => setSelectedImage(item)}
              />
            ))}
        </div>
      </div>

      {/* Product Details Section */}
      <div className="w-full lg:w-1/2 p-6">
        <h2 className="text-2xl md:text-3xl lg:text-5xl font-semibold text-gray-800 mb-2">
          {/* Deskart 1 Compartments Wooden Tissue Box (Brown) */}
          {productDetail.product_details[0].product_name}
        </h2>
        <div className="flex items-center mt-8 mb-4">
          <StarIcon className="w-6 text-yellow-500" />
          <span className="text-gray-800 ml-2">
            {productDetail.product_details[0].user_ratings}.
          </span>
          <span className="ml-2 text-gray-800">
            {productDetail.product_feedback.length} reviews
          </span>
        </div>

        {/* Price Section */}
        <h3 className="text-xl text-primary-500 font-medium mt-8 mb-3">
          Offer Price
        </h3>
        <div className="text-3xl font-bold mb-2">
          ₹ {productDetail.product_attributes[0].selling_price}
          <span className="text-gray-500 text-xl font-normal line-through mx-2">
            ₹ {productDetail.product_attributes[0].product_mrp}
          </span>
          <span className="text-red-500 text-lg ml-2">30% off</span>
        </div>

        {/* Color Options */}
        <div className="mt-10 mb-10">
          <span className="text-lg font-medium text-gray-700">Color:</span>
          <div className="flex items-center mt-2">
            <button className="px-4 py-2 border border-gray-300 rounded mr-2 text-gray-700">
              White
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded bg-brown-500">
              Brown
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col lg:flex-row lg:space-x-4 mt-6">
          <button className="bg-primary-500 w-full h-16 lg:h-20 text-white px-6 py-3 font-semibold hover:bg-primary-700 mb-4 lg:mb-0">
            BUY NOW
          </button>
          <button className="bg-primary-500 w-full h-16 lg:h-20 text-white px-6 py-3 font-semibold hover:bg-primary-700">
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
