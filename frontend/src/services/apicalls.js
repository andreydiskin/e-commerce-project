import axios from "axios";
import { storeGetToken, storeUserId } from "../Auth/user";
import { loginUrl, uploadUrl } from "../Lib/config";

export const loginApiCall = async (data, callback, isModalOpen) => {
  try {
    const resp = await axios.post(loginUrl, data);
    const { accessToken } = resp.data;
    storeUserId(resp.data._id);
    console.log("accessToken",accessToken)
    callback(accessToken);
    isModalOpen(false);
  } catch (error) {
    throw error;
  }
};

export const uploadImage = async (target) => {
  try {
    const config = {
      headers: {
        token: storeGetToken(),
      },
    };

    const file = target.files[0];
    console.log("file",file)
    const formData = new FormData();

    formData.set("image", file);

    const resp = await axios.post(
      uploadUrl,
      formData,
      config
    );
console.log("resp upload",resp)
    return resp.data;
  } catch (error) {
    throw error;
  }
};
