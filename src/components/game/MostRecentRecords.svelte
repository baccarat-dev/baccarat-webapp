<script>
  import {
    round,
    betsList,
    winNbrsList,
    isPageLoading,
    strategiesData,
  } from "../../store/sessionStore";

  import { fetchGameDataDB } from "../../api/main/shortGame";
  import Strategy from "../strategies/Strategy.svelte";

  let nbrRows = 6;
  let nbrCols = 10;

  let dataMatrix = [];

  export async function fetchAllRecords() {
    const data = await fetchGameDataDB(game_id);
    $betsList = data.bets;
    populateDataMatrix();
    $isPageLoading = false;
  }

  export function populateDataMatrix() {
    dataMatrix = [];
    let latestBets = $betsList;
    let latestWinNbrs = $winNbrsList;
    const boardSize = nbrCols * nbrRows;
    const nbOfBets = $betsList.length;

    // trim data to the latest
    if (nbOfBets > boardSize) {
      while (latestBets.length > boardSize) {
        latestBets = latestBets.slice(nbrRows, nbOfBets);
      }
    }

    for (let i = 0; i < nbrCols; i++) {
      const row = [];
      for (let j = 0; j < nbrRows; j++) {
        const idx = i * nbrRows + j;
        const bet = latestBets[idx];
        const nbr = latestWinNbrs[idx];
        row.push([bet, nbr]);
      }
      dataMatrix.push(row);
    }
    dataMatrix = mT(dataMatrix);
  }

  // return the transpose of a matrix
  function mT(matrix) {
    return matrix.reduce(
      ($, row) => row.map((_, i) => [...($[i] || []), row[i]]),
      []
    );
  }

  function onDimsInputChange(e) {
    const x = e.target.value;
    if (x < 1 || x > 10) {
      window.pushToast("Enter number between 1 and 10", "danger", 5000);
    } else {
      if (e.target.name === "nbrRows") {
        nbrRows = parseInt(x);
      } else if (e.target.name === "nbrCols") {
        nbrCols = parseInt(x);
      }
      populateDataMatrix();
    }
  }

  //props
  export let game_id;

  $: {
    $round = $round;
    populateDataMatrix();
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
        on:change={onDimsInputChange}
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
        on:change={onDimsInputChange}
      />
    </div>
  </div>

  <hr class="mx-3" style="width: auto;" />
  <div>
    {#each $strategiesData.filter((s) => s.pinned) as S, i}
      <Strategy data={S} {i} />
    {/each}
  </div>
  {#if $strategiesData.filter((s) => s.pinned).length}
    <hr class="mx-3" style="width: auto;" />
  {/if}

  {#if $betsList.length > 0}
    <div class="d-flex flex-wrap justify-content-center">
      <table class="table table-bordered table-dark w-auto">
        <tbody>
          {#each dataMatrix as row}
            <tr style="line-height: 50px;">
              {#each row as c}
                <td style="min-width:70px;min-height:60px;">
                  <b> {typeof c[0] !== "undefined" ? c[0] : "-"}</b>
                </td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {:else}
    <div class="alert alert-warning mx-2">
      <h3 class="text-center text-warning">Game Not Started Yet</h3>
    </div>
  {/if}
</div>

<style>
</style>
