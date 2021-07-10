<script>
  import StrategyCard from "./StrategyCard.svelte";
  import { calcPercent } from "./common";

  let currentLevel = 1,
    maxLevel = 8,
    percentage = null,
    nextMove = "-";

  export function run(round, bet, winNbr, prevNum, prevBet) {
    nextMove = !isEven(winNbr) ? bet : bet === "P" ? "B" : "P";
    if (round === 1) {
      return;
    }
    if (isEven(prevNum)) {
      if (prevBet !== bet) {
        // strategy won, we reset
        reset();
      } else {
        // strategy lost
        currentLevel++;
        maxLevel = maxLevel < currentLevel ? currentLevel : maxLevel;
        percentage = calcPercent(currentLevel, maxLevel);
      }
    } else {
      if (prevBet === bet) {
        // strategy won, we reset
        reset();
      } else {
        // strategy lost
        currentLevel++;
        maxLevel = maxLevel < currentLevel ? currentLevel : maxLevel;
        percentage = calcPercent(currentLevel, maxLevel);
      }
    }
  }

  export function reset() {
    percentage = Math.round(1000 / maxLevel) / 10;
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
