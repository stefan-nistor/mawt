import { BASE_URL } from "./constants.js";

const authToken = sessionStorage.getItem("JWT_TOKEN");

// route protection
if (authToken == null) {
    location.href = "./login.html";
}

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

const addHidropowerList = async() => {
    const hidroplants = await getHidropowerPlantList();
    if (hidroplants == null) {
        return;
    }

    const hidroList = document.querySelector('.hidro-list');

    for (let counter = 0; counter < hidroplants.length; counter++) {
        const description = hidroplants[counter].purpose ? hidroplants[counter].purpose : "Hidroplant";
        let item = `<a href="./hidroPowrt-Page.html?name=${hidroplants[counter].name}">
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
        console.log(hidroplants[counter]);
    }
}

addHidropowerList();

/* <a href="./hidroPower-Page.html">
                        <div class="hidro-one">

                            <div class="white-box">
                                01
                            </div>
                            <div class="text-hidro">
                                <div class="name-hidro">
                                    text
                                </div>
                                <div class="details-hidro">
                                    text
                                </div>
                            </div>

                        </div>
                    </a> */