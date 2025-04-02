import type { PageLoad } from "./$types";
import { supabase } from "$lib/supabase";

export const load: PageLoad = async ({ params }) => {
  const blogid: number = params.blogid as number;
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", blogid);
  if (error) {
  } else {
    let object_data = {};
    data.forEach((val) => {
      object_data["title"] = val.title;
      object_data["text"] = val.text;
      object_data["author"] = val.author;
    });
    return object_data;
  }
};
