<script>
  import Strategy001 from "./Strategy001.svelte";
  let round, results, result, winningNum, winningNums;

  let strategy001;

  function reset() {
    round = 1;
    results = [];
    result = null;
    winningNum = 1;
    winningNums = [];
  }
  reset();

  function resultBtnAction(e) {
    result = e.target.value;
    nextRound();
  }

  function nextRound() {
    results = [...results, result];
    winningNums = [...winningNums, winningNum];
    console.log(results);

    strategy001.run(result, winningNum, round, results);

    round++;
    bet = result = null;
  }

  const events = {
    onWinNumChanged(e) {
      winningNum = e.target.value;
    },
  };
</script>

<div class="container-fluid">
  <div class="row">
    <div class="col-6">
      <div style="margin: 3%;">
        <h3>Round N°{round}</h3>

        <blockquote>
          <i class="text-secondary"
            >(NB: Choose a number first then press P/B)</i
          >
        </blockquote>

        <input
          on:input={(e) => {
            winningNum = e.target.value;
          }}
          style="width: 70px; display:inline;"
          type="number"
          min="1"
          max="10"
          value={winningNum}
          class="form-control input-lg"
        />
        <div class="btn-group m-0 p-0" style="margin: 0; padding:0;">
          <button
            on:click={(e) => {
              if (winningNum > 1) winningNum--;
            }}
            class="btn btn-round btn-secondary">«</button
          >
          <button
            on:click={events.onWinNumChanged}
            value="1"
            class="btn btn-secondary">1</button
          >
          <button
            on:click={events.onWinNumChanged}
            value="2"
            class="btn btn-secondary">2</button
          >
          <button
            on:click={events.onWinNumChanged}
            value="3"
            class="btn btn-secondary">3</button
          >
          <button
            on:click={events.onWinNumChanged}
            value="4"
            class="btn btn-secondary">4</button
          >
          <button
            on:click={events.onWinNumChanged}
            value="5"
            class="btn btn-secondary">5</button
          >
          <button
            on:click={events.onWinNumChanged}
            value="6"
            class="btn btn-secondary">6</button
          >
          <button
            on:click={events.onWinNumChanged}
            value="7"
            class="btn btn-secondary">7</button
          >
          <button
            on:click={events.onWinNumChanged}
            value="8"
            class="btn btn-secondary">8</button
          >
          <button
            on:click={events.onWinNumChanged}
            value="9"
            class="btn btn-secondary">9</button
          >
          <button
            on:click={events.onWinNumChanged}
            value="10"
            type="button"
            class="btn btn-secondary">10</button
          >
          <button
            on:click={(e) => {
              if (winningNum < 10) winningNum++;
            }}
            value="nxt"
            class="btn btn-round btn-secondary">»</button
          >
        </div>

        <button
          value="P"
          on:click={resultBtnAction}
          class="btn btn-lg btn-primary "
          type="button">P</button
        >
        <button
          value="B"
          on:click={resultBtnAction}
          class="btn btn-lg btn-danger "
          type="button">B</button
        >

        <br /><br />
        <Strategy001 bind:this={strategy001} />
      </div>
    </div>

    <div class="my-2 col-6">
      <div
        style="float:left; border-left: 1px solid #bbb;
    height: 500px; margin-right: 1%;"
      />
      <h3>History</h3>
      <hr />
      <div class="d-flex flex-wrap">
        {#each results as res, i}
          <div class="card p-0 m-2" style="width: 66px;">
            <h5 class="card-header p-1 m-0 text-center">
              <span>
                {res} - {winningNums[i]}
              </span>
            </h5>
            <div class="card-body p-0 m-0 text-center">
              {i + 1}
            </div>
          </div>
        {/each}
      </div>
    </div>
    <br /> <br /><br />
  </div>
</div>
