export const urlBase = "http://localhost:3002";

export const imgsBucketUrl="https://items-app.s3.eu-west-2.amazonaws.com/";

export const productsUrl = "/api/products/";

export const usersUrl = "/api/users/";

export const newestItemsUrl = urlBase + productsUrl + "showcaseproducts";

export const meUrl =urlBase+usersUrl+"me/" ;

export const nis = "NIS";
export const usd = "USD";

export const addItemUrl = urlBase + productsUrl;

export const loginUrl = urlBase+ "/api/login";
export const signUpUrl = urlBase +"/api/signup";

export const cartUrl = urlBase + "/api/carts/";


export const getPetUrl = (id) => urlBase + productsUrl + id;

export const getAllUsersUrl = urlBase + usersUrl;
export const getFullUsersDataUrl = (id) => urlBase + usersUrl + id + "/full";
export const getItemsByQuery = (query) => urlBase + productsUrl + "query/?" + query;
export const getUserPetsAllUrl = (id) => urlBase + productsUrl + "/user/" + id;

export const updatePetUrl = (id) => urlBase + productsUrl + id;

export const updateUserUrl = (id) => urlBase + usersUrl + id;

export const publicPicUrlBase = urlBase + "/images/";

export const imagesBaseUrl = `https://pet-app-images.s3.eu-west-2.amazonaws.com/`;

export const editItemBaseUrl = "/items/edit/";

export const savePetUrl = (id) => urlBase + productsUrl + `/${id}/save`;

export const returnPetUrl = (id) => urlBase + productsUrl + `/${id}/return`;

export const adoptPetUrl = (id) => urlBase + productsUrl + `/${id}/adopt`;

export const seeMorePetBaseUrl = "/search/";


export const uploadUrl = urlBase + "/upload/item";