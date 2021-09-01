<script>
  import { onMount } from "svelte";

  import { navigate } from "svelte-navigator";
  import { sideBarShow, user } from "../stores/sessionStore";
  import Hamburger from "./sidebar/Hamburger.svelte";

  function logOut() {
    $user = null;
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    navigate("/login");
  }

  function handleKeydown(e) {
    if (e.code === "Tab") {
      e.preventDefault();
      $sideBarShow = !$sideBarShow;
    }
  }

  onMount(() => {
    if (window.location.pathname === "/play") {
      showHistoryBtn = true;
    }
    if (window.location.pathname === "/history") {
      showBackToGameBtn = true;
    }
  });

  let showHistoryBtn,
    showBackToGameBtn = false;
</script>

<svelte:window on:keydown={handleKeydown} />

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
      <div class="container-fluid mx-3">
        <a class="navbar-brand" style="margin-left: 60px;" href="/"
          >Baccarat App</a
        >
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon" />
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          {#if $user && $user.accessToken}
            <div
              style="display:flex;justify-content:flex-start;"
              class="navbar-nav me-auto mb-2 mb-lg-0 mx-3"
            >
              <button
                class="nav-link btn btn-secondary btn-md text-light mx-3 "
                style="background-color: transparent;"
                on:click={() => {
                  navigate("/new/game");
                }}
              >
                New Game
              </button>
              {#if showHistoryBtn}
                <button
                  class="nav-link btn btn-secondary btn-md text-light"
                  style="background-color: transparent;"
                  on:click={() => {
                    navigate("/history");
                  }}
                >
                  Full History
                </button>
              {/if}
              {#if showBackToGameBtn}
                <button
                  class="nav-link btn btn-secondary btn-md text-light"
                  style="background-color: transparent;"
                  on:click={() => {
                    navigate("/play");
                  }}
                >
                  Back to game
                </button>
              {/if}
            </div>
            <div style="float:right; display:flex;justify-content:flex-end;">
              <button
                class="nav-item btn btn-md btn-warning mx-5"
                on:click={logOut}
                >Logout
              </button>
            </div>
          {/if}
        </div>
      </div>
    </nav>
  </div>
  <!-- End Container  -->
</div>
