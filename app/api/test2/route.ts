import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function GET() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("test")
    .update({ name: "AAABBBCCC" })
    .eq("id", 1);

  if (error) {
    return Response.json({ code: 401, msg: error.message, data: "" });
  }
  return Response.json({ code: 200, msg: "", data: { data } });
}
