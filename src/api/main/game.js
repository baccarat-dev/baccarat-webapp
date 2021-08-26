import { MAIN_API_URL } from "../../stores/sessionStore";
import { request } from "./request";

async function saveRecordDB(bet, game_id) {
  return await request(MAIN_API_URL + "/game/", "POST", {
    _id: game_id,
    bet,
  });
}

async function fetchGameDataDB(game_id) {
  const response = await request(MAIN_API_URL + "/game/allrecords/" + game_id);
  return response.data;
}

async function resetGameDB(game_id) {
  return await request(MAIN_API_URL + "/game/reset/" + game_id, "DELETE");
}

async function undoRecordDB(game_id) {
  return await request(MAIN_API_URL + "/game/undo/" + game_id, "DELETE");
}

async function getAllGames(user_id) {
  return await request(MAIN_API_URL + "/game/all/" + user_id, "GET");
}

async function getAllStrategies() {
  return await request(MAIN_API_URL + "/game/strategies/all/", "GET");
}

async function createGame(user_id, strategies, name) {
  return await request(MAIN_API_URL + "/game/create/", "POST", {
    user_id,
    strategies,
    name,
  });
}

export {
  saveRecordDB,
  fetchGameDataDB,
  resetGameDB,
  undoRecordDB,
  getAllGames,
  getAllStrategies,
  createGame,
};
