<script>
  import { onMount } from "svelte";

  //strategies
  import Strategy001 from "./components/strategies/Strategy001.svelte";
  let strategy001;

  //state
  import { isPageLoading } from "./store/sessionStore";

  //components
  import Toast from "./components/Toast.svelte";
  import Loader from "./components/Loader.svelte";
  import Hamburger from "./components/sidebar/Hamburger.svelte";
  import Recorder from "./components/game/Recorder.svelte";
</script>

<div style="margin: 0;padding:0;">
  <div
    style={"display: " + ($isPageLoading === true ? "block" : "none") + " ;"}
  >
    <Loader />
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
        <div class="row">
          <div class="my-2 col-lg-7 col-sm-12 p-2">
            <Recorder />
          </div>

          <div class="my-2 col-lg-5 col-sm-12 p-2">
            <p>-</p>
          </div>
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
            <Strategy001 bind:this={strategy001} />
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
