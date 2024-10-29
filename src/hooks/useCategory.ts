import { useEffect, useState } from "react";
import { Category } from "../models/category";
import apiClient, { CanceledError } from "../services/api-client";

const useCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    apiClient
      .get("?gofor=categorylist", { signal: controller.signal })
      .then((res) => {
        if (Array.isArray(res.data)) setCategories(res.data || []);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;

        setError(err.message);
      });

    return () => controller.abort();
  }, []);

  return { categories, error };
};

export default useCategory;
