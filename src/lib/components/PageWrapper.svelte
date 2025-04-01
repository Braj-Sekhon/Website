<script lang="ts">
  // I was having issues with using +layout.svelte for modularity, so everything will be wrapped with this guy
  import "$lib/styles/global.css";
  import Title from "$lib/components/Title.svelte";
  import { get_user, supabase } from "$lib/supabase";
  import { onMount } from "svelte";
  import Modal from "./Modal.svelte";

  export let title_text = "Ybg's Website";
  export let about_link = "/about";
  export let about_text = "About";
  export let show_back_to_home = true;
  let username = "User";

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

  onMount(() => {
    get_user().then(
      (res) => {
        username = res.data.user.user_metadata.username;
      },
      (error) => {
        console.warn(error);
      }
    );
  });
</script>

<Title header={title_text}></Title>
{#if show_back_to_home}
  <a href="/">Back to Home</a>
{/if}
<slot />
{#if is_open}
  <Modal bind:is_open>
    {#if cur_window === "signup"}{:else}{/if}
  </Modal>
{/if}
<div id="footer-nav-container">
  <nav>
    <button onclick={signup}> Signup </button>
    <button onclick={login}> Login </button>
    <a href={about_link}>{about_text}</a>
  </nav>
  <footer>
    <p>
      Hello, {username}.
    </p>
  </footer>
</div>

<style>
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

  #footer-nav-container * {
    animation: none;
  }
</style>
