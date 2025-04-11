<script lang="ts">
  import { supabase } from "$lib/supabase";
  import { mount, onMount } from "svelte";
  import Message from "$lib/components/Message.svelte";
  import { notify } from "$lib/utils";
  import type { User } from "@supabase/supabase-js";
  import PageWrapper from "$lib/components/PageWrapper.svelte";

  let is_open = $state(false);
  let cur_window = $state("...");

  async function showSignup() {
    is_open = true;
    cur_window = "signup";
  }
  async function showLogin() {
    is_open = true;
    cur_window = "login";
  }

  async function makeMessage(payload: string[]) {
    mount(Message, {
      target: document.getElementById("messages") as HTMLDivElement,
      props: {
        content: payload[1],
        username: payload[0],
      },
    });
  }

  let userDat = {} as User;
  async function get_user() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) {
      notify(error.message);
    }
    if (user === null) {
      return;
    }
    userDat = user;
  }

  onMount(() => {
    get_user();
    const messageBox = document.getElementById("message") as HTMLInputElement;
    const sendButton = document.getElementById("send") as HTMLButtonElement;

    const channel = supabase
      .channel("channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          makeMessage([payload.new.username, payload.new.message]);
        }
      )
      .subscribe();

    async function send_msg() {
      const msg = messageBox.value.trim();
      if (msg.length > 0 && msg !== null && msg != "") {
        const res = await supabase.from("messages").insert({
          message: msg,
        });
        messageBox.value = "";
      }
    }

    sendButton.addEventListener("click", send_msg);
    document.addEventListener("keypress", (ev) => {
      if (ev.key === "Enter") {
        send_msg();
      }
    });

    return () => {
      supabase.removeChannel(channel);
    };
  });
</script>

<PageWrapper title_text="Next-gen Discord Killer">
  <div id="messages">
    <p>Messages will show up here</p>
  </div>
  <div class="horizontal border">
    <input id="message" placeholder="Type here to send a message" />
    <button id="send">Send</button>
  </div>
</PageWrapper>

<style>
  #messages {
    display: flex;
    justify-content: center;
    align-content: flex-start;
    flex-direction: column;
    width: 100%;
  }
  #message {
    width: 82.5%;
  }
  #send {
    width: 15%;
  }
</style>
