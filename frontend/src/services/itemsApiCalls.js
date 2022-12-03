import axios from "axios";
import { storeGetToken } from "../Auth/user";
import {
    getItemsByQueryUrl,
} from "../Lib/config";

export const getItemsByQueryService = async (query, callback) => {
  try {
    const config = {
      headers: {
        authorization: storeGetToken(),
      },
    };

    const resp = await axios.get(getItemsByQueryUrl(query), config);
    const petData = resp.data.data;
    callback(petData);
  } catch (error) {
    throw error;
  }
};
