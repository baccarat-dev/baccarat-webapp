<script>
  import { Router, Route, Link } from "svelte-navigator";
  import Home from "./pages/Home.svelte";
  import RecordsFullHistory from "./pages/RecordsFullHistory.svelte";
</script>

<Router>
  <main>
    <Route path="aaron/:id">
      <Home />
    </Route>

    <Route path="aaron/:id/history">
      <RecordsFullHistory />
    </Route>
    <Route path="/:id/history">
      <RecordsFullHistory />
    </Route>

    <Route path="/:id">
      <Home />
    </Route>

    <Route>
      <Link to="aaron/60ef2a69c6b49b20e1d87c7a">
        <h3 class="text-center">Aaron</h3>
      </Link>
      <Link to="60f9762b88c1ca14647ad65e">
        <h3 class="text-center">2nd Game</h3>
      </Link>
    </Route>
  </main>
</Router>
