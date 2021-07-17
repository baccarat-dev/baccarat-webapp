<script>
  export let data;
  export let i;
</script>

<div style="display:flex; justify-content: space-between;">
  <h3 style="width: 350px; font-size: 1.3rem !important;">
    {i + 1 + ") "}{data.name}
  </h3>
  <h3 class="el">
    lvl: {data.lvl}
  </h3>
  <h3 class="el">
    max: {data.maxLvl}
  </h3>
  <h3 class="el">
    {data.percent ? data.percent : "- "}%
  </h3>
  <h3 class="el">
    next: {data.nextMove ? data.nextMove : "-"}
  </h3>
</div>

<style>
  .el {
    min-width: 70px;
    font-size: 1.4rem !important;
  }
</style>
