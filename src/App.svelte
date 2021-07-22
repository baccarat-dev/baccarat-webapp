<script>
  import { Router, Route, Link } from "svelte-navigator";
  import Home from "./pages/Home.svelte";
</script>

<Router>
  <main>
    <Route path="aaron/:id">
      <Home />
    </Route>

    <Route path="/:id">
      <Home />
    </Route>

    <Route>
      <h3>Default</h3>
      <p>No Route could be matched.</p>
    </Route>
  </main>
</Router>
