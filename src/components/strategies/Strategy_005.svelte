<script>
  import StrategyCard from "./StrategyCard.svelte";
  import { calcPercent } from "./common";

  let currentLevel = 1,
    maxLevel = 12,
    percentage = null,
    nextMove = "-",
    hasWonInColumn = false,
    cornerCellIdx = 15;

  export function run(result, resultsList) {
    const round = resultsList.length;

    if (round < 16) {
      return;
    }
    let targetIdx = 15;
    const mod5 = (round - 1) % 5;
    if (mod5 === 0) {
      cornerCellIdx = round - 1;
      nextMove = resultsList[cornerCellIdx];
      return;
    } else if (mod5 < 5) {
      targetIdx = cornerCellIdx - 5 * (mod5 - 1);
    }

    const targetResult = resultsList[targetIdx];
    const nextResult = resultsList[targetIdx - 5];

    console.log(`targetResult:${targetResult}  |  nextResult:${nextResult}`);

    if (targetResult === result) {
      // strategy won, we reset
      hasWonInColumn = true;
      reset();
    }
    if (hasWonInColumn || mod5 === 4) {
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
