<script>
  import { round, betsList, metrics } from "../../store/sessionStore";

  let dataMatrix = [];

  function populateDataMatrix() {
    dataMatrix = [];
    let latestBets = $betsList;
    let latestMetrics = $metrics;
    const boardSize = nbrCols * nbrRows;
    const nbOfBets = $betsList.length;
    // trim data to the latest
    if (nbOfBets > boardSize) {
      while (latestBets.length > boardSize) {
        latestBets = latestBets.slice(nbrRows, nbOfBets);
        latestMetrics = latestMetrics.slice(nbrRows, nbOfBets);
      }
    }

    for (let i = 0; i < nbrCols; i++) {
      const row = [];
      for (let j = 0; j < nbrRows; j++) {
        const idx = i * nbrRows + j;
        const bet = latestBets[idx];
        const nbr = latestMetrics[idx];
        row.push([bet, nbr]);
      }
      dataMatrix.push(row);
    }
    dataMatrix = trans ? mT(dataMatrix) : dataMatrix;
  }

  // return the transpose of a matrix
  function mT(matrix) {
    return matrix.reduce(
      (x, row) => row.map((_, i) => [...(x[i] || []), row[i]]),
      []
    );
  }

  $: {
    nbrRows = nbrRows;
    nbrCols = nbrCols;
    $round = $round;
    $metrics;
    populateDataMatrix();
  }

  export let nbrRows, nbrCols, trans, nbrOfTabs;
</script>

<div>
  {#if !$betsList.length}
    <div class="alert alert-warning mx-2">
      <h3 class="text-center text-warning">Game Not Started Yet</h3>
    </div>
  {:else}
    <div class="d-flex flex-wrap justify-content-center">
      <table class="table table-bordered table-dark w-auto">
        <tbody>
          {#each dataMatrix as row, i}
            <tr style="line-height: 50px;">
              {#each row as c}
                <td style="min-width:70px;min-height:60px;">
                  <span> {typeof c[0] !== "undefined" ? c[0] : ""}</span>
                  -
                  <span
                    style="color:{c[1]
                      ? 'green'
                      : c[1] === null
                      ? 'white'
                      : 'red'}"
                  >
                    {typeof c[0] === "undefined"
                      ? ""
                      : c[1]
                      ? "W"
                      : c[1] === null
                      ? "S"
                      : "L"}
                  </span>
                </td>
              {/each}
            </tr>
            {#if !trans && !((i + 1) % nbrOfTabs)}
              <p>{i}</p>
              <br />
            {/if}
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>
