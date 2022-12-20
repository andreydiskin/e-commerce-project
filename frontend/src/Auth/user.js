const TOKEN = "Token";

export const storeLogin = (token) => localStorage.setItem(TOKEN, token);
export const storeLogout = () => localStorage.removeItem(TOKEN);
export const storeGetToken = () => localStorage.getItem(TOKEN);

// store user id in local storage
export const storeUserId = (id) => localStorage.setItem("userId", id);
export const storeGetUserId = () => localStorage.getItem("userId");

export const storeIsLoggedIn = () => {
  return storeGetToken() ? true : false;
};
