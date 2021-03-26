import axios from "axios";

const SIGNIN_URL = "http://localhost:8000/token/";
const REGISTER_URL = "http://localhost:8000/core/users/";

const register = (username, password, first_name, last_name, email) => {
  return axios.post(REGISTER_URL, {
    username,
    first_name,
    last_name,
    email,
    password,
  });
  
};

const login = (username, password) => {
  return axios
    .post(SIGNIN_URL, {
      username: username,
      password: password,
    })
    .then((response) => {
      let payload;
      if (response.data.access) {
        console.log(response.data);
        payload = response.data;
        let parsed = parseJwt(response.data.refresh);
        payload = {...payload, "user_id": parsed["user_id"]}
        console.log(payload);
        localStorage.setItem("user", JSON.stringify(payload));
      }
      return payload !== null? payload: response;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};

function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};