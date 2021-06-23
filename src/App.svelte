<script>
  import { element } from "svelte/internal";

  let round,
    bets,
    results,
    bet,
    res,
    pWinChance,
    bWinChance,
    betBtnsDisabled,
    resBtnsDisabled,
    pColor,
    bColor,
    remaininghands,
    remainingPlayers,
    remainingBankers;
  let calc = "1";

  function reset() {
    round = 1;
    bets = [];
    results = [];
    bet = null;
    res = null;
    pWinChance = 50;
    bWinChance = 50;
    betBtnsDisabled = false;
    resBtnsDisabled = false;
    pColor = bColor = "blue";
    remaininghands = 80;
    remainingPlayers = 40;
    remainingBankers = 40;
  }
  reset();

  function betAction(e) {
    bet = e.srcElement.value;
    nextRound();
    return;
    betBtnsDisabled = false;
    if (resBtnsDisabled) {
      nextRound();
    } else {
      betBtnsDisabled = true;
    }
  }

  function resAction(e) {
    res = e.srcElement.value;
    nextRound();
    return;
    resBtnsDisabled = false;
    if (betBtnsDisabled) {
      nextRound();
    } else {
      resBtnsDisabled = true;
    }
  }

  function nextRound() {
    betBtnsDisabled = false;
    resBtnsDisabled = false;
    bets.push(bet);
    results.push(res);
    if (res == "p") {
      if (pWinChance == bWinChance) {
        pWinChance /= 2;
        bWinChance = 100 - pWinChance;
      } else if (pWinChance < bWinChance) {
        pWinChance /= 2;
        bWinChance = 100 - pWinChance;
      } else {
        bWinChance *= 2;
        pWinChance = 100 - bWinChance;
      }
    } else {
      if (pWinChance == bWinChance) {
        bWinChance /= 2;
        pWinChance = 100 - bWinChance;
      } else if (bWinChance < pWinChance) {
        bWinChance /= 2;
        pWinChance = 100 - bWinChance;
      } else {
        pWinChance *= 2;
        bWinChance = 100 - pWinChance;
      }
    }
    round++;
    bet = res = null;

    if (pWinChance > bWinChance) {
      pColor = "green";
      bColor = "red";
    } else if (pWinChance < bWinChance) {
      bColor = "green";
      pColor = "red";
    } else {
      bColor = pColor = "blue";
    }
  }
</script>

<div style="margin: 3%;">
  <button
    style="float: left; background:#c00; padding-left:20px; padding-right:20px; color:aliceblue;"
    on:click={reset}>Reset</button
  >
  <h1 style=" text-align: center; ">Round N°{round}</h1>
  <hr />
  <br />

  <div style="display: none;">
    <h2 style="display: inline; margin-right: 20px;">Bet:</h2>
    <button on:click={betAction} value="p" disabled={betBtnsDisabled}>
      Player
    </button>
    <button on:click={betAction} value="b" disabled={betBtnsDisabled}>
      Banker
    </button>
  </div>
  <h2 style="display: inline; margin-right: 20px;">Res:</h2>
  <button on:click={resAction} value="p" disabled={resBtnsDisabled}>
    Player
  </button>
  <button on:click={resAction} value="b" disabled={resBtnsDisabled}>
    Banker
  </button>

  <div style="display: block; position:fixed; bottom:0; margin-bottom: 50px;">
    <hr />
    <h2>Winning %</h2>
    <h2 style="margin-left:50px; font-weight: 350; color:{pColor};">
      Player: {pWinChance}%
    </h2>
    <h2 style="margin-left:50px; font-weight: 350; color:{bColor};">
      Banker: {bWinChance}%
    </h2>
    <div style="float: right;">
      <label for="strgies" style="display: inline;">Change Calculator: </label>
      <!-- svelte-ignore a11y-no-onchange -->
      <select
        style="padding-left: 20px; margin-left: 10px;"
        name="strategy"
        id="strgies"
        on:change={(e) => {
          reset();
          calc = e.target.value;
        }}
      >
        <option value="1">{"  1  "} </option>
        <option value="2">{"  2  "} </option>
        <option value="3">{"  3  "} </option>
      </select>
    </div>
  </div>
</div>
