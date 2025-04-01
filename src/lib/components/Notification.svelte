<script lang="ts">
  import { onMount } from "svelte";

  let {
    message,
    duration = 5000,
  }: {
    message: string;
    duration?: number;
  } = $props();

  onMount(() => {
    const notification: HTMLDivElement = document.getElementById(
      "notification"
    ) as HTMLDivElement;
    setTimeout(() => {
      notification.remove();
    }, duration);
  });
</script>

<div id="notification">
  <p>
    {message}
  </p>
</div>
