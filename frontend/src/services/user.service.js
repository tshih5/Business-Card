import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/core/current_user";

const getPublicContent = () => {
  const header =  authHeader();
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(header);
  return axios.get(`${API_URL}`, {
  // return axios.get(`${API_URL}${user.user_id}`, {
    headers:{
      "Authorization": header,
    }
  });
};

export default {
  getPublicContent
};