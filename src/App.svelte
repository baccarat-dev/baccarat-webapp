<script>
  import Strategy001 from "./Strategy001.svelte";
  import {
    round,
    results,
    result,
    winningNum,
    winningNums,
  } from "./store/sessionStore";
  let strategy001;

  import { createClient } from "@supabase/supabase-js";

  const supabaseUrl = __api.env.SVELTE_APP_SUPABASE_URL;
  const supabaseAnonKey = __api.env.SVELTE_APP_SUPABASE_ANON_KEY;

  export const supabase = createClient(supabaseUrl, supabaseAnonKey);

  (async () => {
    const { data, error } = await supabase.from("records").select(`
      id
  `);
    console.log(data, error);
  })();

  function nextRound() {
    console.log(results, $results);
    results.update((x) => [...x, result]);
    winningNums.update((x) => [...x, winningNum]);
    localStorage.setItem("results", JSON.stringify(results));
    localStorage.setItem("winningNums", JSON.stringify(winningNums));

    strategy001.run(
      round,
      result,
      winningNums[winningNums.length - 2],
      results[results.length - 2]
    );

    round.update((r) => r + 1);
  }

  results.set(JSON.parse(localStorage.getItem("results")) || []);
  winningNums.set(JSON.parse(localStorage.getItem("winningNums")) || []);

  const events = {
    onWinNumChange(e) {
      winningNum.set(parseInt(e.target.value));
    },
    onResultBtnClick(e) {
      result.set(e.target.value);
      nextRound();
    },
    reset() {
      const yes = confirm("you sure?");
      if (!yes) {
        return;
      }
      // round = 1;
      // results = [];
      // result = null;
      // winningNum = 1;
      // winningNums = [];
      strategy001.reset();
      localStorage.removeItem("results");
      localStorage.removeItem("winningNums");
      location.reload();
    },
  };
</script>

<div class="container-fluid">
  <div class="row">
    <div class="col-lg-6 col-sm-12">
      <button
        class="my-3 btn btn-warning btn-md px-4 text-white"
        on:click={events.reset}
        style="float:right">Reset</button
      >
      <br />
      <div style="margin: 3%;">
        <h3>Round N°{$round}</h3>

        <blockquote>
          <i class="text-secondary"
            >(NB: Choose a number first then press P/B)</i
          >
        </blockquote>

        <div class="d-flex flex-wrap">
          <input
            on:input={(e) => {
              winningNum.set(e.target.value);
            }}
            style="width: 70px; display:inline; margin-right: 7px;"
            type="number"
            min="1"
            max="10"
            value={$winningNum}
            class="form-control input-lg"
          />
          <div class="btn-group d-flex flex-wrap">
            <button
              on:click={() => {
                if (winningNum > 1) winningNum.update((n) => n - 1);
              }}
              class="btn btn-round btn-secondary">«</button
            >
            <button
              on:click={events.onWinNumChange}
              value="1"
              class="btn btn-secondary">1</button
            >
            <button
              on:click={events.onWinNumChange}
              value="2"
              class="btn btn-secondary">2</button
            >
            <button
              on:click={events.onWinNumChange}
              value="3"
              class="btn btn-secondary">3</button
            >
            <button
              on:click={events.onWinNumChange}
              value="4"
              class="btn btn-secondary">4</button
            >
            <button
              on:click={events.onWinNumChange}
              value="5"
              class="btn btn-secondary">5</button
            >
            <button
              on:click={events.onWinNumChange}
              value="6"
              class="btn btn-secondary">6</button
            >
            <button
              on:click={events.onWinNumChange}
              value="7"
              class="btn btn-secondary">7</button
            >
            <button
              on:click={events.onWinNumChange}
              value="8"
              class="btn btn-secondary">8</button
            >
            <button
              on:click={events.onWinNumChange}
              value="9"
              class="btn btn-secondary">9</button
            >
            <button
              on:click={events.onWinNumChange}
              value="10"
              type="button"
              class="btn btn-secondary">10</button
            >
            <button
              on:click={(e) => {
                if (winningNum < 10) winningNum.set(winningNum + 1);
              }}
              value="nxt"
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
      {#if results.length}
        <div class="d-flex flex-wrap">
          {#each results as res, i}
            <div class="card p-0 m-2" style="width: 66px;">
              <h5 class="card-header p-1 m-0 text-center">
                <span>
                  {res} - {winningNums[i]}
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
