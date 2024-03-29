import { BASE_URL } from "./constants.js";

const authToken = sessionStorage.getItem("JWT_TOKEN");

// route protection
if (authToken == null) {
  location.href = "./login.html";
}

let pieChart;
let barChart;

var ranColor = ["#c5ce62"];
Chart.defaults.global.defaultFontColor = "#fff";

for (let i = 0; i < 10; i++) {
  var randomColor = "#" + Math.floor(Math.random() * 19777215).toString(16);
  ranColor.push(randomColor);
}
console.log("culori" + ranColor);

const createBarChart = (data) => {
  let canvasElement = document.getElementById("barChart");

  let namesHidro = data.map((hp) => hp.name);
  let elecCapVal = data.map((hp) => hp.elec_cap);

  let config = {
    type: "bar",
    data: {
      labels: namesHidro,
      datasets: [
        {
          label: "Electric capacity",
          data: elecCapVal,
          backgroundColor: ranColor,
          borderColor: ["#f5edf0"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
    },
  };
  barChart = new Chart(canvasElement, config);
};

const createPieChart = (data) => {
  let canvasElement2 = document.getElementById("pieChart");

  let namesHidro = data.map((hp) => hp.name);
  let elecCapVal = data.map((hp) => hp.elec_cap);

  let config2 = {
    type: "pie",
    data: {
      labels: namesHidro,

      datasets: [
        {
          label: "Electric capacity",
          data: elecCapVal,
          backgroundColor: ranColor,
          borderColor: ["#f5edf0"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
    },
  };
  pieChart = new Chart(canvasElement2, config2);
};

const getGraphs = async () => {
  try {
    const howMany = 10;
    const res = await axios.get(
      `${BASE_URL}/hidroplants/top?howMany=${howMany}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    const data = res.data.hidroplants;
    console.log(data);

    createBarChart(data);
    createPieChart(data);
  } catch (err) {
    alert(" Error: " + err.response.data.message);
  }
};
getGraphs();

const changeBtn = document.getElementById("changeBtn");
changeBtn.addEventListener("click", () => {
  if (document.getElementById("barChart").style.display === "block") {
    document.getElementById("barChart").style.display = "none";
    document.getElementById("pieChart").style.display = "block";
  } else {
    document.getElementById("barChart").style.display = "block";
    document.getElementById("pieChart").style.display = "none";
  }
});
