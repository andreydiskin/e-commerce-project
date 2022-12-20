import axios from "axios";
import { storeGetToken } from "../Auth/user";
import {
  getAllUsersUrl,
  getUserDataUrl,
  getUserOrdersUrl,
  signUpUrl,
  updateUserUrl,
} from "../Lib/config";
import { loginApiCall } from "./apicalls";

export const signUpService = async (data, isModalOpen, loginCallback) => {
  try {
    const resp = await axios.post(signUpUrl, data);
    await loginApiCall(data, loginCallback, isModalOpen);
  } catch (error) {
    throw error;
  }
};

export const updateProfileService = async (id, callback, data) => {
  {
    try {
      const config = {
        headers: {
          token: storeGetToken(),
        },
      };

      const resp = await axios.put(updateUserUrl(id), data, config);
      const userData = resp.data;
      console.log(userData);
      callback();
    } catch (error) {
      throw error;
    }
  }
};

export const getAllUsersService = async (callback) => {
  try {
    const config = {
      headers: {
        token: storeGetToken(),
      },
    };
    const resp = await axios.get(getAllUsersUrl, config);
    const data = resp.data;
    callback(data);
  } catch (error) {
    throw error;
  }
};

export const getUserDataService = async (id, callback) => {
  try {
    const config = {
      headers: {
        token: storeGetToken(),
      },
    };
    const resp = await axios.get(getUserDataUrl(id), config);
    callback(resp.data);
  } catch (error) {
    throw error;
  }
};

export const getUserOrdersService = async (id, callback) => {
  try {
    const config = {
      headers: {
        token: storeGetToken(),
      },
    };
    const resp = await axios.get(getUserOrdersUrl(id), config);
    callback(resp.data);
  } catch (error) {
    throw error;
  }
};
