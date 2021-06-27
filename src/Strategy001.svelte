<script>
  let currentLevel = 1,
    maxLevel = 1,
    pWinChance = 50,
    bWinChance = 50;

  export function run(round, result, prevNum, prevResult) {
    if (round == 1) {
      return;
    }
    console.log(prevNum, result, prevResult);
    if (isEven(prevNum)) {
      if (prevResult == result) {
        // strategy won, we reset
        reset();
      } else {
        // strategy lost
        currentLevel++;
        decreasePercent(prevResult);
      }
    } else {
      if (prevResult != result) {
        // strategy won, we reset
        reset();
      } else {
        // strategy lost
        currentLevel++;
        decreasePercent(result === "P" ? "B" : "P");
      }
    }
  }

  export function reset() {
    pWinChance = bWinChance = 50;
    maxLevel = maxLevel < currentLevel ? currentLevel : maxLevel;
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
  }

  function isEven(x) {
    return (x & -x) !== 1;
  }
</script>

<div
  class="card text-center shadow-lg p-3 rounded border-primary"
  style="width: 18rem;"
>
  <div class="card-header bg-light">
    <h6 class="card-title text-secondary">Strategy N°001 (Odd/Even)</h6>
  </div>
  <div class="card-body">
    <h5 style="text-align: left;">
      Current Level: {currentLevel}
    </h5>
    <h5 style="text-align: left;">
      Max Level: {maxLevel}
    </h5>
    <hr />
    <h4 style="text-align: center;" class="text-primary">
      P : {pWinChance}%
    </h4>
    <h4 style="text-align: center;" class="text-danger">
      B : {bWinChance}%
    </h4>
  </div>
</div>
