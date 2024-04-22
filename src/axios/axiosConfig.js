const { default: axios } = require("axios");

const axiosConfig = {
  baseURL: "https://lmf.com.vn/",
  timeout: 10000,
};

const axiosClient = axios.create(axiosConfig);

axiosClient.interceptors.request.use(
  (request) => {
    // console.log("Starting Request", JSON.stringify(request, null, 2));
    return request;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    // console.log("[REPONSE DATA]:", JSON.stringify(response.data, null, 2));
    console.log("[RESPONSE STATUS]:", response.status);
    return response;
  },
  (err) => {
    return Promise.reject(err);
  }
);

module.exports = { axiosClient };
