import { BASE_URL } from "./constants.js"

const authToken = sessionStorage.getItem("JWT_TOKEN");

// route protection
if (authToken == null) {
  location.href = "./login.html"
}

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const nameH = urlParams.get("name");

const getAllRSS = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/hidroplants/rss?name=${encodeURIComponent(nameH)}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
  
      const feedData = document.getElementById('feed')
      feedData.textContent = res.data.xml

    } catch (err) {
      alert(
        "Something went wrong while fetching the data: " +
          err.response.data.message
      )
      return null
    }
  };

  getAllRSS()
  