<script>
  export let betsList, metrics;

  let dataMatrix = [];

  function populateDataMatrix() {
    dataMatrix = [];
    let latestBets = betsList;
    let latestMetrics = metrics;
    const boardSize = nbrCols * nbrRows;
    const nbOfBets = betsList.length;
    // trim data to the latest
    if (nbOfBets > boardSize) {
      let start = nbrRows * Math.round((nbOfBets - boardSize) / nbrRows + 0.49);
      let end = nbOfBets;
      if (slice) {
        start = from;
        end = to;
      }
      latestBets = latestBets.slice(start, end);
      latestMetrics = latestMetrics.slice(start, end);
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
    dataMatrix = mT(dataMatrix);
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
    metrics;
    populateDataMatrix();
  }

  export let nbrRows, nbrCols, from, to, slice;
</script>

<div>
  {#if !betsList.length}
    <div class="alert alert-warning mx-2">
      <h3 class="text-center text-warning">Game Not Started Yet</h3>
    </div>
  {:else}
    <div class="d-flex flex-wrap justify-content-center">
      <table class="table table-bordered table-dark w-auto">
        <tbody>
          {#each dataMatrix as row, i}
            <tr style="line-height: 20px;">
              {#each row as c}
                <td
                  style="min-width:70px;"
                  class=""
                  on:click={(e) => {
                    const cls = e.target.className;
                    if (!cls) {
                      e.target.className = "bg-warning";
                    } else {
                      e.target.className = "";
                    }
                  }}
                >
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
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>
