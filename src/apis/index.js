import axios from "./axios" 
import { API_URLS } from "../utils";

export const loginPostCall = (username, password) => {
    return axios.post(API_URLS.login(),JSON.stringify({ username, password }),{
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const loginValidationCall = (token) => {
    return axios.get(API_URLS.validateLogin(),{
        headers: {
            'Authorization': 'Token '+token
        }
    });
};

export const logoutCall = (token) =>{
    return axios.get(API_URLS.logout(),{
        headers: {
            'Authorization': 'Token '+token
        }
    });
}