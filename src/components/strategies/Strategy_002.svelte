<script>
  import StrategyCard from "./StrategyCard.svelte";

  let currentLevel = 1,
    maxLevel = 1,
    pWinChance = 50,
    bWinChance = 50;

  export function run(round, result, prevNum, prevResult) {
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
        decreasePercent(prevResult);
      }
    } else {
      if (prevResult === result) {
        // strategy won, we reset
        reset();
      } else {
        // strategy lost
        currentLevel++;
        maxLevel = maxLevel < currentLevel ? currentLevel : maxLevel;
        decreasePercent(result === "P" ? "B" : "P");
      }
    }
  }

  export function reset() {
    pWinChance = bWinChance = 50;
    currentLevel = 1;
  }

  function decreasePercent(result) {
    if (result == "P") {
      if (pWinChance <= 50) {
        pWinChance /= 2;
        bWinChance = 100 - pWinChance;
      } else {
        bWinChance *= 2;
        pWinChance = 100 - bWinChance;
      }
    } else if (result == "B") {
      if (bWinChance <= 50) {
        bWinChance /= 2;
        pWinChance = 100 - bWinChance;
      } else {
        pWinChance *= 2;
        bWinChance = 100 - pWinChance;
      }
    }
    pWinChance = Math.round(pWinChance * 1000) / 1000;
    bWinChance = Math.round(bWinChance * 1000) / 1000;
  }

  function isEven(x) {
    return (x & -x) !== 1;
  }
</script>

<div>
  <StrategyCard
    name="Strategy N°002 (Reversed Odd/Even)"
    {currentLevel}
    {maxLevel}
    {pWinChance}
    {bWinChance}
  />
</div>
