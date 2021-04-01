import axios from "axios";

const SIGNIN_URL = "http://localhost:8000/api/token/";
const REGISTER_URL = "http://localhost:8000/api/jwtauth/register/";
const REFRESH_URL = "http://localhost:8000/api/refresh/";

const register = (username, email, password, first_name, last_name) => {

  return axios
    .post(REGISTER_URL, {
      username:username,
      password:password,
      first_name: first_name,
      last_name: last_name,
      email: email,
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
        let user = parseJwt(payload.access);
        payload = {...payload, "user_id": user.user_id}
        console.log(payload);
        localStorage.setItem("user", JSON.stringify(payload));
      }
      return payload;
    });
};

const refresh = (token) => {
  return axios
  .post(REFRESH_URL, {
    refresh: token,
  })
  .then((response) => {
    console.log(response);
    return response;
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