<script>
  import { Router, Route } from "svelte-navigator";
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
</script>

<Router>
  <main>
    <Toast />
    <Loader />

    <Route path="/login">
      <Navigation />
      <Login registration={false} />
    </Route>
    <PrivateRoute path="/">
      <Navigation />
      <Login registration={false} />
    </PrivateRoute>

    <Route path="/signup">
      <Navigation />
      <Login registration={true} />
    </Route>

    <PrivateRoute path="/play" let:location>
      <Navigation />
      <PlayGame />
    </PrivateRoute>

    <PrivateRoute path="/history" let:location>
      <Navigation />
      <RecordsFullHistory />
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
