<script>
  export let data;
</script>

<div
  style="display:flex; justify-content: space-between; font-size: 1rem !important;"
>
  <h3 style="width: 350px;">- {data.name}</h3>
  <h3 style="min-width: 200px;">
    lvl: {data.lvl}
  </h3>
  <h3 style="min-width: 200px;">
    maxlvl: {data.maxLvl}
  </h3>
  <h3 style="min-width: 200px;">
    %: {data.percent ? data.percent : "-"}
  </h3>
  <h3 style="min-width: 200px;">
    next: {data.nextMove ? data.nextMove : "-"}
  </h3>
</div>
