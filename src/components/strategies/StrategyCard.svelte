<script>
  export let name, currentLevel, maxLevel, percentage, nextMove;
</script>

<div
  style="display:flex; justify-content: space-between; font-size: 1rem !important;"
>
  <h3 style="width: 350px;">- {name}</h3>
  <h3 style="min-width: 200px;">
    lvl: {currentLevel}
  </h3>
  <h3 style="min-width: 200px;">
    maxlvl: {maxLevel}
  </h3>
  <h3 style="min-width: 200px;">
    %: {percentage ? percentage : "-"}
  </h3>
  <h3 style="min-width: 200px;">
    next: {nextMove ? nextMove : "-"}
  </h3>
</div>
