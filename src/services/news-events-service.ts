import create from "./http-service";

export interface INewsAndEvents {
  event_id: string;
  title: string;
  description: string;
  event_date: string;
  status: string;
  image_url: string;
}

export default create(null);
