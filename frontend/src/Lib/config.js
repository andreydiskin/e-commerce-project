export const urlBase = "https://andrey-marco-e-commerce.herokuapp.com";

export const imgsBucketUrl = "https://items-app.s3.eu-west-2.amazonaws.com/";

export const productsUrl = "/api/products/";

export const usersUrl = "/api/users/";
export const cartUrl = urlBase + "/api/carts/";
export const wishListUrl = urlBase + "/api/wishlists/";

export const changeProductAmountInCartUrl = cartUrl + "updateproductamount";

export const addProductToWishListUrl = wishListUrl + "addtowishlist";

export const ordersUrl = urlBase + "/api/orders/";

export const getUserOrdersUrl = (id) => ordersUrl + "find/" + id;

export const createOrdersUrl = ordersUrl + "neworder";

export const getOrderByIdUrl = (id) => ordersUrl + id;

export const removeProductFromWishListUrl = wishListUrl + "removefromwishlist";

export const checkIsInWishListUrl = (userId, productId) =>
  wishListUrl + "find/" + userId + "/" + productId;

export const updateUserUrl = (id) => urlBase + usersUrl + id;

export const newestItemsUrl = urlBase + productsUrl + "showcaseproducts";

export const meUrl = urlBase + usersUrl + "me";

export const nis = "NIS";
export const usd = "USD";

export const addItemUrl = urlBase + productsUrl;

export const getCartUrl = (id) => cartUrl + "find/" + id;

export const removeFromCartUrl = cartUrl + "removefromcart";

export const getItemByIdUrl = (id) => urlBase + productsUrl + "find/" + id;

export const updateItemByIdUrl = (id) => urlBase + productsUrl + id;

export const getWishListUrl = (id) => wishListUrl + "find/" + id;

export const addItemToCartUrl = cartUrl + "addtocart";

export const loginUrl = urlBase + "/api/login";

export const getSecretQuestionUrl = loginUrl + "/secretquestion";
export const sendSecretAnswerUrl = loginUrl + "/secretanswer";

export const signUpUrl = urlBase + "/api/signup";

export const getAllUsersUrl = urlBase + usersUrl;
export const getUserDataUrl = (id) => urlBase + usersUrl + "find/" + id;
export const getItemsByQuery = (query) =>
  urlBase + productsUrl + "query/?" + query;

export const updateItemUrl = (id) => urlBase + productsUrl + id;

export const publicPicUrlBase = urlBase + "/images/";

export const editItemBaseUrl = "/items/edit/";

export const seeMoreItemBaseUrl = "/search/";

export const uploadUrl = urlBase + "/upload/item";
