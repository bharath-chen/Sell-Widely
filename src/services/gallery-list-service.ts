import create from "./http-service";

export interface IGallery {
  gallery_id: string;
  title: string;
  image_url: string;
  category: "Landscape" | "Portrait";
  status: string;
}

export default create("?gofor=gallerylist");
