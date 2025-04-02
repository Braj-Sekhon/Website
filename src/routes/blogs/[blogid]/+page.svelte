<script lang="ts">
  import PageWrapper from "$lib/components/PageWrapper.svelte";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
</script>

<PageWrapper title_text={data.title}>
  <p>Written by {data.author}</p>
  <p>{data.text}</p>
</PageWrapper>
