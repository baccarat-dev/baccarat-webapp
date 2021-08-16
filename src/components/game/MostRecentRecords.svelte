<script>
  import {
    metrics,
    strategiesData,
    stats,
    mfker,
  } from "../../store/sessionStore";

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

  <div class="text-center mb-3">
    <h5 class="d-inline mx-3 text-success">max W: {$stats.max_conseq_wins}</h5>
    <h5 class="d-inline mx-3 text-danger">
      max L: {$stats.max_conseq_losses}
    </h5>
    <h5 class="d-inline mx-3 text-success">
      total W: {$metrics.filter((x) => x).length}
    </h5>
    <h5 class="d-inline mx-3 text-danger">
      total L: {$metrics.filter((x) => x === false).length}
    </h5>
    <h5 class="d-inline mx-3">
      total S: {$metrics.filter((x) => x === null).length}
    </h5>
  </div>
  {#if Object.keys($mfker).length}
    <div class="text-center mb-3">
      <h5 class="d-inline mx-3 text-dark">Wins btw 4 Ls:</h5>
      <h5 class="d-inline mx-3 text-dark">
        MIN: {$mfker.winsBetweenLossess.min ?? 0}
      </h5>
      <h5 class="d-inline mx-3 text-dark">
        MAX: {$mfker.winsBetweenLossess.max ?? 0}
      </h5>
    </div>
  {/if}
  {#if Object.keys($mfker).length}
    <div class="text-center mb-3">
      <h5 class="d-inline mx-3 mx-5">
        MaxLvl:4 <span class="mx-3">-</span> lvl: {$mfker.winsPerLvl.lvl}
      </h5>
      {#each $mfker.winsPerLvl.count as m}
        <h5 class="d-inline mx-3 text-dark">
          <small> L{m.lvl}: </small>
          {Math.round(
            (100 * m.n) /
              $mfker.winsPerLvl.count.reduce((acc, x) => x.n + acc, 0)
          )}%
        </h5>
      {/each}
    </div>
  {/if}

  <div>
    {#each $strategiesData.filter((s) => s.pinned) as S, i}
      <Strategy data={S} {i} />
    {/each}
  </div>
  {#if $strategiesData.filter((s) => s.pinned).length}
    <hr class="mx-3" style="width: auto;" />
  {/if}
  <TableRecords {nbrRows} {nbrCols} from={null} to={null} />

  <br />
</div>

<style>
</style>
