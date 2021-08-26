<script>
  function pin(e) {
    const _id = e.target.value;
    let S = strategies.find((S) => S._id === _id);
    S.pinned = true;
    strategies = strategies;
  }

  export let strategies, S, i;
</script>

<div style="display:flex; justify-content: space-between;">
  <h3 style="width: 555px; font-size: 1.3rem !important;">
    {i + 1 + ") "}{S.name}
  </h3>
  <h3 class="el">
    lvl: {S.lvl}
  </h3>
  <h3 class="el">
    max: {S.maxLvl}
  </h3>
  <h3 class="el">
    {S.percent ? S.percent : "- "}%
  </h3>
  <h3 class="el">
    next: {S.nextMove ? S.nextMove : "-"}
  </h3>
  <button on:click={pin} value={S._id}> PIN </button>
</div>

<style>
  .el {
    min-width: 70px;
    font-size: 1.4rem !important;
  }
</style>
