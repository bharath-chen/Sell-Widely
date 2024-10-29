import { useEffect, useState } from "react";
import { CartDetail } from "../models/cartDetail";
import { Product } from "../models/product";
import apiClient, { CanceledError } from "../services/api-client";
import { hideLoader, showLoader } from "../features/loader/loaderSlice";
import { useAppDispatch, useAppSelector } from "./hooks";
import { RootState } from "../state/store";

export interface CartDetailPayload {
  cartDetail: CartDetail[];
  productDetail: Product[];
}

const useViewCart = () => {
  const customer = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const [cartDetails, setCartDetails] = useState<CartDetailPayload>();
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    dispatch(showLoader());

    apiClient
      .get<CartDetailPayload>(
        `?gofor=viewcart&customer_id=${customer?.customer_id}`,
        {
          signal: controller.signal,
        }
      )
      .then((res) => {
        dispatch(hideLoader());
        console.log("Product details:", res.data);
        setCartDetails(res.data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        dispatch(hideLoader());
        setError(err.message);
      });

    return () => controller.abort();
  }, []);

  return { cartDetails, setCartDetails, error };
};

export default useViewCart;
