import { getLat1, getLon1 } from './initialiseSearchBar.js';

const authToken = sessionStorage.getItem("JWT_TOKEN");


// route protection
if (authToken == null) {
    location.href = "./login.html";
}

const queryString = window.location.search;
    

    const urlParams = new URLSearchParams(queryString);
    const nameHidro = urlParams.get('name')
    const lat1=urlParams.get('lat');
    const lon1=urlParams.get('lon');
   
  
    const latitud=Number(lat1);
    const long=Number(lon1);
    

const createMap = () => {

    let mapOptions = {
        center: [20, 80],
        zoom: 2
    }


    let map = new L.map('map', mapOptions);

    let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    map.addLayer(layer);
  
  
    if(nameHidro!=null){

 
             try{
            let marker = new L.Marker([latitud , long]);
             let info = `Name: ${nameHidro}; Lat: ${latitud}; Long: ${long};`;

             marker.bindPopup(info);
             marker.addTo(map);
             }catch{alert("Sorry! We don't have information about this hidropower plant :( ");}
      
    }
    
}

createMap();