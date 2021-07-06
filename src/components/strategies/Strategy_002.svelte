<script>
  import StrategyCard from "./StrategyCard.svelte";
  import { calcPercent } from "./common";

  let currentLevel = 1,
    maxLevel = 1,
    percentage = 50,
    nextMove = null;

  export function run(round, result, winNbr, prevNum, prevResult) {
    nextMove = !isEven(winNbr) ? result : result === "P" ? "B" : "P";
    if (round === 1) {
      return;
    }
    if (isEven(prevNum)) {
      if (prevResult !== result) {
        // strategy won, we reset
        reset();
      } else {
        // strategy lost
        currentLevel++;
        maxLevel = maxLevel < currentLevel ? currentLevel : maxLevel;
        percentage = calcPercent(percentage);
      }
    } else {
      if (prevResult === result) {
        // strategy won, we reset
        reset();
      } else {
        // strategy lost
        currentLevel++;
        maxLevel = maxLevel < currentLevel ? currentLevel : maxLevel;
        percentage = calcPercent(percentage);
      }
    }
  }

  export function reset() {
    percentage = 50;
    currentLevel = 1;
  }

  function isEven(x) {
    return (x & -x) !== 1;
  }
</script>

<div>
  <StrategyCard
    name="Anti Odd/Even"
    {currentLevel}
    {maxLevel}
    {percentage}
    {nextMove}
  />
</div>
