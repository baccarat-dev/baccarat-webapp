<script>
  export let name, currentLevel, maxLevel, pWinChance, bWinChance;
</script>

<div
  class="card text-center shadow-lg p-3 rounded border-primary"
  style="width: 15rem;"
>
  <div class="card-header bg-light">
    <h6 class="card-title text-secondary">{name}</h6>
  </div>
  <div class="card-body">
    <h5 style="text-align: left;">
      Current Level: {currentLevel}
    </h5>
    <h5 style="text-align: left;">
      Max Level: {maxLevel}
    </h5>
    <br />
    <div class="d-flex">
      <h4 style="text-align: center;" class="text-primary">
        P: {pWinChance}%
      </h4>
      <h4 style="text-align: center; margin-left: auto;" class="text-danger">
        B: {bWinChance}%
      </h4>
    </div>
  </div>
</div>
