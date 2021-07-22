import { writable } from "svelte/store";

export const round = writable(1),
  bet = writable(null),
  betsList = writable([]),
  winNbr = writable(null),
  winNbrsList = writable([]),
  hand = writable([]),
  handsList = writable([]),
  sideBarShow = writable(false),
  isPageLoading = writable(true),
  strategiesData = writable([]),
  stats = writable([]);

export const REMOTE_API_URL = "https://baccarat-api-server.herokuapp.com";
export const LOCAL_API_URL = "http://localhost:4545";
export const MAIN_API_URL = REMOTE_API_URL;

export const resetStoreValues = async () => {
  round.set(1);
  bet.set(null);
  betsList.set([]);
  winNbr.set(null);
  winNbrsList.set([]);
  hand.set([]);
  handsList.set([]);
};
