<script>
  import { supabase } from "../../supabaseClient";
  import {
    resultsList,
    winNbrsList,
    isPageLoading,
  } from "../../store/sessionStore";

  let nbrRows = 5;
  let nbrCols = 5;

  let dataMatrix = [];

  export async function fetch() {
    const { data, error } = await supabase.from("records").select("res,nbr");
    console.log(data, error);
    $resultsList = data.map((x) => x.res);
    $winNbrsList = data.map((x) => x.nbr);
    populateDataMatrix();
    $isPageLoading = false;
  }

  export function populateDataMatrix() {
    dataMatrix = [];
    for (let i = 0; i < nbrCols; i++) {
      const row = [];
      for (let j = 0; j < nbrRows; j++) {
        const idx = i * nbrRows + j;
        row.push([$resultsList[idx], $winNbrsList[idx]]);
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
      nbrRows = parseInt(x);
      populateDataMatrix();
    }
  }
</script>

<div>
  <h1 class="text-primary mx-3" style="font-size: 1.75rem;">
    History: ({nbrRows}x{nbrCols})
    <div class="input-group d-inline mx-5">
      <input
        class="d-inline form-control"
        type="number"
        min="1"
        max="10"
        style="width: 70px; height:50px; font-weight: 500;font-size: 30px;"
        value={nbrRows}
        on:change={(e) => {}}
      />
      X
      <input
        class="form-control d-inline"
        type="number"
        min="1"
        max="10"
        value={nbrCols}
        style="width: 70px; height:50px; font-weight: 500;font-size: 30px;"
        on:change={(e) => {
          const x = e.target.value;
          if (x < 1 || x > 10) {
            window.pushToast("Enter number between 1 and 10", "danger", 5000);
          } else {
            nbrCols = parseInt(x);
            populateDataMatrix();
          }
        }}
      />
    </div>
  </h1>
  <hr class="mx-3" style="width: auto;" />

  {#if $resultsList.length > 0}
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
