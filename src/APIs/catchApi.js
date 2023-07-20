import axios from "axios";

// http://localhost:5000/api/v1/pokemon
// https://pokemaster-af3f8e6d4ac3.herokuapp.com/api/v1/pokemon
const Axios = axios.create({
  baseURL: "https://pokemaster-af3f8e6d4ac3.herokuapp.com/api/v1/pokemon",
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
