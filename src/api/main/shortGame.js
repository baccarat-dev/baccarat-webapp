import { MAIN_API_URL } from "../../store/sessionStore";
import { request } from "./request";

async function saveRecordDB(bet, game_id) {
  return await request(MAIN_API_URL + "/short-game/type-I/", "POST", {
    _id: game_id,
    bet,
  });
}

async function fetchGameDataDB(game_id) {
  const response = await request(
    MAIN_API_URL + "/short-game/type-I/allrecords/" + game_id
  );
  return response.data;
}

async function resetGameDB(game_id) {
  return await request(
    MAIN_API_URL + "/short-game/type-I/reset/" + game_id,
    "DELETE"
  );
}

async function undoRecordDB(game_id) {
  return await request(
    MAIN_API_URL + "/short-game/type-I/undo/" + game_id,
    "DELETE"
  );
}

export { saveRecordDB, fetchGameDataDB, resetGameDB, undoRecordDB };
