import axios from "axios";

const postsServicesApi = axios.create({
  baseURL: "http://localhost:8081",
});

postsServicesApi.interceptors.request.use(function (config) {
  const groupoUser = JSON.parse(localStorage.getItem("groupoUser"));
  const token = groupoUser.token;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default postsServicesApi;
