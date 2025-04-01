import { mount } from "svelte";
import Notification from "./components/Notification.svelte";

export function notify(message: string) {
  mount(Notification, {
    target: document.body,
    props: {
      message: message,
    },
  });
}
