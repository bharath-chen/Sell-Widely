import { Product } from "./product";

export interface Wishlist {
  wishlist: WishlistDetail[];
  productdetail: Product[];
}

export interface WishlistDetail {
  wishlist_id: string;
  customer_id: string;
  product_id: string;
  status: string;
  created_date: string;
}
