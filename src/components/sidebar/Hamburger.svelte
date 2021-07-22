<script>
  import MenuContent from "./MenuContent.svelte";
  import { sideBarShow } from "../../store/sessionStore";

  export let game_id;
</script>

<div style="margin-right: 50px;">
  <input
    type="checkbox"
    class="openSideBarMenu"
    id="openSidebarMenu"
    style="z-index: 102;position:fixed;top:27px;left:27px;"
    checked={$sideBarShow}
    on:change={() => {
      $sideBarShow = !$sideBarShow;
    }}
  />
  <label
    for="openSidebarMenu"
    class="sidebarIconToggle"
    style="display:block; z-index: 101;position:fixed;top:27px;left:27px;"
  >
    <div class="spinner diagonal part-1" />
    <div class="spinner horizontal" />
    <div class="spinner diagonal part-2" />
  </label>
  <div id="SideBarMenuConent" style="position:fixed;" class="bg-dark">
    <MenuContent {game_id} />
  </div>
  <div
    id="overlay"
    on:click={() => {
      $sideBarShow = false;
    }}
  />
</div>

<style>
  #overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    background: #222;
    opacity: 0;
    z-index: 99;
  }
  #SideBarMenuConent {
    z-index: 100;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    width: 50vw;
    min-width: 50vw;
    max-width: 100vw;
    transform: translateX(-150vw);
    transition: transform 250ms ease-in-out;
    padding-top: 100px;
  }
  @media only screen and (max-width: 600px) {
    #SideBarMenuConent {
      width: 90vw !important;
    }
  }
  input[type="checkbox"]:checked ~ #SideBarMenuConent {
    transform: translateX(0);
  }
  input[type="checkbox"]:checked ~ #overlay {
    display: block;
    opacity: 0.5;
  }

  input[type="checkbox"] {
    transition: all 0.3s;
    box-sizing: border-box;
    display: none;
  }
  .sidebarIconToggle {
    transition: all 0.3s;
    box-sizing: border-box;
    cursor: pointer;
    position: absolute;
    z-index: 99;
    height: 100%;
    width: 100%;
    top: 27px;
    left: 15px;
    height: 22px;
    width: 22px;
  }
  .spinner {
    transition: all 0.3s;
    box-sizing: border-box;
    position: absolute;
    height: 3px;
    width: 100%;
    background-color: #fff;
  }
  .horizontal {
    transition: all 0.3s;
    box-sizing: border-box;
    position: relative;
    float: left;
    margin-top: 3px;
  }
  .diagonal.part-1 {
    position: relative;
    transition: all 0.3s;
    box-sizing: border-box;
    float: left;
  }
  .diagonal.part-2 {
    transition: all 0.3s;
    box-sizing: border-box;
    position: relative;
    float: left;
    margin-top: 3px;
  }
  input[type="checkbox"]:checked ~ .sidebarIconToggle > .horizontal {
    transition: all 0.3s;
    box-sizing: border-box;
    opacity: 0;
  }
  input[type="checkbox"]:checked ~ .sidebarIconToggle > .diagonal.part-1 {
    transition: all 0.3s;
    box-sizing: border-box;
    transform: rotate(135deg);
    margin-top: 8px;
  }
  input[type="checkbox"]:checked ~ .sidebarIconToggle > .diagonal.part-2 {
    transition: all 0.3s;
    box-sizing: border-box;
    transform: rotate(-135deg);
    margin-top: -9px;
  }
</style>
