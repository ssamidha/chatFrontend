const axios = require("axios");

var url = "http://localhost:7000";

//this will go to the backend
export function register(registerData) {
  console.log("register data in services--> ", registerData);
  var register = axios.post(url + "/register", registerData);
  return register;
}

export function login(loginData) {
  console.log("log in data in services--> ", loginData);
  var login = axios.post(url + "/login", loginData);
  return login;
}

export function forgetpassword(forgetData) {
  console.log("forget password data in services--> ", forgetData);
  var forget = axios.post(url + "/forgetpassword", forgetData);

  return forget;
}

export function resetpassword(resetData, myToken) {
  console.log("reset password data in services--> ", resetData);
  console.log("token ----->", myToken);
  var reset = axios.post(url + "/resetpassword", resetData, {
    headers: {
      token: myToken
    }
  });

  return reset;
}

export function getAllUser() {
  var users = axios.get(url + "/getAllUser");

  return users;
}

export function getAllMessages() {
  var messages = axios.get(url + "/getMessage");
  // console.log("messages in services",messages);
  

  return messages;
}
