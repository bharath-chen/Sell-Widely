import create from "./http-service";

interface ProductDetails {
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
  key_benefits: string;
}

interface ProductAttributes {
  prod_attri_id: string;
  product_id: string;
  size_id: string;
  product_measuring_unit_id: string;
  product_purchase_price: string;
  product_mrp: string;
  unit_price: string;
  discount: string;
  selling_price: string;
  quantity: string;
  reordered_level: string;
  attstatus: string;
  created_date: string;
  modified_date: string;
  measurement_name: string;
}

interface ProductExpertTalk {
  pro_exptalk_id: string;
  product_id: string;
  image: string;
  doctor_id: string;
  content: string;
  status: string;
  created_date: string;
}

interface ProductFeedback {
  prodcustfb_id: string;
  customer_id: string;
  name: string;
  product_id: string;
  user_ratings: string;
  comments: string;
  status: string;
}

interface ProductTag {
  pro_tag_id: string;
  product_id: string;
  tag_id: string;
  status: string;
}

interface ProductIngredient {
  pro_cat_id: string;
  product_id: string;
  ingredient_id: string;
  status: string;
}

export interface ProductDetail {
  product_details: ProductDetails[];
  product_attributes: ProductAttributes[];
  product_experttalk: ProductExpertTalk[];
  product_feedback: ProductFeedback[];
  product_tags: ProductTag[];
  product_ingred: ProductIngredient[];
}

export default create("?gofor=productdetail");
