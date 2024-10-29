import create from "./http-service";

export interface ISidebarFilter {
  nat_of_prod: string[];
  herb_type: string[];
  is_combo: string[];
  is_offer: string[];
  recomm_gender: string[];
}

export default create("?gofor=getfilteroptions");
