import { writable } from "svelte/store";

export const count = writable(0);

const round = writable(1),
  result = writable(null),
  resultsList = writable([]),
  winNbr = writable(1),
  winNbrsList = writable([]);

export { round, result, resultsList, winNbr, winNbrsList };
