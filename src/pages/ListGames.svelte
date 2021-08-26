<script>
  import { onMount } from "svelte";
  import { navigate } from "svelte-navigator";
  import moment from "moment";
  import { getAllGames } from "../api/main/game";

  import { game, isPageLoading, user } from "../stores/sessionStore";

  function selectGame(e) {
    $game = JSON.parse(
      JSON.stringify(games.find((g) => g.name === e.target.id))
    );
    console.log($game);
    navigate("/play");
    window.pushToast('Started Game "' + e.target.id + '"');
  }
  onMount(async () => {
    console.log("started fetching games", $user._id);
    const response = await getAllGames($user._id);
    if (!response?.data?.length) {
      navigate("/new/game");
    }
    games = response.data;
    games.sort((a, b) => a - b);
    $isPageLoading = false;
  });
  let games = [];
</script>

<div>
  <h3 class="text-primary text-center">Select a Game to Start</h3>
  <br />
  <div class="px-3 d-flex justify-content-center">
    <table class="table table-hover table-dark" style="width: 50%;">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Date</th>
        </tr>
      </thead>
      <tbody>
        {#each games as game}
          <tr on:click={selectGame} id={game.name}>
            <th scope="row" id={game.name}>1</th>
            <td id={game.name}>{game.name}</td>
            <td id={game.name}>{moment(new Date(game.startedOn)).fromNow()}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
