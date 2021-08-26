<script>
  async function disable(e) {
    const _id = e.target.value;
    let S = strategies.find((S) => S._id === _id);
    S.enabled = false;
    updateLocalStorage();
    strategies = strategies;
  }

  async function enable(e) {
    const _id = e.target.value;
    let S = strategies.find((S) => S._id === _id);
    S.enabled = true;
    updateLocalStorage();
    strategies = strategies;
  }

  function updateLocalStorage() {
    let localStrategies = localStorage.getItem("strategies");
    if (localStrategies) {
      localStrategies = JSON.parse(localStrategies);
      localStrategies.forEach((s) => {
        if (s.name === S.name) {
          s.maxLvl = S.maxLvl;
          s.enabled = S.enabled;
        }
        console.log(s.maxLvl, S.maxLvl);
      });
      console.log(localStrategies);
      localStorage.setItem("strategies", JSON.stringify(localStrategies));
    }
  }

  function setMaxLvl(e) {
    S.maxLvl = +e.target.value;
    updateLocalStorage();
    strategies = strategies;
  }
  export let strategies, S, i;
</script>

<div style="display:flex; justify-content: center;">
  {#if S.enabled}
    <button on:click={disable} value={S._id} class="btn btn-sm btn-danger mx-3">
      🗑
    </button>
  {:else}
    <button on:click={enable} value={S._id} class="btn btn-sm btn-success mx-3">
      ⬤
    </button>
  {/if}

  <input
    class="mx-3"
    style="width: 40px;font-size:1.4rem;"
    type="number"
    value={S.maxLvl}
    on:change={setMaxLvl}
  />

  <h3 class="mx-3" style="width: 400px; font-size: 1.3rem !important;">
    {i + 1 + ") "}{S.name}
  </h3>
</div>

<style>
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

  input[type="number"] {
    -moz-appearance: textfield; /* Firefox */
  }
</style>
