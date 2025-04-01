<script lang="ts">
  import { onMount } from "svelte";

  let exit_button;
  let modal: HTMLDivElement;
  export let is_open = false;
  export let size = "large";

  async function close() {
    is_open = false;
  }
  onMount(() => {
    modal = document.getElementById("modal") as HTMLDivElement;
    exit_button = document.getElementById("exit-button");
  });
</script>

<div id="modal" class="modal medium">
  <button onclick={close} id="close-button">Close</button>
  <slot />
</div>

<style>
  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    background-image: linear-gradient(
      15deg,
      orange 0%,
      white 50%,
      lightblue 100%
    );
    transform: translate(-50%, -50%);
    animation: none;
    z-index: 10;
    height: auto;
  }
  .modal * {
    background-color: rgba(0, 0, 0, 0.5);
  }
  .large {
    width: 60vw;
  }
  .medium {
    width: 40vw;
  }
  .small {
    width: 20vw;
  }
</style>
