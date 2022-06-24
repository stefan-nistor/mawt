import { BASE_URL } from "./constants.js";
const authToken = sessionStorage.getItem("JWT_TOKEN");

// route protection
if (authToken == null) {
  location.href = "./login.html";
}

let nameH;
let purpose;
let admin;
let owner;
let electric;
let reservoir;
let country;
let lake;
let river;
let city;
let lat;
let long;

const getName = () => {
  nameH = document.querySelector("#name").value;
  if (nameH.length < 2) {
    document.getElementById("name").style.borderColor = "red";
  } else {
    document.getElementById("name").style.borderColor = "#c5ce62";
  }

  return nameH;
};
const getPurpose = () => {
  purpose = document.querySelector("#purpose").value;
  if (purpose.length < 2) {
    document.getElementById("purpose").style.borderColor = "red";
  } else {
    document.getElementById("purpose").style.borderColor = "#c5ce62";
  }

  return purpose;
};
const getAdmin = () => {
  admin = document.querySelector("#admin").value;
  if (admin.length < 2) {
    document.getElementById("admin").style.borderColor = "red";
  } else {
    document.getElementById("admin").style.borderColor = "#c5ce62";
  }

  return admin;
};
const getOwner = () => {
  owner = document.querySelector("#owner").value;
  if (owner.length < 2) {
    document.getElementById("owner").style.borderColor = "red";
  } else {
    document.getElementById("owner").style.borderColor = "#c5ce62";
  }

  return owner;
};
const getResCap = () => {
  reservoir = document.querySelector("#reservoir").value;
  if (reservoir.length < 2) {
    document.getElementById("reservoir").style.borderColor = "red";
  } else {
    document.getElementById("reservoir").style.borderColor = "#c5ce62";
  }

  return reservoir;
};
const getElectCap = () => {
  electric = document.querySelector("#electric").value;
  if (country.length < 2) {
    document.getElementById("electric").style.borderColor = "red";
  } else {
    document.getElementById("electric").style.borderColor = "#c5ce62";
  }

  return electric;
};

const getCountry = () => {
  country = document.querySelector("#country").value;
  if (country.length < 2) {
    document.getElementById("country").style.borderColor = "red";
  } else {
    document.getElementById("country").style.borderColor = "#c5ce62";
  }

  return country;
};

const getLake = () => {
  lake = document.querySelector("#lake").value;
  if (lake.length < 2) {
    document.getElementById("lake").style.borderColor = "red";
  } else {
    document.getElementById("lake").style.borderColor = "#c5ce62";
  }
  return lake;
};

const getRiver = () => {
  river = document.querySelector("#river").value;
  if (river.length < 2) {
    document.getElementById("river").style.borderColor = "red";
  } else {
    document.getElementById("river").style.borderColor = "#c5ce62";
  }
  return river;
};

const getCity = () => {
  city = document.querySelector("#city").value;
  if (city.length < 2) {
    document.getElementById("city").style.borderColor = "red";
  } else {
    document.getElementById("city").style.borderColor = "#c5ce62";
  }
  return city;
};

const getLat = () => {
  lat = document.querySelector("#lat").value;
  if (lat < -90 || lat > 90) {
    document.getElementById("lat").style.borderColor = "red";
  } else {
    document.getElementById("lat").style.borderColor = "#c5ce62";
  }
  return lat;
};

const getLong = () => {
  long = document.querySelector("#long").value;
  if (long < -180 || long > 180) {
    document.getElementById("long").style.borderColor = "red";
  } else {
    document.getElementById("long").style.borderColor = "#c5ce62";
  }
  return long;
};

const myFunctionLat = () => {
  var popup = document.getElementById("myPopup1");
  popup.classList.toggle("show");
};

const myFunctionLong = () => {
  var popup = document.getElementById("myPopup2");
  popup.classList.toggle("show");
};

const callAllGetters = () => {
  getAdmin();
  getCity();
  getCountry();
  getElectCap();
  getLake();
  getLat();
  getLong();
  getName();
  getOwner();
  getPurpose();
  getResCap();
  getRiver();
};

const pop1 = document.getElementById("popup1");
pop1.addEventListener("click", myFunctionLat);

const pop2 = document.getElementById("popup2");
pop2.addEventListener("click", myFunctionLong);

const checkValid = () => {
  try {
    callAllGetters();
    if (
      nameH.length > 1 &&
      purpose.length > 1 &&
      admin.length > 1 &&
      owner.length > 1 &&
      reservoir.length > 0 &&
      electric.length > 0 &&
      country.length > 1 &&
      lake.length > 1 &&
      river.length > 1 &&
      city.length > 1 &&
      lat < 90 &&
      lat > -90 &&
      long < 180 &&
      long > -180
    ) {
      return true;
    } else {
      document.getElementById("textError").style.display = "block";
      return false;
    }
  } catch {
    alert("All fields must me completed");
    return false;
  }
};

const createBtn = document.getElementById("createBtn");
createBtn.addEventListener("click", async () => {
  if (!checkValid()) {
    return;
  }

  try {
    const res = await axios.post(
      `${BASE_URL}/hidroplants`,
      {
        name: nameH,
        purpose: purpose,
        admin_unit: admin,
        owner: owner,
        elec_cap: Number(electric),
        res_capapacity: Number(reservoir),
        country: country,
        lake: lake,
        river: river,
        near_city: city,
        lat_res: Number(lat),
        long_res: Number(long),
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    alert("Success: " + res.data.message);
    location.href = "./home.html";
  } catch (err) {
    alert("Error: " + err.response.data.message);
  }
});
