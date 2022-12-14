export const API_URLS = {
    login: () => "/accounts/login",
    validateLogin:()=>"/accounts/ValidateLogin",
    logout:()=>"/accounts/logout",
    resetPassword:()=>"/accounts/user/resetPassword",
    signup : ()=>"/accounts/user/register",
    getRecords: ()=>"/apis/GetVehicleData",
    uploadImage: ()=>"/upload/image",
    createVehicleData: () =>"/apis/PushVehicleData",
    dailyKPI:(sdate,edate)=>`/kpis/DailyNewVehicleCount?sdate=${sdate}&edate=${edate}`
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
