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

    let targetIdx;
    let nextIdx;
    switch (mod5) {
      case 1:
        hasWonInColumn = false;
        cornerCellIdx = round - 1;
        nextMove = resultsList[cornerCellIdx - 15];
        return;
      case 2:
        targetIdx = cornerCellIdx - 15;
        nextIdx = targetIdx + 5;
        break;
      case 3:
        targetIdx = cornerCellIdx - 10;
        nextIdx = targetIdx + 5;
        break;
      case 4:
        targetIdx = cornerCellIdx - 5;
        nextIdx = targetIdx + 5;
        break;
      default:
        targetIdx = cornerCellIdx;
        nextIdx = "-";
        break;
    }

    const targetResult = resultsList[targetIdx];
    const nextResult = resultsList[nextIdx];

    console.log(
      "g:" + targetIdx,
      targetResult,
      "   nxt:" + nextIdx,
      nextResult,
      "   mod5",
      mod5
    );
    if (targetResult === result) {
      // strategy won, we reset
      console.log(
        "targetResult === result",
        targetResult === result,
        targetResult,
        result
      );
      hasWonInColumn = true;
      reset();
    }
    if (hasWonInColumn) {
      nextMove = "-";
      console.log("hasWonInColumn", hasWonInColumn, mod5);
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
