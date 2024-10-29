import create from "./http-service";

export interface IVideo {
  video_id: string;
  title: string;
  description: string;
  video_url: string;
  thumbnail_url: string;
  date: null;
  status: string;
}

export default create("?gofor=videoslist");
