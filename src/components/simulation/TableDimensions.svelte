<script>
  function onDimensionsChange(e) {
    const x = e.target.value;
    if (x < 1 || x > 10) {
      window.pushToast("Enter number between 1 and 10", "danger", 5000);
    } else {
      if (e.target.name === "nbrRows") {
        nbrRows = parseInt(x);
        localStorage.setItem("nbrRows", x);
      } else if (e.target.name === "nbrCols") {
        nbrCols = parseInt(x);
        localStorage.setItem("nbrCols", x);
      }
    }
  }

  export let nbrRows, nbrCols;
</script>

<div class="d-flex justify-content-center">
  <div class="input-group mx-4 d-flex align-items-center" style="width: 200px;">
    <input
      class="d-inline form-control"
      type="number"
      min="1"
      max="10"
      name="nbrRows"
      style="width: 50px; height:50px; font-weight: 500;font-size: 30px;"
      value={nbrRows}
      on:change={onDimensionsChange}
    />

    <b style="font-weight: 900;font-size: 30px;" class="mx-1">X</b>

    <input
      class="form-control d-inline"
      type="number"
      min="1"
      max="10"
      value={nbrCols}
      name="nbrCols"
      style="width: 50px; height:50px; font-weight: 500;font-size: 30px;"
      on:change={onDimensionsChange}
    />
  </div>
</div>
