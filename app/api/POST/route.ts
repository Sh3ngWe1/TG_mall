import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import test from "node:test";
import { textSpanContainsPosition } from "typescript";

// export async function GET() {
//   const supabase = createClient();
//   const { data: t } = await supabase.from("test").select();
//   if (!t) {
//     return Response.json({ code: 401, msg: "", data: "" });
//   }
//   return Response.json({ code: 200, msg: "", data: { data: t } });
// }

export async function POST() {
  const supabase = createClient();
  const { data: t, error } = await supabase.from("test").insert({
    id: "2",
    //created_at: "",
  });
  if (error) {
    throw error;
  }
  // console.log('Inserted data:', t);
  return Response.json({ code: 200, msg: "", data: { data: t } });
}
