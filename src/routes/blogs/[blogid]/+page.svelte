<script lang="ts">
  import PageWrapper from "$lib/components/PageWrapper.svelte";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
  //  data.text = data.text.replaceAll("\\n", "<br />");
</script>

<PageWrapper title_text={data.title}>
  <p>{data.text}</p>
  <a href="/blogs">Back to Blogs</a>
</PageWrapper>

<style>
  line {
    width: 100%;
    height: 10%;
    visibility: visible;
    color: aliceblue;
    display: block;
  }
</style>
