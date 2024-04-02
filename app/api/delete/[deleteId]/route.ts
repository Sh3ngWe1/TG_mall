import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

// export async function DELETE(
//   req: NextRequest,
//   { params: { deleteId } }: { params: { deleteId: string } }
// ) {
//   // const data = await res.json()
//   const supabase = createClient();
//   const { data: t } = await supabase
//     .from("test")
//     .select()
//     .eq("id", deleteId)
//     .single();

//   if (!t) {
//     return Response.json({ code: 401, msg: "", data: "" });
//   }
//   return Response.json({ code: 200, msg: "", data: { data: t } });
// }
export async function GET(deleteId: Number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("test")
    .delete()
    .eq("id", deleteId)
    .single();

  if (error) {
    return Response.json({ code: 401, msg: error.message, data: "" });
  }
  return Response.json({ code: 200, msg: "", data: { data } });
}
