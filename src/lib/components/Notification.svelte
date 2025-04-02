<script lang="ts">
  import { onMount } from "svelte";

  let {
    message,
    duration = 5000,
  }: {
    message: string;
    duration?: number;
  } = $props();

  let visible: boolean = $state(true);

  onMount(() => {
    setTimeout(() => {
      visible = false;
    }, duration);
  });
</script>

{#if visible}
  <div id="notification">
    <p>
      {message}
    </p>
  </div>
{/if}
