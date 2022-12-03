import axios from "axios";
import { loginUrl } from "../Lib/config";

export const loginApiCall = async (data, callback, isModalOpen) => {
  try {
    const resp = await axios.post(loginUrl, data);

    const { access_token } = resp.data.data;
    callback(access_token);
    isModalOpen(false);
  } catch (error) {
    throw error;
  }
};

