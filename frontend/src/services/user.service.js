import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/api/cards/";
const REFRESH_URL = "http://localhost:8000/api/refresh/";

const getPublicContent = () => {
  const header =  authHeader();
  const user = JSON.parse(localStorage.getItem('user'));
  return axios.get(API_URL, {
    headers:{
      Authorization: 'Bearer ' + user.access //the token is a variable which holds the token
    }
  });
};

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    let refreshToken = JSON.parse(localStorage.getItem('user')).refresh;
    //console.log(refreshToken);
    if (refreshToken  && !originalRequest._retry && error.response.status !== 401) {
      originalRequest._retry = true;
      return axios.post(REFRESH_URL, {refresh: refreshToken})
        .then((res) => {
          if (res.status === 200) {
            let user = JSON.parse(localStorage.getItem('user'));
            user.access = res.data.access;
            localStorage.setItem("user.access", user);
            console.log("Access token refreshed!");
            originalRequest.headers.Authorization = "Bearer " + res.data.access;
            return axios(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);

export default {
  getPublicContent
};