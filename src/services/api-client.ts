import axios, { CanceledError } from "axios";

const baseUrl = import.meta.env.VITE_API_URL;
export default axios.create({ baseURL: `${baseUrl}/api.php` });

export { CanceledError };
