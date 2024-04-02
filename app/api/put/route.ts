import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function PUT() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("test")
    .update({ name: "John" })
    .eq("id", 1);

  if (error) {
    return Response.json({ code: 401, msg: error.message, data: "" });
  }
  return Response.json({ code: 200, msg: "", data: { data } });
}
