import axios from "axios";
import { storeGetToken } from "../Auth/user";
import {
  addItemUrl,
  addPetUrl,
  adoptPetUrl,
  getItemsByQuery,
  getPeByQueryUrl,
  getPetUrl,
  returnPetUrl,
  savePetUrl,
  updatePetUrl,
} from "../Lib/config";

export const savePetService = async (id, isSave, callback) => {
  try {
    const config = {
      headers: {
        authorization: storeGetToken(),
      },
    
    };
    let resp = null;
    if (isSave) {
      resp = await axios.post(savePetUrl(id), null, config);
    } else {
      resp = await axios.delete(savePetUrl(id), config);
    }
    callback();
  } catch (error) {
    throw error;
  }
};

export const adoptPetService = async (id, isAdopt, callback) => {
  try {
    const data = { adoptionStatus: isAdopt ? "Adopted" : "Fostered" };
    const config = {
      headers: {
        authorization: storeGetToken(),
      },
    
    };
    // data is : {adoptionStatus:"Adopted"} or {adoptionStatus:"Fostered"}
    const resp = await axios.post(adoptPetUrl(id), data, config);
    callback(resp.data.data);
    return;
  } catch (error) {
    throw error;
  }
};

export const returnPetService = async (id, callback) => {
  try {
    const config = {
      headers: {
        authorization: storeGetToken(),
      },
    
    };
    const resp = await axios.post(returnPetUrl(id), null, config);

    const pet = resp.data.data;
    callback(pet);
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
    if(data.categories!==undefined)
      data.categories = [data.categories];
    const resp = await axios.post(addItemUrl, data, config);
    const { _id } = resp.data;
    callback(_id);
  } catch (error) {
    throw error;
  }
};

export const updatePetById = async (id, reqData, callback) => {
  try {
    const config = {
      headers: {
        authorization: storeGetToken(),
      },
    
    };

    const resp = await axios.put(updatePetUrl(id), reqData, config);
    const petData = resp.data.data;
    callback(petData);
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

export const getPetByIdService = async (id, callback) => {
  try {
    const config = {
      headers: {
        authorization: storeGetToken(),
      },
    
    };
    const resp = await axios.get(getPetUrl(id), config);
    const petData = resp.data.data;
    callback(petData);
  } catch (error) {
    throw error;
  }
};

// get items with newst query
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
}

// cartUrl = /api/cart post requests
export const getCartService = async (url,productId,userId, callback) => {
  try {
    const config = {
      headers: {
        token: storeGetToken(),
      },
    
    };
    
    const resp = await axios.post(url, config);
    const items = resp.data;
    callback(items);
  } catch (error) {
    throw error;
  }
}