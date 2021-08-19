<script>
  import { onMount } from "svelte";
  import Loader from "../components/misc/Loader.svelte";
  import Toast from "../components/misc/Toast.svelte";
  import Strategy from "../components/strategies/Strategy.svelte";
  import { isPageLoading, MAIN_API_URL } from "../store/sessionStore";
  import { runSimulation } from "../api/main/simulator";

  onMount(async () => {
    const data = await (await fetch(MAIN_API_URL + "/sim/strats")).json();
    strategies = data;
    console.log(strategies);
    $isPageLoading = false;
  });

  function enableAllStrats() {
    strategies = strategies.map((S) => ({ ...S, enabled: true }));
  }
  function disableAllStrats() {
    strategies = strategies.map((S) => ({ ...S, enabled: false }));
  }
  async function run() {
    metrics = null;
    const _ids = strategies.filter((S) => S.enabled).map((S) => S._id);
    const data = await runSimulation(_ids);
    console.log(_ids);
    console.log(data);
    if (data.status != 200) {
      window.pushToast(data.msg, "danger");
    } else {
      metrics = data.game.metrics;
    }
  }

  let strategies = [];
  let metrics;
</script>

<main>
  {#if $isPageLoading}
    <Loader isPageLoading={$isPageLoading} />
    <Toast />
  {:else}
    <div>
      <Toast />
      <br />
      <div class="d-flex justify-content-center">
        <h1 class="text-center d-inline mx-3">Simulator</h1>
        <button
          on:click={run}
          class="btn btn-lg btn-warning mx-3"
          style="height: 50px; width:100px">RUN</button
        >
        <br />
        <hr />
        <br />

        <button
          on:click={enableAllStrats}
          class="btn btn-lg btn-success mx-3"
          style="height: 50px;"
        >
          enable all
        </button>
        <button
          on:click={disableAllStrats}
          class="btn btn-lg btn-danger mx-3"
          style="height: 50px;"
        >
          disabled all
        </button>
      </div>
      <br />
      <div>
        {#if metrics}
          <div class="text-center mb-3">
            <h5 class="d-inline mx-3 text-success">
              max W: {metrics.quickStats.max_conseq_wins}
            </h5>
            <h5 class="d-inline mx-3 text-danger">
              max L: {metrics.quickStats.max_conseq_losses}
            </h5>
            <h5 class="d-inline mx-3 text-success">
              total W: {metrics.data.rightAndWrongs.pcts.filter((x) => x)
                .length}
            </h5>
            <h5 class="d-inline mx-3 text-danger">
              total L: {metrics.data.rightAndWrongs.pcts.filter(
                (x) => x === false
              ).length}
            </h5>
            <h5 class="d-inline mx-3">
              total S: {metrics.data.rightAndWrongs.pcts.filter(
                (x) => x === null
              ).length}
            </h5>
          </div>
          {#if Object.keys(metrics).length}
            <div class="text-center mb-3">
              <h5 class="d-inline mx-3 text-dark">Wins btw 4 Ls:</h5>
              <h5 class="d-inline mx-3 text-dark">
                MIN: {metrics.winsBetweenLossess.min ?? 0}
              </h5>
              <h5 class="d-inline mx-3 text-dark">
                MAX: {metrics.winsBetweenLossess.max ?? 0}
              </h5>
            </div>
          {/if}
          {#if Object.keys(metrics).length}
            <div class="text-center mb-3">
              <h5 class="d-inline mx-3 mx-5">
                max: {metrics.winsPerLvl.maxLvl} <span class="mx-2">-</span>
                lvl: {metrics.winsPerLvl.lvl}
              </h5>
              {#each metrics.winsPerLvl.count as m}
                <h5 class="d-inline mx-3 text-dark">
                  <small> L{m.lvl}: </small>
                  {Math.round(
                    (100 * m.n) /
                      metrics.winsPerLvl.count.reduce((acc, x) => x.n + acc, 0)
                  )}%
                </h5>
              {/each}
            </div>
          {/if}
        {/if}
      </div>
      <br />
      {#if strategies.length > 0}
        {#each strategies as S, i}
          <div class="container my-3">
            <Strategy {strategies} {S} {i} />
          </div>
        {/each}
      {/if}
    </div>
  {/if}
</main>
