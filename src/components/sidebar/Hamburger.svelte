<div style="margin-right: 50px;">
  <input
    type="checkbox"
    class="openSidebarMenu"
    id="openSidebarMenu"
    style="z-index: 102;"
  />
  <label
    for="openSidebarMenu"
    class="sidebarIconToggle"
    style="display:block; z-index: 101;"
  >
    <div class="spinner diagonal part-1" />
    <div class="spinner horizontal" />
    <div class="spinner diagonal part-2" />
  </label>
  <div id="sidebarMenu">p</div>
  <div id="overlay" />
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
  #sidebarMenu {
    z-index: 100;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    width: 250px;
    transform: translateX(-250px);
    transition: transform 250ms ease-in-out;
    background: #222;
  }

  input[type="checkbox"]:checked ~ #sidebarMenu {
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
    top: 22px;
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
