const userPage = () => {
    //aici ma gandeam ca sa pot vedea userul mai intai sa faca o verificare daca este conectat
    //daca nu este conectat sa ma duca pe pagina de login 
    // si daca e conectat sa ma duca pe pagina unde sa mi vad datele si sa pot schimba datele

    var user = "";
    console.log("useru: " + user);
    if (user.length > 1) {
        location.href = "./info-user.html";
    } else location.href = "./login.html";
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