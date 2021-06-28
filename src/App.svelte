<script>
  import { onMount } from "svelte";
  import Strategy001 from "./components/strategies/Strategy001.svelte";
  import {
    round,
    result,
    resultsList,
    winNbr,
    winNbrsList,
  } from "./store/sessionStore";
  import { createClient } from "@supabase/supabase-js";
  const supabase = createClient(
    __api.env.SVELTE_APP_SUPABASE_URL,
    __api.env.SVELTE_APP_SUPABASE_ANON_KEY
  );
  let strategy001;

  let isPageLoading = true;

  import Hamburger from "./components/sidebar/Hamburger.svelte";

  onMount(async () => {
    (async () => {
      const { data, error } = await supabase
        .from("records")
        .select("result,winNbr");
      $resultsList = data.map((x) => x.result);
      $winNbrsList = data.map((x) => x.winNbr);
      isPageLoading = false;
    })();
  });

  function nextRound() {
    (async () => {
      const { data, error } = await supabase
        .from("records")
        .insert([{ result: $result, winNbr: $winNbr }]);
      console.log(data, error);
    })();

    $resultsList = [...$resultsList, $result];
    $winNbrsList = [...$winNbrsList, $winNbr];

    console.log($resultsList);
    console.log($winNbrsList);

    strategy001.run(
      $round,
      $result,
      $winNbrsList[$winNbrsList.length - 2],
      $resultsList[$resultsList.length - 2]
    );

    $round++;
  }

  const events = {
    onWinNumChange(e) {
      const s = e.target.value;
      console.log(s === ">");
      if (s == "<") {
        if ($winNbr > 1) {
          $winNbr--;
        }
      } else if (s == ">") {
        if ($winNbr < 9) {
          $winNbr++;
        }
      } else {
        $winNbr = parseInt(e.target.value);
      }
    },
    onResultBtnClick(e) {
      $result = e.target.value;
      nextRound();
    },
    async reset() {
      const yes = confirm("you sure?");
      if (!yes) {
        return;
      }
      const { data, error } = await supabase.from("records").delete().match({});
      console.log(data, error);
      $round = 1;
      $resultsList = [];
      $result = null;
      $winNbr = 1;
      $winNbrsList = [];
      strategy001.reset();
    },
  };
</script>

<div style="margin: 0;padding:0;">
  {#if isPageLoading}
    <div
      class="text-center"
      style="height:100vh; display: flex; justify-content: center; align-items: center;"
    >
      <div
        class="spinner-border text-dark"
        role="status"
        style="width: 5rem; height: 5rem;"
      >
        <span class="sr-only" />
      </div>
    </div>
  {:else}
    <div class="home">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark py-3 mb-3">
        <Hamburger />
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav" />
        </div>
        <button
          class="m-0 btn btn-danger btn-md px-4 text-white mx-4"
          style="float: right;"
          on:click={events.reset}>Restart</button
        >
      </nav>
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-6 col-sm-12">
            <div style="margin: 10px;">
              <h3>Round N°{$round}</h3>

              <blockquote>
                <i class="text-secondary"
                  >( NB: Choose a number first then press P/B. )</i
                >
              </blockquote>

              <div class="d-flex flex-wrap">
                <input
                  on:input={events.onWinNumChange}
                  style="width: 70px; display:inline; margin-right: 7px;"
                  type="number"
                  min="0"
                  max="9"
                  value={$winNbr}
                  class="form-control input-lg"
                />
                <div class="btn-group d-flex flex-wrap">
                  <button
                    on:click={events.onWinNumChange}
                    value="<"
                    class="btn btn-round btn-secondary">«</button
                  >

                  {#each Array(10) as _, i}
                    <button
                      on:click={events.onWinNumChange}
                      value={i}
                      class="btn btn-secondary">{i}</button
                    >
                  {/each}

                  <button
                    on:click={events.onWinNumChange}
                    value=">"
                    class="btn btn-round btn-secondary">»</button
                  >
                </div>

                <button
                  value="P"
                  on:click={events.onResultBtnClick}
                  class="btn btn-lg btn-primary mx-2"
                  type="button">P</button
                >
                <button
                  value="B"
                  on:click={events.onResultBtnClick}
                  class="btn btn-lg btn-danger "
                  type="button">B</button
                >
              </div>

              <br /><br />
              <Strategy001 bind:this={strategy001} />
            </div>
          </div>

          <div class="my-2 col-lg-6 col-sm-12">
            <div
              style="float:left; border-left: 1px solid #bbb;
    height: 500px; margin-right: 1%;"
            />
            <h3 class="text-center">History</h3>
            <hr />
            {#if $resultsList.length}
              <div class="d-flex flex-wrap">
                {#each $resultsList as res, i}
                  <div class="card p-0 m-2" style="width: 66px;">
                    <h5 class="card-header p-1 m-0 text-center">
                      <span>
                        {res} - {$winNbrsList[i]}
                      </span>
                    </h5>
                    <div class="card-body p-0 m-0 text-center text-muted font-">
                      {i + 1}
                    </div>
                  </div>
                {/each}
              </div>
            {:else}
              <div class="alert alert-warning mx-2" role="alert">
                <h3 class="text-center text-warning">No Recent Data Yet</h3>
              </div>
            {/if}
          </div>
          <br /> <br /><br />
        </div>
      </div>
    </div>
  {/if}
</div>
