<script>
  import TableRecords from "../components/game/TableRecords.svelte";

  import { onMount } from "svelte";

  import {
    betsList,
    isPageLoading,
    stats,
    metrics,
    mfker,
  } from "../stores/sessionStore";

  // DB Operations
  import { fetchGame } from "../api/main/game";
  import { navigate } from "svelte-navigator";

  let tableSlices = [];
  onMount(async () => {
    const res = await fetchGame(localStorage.getItem("game_id"));
    if (res.status !== 200) {
      return navigate("/mygames");
    }
    const game = res.data;
    $metrics = game.metrics.data.rightAndWrongs.pcts;
    $betsList = game.bets;
    $stats = game.metrics.quickStats;
    $mfker = game.metrics;
    $isPageLoading = false;
    const r = localStorage.getItem("nbrRows");
    const c = localStorage.getItem("nbrCols");
    nbrRows = r ? parseInt(r) : nbrRows;
    nbrCols = c ? parseInt(c) : nbrCols;
    createTables();
  });

  function createTables() {
    const tempIndices = [];
    $betsList.forEach((x, i) => {
      if (i % (nbrRows * nbrCols) === 0) {
        tempIndices.push(i);
      }
    });
    tempIndices.push(tempIndices.slice(-1) + nbrRows * nbrCols);
    for (let i = 0; i < tempIndices.length - 1; i++) {
      tableSlices.push([tempIndices[i], tempIndices[i + 1]]);
    }
    tableSlices = tableSlices;
  }

  let nbrRows = 7;
  let nbrCols = 10;

  function onDimensionsChange(e) {
    $isPageLoading = true;
    const x = e.target.value;
    if (x < 1 || x > 10) {
      window.pushToast("Enter number between 1 and 10", "danger", 5000);
    } else {
      if (e.target.name === "nbrRows") {
        nbrRows = parseInt(x);
        localStorage.setItem("nbrRows", x);
      } else if (e.target.name === "nbrCols") {
        nbrCols = parseInt(x);
        localStorage.setItem("nbrCols", x);
      }
    }
    location.reload();
  }
</script>

<div>
  <br />

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

  <br />
  <hr />
  <br />
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
        lvl: {$mfker.winsPerLvl.lvl} <span class="mx-2">-</span>
      </h5>
      {#each $mfker.winsPerLvl.count as m}
        <h5 class="d-inline mx-3 text-dark">
          <small> L{m.lvl}: </small>
          {m.n} -
          {Math.round(
            (10000 * m.n) /
              $mfker.winsPerLvl.count.reduce((acc, x) => x.n + acc, 0)
          ) / 100}%
        </h5>
      {/each}
    </div>
  {/if}
  <div>
    {#each tableSlices as s}
      <div>
        <TableRecords
          betsList={$betsList}
          metrics={$metrics}
          {nbrRows}
          {nbrCols}
          from={s[0]}
          to={s[1]}
          slice={true}
        />
      </div>
    {/each}
  </div>
</div>
