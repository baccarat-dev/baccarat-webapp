import { writable } from "svelte/store";

localStorage.getItem("user") ?? localStorage.setItem("user", "{}");

export const round = writable(1),
  bet = writable(null),
  betsList = writable([]),
  sideBarShow = writable(false),
  isPageLoading = writable(true),
  strategiesData = writable([]),
  stats = writable([]),
  metrics = writable([]),
  mfker = writable({}),
  user = writable({
    accessToken: localStorage.getItem("accessToken"),
    ...JSON.parse(localStorage.getItem("user")),
  }),
  isUserLoggedIn = writable(false),
  game = writable(null);

export const REMOTE_API_URL = "https://baccarat-api-server.herokuapp.com";
export const LOCAL_API_URL = "http://localhost:4545";
export const MAIN_API_URL = REMOTE_API_URL;
