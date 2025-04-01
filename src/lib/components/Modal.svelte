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

<div id="modal" class="modal large">
  <button onclick={close} id="close-button">Close</button>
  <slot />
</div>

<style>
  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    background-image: linear-gradient(30deg, black 50%, white 100%);
    transform: translate(-50%, -50%);
    animation: none;
    z-index: 10;
  }
  .large {
    width: 600px;
    height: 400px;
  }
  .medium {
    width: 400px;
    height: 250px;
  }
  .small {
    width: 200px;
    height: 100px;
  }
</style>
