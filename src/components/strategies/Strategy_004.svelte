<script>
  import StrategyCard from "./StrategyCard.svelte";

  let currentLevel = 1,
    maxLevel = 1,
    pWinChance = 50,
    bWinChance = 50;

  export function run(round, result, resultsList) {
    const prevResult = resultsList[round - 5 - 1];
    const L = resultsList.length;
    if (L < 7 || L % 5 === 1) {
      return;
    }
    console.log(prevResult, L);
    if (prevResult !== result) {
      // strategy won, we reset
      reset();
    } else {
      // strategy lost
      currentLevel++;
      maxLevel = maxLevel < currentLevel ? currentLevel : maxLevel;
      decreasePercent(result);
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
</script>

<div>
  <StrategyCard
    name="ANTI-MIRRORING"
    {currentLevel}
    {maxLevel}
    {pWinChance}
    {bWinChance}
  />
</div>
