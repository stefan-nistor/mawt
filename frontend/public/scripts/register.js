var user = "";
var password;
var regex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
var verifyUser;
var password2;

const getUser = () => {
    user = document.querySelector("#username").value;
    verifyUser = regex.exec(user);
    console.log(verifyUser);
}

const getPassword1 = () => {
    password = document.querySelector("#password1").value;
    console.log(password);

}

const getPassword2 = () => {
    password2 = document.querySelector("#password2").value;
    console.log(password2);
}

const checkIfCompleted = () => {
    if (verifyUser != null && password.length > 7 && password == password2) {
       
        location.href = "./home.html";
        return true;
    } else {

        document.getElementById("textError1").style.display="none";
        document.getElementById("textError2").style.display="none";
        document.getElementById("textError3").style.display="none";
        if (password.length < 8) {
            document.getElementById("textError1").style.display="block";
        }
        if (verifyUser == null) {
            document.getElementById("textError2").style.display="block";
        }
        if (password != password2) {
            document.getElementById("textError3").style.display="block";
        }
        return false;
    }
}

const registerUser = () => {

}