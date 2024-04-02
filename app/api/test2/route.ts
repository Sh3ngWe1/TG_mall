import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function GET() {
  const supabase = createClient();
  const { data: t } = await supabase.from("test").select();
  if (!t) {
    return Response.json({ code: 401, msg: "", data: "" });
  }
  return Response.json({ code: 200, msg: "", data: { data: t } });
}
