<script>
  import { onMount } from "svelte";
  import { navigate } from "svelte-navigator";
  import moment from "moment";
  import { getAllGames, deleteGame as delGameDB } from "../api/main/game";

  import { game, isPageLoading, user } from "../stores/sessionStore";

  function selectGame(e) {
    if (!e.target.id) {
      return;
    }
    $game = JSON.parse(
      JSON.stringify(games.find((g) => g.name === e.target.id))
    );
    navigate("/play");
    window.pushToast('Started Game "' + e.target.id + '"');
  }

  async function deleteGame(_id) {
    console.log(_id);
    const resp = await delGameDB(_id);
    if (resp.status === 200) {
      await fetchGames();
      window.pushToast(resp.msg, "success");
    }
  }

  async function fetchGames() {
    $isPageLoading = true;
    const response = await getAllGames($user._id);
    if (!response?.data?.length) {
      navigate("/new/game");
    }
    games = response.data;
    $isPageLoading = false;
  }

  onMount(() => {
    fetchGames();
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
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {#each games as game}
          <tr on:click={selectGame} id={game.name}>
            <th scope="row" id={game.name}>1</th>
            <td id={game.name}>{game.name}</td>
            <td id={game.name}>{moment(new Date(game.startedOn)).fromNow()}</td>
            <td
              on:click={() => {
                deleteGame(game._id);
              }}><button class="btn btn-sm btn-danger">delete</button></td
            >
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
