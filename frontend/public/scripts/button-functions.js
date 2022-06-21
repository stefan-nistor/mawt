const userPage = () => {
    const authToken = sessionStorage.getItem("JWT_TOKEN");

    if (authToken != null) {
        location.href = "./info-user.html";
    } else {
        location.href = "./login.html";
    }
}

const userPage2 = () => {
    location.href = "./login.html";
}

const getMapPage = () => {
    location.href = "./map-page.html";
}

const getHomePage = () => {
    location.href = "./home.html"
}