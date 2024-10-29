import { CanceledError } from "axios";
import { useState, useEffect } from "react";
import videoService, { IVideo } from "../services/video-service";
import { useAppDispatch } from "./hooks";
import { hideLoader, showLoader } from "../features/loader/loaderSlice";

const useVideos = () => {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    const { request, cancel } = videoService.getAll<IVideo>();

    dispatch(showLoader());

    request
      .then((res) => {
        dispatch(hideLoader());
        setVideos(res.data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;

        dispatch(hideLoader());
        setError(err.message);
      });

    return () => cancel();
  }, []);

  return { videos, error };
};

export default useVideos;
