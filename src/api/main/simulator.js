import { MAIN_API_URL } from "../../store/sessionStore";
import { request } from "./request";

async function runSimulation(_ids) {
  return await request(MAIN_API_URL + "/sim/run/", "POST", {
    _ids,
  });
}

export { runSimulation };
