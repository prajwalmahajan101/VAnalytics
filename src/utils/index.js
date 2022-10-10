import { useState} from "react";

export const API_URLS = {
    login: () => "/accounts/login",
    validateLogin:()=>"/accounts/ValidateLogin",
    logout:()=>"/accounts/logout",
}

export const LOCALSTORAGE_TOKEN_KEY = "__web_Token__";

export const setItemInLocalStorage = (key, value) => {
  if (!key || !value) {
    return console.error("Can not store in LS");
  }
  const valueToStore =
    typeof value !== "string" ? JSON.stringify(value) : value;
  localStorage.setItem(key, valueToStore);
};

export const getItemFromLocalStorage = (key) => {
  if (!key) {
    return console.error("Can get the value from LS");
  }
  return localStorage.getItem(key);
};

export const removeItemFromLocalStorage = (key) => {
  if (!key) {
    return console.error("Can get the value from LS");
  }
  localStorage.removeItem(key);
};


export const validateInput = (inputsData) =>{
  for( const prop in inputsData){
    if(inputsData[prop]==="") return false;
  }
  return true;
}


export const useFormData = (initialData) =>{
  const [value,setValue] = useState(initialData);
  const onChange = (event) =>{
    setValue(event.target.value);
  }
  return {
    value,
    onChange
  }
}