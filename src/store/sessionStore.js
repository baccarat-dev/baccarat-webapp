import { writable } from "svelte/store";

export const round = writable(1),
  result = writable(null),
  resultsList = writable([]),
  winNbr = writable(null),
  winNbrsList = writable([]),
  hand = writable([]),
  handsList = writable([]),
  sideBarShow = writable(false),
  isPageLoading = writable(true);
