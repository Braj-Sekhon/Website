import { supabase } from "$lib/supabase";
import { writable } from "svelte/store";

export const username = writable("User");
export const userid = writable();

export async function update_user() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    username.set(user.user_metadata.username);
    userid.set(user.id);
  } else {
  }
}
