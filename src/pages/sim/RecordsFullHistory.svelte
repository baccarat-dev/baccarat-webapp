<script>
  import { onMount } from "svelte";

  import TableRecords from "../../components/game/TableRecords.svelte";

  let tableSlices = [];
  onMount(async () => {
    winsAndLosses = game.metrics.data.rightAndWrongs.pcts;
    betsList = game.bets;
    createTables();
  });

  function createTables() {
    const tempIndices = [];
    betsList.forEach((x, i) => {
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

  let betsList, winsAndLosses;
  export let game, nbrRows, nbrCols;
</script>

<div>
  <br />
  <br />
  <hr />
  <br />
  <div>
    {#each tableSlices as s}
      <div>
        <TableRecords
          {betsList}
          metrics={winsAndLosses}
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
