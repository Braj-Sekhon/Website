<script lang="ts">
  import PageWrapper from "$lib/components/PageWrapper.svelte";
  import { supabase } from "$lib/supabase";
  import { notify } from "$lib/utils";

  let title = "";
  let text = "";
  let email = "";
  let password = "";
  let posting = false;
  let loggedIn = false;

  async function login() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      notify("Wrong credentials!");
    } else {
      loggedIn = true;
      notify("Logged in!");
    }
  }

  async function post() {
    posting = true;
    const { error } = await supabase.from("blogs").insert({ title, text });

    if (error) {
      notify(error.message);
    } else {
      notify("Posted!");
      title = "";
      text = "";
    }
    posting = false;
  }
</script>

<PageWrapper title_text="Create Blog Post">
  {#if !loggedIn}
    <input
      class="w-full m-2 bg-black p-2"
      bind:value={email}
      placeholder="Email"
    />
    <input
      class="w-full m-2 bg-black p-2"
      type="password"
      bind:value={password}
      placeholder="Password"
    />
    <button class="w-full m-2" on:click={login}>Login</button>
  {:else}
    <input
      class="w-full m-2 bg-black p-2"
      bind:value={title}
      placeholder="Title"
    />
    <textarea
      class="w-full m-2 bg-black p-2"
      bind:value={text}
      placeholder="Write your blog post..."
    ></textarea>
    <button class="w-full m-2" on:click={post} disabled={posting}>
      {posting ? "Posting..." : "Post"}
    </button>
  {/if}
</PageWrapper>
