<script>
  import { MAIN_API_URL } from "../../store/sessionStore";

  function pin(e) {
    const _id = e.target.value;
    let S = strategies.find((S) => S._id === _id);
    S.pinned = true;
    strategies = strategies;
  }

  async function disable(e) {
    const _id = e.target.value;
    await fetch(MAIN_API_URL + "/short-game/type-I/strategy/disable/" + _id);
    let S = strategies.find((S) => S._id === _id);
    S.enabled = false;
    strategies = strategies;
  }

  async function enable(e) {
    const _id = e.target.value;
    await fetch(MAIN_API_URL + "/short-game/type-I/strategy/enable/" + _id);
    let S = strategies.find((S) => S._id === _id);
    S.enabled = true;
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

  {#if S.enabled}
    <button on:click={disable} value={S._id} class="btn btn-sm btn-danger">
      🗑
    </button>
  {:else}
    <button on:click={enable} value={S._id} class="btn btn-sm btn-success">
      ⬤
    </button>
  {/if}
</div>

<style>
  .el {
    min-width: 70px;
    font-size: 1.4rem !important;
  }
</style>
