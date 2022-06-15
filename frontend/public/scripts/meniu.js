const openNav = () => {
    var widthScreen = (window.innerWidth > 0) ? window.innerWidth : screen.width;

    console.log(widthScreen);

    if (widthScreen < 661) {

        if (document.getElementById("menu").style.width === widthScreen + "px") {
            document.getElementById("menu").style.width = "0";
            document.getElementById("menu").style.height = "0";
            document.getElementById("menu").style.transform="translateX(-100%)";
            document.getElementById("boxes-menu").style.display = "none";
        } else {
            document.getElementById("menu").style.height = "100%";
            document.getElementById("menu").style.width = widthScreen + "px";
            document.getElementById("menu").style.transform="translateX(0%)";
            document.getElementById("boxes-menu").style.display = "block";

        }
    } else {
        if (document.getElementById("menu").style.width === "20em") {
            document.getElementById("menu").style.width = "0";
            document.getElementById("menu").style.transform="translateX(-100%)";
            document.getElementById("boxes-menu").style.display = "none";
        } else {
            document.getElementById("menu").style.width = "20em";
            document.getElementById("boxes-menu").style.display = "block";
            document.getElementById("menu").style.transform="translateX(0%)";
        }
    }
}

// window.onresize = function(event)
// {
// document.location.reload(true);
// }