import { fail, type Actions } from "@sveltejs/kit";
import { supabase } from "$lib/supabase";

const max_username_length = 64;
const min_password_length = 8;

export const actions = {
  signup: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get("email").toString();
    const username = data.get("username").toString();
    const password = data.get("password").toString();
    const confirm_password = data.get("confirm-password").toString();
    if (username.length > max_username_length)
      return fail(400, { message: "Username is too long!" });
    if (password !== confirm_password)
      return fail(400, { message: "Passwords do not match!" });
    if (password.length < min_password_length)
      return fail(400, { message: "Password is too short!" });
    if (!email || !username || !password || !confirm_password)
      return fail(400, { message: "Missing required fields!" });

    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: "/",
        data: {
          username: username,
        },
      },
    });
    if (error) {
      return fail(400, { message: error.message });
    } else {
      if (session.access_token !== null) {
        cookies.set("Token", session.access_token, {
          httpOnly: true,
          path: "/",
          sameSite: "strict",
        });
      }
      return {
        success: true,
        message: "Successfully created account!",
      };
    }
  },
  login: async ({ request, cookies }) => {
    const data = await request.formData();

    const email = data.get("email").toString();
    const password = data.get("password").toString();

    const {
      data: { session },
      error,
    } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      return fail(200, { message: error.message });
    } else {
      cookies.set("Token", session.access_token, {
        httpOnly: true,
        path: "/",
        sameSite: "strict",
      });
      return {
        success: true,
        message: "Successfully signed in!",
      };
    }
  },
} satisfies Actions;
