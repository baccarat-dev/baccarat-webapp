<script>
  import StrategyCard from "./StrategyCard.svelte";
  import { calcPercent } from "./common";

  let currentLevel = 1,
    maxLevel = 1,
    percentage = 50,
    nextMove = null;

  export function run(round, result, resultsList) {
    const prevResult = resultsList[round - 5 - 1];
    const L = resultsList.length;
    if (L >= 6) {
      nextMove = resultsList[round - 5];
    }
    if (L < 7 || L % 5 === 1) {
      return;
    }
    console.log(prevResult, L);
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

  export function reset() {
    percentage = 50;
    currentLevel = 1;
  }
</script>

<div>
  <StrategyCard
    name="Mirroring"
    {currentLevel}
    {maxLevel}
    {percentage}
    {nextMove}
  />
</div>
