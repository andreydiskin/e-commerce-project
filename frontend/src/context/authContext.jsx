import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { storeGetUserId, storeIsLoggedIn, storeLogin, storeLogout } from "../Auth/user";
import { fetchUrl } from "../Lib/axios";
import {meUrl} from "../Lib/config";
export const authContext = createContext();

export const AuthContextProvider = (props) => {
  const [isUser, setIsUser] = useState(storeIsLoggedIn());
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    console.log("is user test", isUser)
    if (isUser) {
      const id = storeGetUserId();
      console.log("meUrl+id",meUrl+id);
      fetchUrl(meUrl)
        .then((u) => {
    console.log("user data",u);
          setUser(u);
        })
        .catch(setUser({}));
    }
  }, [isUser]);

  const refreshUser = () => {
    if (isUser) {
      fetchUrl(meUrl(user._id))
        .then((u) => {
          setUser(u);
        })
        .catch(setUser({}));
    }
  };

  const login = (token) => {
    storeLogin(token);
    setIsUser(storeIsLoggedIn());
    console.log("user update",storeIsLoggedIn(),isUser)
    navigate("/cart");
  };

  const logout = () => {
    storeLogout();
    setIsUser(storeIsLoggedIn());
    navigate("/");
  };

  const updateUser = () => {
    fetchUrl(meUrl)
      .then((u) => {
        setUser(u);
      })
      .catch(setUser({}));
  };

  const value = {
    isUser,
    login,
    logout,
    user,
    updateUser,
    refreshUser,
    setUser
  };

  return (
    <authContext.Provider value={value}>{props.children}</authContext.Provider>
  );
};
