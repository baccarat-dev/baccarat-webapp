<script>
  import { onMount } from "svelte";

  import {
    round,
    betsList,
    isPageLoading,
    strategiesData,
  } from "./store/sessionStore";

  //components
  import Toast from "./components/misc/Toast.svelte";
  import Loader from "./components/misc/Loader.svelte";
  import Hamburger from "./components/sidebar/Hamburger.svelte";
  import Recorder from "./components/game/Recorder.svelte";
  import MostRecentRecords from "./components/game/MostRecentRecords.svelte";
  import Strategy from "./components/strategies/Strategy.svelte";

  // DB Operations
  import { fetchGameDataDB } from "./api/main/shortGame";

  onMount(async () => {
    const game = await fetchGameDataDB();
    $betsList = game.bets;
    $round = game.round;
    $strategiesData = game.strategies;
    $isPageLoading = false;
  });

  $: {
    $round = $round;
    console.log(`round: ${$round}`);
    console.log($strategiesData);
  }
</script>

<div style="margin: 0;padding:0;">
  <div
    style={"display: " + ($isPageLoading === true ? "block" : "none") + " ;"}
  >
    <Loader {isPageLoading} />
  </div>
  <div>
    <div class="container-fluid p-0 bg-white">
      <Toast />
      <div style="height: 90px;visibility:hidden;">
        Pushes content underneath the navbar
      </div>
      <Hamburger />
      <nav
        style="position: fixed;top:0;width:100%; z-index: 99;"
        class="navbar navbar-expand-lg navbar-dark bg-dark py-3 mb-3"
      >
        <span class="navbar-brand h1" style="margin-left: 75px;"
          >Baccarat App</span
        >
      </nav>

      <br />

      <div class="row m-0 bg-light pt-3 mb-5">
        <div class="col-12 col-lg-6">
          <Recorder />
        </div>
        <div class="col-12 col-lg-6">
          <MostRecentRecords />
        </div>

        <br />
      </div>
      <!-- End recording Row -->
      <div class="row m-0 bg-light pt-3">
        <div class="row">
          <div class="col">
            <h1 class="text-primary mx-3">Strategies:</h1>
          </div>
        </div>
        <br /><br /><br />
        <div>
          <hr />
          {#if $strategiesData.length > 0}
            {#each $strategiesData as S}
              <div class="my-3">
                <Strategy data={S} />
              </div>
            {/each}
          {/if}
          <hr />
        </div>
      </div>
      <!-- End Strategies Row -->
      <br /><br />
    </div>
    <!-- End Container  -->
  </div>
</div>

<style>
</style>
