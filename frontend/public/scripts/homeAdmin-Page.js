import { BASE_URL } from "./constants.js";

const authToken = sessionStorage.getItem("JWT_TOKEN");

// route protection
if (authToken == null) {
  location.href = "./login.html";
}

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

const addHidropowerList = async () => {
  const hidroplants = await getHidropowerPlantList();
  if (hidroplants == null) {
    return;
  }

  const hidroList = document.querySelector(".hidro-list");

  for (let counter = 0; counter < hidroplants.length; counter++) {
    const description = hidroplants[counter].purpose
      ? hidroplants[counter].purpose
      : "Hidroplant";
    let item = `<div id="${
      hidroplants[counter].name
    }" style="text-decoration:none">
                      <a href="./hidroPower-Page.html?name=${encodeURIComponent(
                        hidroplants[counter].name
                      )}">
                          <div class="hidro-one">
                              <div class="white-box">
                                  ${counter + 1}
                              </div>
                              <div class="text-hidro">
                                  <div class="name-hidro">
                                      ${hidroplants[counter].name}
                                  </div>
                                  <div class="details-hidro">
                                      ${description}
                                  </div>
                              </div>
                          </div>
                      </a>
                      <button class="trash">
                        <i></i>
                        <span></span>
                      </button>
                    </div>`;
    hidroList.innerHTML += item;
  }
};

const getHidroplantForName = async (name) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/hidroplants/name?name=${encodeURIComponent(name)}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    return res.data.hidroplant;
  } catch (err) {
    alert("Error: " + err.response.data.message);
  }
};

const addTrashButtonFunctionalities = () => {
  const trashButtons = document.getElementsByClassName("trash");
  for (const trashBtn of trashButtons) {
    trashBtn.addEventListener("click", async () => {
      try {
        const name = trashBtn.parentElement.id;
        console.log(name);
        const hidroplant = await getHidroplantForName(name);
        console.log(hidroplant);
        const res = await axios.delete(
          `${BASE_URL}/hidroplants/${hidroplant._id}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
            data: {},
          }
        );

        alert("Success: " + res.data.message);
        location.reload();
      } catch (err) {
        alert("Error: " + err.response.data.message);
      }
    });
  }
};

const addData = async () => {
  await addHidropowerList();
  addTrashButtonFunctionalities();
};

addData();
