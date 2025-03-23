<script>
  import Title from "$lib/components/Title.svelte";
  import { onMount } from "svelte";

  onMount(async function () {
    const status_blocks = document.getElementsByClassName("status-block");
    const response = await fetch("/api/query-ports/", {
      method: "GET",
    });
    const data = await response.json();
    for (let i = 0; i < status_blocks.length; i++) {
      const element = status_blocks[i];
      const subdomain = element.id;
      if (data[subdomain]) {
        const curr_data = data[subdomain];
        if (curr_data.status == true) {
          element.classList.add("online");
          element.getElementsByClassName("status-message")[0].textContent =
            "ONLINE";
          element.append(
            " (" +
              data[subdomain].players_online +
              "/" +
              data[subdomain].max_players +
              ")"
          );
        } else {
          element.classList.add("offline");
          element.getElementsByClassName("status-message")[0].textContent =
            "OFFLINE";
        }
      } else {
        element.classList.add("error");
      }
    }
  });

  export const CSR = false;
</script>

<Title header="Server Status"></Title>
<a href="/">Back to Home</a>
<p id="mc" class="status-block">
  <span class="bullet"></span>
  <span class="status-message"></span>
  <span>
    Minecraft<span class="separator">:</span>mc.ybgames.fyi
  </span>
</p>
<p id="tr" class="status-block">
  <span class="bullet"></span>
  <span class="status-message"></span>
  <span>
    Terraria<span class="separator">:</span>tr.ybgames.fyi<span
      class="separator">|</span
    >Port: 41112
  </span>
</p>
