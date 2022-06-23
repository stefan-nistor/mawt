let country;
let lake;
let river;
let city;
let lat;
let long;

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

const checkValid = () => {
  try {
    if (
      country.length > 1 &&
      lake.length > 1 &&
      river.length > 1 &&
      city.length > 1 &&
      lat < 90 &&
      lat > -90 &&
      long < 180 &&
      long > -180
    ) {
      location.href = "./statisticsMyHidro-page.html";
    } else {
      document.getElementById("textError").style.display = "block";
    }
  } catch {
    alert("All fields must me completed");
  }
};
