import create from "./http-service";

interface FeaturedProduct {
  product_id: string;
  product_code: string;
  product_name: string;
  product_image1: string;
  product_image2: string;
  product_image3: string;
  product_image4: string;
  product_image5: string;
  video: string;
  audio: string;
  howtouse: string;
  suitablefor: string;
  is_nutraceutical: string;
  bottom_image: string;
  full_description: string;
  short_description: string;
  barcode: string;
  barcode_image: string;
  product_sgst: string;
  product_cgst: string;
  recomm_gender: string;
  nat_of_prod: string;
  herb_type: string;
  is_featured: string;
  is_combo: string;
  pres_req: string;
  is_offer: string;
  offer: string;
  user_ratings: string;
  almaa_ratings: string;
  status: string;
  created_date: string;
  modified_date: string;
}

export interface FeatureProductResponse {
  newProdGet: FeaturedProduct[];
  offerprodGet: FeaturedProduct[];
  bestprodGet: FeaturedProduct[];
  favprodGet: FeaturedProduct[];
}

export default create("?gofor=homepage");
