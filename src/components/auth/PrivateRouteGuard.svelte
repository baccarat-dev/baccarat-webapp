<script>
  import { useNavigate, useLocation } from "svelte-navigator";
  import { user } from "../../stores/sessionStore";

  const navigate = useNavigate();
  const location = useLocation();

  $: if (!$user || !$user.accessToken) {
    navigate("/login", {
      state: { from: $location.pathname },
      replace: true,
    });
  }
</script>

{#if $user}
  <slot />
{/if}
