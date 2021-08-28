<script>
  import { Router, Route, Link } from "svelte-navigator";
  import PrivateRoute from "./components/auth/PrivateRoute.svelte";
  import Loader from "./components/misc/Loader.svelte";
  import Toast from "./components/misc/Toast.svelte";
  import Navigation from "./components/navigation.svelte";
  import ListGames from "./pages/ListGames.svelte";
  import Login from "./pages/Login.svelte";
  import NewGame from "./pages/NewGame.svelte";
  import NotFound404 from "./pages/NotFound404.svelte";
  import PlayGame from "./pages/PlayGame.svelte";
  import RecordsFullHistory from "./pages/RecordsFullHistory.svelte";
  import Simulation from "./pages/Simulation.svelte";
</script>

<Router>
  <main>
    <Toast />
    <Loader />

    <Route path="/login">
      <Navigation />
      <Login registration={false} />
    </Route>
    <Route path="/">
      <Navigation />
      <Login registration={false} />
    </Route>

    <Route path="/signup">
      <Navigation />
      <Login registration={true} />
    </Route>

    <PrivateRoute path="/play" let:location>
      <Navigation />
      <PlayGame />
    </PrivateRoute>

    <PrivateRoute path="/mygames" let:location>
      <Navigation />
      <ListGames />
    </PrivateRoute>

    <PrivateRoute path="/simulator" let:location>
      <Navigation />
      <Simulation />
    </PrivateRoute>

    <PrivateRoute path="/new/game" let:location>
      <Navigation />
      <NewGame />
    </PrivateRoute>

    <Route path="*">
      <NotFound404 />
    </Route>
  </main>
</Router>
