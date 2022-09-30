import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import jwt from "jwt-decode";
import { loginPostCall } from "../apis";
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

  useEffect(() => {
    const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    if (userToken) {
      const user = jwt(userToken);
      user["userType"] = user.type;
      setUser(user);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      let response = await loginPostCall(email, password);
      if (response.success) {
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
  const logout = () => {
    setUser(null);
    removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
  };
  return {
    user,
    loading,
    login,
    logout,
  };
};