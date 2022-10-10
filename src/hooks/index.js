import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { loginPostCall, loginValidationCall , logoutCall} from "../apis";
import {
  setItemInLocalStorage,
  LOCALSTORAGE_TOKEN_KEY,
  removeItemFromLocalStorage,
  getItemFromLocalStorage,
} from "../utils";
export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect( () => {

    const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    if (userToken) {
      loginValidationCall(userToken).then(response=>{
        let user = response.data.user;
        setUser(user);

      }).catch(err=>console.log(err));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      let response = await loginPostCall(username, password);
      if (response.status === 200) {
        setUser(response.data.user);
        setItemInLocalStorage(
          LOCALSTORAGE_TOKEN_KEY,
          response.data.token ? response.data.token : null
        );
        return { message: "User Login In", success: true };
      } else {
        return { message: "Wrong Email or Password", success: false };
      }
    } catch (e) {
      return { message: e.message, success: false };
    }
  };
  const logout = async () => {
    setUser(null);
    const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    await logoutCall(userToken);
    removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
  };
  return {
    user,
    loading,
    login,
    logout,
  };
};