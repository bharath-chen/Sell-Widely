import { useEffect, useState } from "react";
import { Address } from "../models/address";
import apiClient, { CanceledError } from "../services/api-client";
import { hideLoader, showLoader } from "../features/loader/loaderSlice";
import { useAppDispatch, useAppSelector } from "./hooks";
import { RootState } from "../state/store";

const useViewAddressess = () => {
  const customer = useAppSelector((state: RootState) => state.auth);
  const [addressList, setAddressList] = useState<Address[]>([]);
  const [error, setError] = useState("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    const controller = new AbortController();

    if (!customer) return;

    dispatch(showLoader());
    apiClient
      .get<Address[]>(
        `?gofor=addresslist&customer_id=${customer.customer_id}`,
        { signal: controller.signal }
      )
      .then((res) => {
        dispatch(hideLoader());
        setAddressList(res.data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;

        dispatch(hideLoader());
        setError(err.message);
      });

    return () => controller.abort();
  }, []);

  return { addressList, error, setAddressList, customer };
};

export default useViewAddressess;
