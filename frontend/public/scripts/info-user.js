import { BASE_URL } from "./constants.js";

const authToken = sessionStorage.getItem("JWT_TOKEN");

if (authToken == null) {
    location.href = "./login.html"
}

let email;
let password;
const regex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
var verifyEmail;

const getUser = () => {
    email = document.querySelector("#email").value;
    verifyEmail = regex.exec(email);
    return email;
}

const getPassword = () => {
    password = document.querySelector("#password").value;
    return password;
}

const checkIfCompleted = () => {
    getUser();
    getPassword();
    if (verifyEmail != null && password.length > 7) {
        location.href = "./index.html";
    } else {

        if (password.length < 8) {
            const container = document.getElementById("fieldsMain");
            container.insertAdjacentHTML(
                'afterbegin',
                `<span style="color: red; font-size: x-small "> password must be at least 8 characters</span>`,
            );
        }
        if (verifyEmail == null) {
            const container = document.getElementById("fieldsMain");
            container.insertAdjacentHTML(
                'afterbegin',
                `<span style="color: red; font-size: x-small "> invalid email address</span>`,
            );
        }

    }
}

const getCurrentUser = (token) => {
    try {

    } catch (err) {
        console.log(err);
    }
}

const updateBtn = document.getElementById("updateBtn");
updateBtn.addEventListener('click', () => {

});

const deleteBtn = document.getElementById("deleteBtn");
deleteBtn.addEventListener('click', () => {

});

const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem("JWT_TOKEN");
    location.href = "./login.html";
})