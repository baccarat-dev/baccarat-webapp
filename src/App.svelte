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
    numOfPs,
    numOfBs,
    remainingPlayers,
    remainingBankers,
    level,
    levelMax,
    calc = "1";

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
    remainingPlayers = 40;
    remainingBankers = 40;
    numOfBs = 0;
    numOfPs = 0;
    level = 0;
    levelMax = 0;
  }
  reset();

  function betAction(e) {
    bet = e.srcElement.value;
    betBtnsDisabled = false;
    if (resBtnsDisabled) {
      nextRound();
    } else {
      betBtnsDisabled = true;
    }
  }

  function resAction(e) {
    res = e.srcElement.value;
    resBtnsDisabled = false;
    if (betBtnsDisabled) {
      nextRound();
    } else {
      resBtnsDisabled = true;
    }
  }

  function calc1() {
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
  }

  function calc2() {
    if (res == "p") {
      numOfPs++;
    } else {
      numOfBs++;
    }
    pWinChance = (100 * numOfBs) / (numOfBs + numOfPs);
    bWinChance = (100 * numOfPs) / (numOfPs + numOfBs);
  }

  function calc3() {
    if (res == "p") {
      if (remainingPlayers) {
        remainingPlayers--;
      }
    } else {
      if (remainingBankers) {
        remainingBankers--;
      }
    }
    pWinChance =
      (100 * remainingPlayers) / (remainingPlayers + remainingBankers);
    bWinChance =
      (100 * remainingBankers) / (remainingPlayers + remainingBankers);
  }

  function nextRound() {
    betBtnsDisabled = false;
    resBtnsDisabled = false;
    bets.push(bet);
    results.push(res);

    switch (calc) {
      case "1":
        calc1();
        break;
      case "2":
        calc2();
        break;
      case "3":
        calc3();
        break;
      default:
        break;
    }

    if (bet === res) {
      levelMax = levelMax < level ? level : levelMax;
      level = 0;
      bWinChance = pWinChance = 50;
    } else {
      level++;
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

  <div style="display: block;">
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

  <h2 style="margin-right: 20px;">Current Lvl: {level}</h2>
  <h2 style="margin-right: 20px;">Max Lvl: {levelMax}</h2>

  <div style="display: block; position:fixed; bottom:0; margin-bottom: 50px;">
    <hr />
    <h2>Winning %</h2>
    <h2 style="margin-left:50px; font-weight: 350; color:{pColor};">
      Player: {Math.round(pWinChance * 1000) / 1000}%
    </h2>
    <h2 style="margin-left:50px; font-weight: 350; color:{bColor};">
      Banker: {Math.round(bWinChance * 1000) / 1000}%
    </h2>
    <div>
      <label for="strgies" style="display: inline;">Switch Calculator: </label>
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
