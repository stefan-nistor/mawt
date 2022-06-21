import { getLat1, getLon1 } from './initialiseSearchBar.js';

const authToken = sessionStorage.getItem("JWT_TOKEN");


// route protection
if (authToken == null) {
    location.href = "./login.html";
}


const createMap = () => {

    let mapOptions = {
        center: [20, 80],
        zoom: 2
    }


    let map = new L.map('map', mapOptions);

    let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    map.addLayer(layer);
    let lat1 = getLat1().value;
    let lon1 = getLon1();

    getLat1().then(value => {
        lat1 = value;

        getLon1().then(value => {
            lon1 = value;
            try {
                let marker = new L.Marker([localStorage.getItem("lat1"), localStorage.getItem("lon1")]);
                let info = `Name: ${localStorage.getItem("hidro")}; Lat: ${lat1}; Long: ${lon1};`;

                marker.bindPopup(info);
                marker.addTo(map);
            } catch { alert("Sorry! We don't have information about localisation for this hidropower Plant"); }
        }).catch(err => {
            console.log(err);
        });


    }).catch(err => {
        console.log(err);
    });


    // let marker = new L.Marker([ localStorage.getItem("lat1"), localStorage.getItem("lon1") ]);

    // let info=`Name: ${localStorage.getItem("hidro")}; Lat: ${lat1}; Long: ${localStorage.getItem("lon1")};`;

    // marker.bindPopup(info);

    // marker.addTo(map);
}

createMap();