import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import CommonLayout from "./CommonLayout";
import {
  fetchWishlist,
  removeItemFromWishlistAndUpdate,
} from "../../features/wishlist/wishlistSlice";
import ProductCard from "../../components/ProductCard";
import { Product } from "../../models/product";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import { useNavigate } from "react-router-dom";

const AccountSavelists = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const items = useAppSelector((state) => state.wishlist.wishlist);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, []);

  const handleRemoveItemFromWishList = (productId: string) => {
    dispatch(removeItemFromWishlistAndUpdate(productId));
  };

  const renderSection1 = () => {
    const routeToProducts = () => {
      navigate("/products");
    };

    return (
      <div className="space-y-10 sm:space-y-12">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold">
            Wishlist: Keep Track of What You Love
          </h2>
        </div>

        {items.productdetail.length === 0 && (
          <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-12 w-12 text-gray-400 mb-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>

            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Your Wishlist is Empty!
            </h3>
            <p className="text-gray-500 mb-4">
              Looks like you haven't saved any products yet. Start adding items
              to your wishlist!
            </p>
            <ButtonPrimary
              onClick={routeToProducts}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Browse Products
            </ButtonPrimary>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 ">
          {items.productdetail.length > 0 &&
            items.productdetail.length > 0 &&
            items?.productdetail
              ?.filter(
                (obj, index, self) =>
                  index ===
                  self.findIndex((t) => t.product_id === obj.product_id)
              )
              .map((p: Product, index: number) => {
                const updatedProduct = { ...p, isLiked: true };
                return (
                  <ProductCard
                    key={updatedProduct.product_id + index}
                    data={updatedProduct}
                    isLiked={updatedProduct.isLiked}
                    onLike={() =>
                      handleRemoveItemFromWishList(updatedProduct.product_id)
                    }
                  />
                );
              })}
        </div>
      </div>
    );
  };

  return (
    <div>
      <CommonLayout>{renderSection1()}</CommonLayout>
    </div>
  );
};

export default AccountSavelists;
