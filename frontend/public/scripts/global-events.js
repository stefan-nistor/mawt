import { BASE_URL } from "./constants.js"

const authToken = sessionStorage.getItem("JWT_TOKEN");

const searchBars = document.getElementsByClassName("searchBar");
console.log(searchBars)

for (const searchBar of searchBars) {
    searchBar.addEventListener("keypress", async(e) => {
        if (e.key !== "Enter") {
            return;
        }

        console.log(e.target.value);
        try {
            const res = await axios.get(`${BASE_URL}/hidroplants/name?name=${e.target.value}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                }
            });

            location.href = `./hidroPower-Page.html?name=${res.data.hidroplant.name}`;
        } catch (err) {
            console.log(err);
            alert("Bad search: " + err.response.data.message);
        }
    });
}