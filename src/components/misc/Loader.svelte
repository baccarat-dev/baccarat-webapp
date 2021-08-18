<script>
  let time = 0.0;
  const Timer = setInterval(() => {
    if (!isPageLoading) {
      clearInterval(Timer);
      window.pushToast(
        "Page loaded in " + time + " seconds!",
        "success",
        100000
      );
    }
    time += 0.1;
  }, 100);

  //props
  export let isPageLoading;
</script>

<div style="display: flex;position:fixed;top:0;left:0;z-index: 999999;">
  <div
    class="text-center bg-light"
    style="height:100vh;width:100vw; display: flex; justify-content: center; align-items: center;"
  >
    <h3
      style="position:absolute; text-align: center;justify-self: center;align-self: center;"
    >
      <!-- {Math.round(time * 10) / 10} -->
      <small>loading</small>
    </h3>
    <div
      class="spinner-border text-dark"
      role="status"
      style="width: 8rem; height: 8rem;"
    >
      <span class="sr-only" />
    </div>
  </div>
</div>
