import { BASE_URL } from "./constants.js";

var email = "";
var password;
var regex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
var verifyEmail;
var password2;

const getEmail = () => {
    email = document.querySelector("#email").value;
    verifyEmail = regex.exec(email);
    return email;
}

const getPassword1 = () => {
    password = document.querySelector("#password1").value;
    return password;
}

const getPassword2 = () => {
    password2 = document.querySelector("#password2").value;
    return password;
}

const checkIfCompleted = () => {
    getEmail();
    getPassword1();
    getPassword2();

    document.getElementById("textError1").style.display = "none";
    document.getElementById("textError2").style.display = "none";
    document.getElementById("textError3").style.display = "none";
    document.getElementById("textSuccess").style.display = "none";
    document.getElementById("textErrorRegister").style.display = "none";

    if (verifyEmail != null && password.length > 7 && password == password2) {
        return true;
    } else {
        if (password.length < 8) {
            document.getElementById("textError1").style.display = "block";
        }
        if (verifyEmail == null) {
            document.getElementById("textError2").style.display = "block";
        }
        if (password != password2) {
            document.getElementById("textError3").style.display = "block";
        }
        return false;
    }
}

const registerUser = async() => {
    if (!checkIfCompleted()) {
        return;
    }

    try {
        const response = await axios.post(`${BASE_URL}/auth/register`, JSON.stringify({
            email: email,
            password: password
        }));

        console.log(response);
        // document.getElementById("textSuccess").style.display = "block";
        alert("Register successful");
        location.href = "./login.html";
        return response;
    } catch (err) {
        console.log(err);
        let errText = document.getElementById("textErrorRegister");
        errText.textContent = "Error at register: " + err.response.data.message;
        errText.style.display = "block";
        return err;
    }
}

const registerBtn = document.querySelector('#registerBtn');
registerBtn.addEventListener('click', registerUser, false);