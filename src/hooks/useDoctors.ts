import { CanceledError } from "axios";
import { useEffect, useState } from "react";
import { showLoader, hideLoader } from "../features/loader/loaderSlice";
import doctorsService, { IDoctor } from "../services/doctors-service";
import { useAppDispatch } from "./hooks";

const useDoctors = () => {
  const [doctors, setDoctors] = useState<IDoctor[]>([]);
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    const { request, cancel } = doctorsService.getAll<IDoctor>();

    dispatch(showLoader());

    request
      .then((res) => {
        dispatch(hideLoader());
        setDoctors(res.data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        dispatch(hideLoader());
        setError(err.message);
      });

    return () => cancel();
  }, []);

  return { doctors, error };
};

export default useDoctors;
