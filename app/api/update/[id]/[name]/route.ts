import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params: { id, name } }: { params: { id: string; name: string } }
) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("test")
    .update({ name: name })
    .eq("id", id);

  if (error) {
    return Response.json({ code: 401, msg: error.message, data: "" });
  }
  return Response.json({ code: 200, msg: "成功更新", data: { data } });
}
