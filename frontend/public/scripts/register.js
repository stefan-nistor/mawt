import { BASE_URL, JWT_TOKEN } from "./constants.js";

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

    if (verifyEmail != null && password.length > 7 && password == password2) {
        // location.href = "./home.html";
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

const registerUser = () => {
    if (!checkIfCompleted()) {
        return;
    }

    console.log('asd1');

    fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-type': 'text/plain',
            },
            body: {
                email: email,
                password: password
            }
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));

    // axios.post(`${BASE_URL}/auth/register`, {
    //     email: email,
    //     password: password
    // }).then((res) => {
    //     console.log(res);
    // }).catch((err) => {
    //     console.log(err);
    // });
}

const makeReq = async(user) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/register`, {
            email: email,
            password: password
        });

        console.log(response);
        return response;
    } catch (err) {
        console.log(err);
        return err;
    }
}

const registerBtn = document.querySelector('#registerBtn');
registerBtn.addEventListener('click', registerUser, false);