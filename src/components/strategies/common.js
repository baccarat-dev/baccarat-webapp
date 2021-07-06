export function calcPercent(percentage) {
  return 100 - Math.round(1000 * ((100 - percentage) / 2)) / 1000;
}
