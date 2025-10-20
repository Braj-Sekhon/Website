<script lang="ts">
  import PageWrapper from "$lib/components/PageWrapper.svelte";
  import { userid, username } from "$lib/stores/user";
  import { supabase } from "$lib/supabase";
  import { notify } from "$lib/utils";
  import { onMount } from "svelte";

  let titlebox: HTMLParagraphElement;
  let textbox: HTMLParagraphElement;
  let postbutton: HTMLButtonElement;

  onMount(() => {
    titlebox = document.getElementById("title") as HTMLParagraphElement;
    textbox = document.getElementById("text") as HTMLParagraphElement;
    postbutton = document.getElementById("postbutton") as HTMLButtonElement;
  });

  async function post() {
    postbutton.disabled = true;
    const title = titlebox.textContent;
    const text = textbox.textContent;
    if (title.length !== 0 && text.length !== 0) {
      const { data, error } = await supabase.from("blogs").insert({
        title: title,
        text: text,
        user_id: $userid,
        author: $username,
      });
      if (error) {
        notify(error.message);
      } else {
        notify("Successfully posted blog!");
      }
    } else {
      notify("Title and message cannot be empty!");
    }
    postbutton.disabled = false;
  }
</script>

<PageWrapper title_text="Create Blog Post">
  <p id="title" contenteditable="true">Title</p>
  <p id="text" contenteditable="true">Text</p>
  <div>
    <button id="postbutton" onclick={post}>Post</button>
    <p id="password" contenteditable="true">Password</p>
  </div>
</PageWrapper>
