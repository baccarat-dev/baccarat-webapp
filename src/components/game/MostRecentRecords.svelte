<script>
  import {
    betsList,
    winNbrsList,
    isPageLoading,
  } from "../../store/sessionStore";

  import { getAllRecordsDB, resetGameDB } from "../../api/main/shortGame";

  let nbrRows = 5;
  let nbrCols = 10;

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
    let latestBets;
    let latestWinNbrs;
    const boardSize = nbrCols * nbrRows;
    const dataLength = $betsList.length;
    if (dataLength > boardSize) {
      latestBets = $betsList.slice(dataLength - boardSize, dataLength);
      latestWinNbrs = $winNbrsList.slice(dataLength - boardSize, dataLength);
    } else {
      latestBets = $betsList;
      latestWinNbrs = $winNbrsList;
    }
    for (let i = 0; i < nbrCols; i++) {
      const row = [];
      for (let j = 0; j < nbrRows; j++) {
        const idx = i * nbrRows + j;
        row.push([latestBets[idx], latestWinNbrs[idx]]);
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

  async function deleteAll() {
    const res = await resetGameDB();
    console.log(res);
    $betsList = [];
    $winNbrsList = [];
    window.pushToast("All records cleared! ", "danger");
    window.location.reload();
  }
</script>

<div>
  <h1 class="text-primary mx-3 d-inline" style="font-size: 1.75rem;">
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
    <button class="btn btn-lg btn-danger" on:click={deleteAll}>
      DELETE ALL
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
                  >{c.every((x) => typeof x !== "undefined")
                    ? c[0] + " - " + c[1]
                    : "-"}</td
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
