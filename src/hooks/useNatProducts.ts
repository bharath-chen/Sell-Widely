import { CanceledError } from "axios";
import { useEffect, useState } from "react";
import { showLoader, hideLoader } from "../features/loader/loaderSlice";
import homeCategoryService, {
  NatProduct,
} from "../services/home-category-service";
import { useAppDispatch } from "./hooks";

const useNatProducts = () => {
  const [natProducts, setNatProducts] = useState<NatProduct[]>([]);
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    const { request, cancel } = homeCategoryService.getAll<NatProduct>();

    dispatch(showLoader());

    request
      .then((res) => {
        dispatch(hideLoader());
        setNatProducts(res.data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;

        dispatch(hideLoader());
        setError(err.message);
      });

    return () => cancel();
  }, []);

  return { natProducts, error };
};

export default useNatProducts;
