const axios = require("axios");

async function testAPIs() {
  try {
    const houseResponse = await axios.get("https://wizard-world-api.herokuapp.com/Houses");
    console.log("Houses API response:", houseResponse.data);
  } catch (e) {
    console.error("Error testing APIs:", e);
  }
}

testAPIs();

//    const charResponse = await axios.get("https://hp-api.onrender.com/api/characters");
// console.log("Characters API response:", charResponse.data);
