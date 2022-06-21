import { BASE_URL } from "./constants.js";

const authToken = sessionStorage.getItem("JWT_TOKEN");


let lat1;
let lon1;

const getHidropowerPlantList = async() => {
    try {
        const res = await axios.get(`${BASE_URL}/hidroplants`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })

        return res.data.hidroplants;
    } catch (err) {
        alert('Something went wrong while fetching the data: ' + err.response.data.message);
        return null;
    }
}

const hidropowerList = async() => {
    const hidroplants = await getHidropowerPlantList();
    if (hidroplants == null) {
        return;
    }

    const hidroList = document.querySelector('#dropdownHidro');

    for (let counter = 0; counter < hidroplants.length; counter++) {
       
        
        let item=document.createElement("li");
        var inputA=document.createElement("a");
        let name=document.createTextNode(`${hidroplants[counter].name}`);
       
    
        inputA.appendChild(name);
        item.appendChild(inputA);
        hidroList.appendChild(item);

        if(localStorage.getItem("hidro")===`${hidroplants[counter].name}`){
        
        lat1=`${hidroplants[counter].lat_res}`;
        lon1=`${hidroplants[counter].long_res}`;
        
        localStorage.setItem("lat1",`${hidroplants[counter].lat_res}`);
        localStorage.setItem("lon1",`${hidroplants[counter].long_res}`);
   
    }
    }
}

hidropowerList();

const getLat1 = async() =>{
    const lat2 = await getHidropowerPlantList();
    //console.log(lat1)
    return lat1;
}
const getLon1 = async() =>{
    const hidroplants = await getHidropowerPlantList();
    return `${lon1}`;
}

 export {getLat1, getLon1};





