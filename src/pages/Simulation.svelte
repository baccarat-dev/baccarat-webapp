<script>
  import { onMount } from "svelte";
  import Loader from "../components/misc/Loader.svelte";
  import Toast from "../components/misc/Toast.svelte";
  import Strategy from "../components/simulation/Strategy.svelte";
  import { isPageLoading } from "../store/sessionStore";
  import { runSimulation, getStrats } from "../api/main/simulator";

  onMount(async () => {
    strategies = await getStrats();
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
    running = true;
    const selectedStrategies = strategies
      .filter((S) => S.enabled)
      .map((S) => {
        return { _id: S._id, maxLvl: S.maxLvl };
      });
    const data = await runSimulation(
      selectedStrategies,
      nbrOfBets,
      randomizer.switch
    );
    running = false;
    if (data.status != 200) {
      window.pushToast(data.msg, "danger");
    } else {
      metrics = data.game.metrics;
      window.pushToast("Finished in " + data.game.execTime + "ms", "success");
    }
  }

  let strategies = [];
  let metrics;
  let nbrOfBets = 1000;
  let running = false;
  let maxLvl = 10;
  let randomizer = {
    text: "Native",
    switch: true,
  };
</script>

<main>
  {#if $isPageLoading}
    <Loader isPageLoading={$isPageLoading} />
    <Toast />
  {:else}
    <div>
      <Toast />
      <br />
      <div class="d-flex justify-content-center align-items-center">
        <h1 class="text-center d-inline mx-3">Simulator</h1>
        <input
          type="number"
          value={nbrOfBets}
          class="form-control"
          style="width: fit-content;max-width:200px;font-weight:700;"
          min="100"
          max="100000"
          step="5000"
          on:change={(e) => (nbrOfBets = +e.target.value)}
        />
        <button
          on:click={run}
          class="btn btn-lg btn-warning mx-3"
          style="height: 50px; width:100px"
          >RUN
        </button>
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
          disable all
        </button>
        <div>
          <input
            class="form-control"
            style="width: fit-content;max-width:50px;font-weight:700;"
            type="number"
            value={maxLvl}
            on:change={(e) => {
              maxLvl = e.target.value;
              strategies = strategies.map((S) => {
                return { ...S, maxLvl };
              });
            }}
          />
        </div>
        <div class="form-check form-switch mx-2">
          <input
            style="width: 45px;height:20px"
            class="form-check-input mx-2"
            type="checkbox"
            id="flexSwitchCheckChecked"
            checked={randomizer.switch}
            on:change={(e) => (randomizer.switch = !randomizer.switch)}
          />
          <label class="form-check-label" for="flexSwitchCheckChecked">
            {randomizer.switch ? "random.org" : "native random"}
          </label>
        </div>
      </div>
      <br />
      <div>
        {#if metrics && !running}
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
            {#each metrics.winsPerLvl.count as m}
              <span class="mx-3 d-inline-block">
                <b> L{m.lvl}:</b>
                {m.n} -
                {Math.round(
                  (10000 * m.n) /
                    metrics.winsPerLvl.count.reduce((acc, x) => x.n + acc, 0)
                ) / 100}%
              </span>
            {/each}
          {/if}
        {:else if running}
          <div
            class="text-center bg-light"
            style="height:100vh;width:100vw; display: flex; justify-content: center; align-items: center;"
          >
            <h3
              style="position:absolute; text-align: center;justify-self: center;align-self: center;"
            >
              <!-- {Math.round(time * 10) / 10} -->
              <small>loading</small>
            </h3>
            <div
              class="spinner-border text-dark"
              role="status"
              style="width: 8rem; height: 8rem;"
            >
              <span class="sr-only" />
            </div>
          </div>
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

<style>
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

  input[type="number"] {
    -moz-appearance: textfield; /* Firefox */
  }
</style>
