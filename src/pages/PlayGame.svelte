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
  import Hamburger from "../components/sidebar/Hamburger.svelte";
  import Recorder from "../components/game/Recorder.svelte";
  import MostRecentRecords from "../components/game/MostRecentRecords.svelte";
  import Strategy from "../components/strategies/Strategy.svelte";

  import { navigate } from "svelte-navigator";

  onMount(() => {
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
  <div class="container-fluid p-0 bg-white">
    <div class="container">
      <Recorder game_id={$game?._id} />
      <br /><br />
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
            {#each $strategiesData.filter((s) => s.enabled) as S, i}
              <div class="my-3">
                <Strategy strategies={$strategiesData} {S} {i} />
              </div>
            {/each}
          {/if}
        </div>
        <br />
        <div>
          {#if $strategiesData.length > 0}
            {#each $strategiesData.filter((s) => !s.enabled) as S, i}
              <div class="my-3">
                <Strategy strategies={$strategiesData} {S} {i} />
              </div>
            {/each}
          {/if}
          <hr />
        </div>
      </div>
      <!-- End Strategies Row -->
    </div>

    <br /><br />
  </div>
  <!-- End Container  -->
</div>
