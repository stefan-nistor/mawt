var user = "";
var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var verifyUser;


const getUser = () => {

    user = document.querySelector("#username").value;
    verifyUser = regex.exec(user);
    console.log(verifyUser);
}

const checkIfCompleted = () => {

    if (verifyUser != null) {

        document.getElementById("waves").style.zIndex = "22";

        const newDiv = document.createElement("div");

        const newContent = document.createTextNode("PLEASE WAIT");
        newDiv.appendChild(newContent);

        newDiv.style.zIndex = "22";
        newDiv.style.position = "absolute";
        newDiv.style.width = "100%";
        newDiv.style.height = "100%";
        newDiv.style.backgroundColor = "#dee4eb85"
        newDiv.style.display = "flex";
        newDiv.style.marginTop = "0";
        newDiv.style.color = "#76b865";
        newDiv.style.fontSize = "3em";
        newDiv.style.fontFamily = "Arial";
        newDiv.style.fontWeight = "bolder";
        newDiv.style.justifyContent = "center";
        newDiv.style.alignItems = "center";
        newDiv.style.alignSelf = "center";
        newDiv.style.webkitTextStroke = "2px";
        newDiv.style.webkitTextStrokeColor = "black";




        const page = document.getElementById("pageFull");

        document.body.insertBefore(newDiv, page);

        setTimeout(8000);
    } else {

        if (verifyUser == null) {
            const container = document.getElementById("fieldsMain");
            container.insertAdjacentHTML(
                'afterbegin',
                `<span style="color: red; font-size: x-small "> invalid email address</span>`,
            );
        }

    }
}

const redirect = () => {
    location.href = "../../mainframe/home.html";
}
setTimeout(function() {
    location.href = "../../mainframe/home.html";
}, 8000);