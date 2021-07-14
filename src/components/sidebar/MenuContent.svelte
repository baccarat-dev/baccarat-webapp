<script>
  import {
    round,
    bet,
    betsList,
    winNbr,
    winNbrsList,
    sideBarShow,
  } from "../../store/sessionStore";
  async function reset(strategyDetails) {}

  function selectGame(e) {
    $sideBarShow = false;
    window.pushToast('Switched to "' + e.target.className + '"');
  }
</script>

<div>
  <div
    class="bg-dark"
    style="display:block; height:auto; margin-left:27px; padding-left:20px;"
  >
    <h4 class="text-white"><li>Game Options</li></h4>
    <br />
    <button class="m-0 btn btn-success btn-md px-4 text-white mx-4 d-inline">
      Start New
    </button>

    <button
      class="m-0 btn btn-danger btn-md px-4 text-white mx-4 float-right d-inline"
      >Delete Current</button
    >

    <br /><br />
    <hr class="bg-white" />
    <br />
    <div class="px-3">
      <h5 class="text-white">Select Old Game</h5>
      <table class="table table-hover table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr on:click={selectGame} class="1st game">
            <th scope="row" class="1st game">1</th>
            <td class="1st game">1st game</td>
            <td class="1st game">11-11-1111</td>
          </tr>
          <tr on:click={selectGame} class="2nd game">
            <th scope="row" class="2nd game">2</th>
            <td class="2nd game">2nd game</td>
            <td class="2nd game">11-11-1111</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
