<script>
  let currentLevel = 1,
    maxLevel = 1,
    pWinChance = 50,
    bWinChance = 50;

  export function run(result, winningNum, round, results) {
    if (round == 1) {
      return;
    }

    pWinChance = 1;
    if (result == "P") {
      if (pWinChance == bWinChance) {
        pWinChance /= 2;
        bWinChance = 100 - pWinChance;
      } else if (pWinChance < bWinChance) {
        pWinChance /= 2;
        bWinChance = 100 - pWinChance;
      } else {
        bWinChance *= 2;
        pWinChance = 100 - bWinChance;
      }
    } else if (result == "B") {
      if (pWinChance == bWinChance) {
        bWinChance /= 2;
        pWinChance = 100 - bWinChance;
      } else if (bWinChance < pWinChance) {
        bWinChance /= 2;
        pWinChance = 100 - bWinChance;
      } else {
        pWinChance *= 2;
        bWinChance = 100 - pWinChance;
      }
    } else {
      alert("tie");
    }
  }

  function isEven(x) {
    return (x & -x) === 2;
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
    <h5 style="text-align: left;" class="text-primary">
      Player Odds: {pWinChance}%
    </h5>
    <h5 style="text-align: left;" class="text-danger">
      Banker Odds: {bWinChance}%
    </h5>
  </div>
</div>
