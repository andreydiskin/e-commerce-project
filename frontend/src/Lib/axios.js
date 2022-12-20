import axios from "axios";
import { storeGetToken } from "../Auth/user";

export const fetchUrl = (url) => {
  return new Promise((res, rej) => {
    const config = {
      headers: {
        token: storeGetToken(),
      },
    };
    axios
      .get(url, config)
      .then((resp) => {
        res(resp.data);
      })
      .catch((resp) => {
        rej(resp.response.data.message);
      });
  });
};
