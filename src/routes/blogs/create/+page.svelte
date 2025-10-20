<script lang="ts">
  import PageWrapper from "$lib/components/PageWrapper.svelte";
  import { supabase } from "$lib/supabase";
  import { notify } from "$lib/utils";

  let title = "";
  let text = "";
  let password = "";
  let posting = false;

  async function post() {
    posting = true;

    if (title.length === 0 || text.length === 0) {
      notify("Title and text cannot be empty!");
      posting = false;
      return;
    }

    if (password.length === 0) {
      notify("Password required!");
      posting = false;
      return;
    }

    const { data, error } = await supabase.from("blogs").insert({
      title: title,
      text: text,
      password: password,
    });

    if (error) {
      notify(error.message);
    } else {
      notify("Successfully posted blog!");
      title = "";
      text = "";
      password = "";
    }

    posting = false;
  }
</script>

<PageWrapper title_text="Create Blog Post">
  <input class="" bind:value={title} placeholder="Title" />
  <textarea bind:value={text} placeholder="Write your blog post..."></textarea>
  <input type="password" bind:value={password} placeholder="Password" />
  <button on:click={post} disabled={posting}>
    {posting ? "Posting..." : "Post"}
  </button>
</PageWrapper>
