import { request } from "./request";
const local = "http://localhost:1212";
const remote = "https://baccarat-simulator.herokuapp.com";
const API_URL = local;

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
