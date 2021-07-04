<script>
  import { onMount } from "svelte";

  //strategies
  import Strategy_001 from "./components/strategies/Strategy_001.svelte";
  let strategy_001_Component;

  //state
  import { isPageLoading } from "./store/sessionStore";

  //components
  import Toast from "./components/misc/Toast.svelte";
  import Loader from "./components/misc/Loader.svelte";
  import Hamburger from "./components/sidebar/Hamburger.svelte";
  import Recorder from "./components/game/Recorder.svelte";
  import History from "./components/game/RecordsHistory.svelte";
  let HistoryComponent;
  let LoaderComponent;

  onMount(async () => {
    await HistoryComponent.fetch();
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
        <div class="col">
          <Recorder {HistoryComponent} {strategy_001_Component} />
        </div>
        <div class="col">
          <History bind:this={HistoryComponent} />
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
        <div class="row">
          <hr class="mx-4" style="width: 15rem;" />
        </div>
        <div class="row my-3">
          <div class="col mx-5">
            <Strategy_001 bind:this={strategy_001_Component} />
          </div>
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
