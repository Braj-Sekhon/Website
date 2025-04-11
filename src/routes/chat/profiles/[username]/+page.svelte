<script lang="ts">
  import { page } from "$app/state";
  import PageWrapper from "$lib/components/PageWrapper.svelte";
  import { get_user, supabase } from "$lib/supabase";
  import { notify } from "$lib/utils";
  import { onMount } from "svelte";
  const targetUsername = page.params.username;
  let is_own_page = $state(false);
  onMount(async () => {
    await get_user().then((userRes) => {
      const user = userRes.data.user;
      if (user !== null) {
        const curr_username = user.user_metadata.username;
        if (curr_username === targetUsername) {
          is_own_page = true;
        }
      }
    });
  });
</script>

<PageWrapper title_text="{targetUsername}'s Page">
  {#if is_own_page === true}
    <input type="text" placeholder="Description" value="Description" />
    <button>Edit</button>
  {:else}
    <p>Description</p>
  {/if}
</PageWrapper>
<a href="/chat/">Back to Chat</a>
