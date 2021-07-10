<script>
  import {
    bet,
    winNbr,
    round,
    hand,
    betsList,
    winNbrsList,
  } from "../../store/sessionStore";

  import { saveRecordDB } from "../../api/main/shortGame";

  const winNbrBtnsStatusReset = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let winNbrBtnsStatus = winNbrBtnsStatusReset;

  function onChangeWinNbr(e) {
    const s = e.target.value;
    if (s === "<") {
      if ($winNbr === null) {
        $winNbr = 9;
      } else if ($winNbr > 0) {
        $winNbr--;
      }
    } else if (s === ">") {
      if ($winNbr === null) {
        $winNbr = 0;
      } else if ($winNbr < 9) {
        $winNbr++;
      }
    } else {
      $winNbr = parseInt(s);
    }
    winNbrBtnsStatus = [...winNbrBtnsStatusReset];
    winNbrBtnsStatus[$winNbr] = 1;
  }

  function onChangeWinHand(e) {
    if (e.target.value === "undo") {
      if ($hand.length > 0) {
        $hand.pop();
        $hand = $hand;
      }
    } else if ($hand.length < 3) {
      $hand = [...$hand, e.target.value];
    }
  }

  function onBetBtnClick(e) {
    $bet = e.target.value;
  }

  async function addRecord(e) {
    $bet = e.target.value;
    // if (!$bet) {
    //   window.pushToast("Select P, B, or T", "danger");
    // } else if ($winNbr === null) {
    //   window.pushToast("Select winning number", "danger");
    // }

    const dataRes = saveRecordDB($bet);
    console.log(dataRes);
    window.pushToast("done: " + $bet);

    $betsList.push($bet);
    $winNbrsList.push($bet);
    MostRecentRecordsComponent.populateDataMatrix();

    strategy_003_Component.run($bet, $betsList);
    strategy_004_Component.run($bet, $betsList);
    strategy_005_Component.run($bet, $betsList);
    strategy_006_Component.run($bet, $betsList);
    $round++;

    //($winNbrsList, $betsList);
  }

  export let strategy_003_Component,
    strategy_004_Component,
    strategy_005_Component,
    strategy_006_Component;

  export let MostRecentRecordsComponent;
</script>

