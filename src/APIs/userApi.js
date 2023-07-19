import axios from "axios";

const Axios = axios.create({
  baseURL: "https://64b7a2a821b9aa6eb078aeb2.mockapi.io/pokemaster",
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
