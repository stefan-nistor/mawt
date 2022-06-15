let user;
let password;
const regex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
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
        location.href = "./index.html";
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

    }
}