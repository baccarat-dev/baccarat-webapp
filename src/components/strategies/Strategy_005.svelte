<script>
  import StrategyCard from "./StrategyCard.svelte";
  import { calcPercent } from "./common";

  let currentLevel = 1,
    maxLevel = 12,
    percentage = null,
    nextMove = "-",
    hasWonInColumn = false,
    cornerCellIdx = 0;

  export function run(result, resultsList) {
    const round = resultsList.length;
    const mod5 = round % 5;
    console.log(mod5);
    if (round < 16) {
      return;
    }
    const targetIdx = cornerCellIdx - 5 * (mod5 - 1);
    let nextIdx;
    if (mod5 === 1) {
      cornerCellIdx = round - 1;
      nextMove = resultsList[cornerCellIdx - 5];
      return;
    } else if (mod5 === 4) {
      nextIdx = targetIdx;
    } else {
      nextIdx = targetIdx - 5 * (mod5 - 1);
    }

    const targetResult = resultsList[targetIdx];
    const nextResult = resultsList[nextIdx];

    console.log(targetIdx, "next: " + targetIdx - 5);
    if (targetResult === result) {
      // strategy won, we reset
      hasWonInColumn = true;
      reset();
    }
    if (hasWonInColumn || mod5 === 0) {
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
    name="L-shape"
    {currentLevel}
    {maxLevel}
    {percentage}
    {nextMove}
  />
</div>
