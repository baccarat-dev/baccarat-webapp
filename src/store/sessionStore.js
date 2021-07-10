import { readable, writable } from "svelte/store";

export const round = writable(1),
  bet = writable(null),
  betsList = writable([]),
  winNbr = writable(null),
  winNbrsList = writable([]),
  hand = writable([]),
  handsList = writable([]),
  sideBarShow = writable(false),
  isPageLoading = writable(true);

export const MAIN_API_URL = "http://localhost:11111";
// https://baccarat-api-server.herokuapp.com
// http://localhost:11111
