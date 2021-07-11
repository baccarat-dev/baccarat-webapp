<script>
  import {
    betsList,
    winNbrsList,
    isPageLoading,
    resetStoreValues,
  } from "../../store/sessionStore";

  import { getAllRecordsDB, resetGameDB } from "../../api/main/shortGame";

  let nbrRows = 5;
  let nbrCols = 5;

  let dataMatrix = [];

  export async function fetchAllRecords() {
    const data = await getAllRecordsDB();
    console.log(data);
    $betsList = data;
    $winNbrsList = data;
    populateDataMatrix();
    $isPageLoading = false;
  }

  export function populateDataMatrix() {
    dataMatrix = [];
    let latestBets = $betsList;
    let latestWinNbrs = $winNbrsList;
    const boardSize = nbrCols * nbrRows;
    const nbOfBets = $betsList.length;
    const nbOfWinNbrs = $winNbrsList.length;

    // trim data to the latest
    if (nbOfBets > boardSize) {
      while (latestBets.length > boardSize) {
        latestBets = latestBets.slice(5, nbOfBets);
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

  async function resetGame() {
    if ($betsList.length === 0) {
      window.pushToast("Game Has No Records Yet.", "danger");
    } else {
      const res = await resetGameDB();
      console.log(res);
      if (res.status === 200) {
        resetStoreValues();
        window.pushToast("All records cleared! ", "success");
      } else {
        window.pushToast(res.msg || "Internal Server Error!", "danger");
      }
    }
  }
</script>

<div>
  <h1 class="text-primary mx-3 my-3">
    Most Recent: ({nbrRows}x{nbrCols})
  </h1>
  <div class="input-group d-inline mx-5">
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
    X
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
  <div style="display:inline-flex;">
    <button class="btn btn-lg btn-danger" on:click={resetGame}>
      RESET GAME
    </button>
  </div>
  <hr class="mx-3" style="width: auto;" />

  {#if $betsList.length > 0}
    <div class="d-flex flex-wrap">
      <table class="table table-bordered table-dark w-auto">
        <tbody>
          {#each dataMatrix as row}
            <tr style="line-height: 50px;">
              {#each row as c}
                <td style="min-width:70px;min-height:60px;"
                  >{typeof c[0] !== "undefined" ? c[0] : "-"}</td
                >
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {:else}
    <div class="alert alert-warning mx-2">
      <h3 class="text-center text-warning">No Recent Data Yet</h3>
    </div>
  {/if}
</div>

<style>
</style>
