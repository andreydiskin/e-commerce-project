import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  storeGetUserId,
  storeIsLoggedIn,
  storeLogin,
  storeLogout,
} from "../Auth/user";
import { fetchUrl } from "../Lib/axios";
import { meUrl } from "../Lib/config";
export const authContext = createContext();

export const AuthContextProvider = (props) => {
  const [isUser, setIsUser] = useState(storeIsLoggedIn());
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    try {
      if (isUser) {
        const id = storeGetUserId();
        fetchUrl(meUrl)
          .then((u) => {
            setUser(u);
          })
          .catch(setUser({}));
      }
    } catch (error) {
      console.log(error.message);
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
    navigate("/cart");
  };

  const logout = () => {
    storeLogout();
    setIsUser(storeIsLoggedIn());
    setUser({});
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
    setUser,
    setIsUser,
  };

  return (
    <authContext.Provider value={value}>{props.children}</authContext.Provider>
  );
};
