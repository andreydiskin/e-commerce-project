import axios from "axios";
import { storeGetToken } from "../Auth/user";
import {
  signUpUrl,
  updateUserUrl,
} from "../Lib/config";

export const signUpService = async (data, isModalOpen) => {
  try {
    const resp = await axios.post(signUpUrl, data);
    isModalOpen(false);
  } catch (error) {
    throw error;
  }
};

export const updateProfileService = async (id, callback, data) => {
  {
    try {
      const config = {
        headers: {
          authorization: storeGetToken(),
        },
       
      };

      const resp = await axios.put(updateUserUrl(id), data, config);
      const userData = resp.data.data;
      console.log(userData);
      callback();
    } catch (error) {
      throw error;
    }
  }
};

