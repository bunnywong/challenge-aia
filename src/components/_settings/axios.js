import _axios from "axios";

const axios = (baseURL) => {
  return _axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 5000,
  });
};

export default axios();
