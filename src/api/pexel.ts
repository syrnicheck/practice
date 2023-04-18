import axios from 'axios';
import  {API_BASE_URL, API_KEY} from "../constants/app"


export const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Authorization': API_KEY
    }
});