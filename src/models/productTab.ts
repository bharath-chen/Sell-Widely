import { Product } from "./product";

export interface ProductTab {
  id: string;
  tabname: string;
  selected: boolean;
  products: Product[];
}
