import { BASE_URL } from "./constants.js";

const authToken = sessionStorage.getItem("JWT_TOKEN");

// route protection
if (authToken == null) {
  location.href = "./login.html";
}

let latitude;
let longitude;

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const nameH = urlParams.get("name");
document.getElementById("nameOfHidro").textContent = nameH.toUpperCase();

const getHidropowerPlantList = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/hidroplants`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return res.data.hidroplants;
  } catch (err) {
    alert(
      "Something went wrong while fetching the data: " +
        err.response.data.message
    );
    return null;
  }
};

const hidropowerList = async () => {
  const hidroplants = await getHidropowerPlantList();
  if (hidroplants == null) {
    return;
  }

  const detailsList1 = document.querySelector("#detailsHidro1");
  const detailsList2 = document.querySelector("#detailsHidro2");

  for (let counter = 0; counter < hidroplants.length; counter++) {
    if (nameH === `${hidroplants[counter].name}`) {
      const description = hidroplants[counter].purpose
        ? hidroplants[counter].purpose
        : "Hidroplant";
      const country = hidroplants[counter].country
        ? hidroplants[counter].country
        : "Unknown";
      const lake = hidroplants[counter].lake
        ? hidroplants[counter].lake
        : "Unknown";
      const river = hidroplants[counter].river
        ? hidroplants[counter].river
        : "Unknown";
      latitude = hidroplants[counter].lat_res
        ? hidroplants[counter].lat_res
        : "Unknown";
      longitude = hidroplants[counter].long_res
        ? hidroplants[counter].long_res
        : "Unknown";

      let item = ` <div class="subtitle1"> Description </div>
                        <div class="resume1"> ${description}</div>
                        <div class="subtitle2"> Country </div>
                        <div class="resume2"> ${country}</div>
                        <div class="subtitle1"> Lake </div>
                        <div class="resume1"> ${lake}</div>
                        <div class="subtitle2"> River </div>
                        <div class="resume2"> ${river}</div>
                        <div class="subtitle1"> Location </div>
                        <div class="resume1">lat: ${latitude}</div>
                        <div class="resume1">lon: ${longitude}</div>
                        `;
      detailsList1.innerHTML += item;

      const admin = hidroplants[counter].admin_unit
        ? hidroplants[counter].admin_unit
        : "Unknown";
      const year = hidroplants[counter].dam_completed
        ? hidroplants[counter].dam_completed
        : "Unknown";
      const city = hidroplants[counter].near_city
        ? hidroplants[counter].near_city
        : "Unknown";
      const electricCap = hidroplants[counter].elec_cap
        ? hidroplants[counter].elec_cap
        : "Unknown";
      const status = hidroplants[counter].op_status
        ? hidroplants[counter].op_status
        : "Unknown";

      let item2 = ` <div class="subtitle2"> Admin </div>
                        <div class="resume2"> ${admin}</div>
                        <div class="subtitle1"> Since </div>
                        <div class="resume1"> ${year}</div>
                        <div class="subtitle2"> Near city of</div>
                        <div class="resume2"> ${city}</div>
                        <div class="subtitle1">Electric Capacity</div>
                        <div class="resume1"> ${electricCap}</div>
                        <div class="subtitle2"> Status </div>
                        <div class="resume2"> ${status}</div>
                        `;
      detailsList2.innerHTML += item2;

      console.log(hidroplants[counter]);
    }
  }
};

const buttonLive = async () => {
  await hidropowerList();
  const liveBtn = document.getElementById("hidroStatsLive");
  if (latitude === "Unknown" || longitude === "Unknown") {
    liveBtn.style.display = "none";
  } else {
    liveBtn.style.display = "block";
    liveBtn.addEventListener("click", () => {
      location.href = `./statisticsMyHidro-page.html?name=${encodeURIComponent(nameH)}&lat=${latitude}&long=${longitude}`;
    });
  }
};
buttonLive();

const rssButton = document.getElementById('rssAll')
rssButton.addEventListener('click', () => {
  location.href=`./rss-feed.html?name=${encodeURIComponent(nameH)}`
})