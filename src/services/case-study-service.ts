import create from "./http-service";

export interface ICaseStudy {
  case_study_id: string;
  case_details: string;
  title: string;
  diagnosis: string;
  description: string;
  case_study_url: string;
  image_url: string;
  date: null;
  status: string;
  result: string;
}

export default create(null);
