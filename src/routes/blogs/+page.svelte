<script lang="ts">
  import PageWrapper from "$lib/components/PageWrapper.svelte";
  import { supabase } from "$lib/supabase";
  import { onMount } from "svelte";

  async function loadBlogs() {
    const blog_list: HTMLDivElement = document.getElementById(
      "blog-list"
    ) as HTMLDivElement;

    const { data, error } = await supabase.from("blogs").select("*");
    if (error) {
      blog_list.innerHTML = "Error loading blogs...";
    } else {
      console.log(data);
      data.forEach((val) => {
        const link: HTMLAnchorElement = document.createElement(
          "a"
        ) as HTMLAnchorElement;
        link.href = "/blogs/" + val.id.toString();
        link.innerHTML = val.title + " by " + val.author;
        blog_list.appendChild(link);
      });
    }
  }

  onMount(loadBlogs);
</script>

<PageWrapper title_text="Blogs">
  <div id="blog-list"></div>
</PageWrapper>
