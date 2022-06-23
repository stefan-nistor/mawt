import { BASE_URL } from "./constants.js";

const authToken = sessionStorage.getItem("JWT_TOKEN");

// route protection
if (authToken == null) {
  location.href = "./login.html";
}

let pieChart;
let barChart;

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
          backgroundColor: ["#c5ce62", "#c5ce62", "#c5ce62", "#c5ce62"],
          borderColor: ["#f5edf0"],
          borderWidth: 1,
        },
      ],
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
          backgroundColor: ["#c5ce62", "#c5ce62", "#c5ce62", "#c5ce62"],
          borderColor: ["#f5edf0"],
          borderWidth: 1,
        },
      ],
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
