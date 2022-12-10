import axios from "axios";
import { storeGetToken } from "../Auth/user";




export const fetchUrl = (url) => {
  return new Promise((res, rej) => {
    const config = {
      headers: {
        token: storeGetToken(),
      },
   
    };
console.log("url",url)
    axios
      .get(url, config)
      .then((resp) => {
        console.log("resp",resp);
        res(resp.data);
      })
      .catch((resp) => {
        console.log("resp",resp);

        rej(resp.response.data.message);
      });
  });
};
