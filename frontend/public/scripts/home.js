import { BASE_URL } from "./constants.js";

const authToken = sessionStorage.getItem("JWT_TOKEN");

// route protection
if (authToken == null) {
    location.href = "./login.html";
}

console.log(authToken);