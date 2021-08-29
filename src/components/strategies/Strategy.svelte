<script>
  function pin(e) {
    const _id = e.target.value;
    let S = strategies.find((S) => S._id === _id);
    S.pinned = true;
    strategies = strategies;
  }
  function unpin(e) {
    const _id = e.target.value;
    let S = strategies.find((S) => S._id === _id);
    S.pinned = false;
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
  {#if S.pinned}
    <button class="btn btn-sm btn-light" on:click={unpin} value={S._id}>
      unpin
    </button>
  {:else}
    <button class="btn btn-sm btn-light" on:click={pin} value={S._id}>
      pin
    </button>
  {/if}
</div>

<style>
  .el {
    min-width: 70px;
    font-size: 1.4rem !important;
  }
</style>
