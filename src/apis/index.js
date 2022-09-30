import axios from "./axios" 
import { API_URLS } from "../utils";

export const loginPostCall = (email, password) => {
    return axios.post(API_URLS.login(),JSON.stringify({ email, password }))
};
  