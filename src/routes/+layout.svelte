<script lang="ts">
  import { get_user, supabase } from "$lib/supabase";
  import { mount, onMount } from "svelte";
  import Modal from "$lib/components/Modal.svelte";
  import Notification from "$lib/components/Notification.svelte";
  import { notify } from "$lib/utils";
  import { username, userid, update_user } from "$lib/stores/user";
  import type { EventHandler } from "svelte/elements";
  export let about_link = "/about";
  export let about_text = "About";

  let is_blogger = false;

  let is_open = false;
  let cur_window = "";

  async function signup() {
    is_open = true;
    cur_window = "signup";
  }
  async function login() {
    is_open = true;
    cur_window = "login";
  }
  async function check_if_is_blogger() {
    try {
      const { data, error } = await supabase.from("bloggers").select("*");
      if (error) {
        console.warn(error.message);
      } else if (data && data.length > 0) {
        is_blogger = true;
      }
    } catch (error) {
      console.warn(error.message);
    }
  }
  async function signup_user(ev: SubmitEvent) {
    ev.preventDefault();
    const data: FormData = new FormData(ev.target as HTMLFormElement);
    const email = data.get("email").toString();
    const password = data.get("password").toString();
    const confirm_password = data.get("confirm-password").toString();
    const username = data.get("username").toString();

    if (confirm_password !== password) {
      notify("Passwords do not match!");
    } else {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            username: username,
          },
        },
      });
      if (error) {
        notify(error.message);
      } else {
        notify("Successfully created account!");
        update_user();
      }
    }
  }
  async function login_user(ev: SubmitEvent) {
    ev.preventDefault();
    const data: FormData = new FormData(ev.target as HTMLFormElement);
    const email = data.get("email").toString();
    const password = data.get("password").toString();

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      notify(error.message);
    } else {
      notify("Successfully logged in!");
      update_user();
    }
  }

  onMount(() => {
    get_user().then(
      (res) => {
        if (res && res.data && res.data.user !== null) {
          $username = res.data.user.user_metadata.username;
          $userid = res.data.user.id;
        }
      },
      (error) => {
        console.warn(error);
      }
    );
  });

  $: if ($userid) {
    check_if_is_blogger();
  }
</script>

<div id="footer-nav-container">
  <nav>
    <button onclick={signup}> Signup </button>
    <button onclick={login}> Login </button>
    <a href={about_link}>{about_text}</a>
    {#if is_blogger === true}
      <a href="/blogs/create">Create Post</a>
    {/if}
  </nav>
  <footer>
    <p>
      Hello, {$username}.
    </p>
  </footer>
</div>

{#if is_open}
  <Modal bind:is_open>
    {#if cur_window === "signup"}
      <form onsubmit={signup_user}>
        <input name="email" type="email" placeholder="email" />
        <input name="username" type="text" placeholder="username" />
        <input name="password" type="password" placeholder="password" />
        <input
          name="confirm-password"
          type="password"
          placeholder="confirm password"
        />
        <input name="submit" type="submit" value="Signup" />
      </form>
    {:else}
      <form onsubmit={login_user}>
        <input name="email" type="text" placeholder="email" />
        <input name="password" type="password" placeholder="password" />
        <input name="submit" type="submit" value="Login" />
      </form>
    {/if}
  </Modal>
{/if}

<slot />

<style>
  form {
    background-color: rgba(0, 0, 0, 0.5);
  }
  form * {
    color: black;
  }
  footer,
  nav {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    background-color: rgba(0, 0, 0, 0.5);
    margin: 0px;
    padding: 0px;
    border-radius: 0px;
    bottom: 0px;
    width: 100%;
    height: 5%;
  }
  footer *,
  nav * {
    background-color: rgba(0, 0, 0, 0);
    border-width: 0px;
    animation: none;
    text-align: center;
    margin: auto;
    padding: auto;
  }
  footer {
    left: 0px;
  }
  nav {
    flex-direction: column;
    width: 6%;
    right: 0px;
    top: 0px;
    height: 95%;
  }

  #footer-nav-container {
    visibility: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    position: fixed;
    left: 0px;
    top: 0px;
    margin: 0px;
    padding: 0px;
    border-width: 0px;
    display: flex;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0);
    animation: none;
  }

  #footer-nav-container > * {
    visibility: visible;
    animation: none;
  }
</style>
