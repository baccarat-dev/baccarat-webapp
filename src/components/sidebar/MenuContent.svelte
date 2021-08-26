<script>
  import { navigate } from "svelte-navigator";
  import { sideBarShow } from "../../stores/sessionStore";
</script>

<div>
  <div
    class="bg-dark"
    style="display:block; height:auto; margin-left:27px; padding-left:20px;"
  >
    <h4 class="text-white"><li>Game Options</li></h4>
    <hr />
    <button
      class="m-0 btn btn-primary btn-md px-4 text-white mx-4 d-inline"
      on:click={() => {
        navigate("/new/game");
        $sideBarShow = false;
      }}
    >
      New Game
    </button>
    <button
      class="m-0 btn btn-primary btn-md px-4 text-white mx-4 d-inline"
      on:click={() => {
        navigate("/mygames");
        $sideBarShow = false;
      }}
    >
      List Games
    </button>
  </div>
</div>
