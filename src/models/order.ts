import { ProductDetail } from "../services/product-detail-service";
import { Address } from "./address";

export interface OrderDetail {
  order_detail_id: string;
  order_id: string;
  product_id: string;
  quantity: string;
  order_detail_status: string;
  order_detail_created: string;
  order_detail_updated: string;
}

export interface Order {
  address_id: string;
  order_id: string;
  customer_id: string;
  invoice_number: string;
  fullquantity: string;
  invoice_amount: string;
  discount: string;
  tax: string;
  coupon_amount: string;
  delivery_charge: string;
  total_amount: string;
  date: string;
  delivery_status: string;
  delivered_date: string;
  payment_mode: string;
  coupon_id: string;
  tracking_id: string;
  order_status: string;
  currency: string;
  status: string;
  created: string;
  updated: string;
}

export interface ProductDetailData {
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
  howtouse: string; // Consider using a more structured type if you want to process this data further
  suitablefor: string;
  key_benefits: string; // Same as above
  is_nutraceutical: string; // Consider using boolean instead (true/false)
  bottom_image: string;
  full_description: string;
  short_description: string;
  barcode: string;
  barcode_image: string;
  product_sgst: string; // Consider using number if you want to perform calculations
  product_cgst: string; // Same as above
  recomm_gender: string; // Could use an enum if you have fixed values
  nat_of_prod: string; // Could use an enum if you have fixed values
  herb_type: string; // Could use an enum if you have fixed values
  is_featured: string; // Consider using boolean instead (true/false)
  is_combo: string; // Consider using boolean instead (true/false)
  pres_req: string; // Consider using boolean instead (true/false)
  is_offer: string; // Consider using boolean instead (true/false)
  offer: string; // Consider using number or boolean depending on your use case
  user_ratings: string; // Could be a number type for ratings
  almaa_ratings: string; // Same as above
  status: string; // Could use an enum for status
  created_date: string; // Consider using Date type if you need to manipulate it
  modified_date: string; // Same as above
  prod_attri_id: string;
  size_id: string; // Could define an interface for size details
  product_measuring_unit_id: string; // Could define an interface for units
  product_purchase_price: string; // Consider using number type
  product_mrp: string; // Consider using number type
  unit_price: string; // Consider using number type
  discount: string; // Consider using number type
  selling_price: string; // Consider using number type
  quantity: string; // Consider using number type
  reordered_level: string; // Consider using number type
  attstatus: string; // Could define a more meaningful type or enum
}

export interface OrderData {
  order: Order;
  addressDetails: Address[];
  orderDetails: OrderDetail[];
  products: ProductDetailData[];
}
