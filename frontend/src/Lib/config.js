export const urlBase = "http://localhost:4000";

export const petsUrl = "/pets/";

export const itemsUrl = "/items/";

export const usersUrl = "/users/";

export const meUrl = urlBase + usersUrl + "me";

export const nis = "NIS";
export const usd = "USD";

export const loginUrl = urlBase + usersUrl + "login";
export const signUpUrl = urlBase + usersUrl + "signup";

export const getAllUsersUrl = urlBase + usersUrl;
export const getFullUsersDataUrl = (id) => urlBase + usersUrl + id + "/full";

export const updateUserUrl = (id) => urlBase + usersUrl + id;

export const getItemsByQueryUrl = (query) => urlBase + itemsUrl + "?" + query;
