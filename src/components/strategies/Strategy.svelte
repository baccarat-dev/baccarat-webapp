<script>
  import { strategiesData as D } from "../../store/sessionStore";
  export let data;
  export let i;

  function pin(e) {
    const _id = e.target.value;
    let S = $D.find((S) => S._id === _id);
    S.pinned = true;
    $D = $D;
  }

  function disable(e) {
    const _id = e.target.value;
    fetch("http://localhost:4545/short-game/type-I/strategy/disable/" + _id);
    let S = $D.find((S) => S._id === _id);
    S.enabled = false;
    $D = $D;
  }

  function enable(e) {
    const _id = e.target.value;
    fetch("http://localhost:4545/short-game/type-I/strategy/enable/" + _id);
    let S = $D.find((S) => S._id === _id);
    S.enabled = true;
    $D = $D;
  }
</script>

<div style="display:flex; justify-content: space-between;">
  <h3 style="width: 555px; font-size: 1.3rem !important;">
    {i + 1 + ") "}{data.name}
  </h3>
  <h3 class="el">
    lvl: {data.lvl}
  </h3>
  <h3 class="el">
    max: {data.maxLvl}
  </h3>
  <h3 class="el">
    {data.percent ? data.percent : "- "}%
  </h3>
  <h3 class="el">
    next: {data.nextMove ? data.nextMove : "-"}
  </h3>
  <button on:click={pin} value={data._id}> PIN </button>

  {#if data.enabled}
    <button on:click={disable} value={data._id} class="btn btn-sm btn-danger">
      🗑
    </button>
  {:else}
    <button on:click={enable} value={data._id} class="btn btn-sm btn-success">
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
