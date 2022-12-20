import axios from "axios";
import { storeGetToken, storeLogin, storeUserId } from "../Auth/user";
import {
  getSecretQuestionUrl,
  loginUrl,
  sendSecretAnswerUrl,
  uploadUrl,
} from "../Lib/config";

export const loginApiCall = async (data, callback, isModalOpen) => {
  try {
    const resp = await axios.post(loginUrl, data);
    const { accessToken } = resp.data;
    storeUserId(resp.data._id);
    callback(accessToken);
    isModalOpen(false);
  } catch (error) {
    throw error;
  }
};

export const getSecretQuestionApiCall = async (username, callback) => {
  try {
    const resp = await axios.post(getSecretQuestionUrl, { username: username });
    callback(resp.data.secretQuestion);
  } catch (error) {
    throw error;
  }
};

export const sendSecretAnswerApiCall = async (
  secretAnswer,
  username,
  callback
) => {
  try {
    const resp = await axios.post(sendSecretAnswerUrl, {
      secretAnswer: secretAnswer,
      username: username,
    });
    const { accessToken } = resp.data;
    storeUserId(resp.data._id);
    storeLogin(accessToken);

    callback();
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
    const formData = new FormData();

    formData.set("image", file);

    const resp = await axios.post(uploadUrl, formData, config);
    return resp.data;
  } catch (error) {
    throw error;
  }
};
