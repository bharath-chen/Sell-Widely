import create from "./http-service";

export interface IFaq {
  faq_id: string;
  question: string;
  answer: string;
  product_id?: string;
  status: string;
}

export default create("?gofor=faq");
