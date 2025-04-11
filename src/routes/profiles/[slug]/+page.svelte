<script lang="ts">
  import { page } from "$app/state";
  import PageWrapper from "$lib/components/PageWrapper.svelte";
  import { userid } from "$lib/stores/user";
  import { get_user, supabase } from "$lib/supabase";
  import { notify } from "$lib/utils";
  import { onMount } from "svelte";
  const [targetUserid, targetUsername] = page.params.slug.split("`");
  let is_own_page = $state(false);
  let description = $state("...");

  async function edit() {
    const textBox: HTMLParagraphElement = document.getElementById(
      "description"
    ) as HTMLParagraphElement;
    if (textBox !== null) {
      const res = await supabase
        .from("profiles")
        .update({
          description: textBox.textContent,
        })
        .eq("userid", $userid);

      if (res.error) {
        notify(res.error.message);
      } else {
        notify("Successfully updated profile!");
      }
    }
  }

  async function check_if_profile_empty() {
    const { error, data } = await supabase
      .from("profiles")
      .select("*")
      .eq("userid", targetUserid);
    if (!error && data !== null && data.length > 0) {
      description = data[0].description;
    } else {
      const { error } = await supabase.from("profiles").insert({
        userid: $userid,
        description: "This profile is empty.",
      });
      if (error) {
        console.log(error.message);
      }
      description = "This profile is empty.";
    }
  }

  $effect(() => {
    if ($userid === targetUserid) {
      is_own_page = true;
      check_if_profile_empty();
    }
  });

  onMount(async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("description")
      .eq("userid", targetUserid);
    if (error) {
      console.warn(error.message);
    } else {
      description = data[0].description;
    }
  });
</script>

<PageWrapper title_text="{targetUsername}'s Page">
  {#if is_own_page === true}
    <p contenteditable="true" id="description">{description}</p>
    <button onclick={edit}>Edit</button>
  {:else}
    <p>{description}</p>
  {/if}
</PageWrapper>

<style>
  #description {
    height: 100%;
    background-color: none;
    border-width: 1px;
  }
  #description::after {
    content: "|";
    animation: blinker 1s infinite;
  }

  #description:focus::after {
    animation: none;
    opacity: 0;
  }

  @keyframes blinker {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }
</style>
