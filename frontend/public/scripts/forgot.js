import { BASE_URL } from "./constants.js";

var email = "";
var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var verifyEmail = "";


const getEmail = () => {
    email = document.querySelector("#email").value;
    verifyEmail = regex.exec(email);
    return email;
}

const checkIfCompleted = () => {
    getEmail();
    if (verifyEmail != null) {

        // document.getElementById("waves").style.zIndex = "22";

        // const newDiv = document.createElement("div");

        // const newContent = document.createTextNode("PLEASE WAIT");
        // newDiv.appendChild(newContent);

        // newDiv.style.zIndex = "22";
        // newDiv.style.position = "absolute";
        // newDiv.style.width = "100%";
        // newDiv.style.height = "100%";
        // newDiv.style.backgroundColor = "#dee4eb85"
        // newDiv.style.display = "flex";
        // newDiv.style.marginTop = "0";
        // newDiv.style.color = "#76b865";
        // newDiv.style.fontSize = "3em";
        // newDiv.style.fontFamily = "Arial";
        // newDiv.style.fontWeight = "bolder";
        // newDiv.style.justifyContent = "center";
        // newDiv.style.alignItems = "center";
        // newDiv.style.alignSelf = "center";
        // newDiv.style.webkitTextStroke = "2px";
        // newDiv.style.webkitTextStrokeColor = "black";




        // const page = document.getElementById("pageFull");

        // document.body.insertBefore(newDiv, page);

        return true;
    } else {
        // const container = document.getElementById("fieldsMain");
        // container.insertAdjacentHTML(
        //     'afterbegin',
        //     `<span style="color: red; font-size: x-small "> invalid email address</span>`,
        // );
        return false;
    }
}

const forgotBtn = document.getElementById("forgotBtn");
forgotBtn.addEventListener('click', async() => {
    if (!checkIfCompleted()) {
        return;
    }

    try {
        const res = await axios.post(`${BASE_URL}/pwd/forgot-password`, {
            email: email
        });

        alert('Success: ' + res.data.message);
    } catch (err) {
        alert('Error: ' + err.response.data.message);
    }
})