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

    document.getElementById("textError1").style.display = "none";
    document.getElementById("textError2").style.display = "none";

    if (verifyEmail != null && password.length > 7) {
        location.href = "./home.html";
    } else {
        if (password && password.length < 8) {
            document.getElementById("textError1").style.display = "block";

        }
        if (email && verifyEmail == null) {
            document.getElementById("textError2").style.display = "block";
        }

    }
}