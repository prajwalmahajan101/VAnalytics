import axios from "./axios" 
import {API_URLS, getItemFromLocalStorage, LOCALSTORAGE_TOKEN_KEY} from "../utils";

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

export const resetPasswordCall = (username, password) =>{
    const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    return axios.post(API_URLS.resetPassword(),JSON.stringify({username,password}),{
        headers: {
            'Authorization': 'Token '+userToken,
            'Content-Type': 'application/json'
        }
    })
}

export const singUpCall = (data) =>{
    return axios.post(API_URLS.signup(),JSON.stringify(data),{
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const getRecords = (data) =>{
    const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    return axios.post(API_URLS.getRecords(),JSON.stringify(data),{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token '+userToken
        }
    })
}

export const uploadImage = (formData) =>{
    const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    return axios.post(API_URLS.uploadImage(),formData,{
        headers: {
            'Authorization': 'Token '+userToken
        }
    })
}


export const pushVehicleData = (data) =>{
    const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    return axios.post(API_URLS.createVehicleData(),JSON.stringify(data),{
        headers: {
            'Authorization': 'Token '+userToken,
            'Content-Type': 'application/json'
        }
    })
}


export const getDailyKPI= (sdate,edate) =>{
    const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    return axios.get(API_URLS.dailyKPI(sdate,edate),{
        headers: {
            'Authorization': 'Token '+userToken
        }
    })

}