<script lang="ts">
  // I was having issues with using +layout.svelte for modularity, so everything will be wrapped with this guy
  import "$lib/styles/global.css";
  import Title from "$lib/components/Title.svelte";

  export let title_text = "Ybg's Website";
  export let show_back_to_home = true;
  export let show_title = true;
</script>

{#if show_title}
  <Title header={title_text}></Title>
{/if}
{#if show_back_to_home}
  <a href="/">Back to Home</a>
{/if}
<slot />
