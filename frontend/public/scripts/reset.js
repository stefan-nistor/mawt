import { BASE_URL } from "./constants.js";

var password;
var password2;

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const token = urlParams.get('token')

const getPassword1 = () => {
    password = document.querySelector("#password1").value;
    return password;
}

const getPassword2 = () => {
    password2 = document.querySelector("#password2").value;
    return password;
}

const checkIfCompleted = () => {
    getPassword1();
    getPassword2();

    document.getElementById("textError1").style.display = "none";
    document.getElementById("textError2").style.display = "none";

    if (password.length > 7 && password == password2) {
        return true;
    } else {
        if (password.length < 8) {
            document.getElementById("textError1").style.display = "block";
        }
        if (password != password2) {
            document.getElementById("textError2").style.display = "block";
        }
        return false;
    }
}

const resetBtn = document.getElementById("resetBtn");
resetBtn.addEventListener('click', async() => {
    if (!checkIfCompleted()) {
        return;
    }
    console.log(token);

    try {
        const res = await axios.post(`${BASE_URL}/pwd/reset-password/${token}`, {
            password: password,
        });

        alert('Success:' + res.data.message);
        location.href = "./login.html";
    } catch (err) {
        alert('Error resetting password: ' + err.response.data.message);
    }
})