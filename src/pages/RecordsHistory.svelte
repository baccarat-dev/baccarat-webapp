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
</script>

<div>
  <br />
  <TableRecords
    nbrRows={18}
    nbrCols={Math.round($betsList.length / 15 + 0.5)}
    trans={false}
  />
</div>
