import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://naxystpijhawvwhvonfu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5heHlzdHBpamhhd3Z3aHZvbmZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI3ODE1MzAsImV4cCI6MjA1ODM1NzUzMH0.GuzXgizbY427Mmn3KYlk4vTrwSyHVFmwSrYE5KzRhN4"
);

export async function get_user() {
  return supabase.auth.getUser();
}
