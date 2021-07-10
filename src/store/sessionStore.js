import { writable } from "svelte/store";

export const round = writable(1),
  bet = writable(null),
  betsList = writable([]),
  winNbr = writable(null),
  winNbrsList = writable([]),
  hand = writable([]),
  handsList = writable([]),
  sideBarShow = writable(false),
  isPageLoading = writable(true);

export const REMOTE_API_URL = "https://baccarat-api-server.herokuapp.com";
export const LOCAL_API_URL = "http://localhost:11111";
export const MAIN_API_URL = REMOTE_API_URL;
