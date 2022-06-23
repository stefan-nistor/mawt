import { BASE_URL, weatherTypes } from "./constants.js";

const authToken = sessionStorage.getItem("JWT_TOKEN");

// route protection
if (authToken == null) {
  location.href = "./login.html";
}

const weatherToTypeMap = {
  normal: weatherTypes.NORMAL,
  sunny: weatherTypes.SUNNY,
  cloudy: weatherTypes.CLOUDY,
  rainy: weatherTypes.RAINY,
  snowy: weatherTypes.SNOWY,
  stormy: weatherTypes.STORMY,
  thunder: weatherTypes.THUNDER,
  windy: weatherTypes.WINDY,
};

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const latH = urlParams.get("lat");
const longH = urlParams.get("long");

const getClosestHidro = async () => {
  try {
    const res = await axios.get(
      `${BASE_URL}/hidroplants/closest?lat=${latH}&long=${longH}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    return res.data.closestHidroplant;
  } catch (err) {
    alert("Error: " + err.response.data.message);
    return null;
  }
};

const getElectricCapChange = async () => {
  try {
    const weatherStr = document.getElementById("weather").value;

    const hidroplant = await getClosestHidro();

    let wheatherSt = String(weatherToTypeMap[weatherStr]);
    const res = await axios.get(
      `${BASE_URL}/hidroplants/weather?name=${hidroplant.name}&weather=${wheatherSt}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return res.data.hidroplant.elec_cap;
  } catch (err) {
    console.log("Eroare" + err);
    alert("Error: " + err.response.data.message);
    return null;
  }
};

const getData = async () => {
  const data = await getElectricCapChange();

  if (data == null) {
    return 0;
  }
  return data;
};

Plotly.newPlot("chart", [
  {
    y: [getData()],
    type: "line",
  },
]);

let counter = 0;
setInterval(async () => {
  Plotly.extendTraces("chart", { y: [[await getData()]] }, [0]);
  counter++;

  if (counter > 40) {
    Plotly.relayout("chart", {
      xaxis: {
        range: [counter - 50, counter],
      },
    });
  }
}, 2000);
