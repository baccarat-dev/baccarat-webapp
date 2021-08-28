<script>
  import { Link, navigate } from "svelte-navigator";
  import { user, isUserLoggedIn } from "../stores/sessionStore";
  import Hamburger from "./sidebar/Hamburger.svelte";

  function logOut() {
    console.log("loggin out..........");
    $user = null;
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    navigate("/login");
  }
</script>

<div>
  <div class="container-fluid p-0 bg-white">
    <div style="height: 90px;visibility:hidden;">
      Pushes content underneath the navbar
    </div>
    {#if $user && $user.accessToken}
      <Hamburger />
    {/if}

    <nav
      style="position: fixed;top:0;width:100%; z-index: 99;"
      class="navbar navbar-expand-lg navbar-dark bg-dark py-3 mb-3"
    >
      <div class="container-fluid">
        <span class="navbar-brand h1" style="margin-left: 75px;">
          Baccarat App
        </span>

        {#if $user && $user.accessToken}
          <div
            style="display:flex;justify-content:flex-start;"
            class="navbar-nav me-auto mb-2 mb-lg-0 mx-3"
          >
            <button
              class="btn btn-light btn-md text-light mx-5"
              style="background-color: transparent;"
              on:click={() => {
                navigate("/new/game");
              }}
            >
              New Game
            </button>
            <button
              class="btn btn-light btn-md text-light"
              style="background-color: transparent;"
              on:click={() => {
                navigate("/mygames");
              }}
            >
              List Games
            </button>
          </div>
          <div style="float:right; display:flex;justify-content:flex-end;">
            <Link to="/simulator">
              <button
                class="btn btn-light btn-md text-light mx-5"
                style="background-color: transparent;">Simulator</button
              >
            </Link>

            <button class="btn btn-md btn-warning mx-5" on:click={logOut}
              >Logout
            </button>
          </div>
        {/if}
      </div>
    </nav>
  </div>
  <!-- End Container  -->
</div>
