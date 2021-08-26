<script>
  async function signup(e) {
    e.preventDefault();
  }
  let email = "",
    password = "";
</script>

<div>
  <h1>Registration</h1>
  <br />
  <form on:submit={signup}>
    <div class="row">
      <label for="">Name</label>
      <input
        type="text"
        value={email}
        on:change={(e) => (email = e.target.value)}
      />
    </div>
    <div class="row">
      <label
        for=""
        value={password}
        on:change={(e) => (password = e.target.value)}>Password</label
      >
      <input type="password" />
    </div>
    <button type="submit">Login</button>
  </form>
</div>

<style>
  @import url("https://fonts.googleapis.com/css?family=Open+Sans&display=swap");

  * {
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
    margin-top: 100px;
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

  label {
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
