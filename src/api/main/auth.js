import { MAIN_API_URL } from "../../stores/sessionStore";
import { request } from "./request";

async function login(email, password) {
  return await request(MAIN_API_URL + "/auth/users/login", "POST", {
    email,
    password,
  });
}

async function signup(email, password) {
  return await request(MAIN_API_URL + "/auth/users/signup", "POST", {
    email,
    password,
  });
}

export { login, signup };
