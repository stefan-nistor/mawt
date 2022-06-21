import { BASE_URL } from "./constants.js";

const authToken = sessionStorage.getItem("JWT_TOKEN");

if (authToken == null) {
    location.href = "./login.html"
}

let email;
let password;
const regex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
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
    // getPassword();
    if (verifyEmail != null) {
        return true;
    } else {
        // if (password.length < 8) {
        //     const container = document.getElementById("fieldsMain");
        //     container.insertAdjacentHTML(
        //         'afterbegin',
        //         `<span style="color: red; font-size: x-small "> password must be at least 8 characters</span>`,
        //     );
        // }

        if (verifyEmail == null) {
            const container = document.getElementById("fieldsMain");
            container.insertAdjacentHTML(
                'afterbegin',
                `<span style="color: red; font-size: x-small "> invalid email address</span>`,
            );
        }
        return false;
    }
}

const getCurrentUser = async(token) => {
    try {
        const res = await axios.get(`${BASE_URL}/users/jwt`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });



        return res.data.user;
    } catch (err) {
        alert("error getting the logged user: " + err.response.data.message);
        return null;
    }
}

const addEmailText = async() => {
    const user = await getCurrentUser(authToken);
    if (user == null) {
        return;
    }

    const emailText = document.getElementById("emailText");
    emailText.innerText += ' ';
    emailText.innerText += user.email;
}

addEmailText();

const updateBtn = document.getElementById("updateBtn");
updateBtn.addEventListener('click', async() => {
    const user = await getCurrentUser(authToken);
    if (user == null) {
        return;
    }

    if (!checkIfCompleted()) {
        return;
    }

    try {
        const res = await axios.put(`${BASE_URL}/users/${user._id}`, {
            email: email
        }, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });

        alert('successfully updated account');
        sessionStorage.removeItem("JWT_TOKEN");
        location.href = "./login.html";
    } catch (err) {
        alert('error updating account: ' + err.response.data.message);
    }
});

const deleteBtn = document.getElementById("deleteBtn");
deleteBtn.addEventListener('click', async() => {
    const user = await getCurrentUser(authToken);
    if (user == null) {
        return;
    }

    try {
        const res = await axios.delete(`${BASE_URL}/users/${user._id}`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            },
            data: {}
        });

        alert('successfully deleted account');
        sessionStorage.removeItem("JWT_TOKEN");
        location.href = "./login.html";
    } catch (err) {
        alert('error deleting account: ' + err.response.data.message);
    }
});

const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem("JWT_TOKEN");
    location.href = "./login.html";
})