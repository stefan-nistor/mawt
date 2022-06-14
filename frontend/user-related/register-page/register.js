var user = "";
var password;
var regex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
var verifyUser;
var password2;

const getUser = () => {
    user = document.querySelector("#username").value;
    verifyUser = regex.exec(user);
    console.log(verifyUser);
    console.log("user din login " + password);
}

const getPassword1 = () => {
    password = document.querySelector("#password1").value;

}

const getPassword2 = () => {
    password = document.querySelector("#password2").value;
}

const checkIfCompleted = () => {
    if (verifyUser != null && password.length > 7 && password == password2) {
        location.href = "../../mainframe/index.html";
        return true;
    } else {

        if (password.length < 8) {
            const container = document.getElementById("fieldsMain");
            container.insertAdjacentHTML(
                'afterbegin',
                `<span style="color: red; font-size: x-small "> password must be at least 8 characters</span>`,
            );
        }
        if (verifyUser == null) {
            const container = document.getElementById("fieldsMain");
            container.insertAdjacentHTML(
                'afterbegin',
                `<span style="color: red; font-size: x-small "> invalid email address</span>`,
            );
        }
        if (password != password2) {
            const container = document.getElementById("fieldsMain");
            container.insertAdjacentHTML(
                'afterbegin',
                `<span style="color: red; font-size: x-small "> please insert the same password</span>`,
            );
        }
        return false;
    }
}

const registerUser = () => {

}