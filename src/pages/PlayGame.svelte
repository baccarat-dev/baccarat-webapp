<script>
  import { onMount } from "svelte";

  import {
    round,
    betsList,
    isPageLoading,
    strategiesData,
    stats,
    metrics,
    mfker,
    game,
  } from "../stores/sessionStore";

  //components
  import Recorder from "../components/game/Recorder.svelte";
  import MostRecentRecords from "../components/game/MostRecentRecords.svelte";
  import Strategy from "../components/strategies/Strategy.svelte";

  import { navigate } from "svelte-navigator";
  import { fetchGame } from "../api/main/game";

  onMount(async () => {
    const resp = await fetchGame(localStorage.getItem("game_id"));
    $game = resp?.data;
    if (!$game) {
      return navigate("/mygames");
    }
    $metrics = $game.metrics.data.rightAndWrongs.pcts;
    $mfker = $game.metrics;
    $betsList = $game.bets;
    $round = $game.round;
    $strategiesData = $game.strategies;
    $stats = $game.metrics.quickStats;
    $isPageLoading = false;
  });

  $: {
    // watch for changes in theses variables
    $round;
    $betsList = $betsList;
    $strategiesData.sort((s1, s2) => {
      return 0;
      return s2.percent - s1.percent;
    });
    $strategiesData = $strategiesData;
    $stats = $stats;
  }
</script>

<div>
  <br /><br /><br />
  <div class="container-fluid p-0 bg-white">
    <div class="container">
      <div class="container">
        <Recorder game_id={$game?._id} />
        <br />
        <div class="stats">
          <div class="text-center mb-3">
            <h5 class="d-inline mx-3 text-success">
              max W: {$stats.max_conseq_wins}
            </h5>
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
                <b> lvl {$mfker.winsPerLvl.lvl}</b>
              </h5>
              {#each $mfker.winsPerLvl.count as m}
                <h5 class="d-inline mx-3 text-dark">
                  <small> L{m.lvl}: </small>
                  {Math.round(
                    (10000 * m.n) /
                      $mfker.winsPerLvl.count.reduce((acc, x) => x.n + acc, 0)
                  ) / 100}%
                </h5>
              {/each}
            </div>
          {/if}
        </div>
      </div>
      <br />

      <MostRecentRecords />
      <hr />
      <!-- End recording Row -->
      <div class="row m-0 bg-light pt-3">
        <div class="row">
          <div class="col">
            <h2 class="text-primary mx-3">Strategies:</h2>
          </div>
        </div>
        <br />
        <div>
          {#if $strategiesData.length > 0}
            {#each $strategiesData as S, i}
              <div class="my-3">
                <Strategy bind:strategies={$strategiesData} {S} {i} />
              </div>
            {/each}
          {/if}
        </div>
        <br />
      </div>
      <!-- End Strategies Row -->
    </div>

    <br /><br />
  </div>
  <!-- End Container  -->
</div>
