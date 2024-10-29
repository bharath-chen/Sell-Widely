import { useEffect, useState } from "react";
import { CanceledError } from "axios";
import { showLoader, hideLoader } from "../features/loader/loaderSlice";
import { Testimonial } from "../models/testimonial";
import { useAppDispatch } from "./hooks";
import testimonialsService from "../services/testimonials-service";

const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    const { request, cancel } = testimonialsService.getAll<Testimonial>();

    dispatch(showLoader());

    request
      .then((res) => {
        dispatch(hideLoader());
        setTestimonials(res.data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;

        dispatch(hideLoader());
        setError(err.message);
      });

    return () => cancel();
  }, []);

  return { testimonials, setTestimonials, error, setError };
};

export default useTestimonials;
