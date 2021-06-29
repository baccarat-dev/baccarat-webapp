<script>
  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";
  import { backOut } from "svelte/easing";

  let toasts = [];
  let retainMs = 2500;
  let type = "";
  let toastId = 0;
  const pushToast = (msg = "", _type = "success") => {
    type = _type;
    toasts = [
      ...toasts,
      {
        _id: ++toastId,
        msg,
      },
    ];
    setTimeout(() => {
      unshiftToast();
    }, retainMs);
  };

  const unshiftToast = () => {
    toasts = toasts.filter((a, i) => i > 0);
  };

  onMount(() => {
    window.pushToast = pushToast;
  });
</script>

<div class="toast-wrapper">
  {#each toasts as toast (toast._id)}
    <div
      class={"toast-item bg-" + type}
      in:fly={{
        delay: 200,
        duration: 500,
        x: 50,
        y: 0,
        opacity: 0.1,
        easing: backOut,
      }}
      out:fade={{ duration: 500, opacity: 0 }}
    >
      {toast.msg}
    </div>
  {/each}
</div>

<style>
  .toast-wrapper {
    position: fixed;
    right: 0;
    top: 0;
    text-align: center;
    z-index: 9999;
    width: 80vw;
  }
  .toast-item {
    border-radius: 4px;
    padding: 12px 10px;
    margin: 10px auto;
    max-width: 300px;
    opacity: 0.95;
    color: #fff;
  }
</style>
