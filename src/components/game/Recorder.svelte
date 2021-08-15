<script>
  import {
    bet,
    round,
    betsList,
    strategiesData,
    stats,
    metrics,
    mfker,
  } from "../../store/sessionStore";

  import {
    saveRecordDB,
    fetchGameDataDB,
    undoRecordDB,
  } from "../../api/main/shortGame";

  async function addRecord() {
    const response = await saveRecordDB($bet, game_id);
    if (response.status !== 200) {
      window.pushToast("There was an error adding the record!", "danger");
      return;
    }
    const game = await fetchGameDataDB(game_id);

    $round = $betsList.length + 1;
    $betsList = game.bets;
    $metrics = game.metrics.data.rightAndWrongs.pcts;
    const temp = $strategiesData;
    $strategiesData = game.strategies;
    temp.forEach((s, i) => {
      if (s.pinned) {
        $strategiesData[i].pinned = true;
      }
    });
    $stats = game.stats;
    $mfker = game.metrics;
  }

  function handleKeydown(e) {
    const KEY = e.key.toUpperCase();
    if (["P", "B"].includes(KEY)) {
      $bet = KEY;
      addRecord();
    } else if (KEY === "BACKSPACE") {
      undoRecord();
    }
  }

  async function undoRecord() {
    const game = await fetchGameDataDB(game_id);
    if ($betsList.length && game.undos) {
      const res = await undoRecordDB(game_id);
      if (res.status === 200) {
        location.reload();
        return;
        $strategiesData = game.strategies;
        $stats = game.stats;
        $betsList.pop();
        $round--;
        $betsList = $betsList;
      } else {
        window.pushToast("Can't Undo!", "warning");
      }
    } else {
      window.pushToast("Can't Undo!", "warning");
    }
  }

  //props
  export let game_id;
</script>

<svelte:window on:keydown={handleKeydown} />

<div>
  <br />
  <div style="display: flex;align-items: center;justify-content:center;">
    <h3 class="text-dark mx-5" style="margin-right: auto;">
      Round N°{$betsList.length + 1}:
    </h3>
    <div style="position:relative;">
      <button
        on:click={() => {
          $bet = "P";
          addRecord();
        }}
        class={"btn btn-lg btn-outline-primary " +
          ($bet === "P" ? "active" : "")}
        style="font-size: 1.5rem; min-width:120px;"
        type="button"
      >
        P
        <small style="margin-left: 10px;">
          {"  " + $stats.pct_avg_P + "%"}</small
        >
      </button>
      <h5 style="position: absolute;margin-top: -80px;left: 0;">
        {$stats.P_next_count} - {$stats.P_next_pct}%
      </h5>
    </div>
    <div style="position:relative;">
      <button
        on:click={(e) => {
          $bet = "B";
          addRecord();
        }}
        class={"btn btn-lg btn-outline-danger mx-2 " +
          ($bet === "B" ? "active" : "")}
        style="font-size: 1.5rem; min-width:120px;"
        type="button"
      >
        B
        <small style="margin-left: 10px;">
          {"  " + $stats.pct_avg_B + "%"}</small
        >
      </button>
      <h5 style="position: absolute;margin-top: -80px;right: 0;">
        {$stats.B_next_count} - {$stats.B_next_pct}%
      </h5>
    </div>
    <button
      on:click={undoRecord}
      class="btn btn-lg btn-outline-warning mx-4"
      style="font-size: 1.5rem;"
      type="button"
    >
      Undo
    </button>
  </div>
</div>

<style>
</style>
