import { BASE_URL } from "./constants.js";

const authToken = sessionStorage.getItem("JWT_TOKEN");

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

  const hidroList = document.querySelector("#dropdown");

  for (let counter = 0; counter < hidroplants.length; counter++) {
    let item = `<a href="./hidroPower-Page.html?name=${encodeURIComponent(
      hidroplants[counter].name
    )}">
                                    ${hidroplants[counter].name}
                    </a>`;
    hidroList.innerHTML += item;
  }
};

hidropowerList();
