<script lang="ts">
  import PageWrapper from "$lib/components/PageWrapper.svelte";
  import { notify } from "$lib/utils.js";
  import { onMount } from "svelte";

  let { data, form } = $props();

  onMount(() => {
    notify(form.message);
  });
</script>

<PageWrapper show_title={false}></PageWrapper>
