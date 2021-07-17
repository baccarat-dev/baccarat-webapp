import { MAIN_API_URL } from "../../store/sessionStore";

async function saveRecordDB(bet) {
  return await request(MAIN_API_URL + "/short-game/type-I/", "POST", {
    _id: "60ef2a69c6b49b20e1d87c7a",
    bet,
  });
}

async function fetchGameDataDB(game_id) {
  game_id = "60ef2a69c6b49b20e1d87c7a";
  const response = await request(
    MAIN_API_URL + "/short-game/type-I/allrecords/" + game_id
  );
  return response.data;
}

async function resetGameDB(game_id) {
  game_id = "60ef2a69c6b49b20e1d87c7a";
  return await request(
    MAIN_API_URL + "/short-game/type-I/reset/" + game_id,
    "DELETE"
  );
}

async function undoRecordDB(game_id) {
  game_id = "60ef2a69c6b49b20e1d87c7a";
  return await request(
    MAIN_API_URL + "/short-game/type-I/undo/" + game_id,
    "DELETE"
  );
}

export { saveRecordDB, fetchGameDataDB, resetGameDB, undoRecordDB };

async function request(url = "", method = "GET", body = {}) {
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
    body: method !== "GET" ? JSON.stringify(body) : null, // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
