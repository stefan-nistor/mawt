import { BASE_URL, JWT_TOKEN } from "./constants.js";

var email = "";
var password;
var regex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
var verifyEmail;


const getEmail = () => {
    email = document.querySelector("#email").value;
    verifyEmail = regex.exec(email);
    return email;
}

const getPassword = () => {
    password = document.querySelector("#password").value;
    return password;
}

const checkIfCompleted = () => {
    getEmail();
    getPassword();

    document.getElementById("textError1").style.display = "none";
    document.getElementById("textError2").style.display = "none";
    document.getElementById("textSuccess").style.display = "none";
    document.getElementById("textErrorLogin").style.display = "none";

    if (verifyEmail != null && password.length > 7) {
        return true;
    } else {
        if (password.length < 8) {
            document.getElementById("textError1").style.display = "block";

        }
        if (verifyEmail == null) {
            document.getElementById("textError2").style.display = "block";
        }

        return false;
    }
}

const loginUser = async() => {
    if (!checkIfCompleted()) {
        return;
    }

    try {
        const response = await axios.post(`${BASE_URL}/auth/login`, JSON.stringify({
            email: email,
            password: password
        }));

        console.log(response);
        // document.getElementById("textSuccess").style.display = "block";
        alert("Login successful");
        JWT_TOKEN.value = response.data.token;

        location.href = "./home.html";
        return response;
    } catch (err) {
        console.log(err);
        let errText = document.getElementById("textErrorLogin");
        errText.textContent = "Error at login: " + err.response.data.message;
        errText.style.display = "block";
        return err;
    }
}

const registerBtn = document.querySelector('#loginBtn');
registerBtn.addEventListener('click', loginUser, false);