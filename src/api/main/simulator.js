import { request } from "./request";

const API_URL = "https://baccarat-simulator.herokuapp.com";

async function runSimulation(_ids, nbrOfBets) {
  return await request(API_URL + "/sim/run/", "POST", {
    _ids,
    nbrOfBets,
  });
}

async function getStrats() {
  return await request(API_URL + "/sim/strats/", "GET");
}

export { runSimulation, getStrats };
