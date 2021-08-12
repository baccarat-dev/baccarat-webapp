<script>
  import TableRecords from "../components/game/TableRecords.svelte";

  import { onMount } from "svelte";

  import {
    round,
    betsList,
    isPageLoading,
    strategiesData,
    stats,
    metrics,
  } from "../store/sessionStore";

  // DB Operations
  import { fetchGameDataDB } from "../api/main/shortGame";

  import { useParams } from "svelte-navigator";
  const params = useParams();

  onMount(async () => {
    const game = await fetchGameDataDB($params.id);
    $metrics = game.metrics.data.rightAndWrongs.pcts;
    $betsList = game.bets;
    $stats = game.stats;
    $isPageLoading = false;
  });

  let nbrRows = 6;
  let nbrCols = 10;

  function onDimensionsChange(e) {
    console.log("changeed");
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
    $round = $round;
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
  <TableRecords
    nbrRows={nbrCols}
    nbrCols={Math.round($betsList.length / 10 + 0.5)}
    trans={false}
    nbrOfTabs={nbrRows}
  />
</div>
