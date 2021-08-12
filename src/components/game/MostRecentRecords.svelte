<script>
  import { metrics, strategiesData } from "../../store/sessionStore";

  import Strategy from "../strategies/Strategy.svelte";
  import TableRecords from "./TableRecords.svelte";

  let nbrRows = 6;
  let nbrCols = 10;

  function onDimensionsChange(e) {
    const x = e.target.value;
    if (x < 1 || x > 10) {
      window.pushToast("Enter number between 1 and 10", "danger", 5000);
    } else {
      if (e.target.name === "nbrRows") {
        nbrRows = parseInt(x);
      } else if (e.target.name === "nbrCols") {
        nbrCols = parseInt(x);
      }
    }
  }
</script>

<div>
  <div class="d-flex justify-content-center">
    <div
      class="input-group mx-4 d-flex align-items-center"
      style="width: 200px;"
    >
      <input
        class="d-inline form-control"
        type="number"
        min="1"
        max="10"
        name="nbrRows"
        style="width: 80px; height:50px; font-weight: 500;font-size: 30px;"
        value={nbrRows}
        on:change={onDimensionsChange}
      />

      <b style="font-weight: 900;font-size: 30px;" class="mx-1">X</b>

      <input
        class="form-control d-inline"
        type="number"
        min="1"
        max="10"
        value={nbrCols}
        name="nbrCols"
        style="width: 80px; height:50px; font-weight: 500;font-size: 30px;"
        on:change={onDimensionsChange}
      />
    </div>
  </div>

  <hr class="mx-3" style="width: auto;" />

  <div style="display: block;float:left">
    <h4>total W: {$metrics.filter((x) => x).length}</h4>
    <h4>total L: {$metrics.filter((x) => x === false).length}</h4>
    <h4>total S: {$metrics.filter((x) => x === null).length}</h4>
  </div>

  <div>
    {#each $strategiesData.filter((s) => s.pinned) as S, i}
      <Strategy data={S} {i} />
    {/each}
  </div>
  {#if $strategiesData.filter((s) => s.pinned).length}
    <hr class="mx-3" style="width: auto;" />
  {/if}
  <TableRecords {nbrRows} {nbrCols} trans={true} />
</div>

<style>
</style>
