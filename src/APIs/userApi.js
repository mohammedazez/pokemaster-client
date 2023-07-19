import axios from "axios";

const Axios = axios.create({
  baseURL: "https://6073839ce4e0160017ddfaa6.mockapi.io/pokemaster",
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
