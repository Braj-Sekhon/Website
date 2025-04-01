<script lang="ts">
  import PageWrapper from "$lib/components/PageWrapper.svelte";
  import { onMount } from "svelte";

  let titlebox: HTMLParagraphElement;
  let textbox: HTMLParagraphElement;

  onMount(() => {
    titlebox = document.getElementById("title") as HTMLParagraphElement;
    textbox = document.getElementById("text") as HTMLParagraphElement;
  });

  async function post() {}
</script>

<PageWrapper title_text="Create Blog Post">
  <p id="title" contenteditable="true">Title</p>
  <p id="text" contenteditable="true">Text</p>
  <button onclick={post}>Post</button>
</PageWrapper>
