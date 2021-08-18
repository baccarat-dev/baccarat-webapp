<script>
  import { onMount } from "svelte";
  import Loader from "../components/misc/Loader.svelte";
  import Toast from "../components/misc/Toast.svelte";
  import {
    betsList,
    isPageLoading,
    MAIN_API_URL,
    metrics,
    mfker,
    round,
    stats,
    strategiesData,
  } from "../store/sessionStore";

  onMount(async () => {
    const data = await (await fetch(MAIN_API_URL + "/sim/run")).json();
    $metrics = data.game.metrics.data.rightAndWrongs.pcts;
    $mfker = data.game.metrics;
    $stats = data.game.metrics.quickStats;
    $isPageLoading = false;
  });
</script>

<main>
  {#if $isPageLoading}
    <Loader isPageLoading={$isPageLoading} />
    <Toast />
  {:else}
    <div>
      <Toast />
      <br />
      <h1 class="text-info text-center">Simulator</h1>
      <br />
      <hr />
      <br />
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
            max: {$mfker.winsPerLvl.maxLvl} <span class="mx-2">-</span> lvl: {$mfker
              .winsPerLvl.lvl}
          </h5>
          {#each $mfker.winsPerLvl.count as m}
            <h5 class="d-inline mx-3 text-dark">
              <small> L{m.lvl}: </small>
              {Math.round(
                (100 * m.n) /
                  $mfker.winsPerLvl.count.reduce((acc, x) => x.n + acc, 0)
              )}%
            </h5>
          {/each}
        </div>
      {/if}
    </div>
  {/if}
</main>
