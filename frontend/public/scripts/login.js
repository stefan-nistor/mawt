var user = "";
var password;
var regex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
var verifyUser;


const getUser = () => {

    user = document.querySelector("#username").value;
    verifyUser = regex.exec(user);
    console.log(verifyUser);
}

const getPassword = () => {
    password = document.querySelector("#password").value;
    console.log(password);
}

const checkIfCompleted = () => {

    if (verifyUser != null && password.length > 7) {
        location.href = "./home.html";
    } else {

        document.getElementById("textError1").style.display="none";
        document.getElementById("textError2").style.display="none";
        if (password.length < 8) {
            document.getElementById("textError1").style.display="block";
          
        }
        if (verifyUser == null) {
            document.getElementById("textError2").style.display="block";
        }

    }
}