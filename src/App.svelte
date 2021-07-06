<script>
  import { onMount } from "svelte";

  //strategies
  import Strategy_001 from "./components/strategies/Strategy_001.svelte";
  import Strategy_002 from "./components/strategies/Strategy_002.svelte";
  import Strategy_003 from "./components/strategies/Strategy_003.svelte";
  import Strategy_004 from "./components/strategies/Strategy_004.svelte";
  let strategy_001_Component,
    strategy_002_Component,
    strategy_003_Component,
    strategy_004_Component;

  //state
  import { isPageLoading } from "./store/sessionStore";

  //components
  import Toast from "./components/misc/Toast.svelte";
  import Loader from "./components/misc/Loader.svelte";
  import Hamburger from "./components/sidebar/Hamburger.svelte";
  import Recorder from "./components/game/Recorder.svelte";
  import MostRecentRecords from "./components/game/MostRecentRecords.svelte";
  let MostRecentRecordsComponent;
  let LoaderComponent;

  onMount(async () => {
    await MostRecentRecordsComponent.fetch();
  });
</script>

<div style="margin: 0;padding:0;">
  <div
    style={"display: " + ($isPageLoading === true ? "block" : "none") + " ;"}
  >
    <Loader bind:this={LoaderComponent} {isPageLoading} />
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
          <Recorder
            {MostRecentRecordsComponent}
            {strategy_001_Component}
            {strategy_002_Component}
            {strategy_003_Component}
            {strategy_004_Component}
          />
        </div>
        <div class="col-12 col-lg-6">
          <MostRecentRecords bind:this={MostRecentRecordsComponent} />
        </div>

        <br />
      </div>
      <!-- End recording Row -->
      <div class="row m-0 bg-light pt-3">
        <div class="row">
          <div class="col">
            <h1 class="text-primary mx-3" style="font-size: 1.75rem;">
              Strategies:
            </h1>
          </div>
        </div>
        <br /><br /><br />
        <div>
          <div class="my-3">
            <Strategy_001 bind:this={strategy_001_Component} />
          </div>
          <hr />
          <div class="my-3">
            <Strategy_002 bind:this={strategy_002_Component} />
          </div>
          <hr />
          <div class="my-3">
            <Strategy_003 bind:this={strategy_003_Component} />
          </div>
          <hr />
          <div class="my-3">
            <Strategy_004 bind:this={strategy_004_Component} />
          </div>
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
