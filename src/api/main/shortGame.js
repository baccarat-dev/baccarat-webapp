import { MAIN_API_URL } from "../../store/sessionStore";

async function saveRecordDB(bet) {
  return await request(MAIN_API_URL + "/short-game/type-1/" + bet, "POST");
}

async function getAllRecordsDB() {
  const response = await request(
    MAIN_API_URL + "/short-game/type-1/allrecords"
  );
  return response.data;
}

async function resetGameDB() {
  return await request(MAIN_API_URL + "/short-game/type-1/reset", "DELETE");
}

export { saveRecordDB, getAllRecordsDB, resetGameDB };

async function request(url = "", method = "GET", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method, // *GET, POST, PUT, DELETE, etc.
    //mode: "cors", // no-cors, *cors, same-origin
    //cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    //credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    //redirect: "follow", // manual, *follow, error
    //referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: method !== "GET" ? JSON.stringify(data) : null, // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
