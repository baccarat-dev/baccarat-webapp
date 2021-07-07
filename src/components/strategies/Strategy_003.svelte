<script>
  import StrategyCard from "./StrategyCard.svelte";
  import { calcPercent } from "./common";

  let currentLevel = 1,
    maxLevel = 10,
    percentage = null,
    nextMove = "-",
    hasWonInColumn = false;

  export function run(result, resultsList) {
    const round = resultsList.length;

    if (round < 6) {
      return;
    }
    const prevResult = resultsList[round - 5 - 1];
    const nextResult = resultsList[round - 5];

    if (round % 5 === 1) {
      hasWonInColumn = false;
      nextMove = nextResult;
      return;
    }
    if (hasWonInColumn) {
      return;
    }
    if (prevResult === result) {
      // strategy won, we reset
      hasWonInColumn = true;
      reset();
    }
    if (hasWonInColumn || round % 5 === 0) {
      nextMove = "-";
    } else {
      // strategy lost, we calc % and set nextMove
      currentLevel++;
      maxLevel = maxLevel < currentLevel ? currentLevel : maxLevel;
      percentage = calcPercent(currentLevel, maxLevel);
      nextMove = nextResult;
    }
  }

  export function reset() {
    percentage = Math.round(1000 / maxLevel) / 10;
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
