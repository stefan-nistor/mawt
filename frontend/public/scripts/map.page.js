import { getLat1, getLon1} from './initialiseSearchBar.js';

const createMap = () => {

    let mapOptions = {
        center:[0,0],
        zoom:1
    }


    let map = new L.map('map' , mapOptions);

    let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    map.addLayer(layer);
    let lat1=getLat1();
    let lon1=getLon1();



    let marker = new L.Marker([ localStorage.getItem("lat1"), localStorage.getItem("lon1") ]);

    let info=`Name: ${localStorage.getItem("hidro")}; Lat: ${localStorage.getItem("lat1")}; Long: ${localStorage.getItem("lon1")};`;

    marker.bindPopup(info);

    marker.addTo(map);
}
createMap();