<script>
  import { onMount } from "svelte";

  import { navigate } from "svelte-navigator";

  import { login, signup } from "../api/main/auth";
  import { isPageLoading, user } from "../stores/sessionStore";
  async function submit(e) {
    e.preventDefault();
    if (registration) {
      const response = await signup(email, password);
      if (response.status === 201) {
        window.pushToast(response.msg, "success", 3000);
        navigate("/login");
      } else {
        window.pushToast(response.msg, "danger");
      }
      return;
    }
    const response = await login(email, password);
    if (response.status === 200) {
      $user = { accessToken: response.accessToken, ...response.user };
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("user", JSON.stringify(response.user));
      navigate("/mygames");
    } else {
      window.pushToast(response.msg, "danger");
    }
  }
  onMount(() => {
    if ($user && $user.accessToken) {
      navigate("/mygames");
    }
    $isPageLoading = false;
  });
  let email = "",
    password = "";

  export let registration;
</script>

<main>
  <h1>{registration ? "Registration" : "Login"}</h1>
  <br />
  <form on:submit={submit}>
    <div class="row">
      <label for="">Name</label>
      <input
        type="text"
        value={email}
        on:change={(e) => (email = e.target.value)}
      />
    </div>
    <div class="row">
      <label for="">Password</label>
      <input
        type="password"
        value={password}
        on:change={(e) => (password = e.target.value)}
      />
    </div>
    <button type="submit"
      >{registration ? "Create New Account" : "Login"}</button
    >
    <br />
    <br />
    <p class="text-center" style="text-decoration: none;">
      {#if registration}
        <a href="/login">login instead</a>
      {:else}
        <a href="/signup">signup instead</a>
      {/if}
    </p>
  </form>
  <br /><br />
</main>

<style>
  @import url("https://fonts.googleapis.com/css?family=Open+Sans&display=swap");

  main {
    font-family: "Open Sans", sans-serif;
    background: #f9faff;
    color: #3a3c47;
    line-height: 1.6;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
    padding: 0;
  }

  h1 {
    margin-top: 20px;
  }

  form {
    background: #fff;
    max-width: 360px;
    width: 100%;
    padding: 58px 44px;
    border: 1px solid #e1e2f0;
    border-radius: 4px;
    box-shadow: 0 0 5px 0 rgba(42, 45, 48, 0.12);
    transition: all 0.3s ease;
  }

  .row {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  .row label {
    font-size: 20px !important;
    color: #8086a9;
  }

  .row input {
    flex: 1;
    padding: 13px;
    border: 1px solid #d6d8e6;
    border-radius: 4px;
    font-size: 16px;
    transition: all 0.2s ease-out;
  }

  .row input:focus {
    outline: none;
    box-shadow: inset 2px 2px 5px 0 rgba(42, 45, 48, 0.12);
  }

  .row input::placeholder {
    color: #c8cddf;
  }

  button {
    width: 100%;
    padding: 12px;
    font-size: 18px;
    background: #1575c3;
    color: #fff;
    border: none;
    border-radius: 100px;
    cursor: pointer;
    font-family: "Open Sans", sans-serif;
    margin-top: 15px;
    transition: background 0.2s ease-out;
  }

  button:hover {
    background: #0d426e;
  }

  @media (max-width: 458px) {
    form {
      background: #f9faff;
      border: none;
      box-shadow: none;
      padding: 20px 0;
    }
  }
</style>
