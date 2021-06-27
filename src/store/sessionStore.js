import { writable } from "svelte/store";

export const count = writable(0);

const round = writable(0),
  result = writable(0),
  results = writable([]),
  winningNum = writable(0),
  winningNums = writable([]);

export { round, result, results, winningNum, winningNums };
