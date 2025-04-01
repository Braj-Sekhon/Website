<script lang="ts">
  import PageWrapper from "$lib/components/PageWrapper.svelte";
  import Title from "$lib/components/Title.svelte";
</script>

<PageWrapper title_text="Minecraft Server">
  <p>This is a modded SMP server.</p>
  <p class="white">Minecraft Server Address: mc.ybgames.fyi</p>
  <p>Modloader: Fabric</p>
  <p>Mods that should be installed on the client are listed below:</p>
  <div class="modholder">
    <p class="modbox">
      Mod_Name<span class="dash">-</span>Author<span class="colon">:</span><a
        class="external-link"
        href="/home">Modrinth Download</a
      ><span class="separator">|</span><a href="/home">.Jar Download</a>
    </p>
    <p class="modbox">
      Mod_Name<span class="dash">-</span>Author<span class="colon">:</span><a
        class="external-link"
        href="/home">Modrinth Download</a
      ><span class="separator">|</span><a href="/home">.Jar Download</a>
    </p>
    <p class="modbox">
      Mod_Name<span class="dash">-</span>Author<span class="colon">:</span><a
        class="external-link"
        href="/home">Modrinth Download</a
      ><span class="separator">|</span><a href="/home">.Jar Download</a>
    </p>
  </div>
  <a class="external-link" href="/home">Open All Links (Modrinth)</a>
  <a href="/home">Download All (.Jar)</a>
</PageWrapper>

<style>
  .modholder {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    margin: 5px;
    padding: 5px;
    border-width: 0;
  }

  .modbox {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    margin-bottom: 5px;
    margin-left: 10px;
    padding: 0px;
    position: relative;
    padding-left: 30px;
    width: 100%;
    box-sizing: border-box;
  }

  .modbox * {
    margin-top: 5px;
    margin-bottom: 5px;
    background-color: rgba(0, 0, 0, 0);
  }

  .modbox::before {
    content: "";
    border-radius: 100%;
    position: absolute;
    background-color: white;
    border-width: 1px;
    border-style: solid;
    border-color: black;
    padding: 5px;
    left: -20px;
    top: 50%;
    transform: translateY(-50%);
  }
</style>
