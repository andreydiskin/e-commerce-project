import axios from "axios";
import { storeGetToken } from "../Auth/user";
import {
  addItemToCartUrl,
  addItemUrl,
  addProductToWishListUrl,
  changeProductAmountInCartUrl,
  checkIsInWishListUrl,
  createOrdersUrl,
  getItemByIdUrl,
  getItemsByQuery,
  getOrderByIdUrl,
  removeFromCartUrl,
  removeProductFromWishListUrl,
  updateItemByIdUrl,
} from "../Lib/config";

export const purchaseProductsService = async (user, totalPrice, callback) => {
  try {
    const config = {
      headers: {
        token: storeGetToken(),
      },
    };
    const body = {
      userId: user._id,
      address: user.address,
      amount: totalPrice,
    };
    const resp = await axios.post(createOrdersUrl, body, config);
    callback(resp.data._id);
  } catch (error) {
    throw error;
  }
};

export const getOrderByIdService = async (id, callback) => {
  try {
    const config = {
      headers: {
        token: storeGetToken(),
      },
    };
    const resp = await axios.get(getOrderByIdUrl(id), config);
    callback(resp.data);
  } catch (error) {
    throw error;
  }
};

export const removeItemFromWishListService = async (
  userId,
  productId,
  callback
) => {
  try {
    const config = {
      headers: {
        token: storeGetToken(),
      },
    };
    const body = {
      userId,
      productId,
    };

    const data = await axios.post(removeProductFromWishListUrl, body, config);
    callback(data.data);
  } catch (error) {
    throw error;
  }
};

export const checkIfProductInWishListService = async (
  userId,
  productId,
  callback
) => {
  try {
    const config = {
      headers: {
        token: storeGetToken(),
      },
    };

    const res = await axios.get(
      checkIsInWishListUrl(userId, productId),
      config
    );
    callback(res.data);
  } catch (error) {
    throw error;
  }
};

export const removeProductFromCartService = async (
  userId,
  productId,
  callback
) => {
  try {
    const config = {
      headers: {
        token: storeGetToken(),
      },
    };
    const body = {
      userId,
      productId,
    };

    const res = await axios.post(removeFromCartUrl, body, config);
    callback(res.data);
  } catch (error) {
    throw error;
  }
};

export const addItemService = async (data, callback) => {
  try {
    const config = {
      headers: {
        token: storeGetToken(),
      },
    };
    // workaround for future multi category support
    if (data.categories !== undefined) data.categories = [data.categories];
    const resp = await axios.post(addItemUrl, data, config);
    const { _id } = resp.data;
    callback(_id);
  } catch (error) {
    throw error;
  }
};

export const getItemsByQueryService = async (query, callback) => {
  try {
    const config = {
      headers: {
        token: storeGetToken(),
      },
    };

    const resp = await axios.get(getItemsByQuery(query), config);
    const items = resp.data;
    callback(items);
  } catch (error) {
    throw error;
  }
};

export const getItemByIdService = async (id, callback) => {
  try {
    const config = {
      headers: {
        token: storeGetToken(),
      },
    };
    const resp = await axios.get(getItemByIdUrl(id), config);
    const itemData = resp.data;
    callback(itemData);
  } catch (error) {
    throw error;
  }
};

export const updateItemByIdService = async (id, data, callback) => {
  try {
    const config = {
      headers: {
        token: storeGetToken(),
      },
    };
    const resp = await axios.put(updateItemByIdUrl(id), data, config);
    const itemData = resp.data;
    callback(itemData);
  } catch (error) {
    throw error;
  }
};

// get items with newest query
export const getNewestItemService = async (url, callback) => {
  try {
    const config = {
      headers: {
        token: storeGetToken(),
      },
    };
    const resp = await axios.get(url, config);
    const items = resp.data;
    callback(items);
  } catch (error) {
    throw error;
  }
};

export const addItemToCartService = async (
  itemId,
  itemAmount,
  userId,
  callback
) => {
  try {
    const config = {
      headers: {
        token: storeGetToken(),
      },
    };
    const body = {
      product: {
        productId: itemId,
        quantity: itemAmount,
      },
      id: userId,
    };
    const resp = await axios.post(addItemToCartUrl, body, config);

    callback(resp.data);
  } catch (error) {
    throw error;
  }
};

export const addItemToWishListService = async (itemId, userId, callback) => {
  try {
    const config = {
      headers: {
        token: storeGetToken(),
      },
    };
    const body = {
      product: {
        productId: itemId,
        quantity: 1,
      },
      id: userId,
    };
    const resp = await axios.post(addProductToWishListUrl, body, config);

    callback(resp.data);
  } catch (error) {
    throw error;
  }
};

export const getCartService = async (url, callback) => {
  try {
    const config = {
      headers: {
        token: storeGetToken(),
      },
    };
    const resp = await axios.get(url, config);
    const items = resp.data;
    callback(items);
  } catch (error) {
    throw error;
  }
};

export const updateProductAmountInCartService = async (
  userId,
  productId,
  quantity,
  callback
) => {
  try {
    const config = {
      headers: {
        token: storeGetToken(),
      },
    };
    const body = {
      userId,
      productId,
      quantity,
    };
    const resp = await axios.put(changeProductAmountInCartUrl, body, config);
    callback(resp.data);
  } catch (error) {
    throw error;
  }
};
