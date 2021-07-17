<script>
  export let data;
</script>

<div style="display:flex; justify-content: space-between;">
  <h3 style="width: 350px; font-size: 1.5rem !important;">{data.name}</h3>
  <h3 class="el">
    lvl: {data.lvl}
  </h3>
  <h3 class="el">
    maxlvl: {data.maxLvl}
  </h3>
  <h3 class="el">
    %: {data.percent ? data.percent : "-"}
  </h3>
  <h3 class="el">
    next: {data.nextMove ? data.nextMove : "-"}
  </h3>
</div>

<style>
  .el {
    min-width: 200px;
    font-size: 1.5rem !important;
  }
</style>
