import create from "./http-service";

export interface IDoctor {
  doctor_id: string;
  name: string;
  specialization: string;
  qualification: string;
  profile_picture: string;
  status: string;
}

export default create("?gofor=doctorslist");
