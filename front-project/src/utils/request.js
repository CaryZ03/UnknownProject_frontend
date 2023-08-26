import axios from "axios";
import store from "@/store";
// import Cookies from 'js-cookie'

// const token = Cookies.get('token')
// axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
// axios.defaults.withCredentials = true;

// axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
axios.defaults.withCredentials = true;

const request = axios.create({
  baseURL: 'http://182.92.86.71:4514/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
})

request.interceptors.request.use(
  config => {
    var token_key = localStorage.getItem("token")

    if (token_key) {
      config.headers['Authorization'] = token_key;
    }
    return config;
  },
  error => {
    console.log(error)
    return Promise.reject(error);
  }
);

export default request 