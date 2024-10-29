import React, { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import NcImage from "../shared/NcImage/NcImage";
import LikeButton from "./LikeButton";
import Prices from "./Prices";
import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline";
import { Product } from "../models/product";
import ButtonPrimary from "../shared/Button/ButtonPrimary";
import ButtonSecondary from "../shared/Button/ButtonSecondary";
import BagIcon from "./BagIcon";
import toast from "react-hot-toast";
import { Transition } from "@headlessui/react";
import ModalQuickView from "./ModalQuickView";
import ProductQuickView from "./ProductQuickView";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { RootState } from "../state/store";
import AppText from "./AppText/AppText";

export interface ProductCardProps {
  className?: string;
  data?: Product;
  isLiked?: boolean;
  onLike?: () => void;
}

const ProductCard: FC<ProductCardProps> = ({
  className = "",
  data,
  isLiked,
  onLike,
}) => {
  const {
    product_id,
    product_name,
    selling_price,
    product_image1,
    suitablefor,
    product_mrp,
    user_ratings,
  } = data;
  const navigate = useNavigate();
  const [variantActive, setVariantActive] = React.useState(0);
  const [showModalQuickView, setShowModalQuickView] = React.useState(false);
  const dispatch = useAppDispatch(); // Get the dispatch function from Redux
  const customer = useAppSelector((state: RootState) => state.auth);

  const notifyAddTocart = ({ size }: { size?: string }) => {
    toast.custom(
      (t) => (
        <Transition
          appear
          show={t.visible}
          className="p-4 max-w-md w-full bg-white dark:bg-slate-800 shadow-lg rounded-2xl pointer-events-auto ring-1 ring-black/5 dark:ring-white/10 text-slate-900 dark:text-slate-200"
          enter="transition-all duration-150"
          enterFrom="opacity-0 translate-x-20"
          enterTo="opacity-100 translate-x-0"
          leave="transition-all duration-150"
          leaveFrom="opacity-100 translate-x-0"
          leaveTo="opacity-0 translate-x-20"
        >
          <p className="block text-base font-semibold leading-none">
            Added to cart!
          </p>
          <div className="border-t border-slate-200 dark:border-slate-700 my-4" />
          {renderProductCartOnNotify({ size })}
        </Transition>
      ),
      { position: "top-right", id: "nc-product-notify", duration: 3000 }
    );
  };

  const renderProductCartOnNotify = ({ size }: { size?: string }) => {
    return (
      <div className="flex ">
        <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <img
            src={product_image1}
            alt={product_name}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div>
                <h3 className="text-base font-medium ">{product_name}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  <span>{suitablefor}</span>
                </p>
              </div>
              <Prices price={+selling_price} className="mt-0.5" />
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500 dark:text-slate-400">Qty 1</p>

            <div className="flex">
              <Link
                to={"/cart"}
                className="font-medium text-primary-900 dark:text-primary-500 "
              >
                View cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // const handleAddToCart = () => {
  //   const cartProduct: CartProduct = {
  //     ...data, // Add the image property
  //     quantity: 1, // Default quantity
  //     // qty: qty,
  //   };

  //   dispatch(addToCart(cartProduct));
  //   notifyAddTocart({ size: "XL" });
  // };

  const routeToProductDetail = () => {
    navigate(`/product-detail/${product_name}`, {
      state: {
        id: product_id,
      },
    });
  };

  const renderGroupButtons = () => {
    return (
      <div className="absolute bottom-0 group-hover:bottom-4 inset-x-1 flex justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        <ButtonPrimary
          className="shadow-lg"
          fontSize="text-xs"
          sizeClass="py-2 px-4"
          // onClick={handleAddToCart}
        >
          <BagIcon className="w-3.5 h-3.5 mb-0.5" />
          <span className="ml-1">Add to cart</span>
        </ButtonPrimary>
        <ButtonSecondary
          className="ml-1.5 bg-white hover:!bg-gray-100 hover:text-slate-900 transition-colors shadow-lg"
          fontSize="text-xs"
          sizeClass="py-2 px-4"
          onClick={() => setShowModalQuickView(true)}
        >
          <ArrowsPointingOutIcon className="w-3.5 h-3.5" />
          <span className="ml-1">Quick view</span>
        </ButtonSecondary>
      </div>
    );
  };

  return (
    <>
      <div
        className={`nc-ProductCard relative flex flex-col bg-transparent ${className}`}
        data-nc-id="ProductCard"
      >
        <div className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 overflow-hidden z-1 group">
          <span onClick={routeToProductDetail} className="block">
            <NcImage
              containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0"
              src={product_image1}
              className="object-cover w-full h-full drop-shadow-xl"
            />
          </span>

          {customer.customer_id && (
            <LikeButton
              liked={isLiked}
              onLike={onLike}
              className="absolute top-3 right-3 z-10"
            />
          )}
        </div>

        <div className="space-y-4 px-2.5 pt-5 pb-2.5">
          <span onClick={routeToProductDetail} className="block">
            <div>
              <h2
                className={`nc-ProductCard__title text-base font-semibold transition-colors mb-3`}
              >
                {product_name}
              </h2>
              {/* text-slate-500 dark:text-slate-400 mt-1  */}
              <AppText className={`text-sm text-xs mb-3 `}>
                {suitablefor}
              </AppText>
            </div>
          </span>

          <div className="flex justify-between items-center space-x-1">
            <span className="text-gray-700 text-base font-bold">
              ₹.{selling_price}
            </span>
            <span className="text-gray-500 line-through text-xs">
              ₹.{product_mrp}
            </span>
            <span className="text-yellow-500 text-xs">★ {user_ratings}</span>
          </div>

          {/* <div className="flex justify-between items-end ">
            <Prices price={+selling_price} />

            <div className="flex items-center mb-0.5">
              <button
                onClick={routeToProductDetail}
                type="button"
                className="border-2 border-white rounded-lg py-1 px-2 md:py-1 md:px-2.5 text-sm font-medium"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </button>
            </div>
          </div> */}

          {renderGroupButtons()}
        </div>
      </div>

      <ModalQuickView
        show={showModalQuickView}
        onCloseModalQuickView={() => setShowModalQuickView(false)}
      >
        <ProductQuickView product={data} />
      </ModalQuickView>
    </>
  );
};

export default ProductCard;
