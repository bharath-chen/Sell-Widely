import { useEffect, useState } from "react";
import { Blog } from "../models/blog";
import { useAppDispatch } from "./hooks";
import { CanceledError } from "axios";
import { showLoader, hideLoader } from "../features/loader/loaderSlice";
import blogListService from "../services/blog-list-service";
import { getFormattedDate } from "../utils/date-utils";

const useBlogs = () => {
  const [blogList, setBlogList] = useState<Blog[]>([]);
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    const { request, cancel } = blogListService.getAll<Blog>();

    dispatch(showLoader());

    request
      .then((res) => {
        dispatch(hideLoader());
        const data =
          res.data.map((d) => ({
            ...d,
            published_date: getFormattedDate(d.published_date),
          })) || [];

        setBlogList(data);
      })
      .catch((err) => {
        dispatch(hideLoader());
        if (err instanceof CanceledError) return;
        setError(err.message);
      });

    return () => cancel();
  }, []);

  return { blogList, error };
};

export default useBlogs;
