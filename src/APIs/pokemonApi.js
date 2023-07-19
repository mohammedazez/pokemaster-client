import axios from "axios";

const Axios = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
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
