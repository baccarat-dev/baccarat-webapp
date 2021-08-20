import { request } from "./request";

const API_URL = "http://localhost:1212"; //  "http://localhost:1212" https://baccarat-simulator.herokuapp.com

async function runSimulation(strategies, nbrOfBets, usingRandOrg) {
  return await request(API_URL + "/sim/run/", "POST", {
    strategies,
    nbrOfBets,
    usingRandOrg,
  });
}

async function getStrats() {
  return await request(API_URL + "/sim/strats/", "GET");
}

export { runSimulation, getStrats };