<div>
  <div class="row">
    <h1 class="text-primary mx-3" style="font-size: 1.75rem;">Recording:</h1>
  </div>
  <hr class="mx-4" />

  <h3
    class="d-block text-center my-2 display-6 mb-3"
    style="font-size:1.5rem; font-weight: 350;"
  >
    Round N°{$round}:
  </h3>
  <br />
  <div class="d-flex flex-nowrap justify-content-center">
    <!-- Player Btn -->
    <button
      value="P"
      on:click={addRecord}
      class={"btn btn-lg btn-outline-primary " + ($bet === "P" ? "active" : "")}
      type="button">P</button
    >
    <!-- Banker Btn -->
    <button
      value="B"
      on:click={addRecord}
      class={"btn btn-lg btn-outline-danger mx-2 " +
        ($bet === "B" ? "active" : "")}
      type="button">B</button
    >
    <!-- Tie Btn -->
    <!-- <button
      value="T"
      on:click={onBetBtnClick}
      class={"btn btn-lg btn-outline-success " +
        ($bet =onBetBtnClick== "T" ? "active" : "")}
      type="button">T</button
    > -->

    <!-- Add Btn -->
    <!-- <button
      on:click={addRecord}
      value="Add"
      style="font-size: 25px;font-weight: 500;"
      class="btn btn-lg btn-outline-warning mx-2 p-0 px-3"
      type="button">ADD</button
    > -->
  </div>
  <br />

  <!-- BEGIN Winning Number Selection Btn Group -->
  <!-- <div class="d-flex flex-wrap align-items-center justify-content-center">
      <div class="d-flex flex-wrap mx-4 justify-content-center">
        <div>
          <button
            name="prevArrow"
            on:click={onChangeWinNbr}
            value="<"
            style="border-radius: 0;border-top-left-radius: 50%;border-bottom-left-radius: 50%;"
            class="btn btn-outline-dark btn-lg">«</button
          >
          {#each Array(5) as _, i}
            <button
              on:click={onChangeWinNbr}
              value={i}
              style="border-radius: 0;"
              class={"btn btn-outline-dark btn-lg mr-1 display-4 " +
                (winNbrBtnsStatus[i] === 1 ? "active" : "")}>{i}</button
            >
          {/each}
        </div>
        <div>
          {#each Array(5) as _, i}
            <button
              on:click={onChangeWinNbr}
              value={i + 5}
              style="border-radius: 0;"
              class={"btn btn-outline-dark btn-lg mr-1 " +
                (winNbrBtnsStatus[i + 5] === 1 ? "active" : "")}
              >{i + 5}
            </button>
          {/each}

          <button
            name="nxtArrow"
            on:click={onChangeWinNbr}
            value=">"
            style="border-radius: 0; border-top-right-radius: 50%;border-bottom-right-radius: 50%;"
            class="btn btn-outline-dark btn-lg">»</button
          >
        </div>
      </div>
    </div> -->
  <!-- END Winning Number Selection Btn Group -->
  <br />

  <!-- BEGIN cards selection Btn Group -->
  <!-- <div
    style="display: none !important;"
    class="d-flex flex-wrap align-items-center justify-content-center"
  >
    <div class="d-flex flex-wrap mx-4 justify-content-center">
      <div class="mr-3 my-3">
        {#each Array(9) as _, i}
          <button
            on:click={onChangeWinHand}
            value={i + 1}
            style="border-radius: 0;"
            class="btn btn-lg btn-outline-dark mr-1 vertical-center"
            >{i + 1}</button
          >
        {/each}
      </div>
      >
      <div
        class="d-flex"
        style="-ms-flex-item-align: center;align-items: center;align-content: center;"
      >
        <button
          on:click={onChangeWinHand}
          value="10"
          style="border-radius: 0;"
          class="btn btn-lg btn-outline-dark mr-1 vertical-center">10</button
        >
        <button
          on:click={onChangeWinHand}
          value="J"
          style="border-radius: 0;"
          class="btn btn-lg btn-outline-dark vertical-center"
          >J
        </button>
        <button
          on:click={onChangeWinHand}
          value="Q"
          style="border-radius: 0;"
          class="btn btn-lg btn-outline-dark vertical-center"
          >Q
        </button>
        <button
          on:click={onChangeWinHand}
          value="K"
          style="border-radius: 0;"
          class="btn btn-lg btn-outline-dark mr-1 vertical-center"
          >K
        </button>

        <p
          class="d-flex flex-nowrap text-center display-6 px-1 bg-dark vertical-center rounded border border-dark"
          style="font-size:1.5rem; font-weight: 350; height:40px;margin-left: 30px;border-width: 3px!important; margin-right: 10px;"
        >
          <span
            style="display:inline-block;width:27px;height:auto;"
            class="bg-light"
          >
            {$hand.length > 0 ? $hand[0] : "-"}
          </span>
          <span style="display:inline-block;width:27px;" class="bg-light">
            {$hand.length > 1 ? $hand[1] : "-"}
          </span>
          <span style="display:inline-block;width:27px;" class="bg-light">
            {$hand.length > 2 ? $hand[2] : "-"}
          </span>
        </p>
        <button
          name="undoCardSelect"
          on:click={onChangeWinHand}
          value="undo"
          class="btn btn-lg btn-outline-dark mr-1 p-0 px-3 h1 vertical-center"
          style="font-weight: 900; height:40px;color:#333;border-width:medium;"
        >
          ↩
        </button>
      </div>
    </div>
  </div> -->

  <!-- END cards selection Btn Group -->

  <br /><br /><br />
</div>

<style>
  .mr-1 {
    margin-right: 3px;
  }
  .mr-3 {
    margin-right: 10px;
  }
  .vertical-center {
    margin: 0;
    align-self: center;
  }
</style>
