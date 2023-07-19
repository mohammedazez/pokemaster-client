import axios from "axios";

const Axios = axios.create({
  baseURL: "http://localhost:8099/api/v1/pokemon",
});

// Add a request interceptor
Axios.interceptors.request.use(
  // Do something before request is sent
  function (config) {
    return config;
  },
  // Do something with request error
  function (error) {
    return Promise.reject(error);
  }
);

export default Axios;
