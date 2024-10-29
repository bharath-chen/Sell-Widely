export interface AuthState {
  customer_id: string;
  first_name: string;
  last_name: string;
  email: string;
  mobilenumber: string;
  registration_type: string;
  status: string;
  otp_status: string;
  created_date: string | null;
  modified_date: string;
}
