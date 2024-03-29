import { BASE_URL } from "./constants.js";
import { getCurrentUser } from "./global-events.js";

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
    let item = `<a href="./hidroPower-Page.html?name=${encodeURIComponent(
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
                    </a>`;
    hidroList.innerHTML += item;
  }
};

const addHidropowerListAdmin = async () => {
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
    }" style="text-decoration:none; margin-bottom: -40px">
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
        
        const hidroplant = await getHidroplantForName(name);
       
        const res = await axios.delete(
          `${BASE_URL}/hidroplants/${hidroplant._id}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
            data: {},
          }
        );

       
        alert("Success: DELETED HIDROPLANT");
        location.reload();
      } catch (err) {
        alert("Error: " + err.response.data.message);
      }
    });
  }
};

const addDataAdmin = async () => {
  await addHidropowerListAdmin();
  addTrashButtonFunctionalities();
};

const addHomePageData = async () => {
  const user = await getCurrentUser(authToken);

  if (user.email === "mawt_system123@outlook.com") {
    document.getElementById("button_plus").style.display = "block";
    await addDataAdmin();
  } else {
    document.getElementById("button_plus").style.display = "none";
    await addHidropowerList();
    const hidroplants = document.getElementsByClassName("hidro-one");
    for (const hidroplant of hidroplants) {
      hidroplant.style.width = "100%";
      hidroplant.style.top = "";
    }
  }
};

addHomePageData();
